import { useState, useMemo } from "react";
import { MessageCard } from "@/components/MessageCard";
import { StatsCard } from "@/components/StatsCard";
import { FilterControls } from "@/components/FilterControls";
import { TestMessage } from "@/components/TestMessage";
import { CustomRulesBuilder, CustomRule } from "@/components/CustomRulesBuilder";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Filter, Clock, TrendingDown, Github, BookOpen } from "lucide-react";
import { getSampleMessagesWithTimestamps } from "@/data/sampleMessages";
import { analyzeMessageAsync } from "@/utils/spamDetection";

const Index = () => {
  const [filterEnabled, setFilterEnabled] = useState(true);
  const [threshold, setThreshold] = useState(80);
  const [messages] = useState(getSampleMessagesWithTimestamps());
  const [customRules, setCustomRules] = useState<CustomRule[]>([]);

  const stats = useMemo(() => {
    const totalMessages = messages.length;
    const spamCount = messages.filter(m => m.isSpam).length;
    const filteredCount = messages.filter(m => m.isSpam && m.confidence >= threshold).length;
    const timesSaved = Math.round((filteredCount * 2) / 60 * 10) / 10; // Assume 2min per spam msg

    return {
      total: totalMessages,
      spam: spamCount,
      filtered: filteredCount,
      timeSaved: timesSaved,
      accuracy: Math.round((filteredCount / spamCount) * 100),
    };
  }, [messages, threshold]);

  const handleReset = () => {
    setFilterEnabled(true);
    setThreshold(80);
  };

  const visibleMessages = useMemo(() => {
    return messages.map(msg => ({
      message: msg,
      filtered: filterEnabled && msg.isSpam && msg.confidence >= threshold,
    }));
  }, [messages, filterEnabled, threshold]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">AI Spam Stopper</h1>
                <p className="text-sm text-muted-foreground">LinkedIn Message Filter Demo</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Docs
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="outline">
            <Filter className="h-3 w-3 mr-1" />
            Interactive Demo
          </Badge>
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Experience AI-Powered Spam Detection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how our intelligent filtering system protects your LinkedIn inbox from spam,
            saving you hours every week.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            title="Total Messages"
            value={stats.total.toString()}
            subtitle="In your inbox"
            icon={Filter}
          />
          <StatsCard
            title="Spam Detected"
            value={stats.spam.toString()}
            subtitle={`${Math.round((stats.spam / stats.total) * 100)}% of total`}
            icon={Shield}
            trend={{ value: "15% from last week", positive: false }}
          />
          <StatsCard
            title="Time Saved"
            value={`${stats.timeSaved}h`}
            subtitle="This month"
            icon={Clock}
            trend={{ value: "2.5h more than last month", positive: true }}
          />
          <StatsCard
            title="Accuracy"
            value={`${stats.accuracy}%`}
            subtitle="Detection accuracy"
            icon={TrendingDown}
          />
        </div>

        <Tabs defaultValue="messages" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="messages">Message Feed</TabsTrigger>
            <TabsTrigger value="rules">Custom Rules</TabsTrigger>
          </TabsList>

          <TabsContent value="messages" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Controls */}
                <FilterControls
                  enabled={filterEnabled}
                  onEnabledChange={setFilterEnabled}
                  threshold={threshold}
                  onThresholdChange={setThreshold}
                  onReset={handleReset}
                />

                {/* Messages */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-foreground">
                      Message Feed
                      {filterEnabled && (
                        <Badge variant="secondary" className="ml-2">
                          {stats.filtered} filtered
                        </Badge>
                      )}
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {visibleMessages.map(({ message, filtered }) => (
                      <MessageCard key={message.id} message={message} filtered={filtered} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <TestMessage onTest={(content) => analyzeMessageAsync(content, customRules)} />

                {/* Info Card */}
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 p-6 rounded-lg border border-border">
                  <h4 className="font-semibold text-foreground mb-2">How it works</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>AI analyzes message patterns in real-time</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Identifies spam indicators with confidence scores</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Customizable threshold for your preferences</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>All processing happens locally - complete privacy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="rules">
            <div className="max-w-4xl mx-auto">
              <CustomRulesBuilder rules={customRules} onRulesChange={setCustomRules} />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>Open source • Privacy-focused • Community-driven</p>
          <p className="mt-2">Built with ❤️ for LinkedIn professionals</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
