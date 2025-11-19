import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ruleTemplates, RuleTemplate } from "@/data/ruleTemplates";
import { CustomRule } from "@/utils/spamDetection";
import { Library, Download, Shield, DollarSign, Users, Briefcase, Clock } from "lucide-react";
import { toast } from "sonner";

interface RuleTemplatesLibraryProps {
  onImport: (rules: CustomRule[]) => void;
  existingRuleCount: number;
}

export function RuleTemplatesLibrary({ onImport, existingRuleCount }: RuleTemplatesLibraryProps) {
  const [open, setOpen] = useState(false);

  const getCategoryIcon = (category: RuleTemplate["category"]) => {
    switch (category) {
      case "crypto":
        return DollarSign;
      case "mlm":
        return Users;
      case "recruiting":
        return Briefcase;
      case "financial":
        return Shield;
      case "urgency":
        return Clock;
    }
  };

  const getCategoryColor = (category: RuleTemplate["category"]) => {
    switch (category) {
      case "crypto":
        return "text-orange-500";
      case "mlm":
        return "text-purple-500";
      case "recruiting":
        return "text-blue-500";
      case "financial":
        return "text-green-500";
      case "urgency":
        return "text-red-500";
    }
  };

  const handleImportTemplate = (template: RuleTemplate) => {
    const newRules: CustomRule[] = template.rules.map((rule, idx) => ({
      ...rule,
      id: `${Date.now()}-${idx}`,
    }));

    onImport(newRules);
    toast.success(`Imported ${newRules.length} rules from "${template.name}"`);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Library className="h-4 w-4 mr-2" />
          Import Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Library className="h-5 w-5" />
            Rule Template Library
          </DialogTitle>
          <DialogDescription>
            Import pre-built rule sets to detect common spam patterns. You currently have {existingRuleCount} custom rule{existingRuleCount !== 1 ? 's' : ''}.
          </DialogDescription>
        </DialogHeader>

        <Accordion type="single" collapsible className="w-full">
          {ruleTemplates.map((template) => {
            const Icon = getCategoryIcon(template.category);
            const colorClass = getCategoryColor(template.category);

            return (
              <AccordionItem key={template.id} value={template.id}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-3 text-left">
                    <Icon className={`h-5 w-5 shrink-0 ${colorClass}`} />
                    <div className="flex-1">
                      <div className="font-semibold">{template.name}</div>
                      <div className="text-sm text-muted-foreground">{template.description}</div>
                    </div>
                    <Badge variant="secondary">{template.rules.length} rules</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-2">
                    <div className="space-y-2">
                      {template.rules.map((rule, idx) => (
                        <div key={idx} className="p-3 bg-muted/50 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline">{rule.indicator}</Badge>
                            <span className="text-xs text-muted-foreground">Weight: {rule.weight}</span>
                          </div>
                          <code className="text-xs block overflow-x-auto bg-background p-2 rounded">
                            {rule.pattern}
                          </code>
                        </div>
                      ))}
                    </div>

                    <Button
                      onClick={() => handleImportTemplate(template)}
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Import This Template
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="text-sm text-muted-foreground mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="font-medium mb-2">💡 Tips:</p>
          <ul className="space-y-1 text-xs">
            <li>• Templates can be customized after import</li>
            <li>• Multiple templates can be combined</li>
            <li>• Adjust weights to fine-tune detection</li>
            <li>• Disable specific rules you don't need</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
