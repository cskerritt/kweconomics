import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { validateEmail } from "@/utils/formHandler";
import { Mail } from "lucide-react";

interface Props {
  calculatorTitle: string;
  calculatorSlug: string;
  inputs: Record<string, number>;
  totalPV: number;
}

const LeadCaptureDialog = ({ calculatorTitle, calculatorSlug, inputs, totalPV }: Props) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    if (!name.trim()) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (!validateEmail(email)) {
      toast({ title: "Please enter a valid email", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("https://formspree.io/f/mnnvgzgd", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          formType: `calculator-${calculatorSlug}`,
          subject: `Calculator lead: ${calculatorTitle} — ${name}`,
          name,
          email,
          calculator: calculatorTitle,
          inputs,
          estimatedPresentValue: Math.round(totalPV),
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error("submit failed");
      toast({ title: "Sent!", description: "We'll email your results summary shortly." });
      setOpen(false);
      setName("");
      setEmail("");
    } catch {
      toast({
        title: "Submission error",
        description: "Please try again or call (201) 343-0700.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="professional" size="lg">
          <Mail className="h-4 w-4 mr-2" /> Email me my results
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Email my results</DialogTitle>
          <DialogDescription>
            Enter your details and we'll send a summary of this estimate. No spam.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); submit(); }}>
          <div className="space-y-2">
            <Label htmlFor="lead-name">Name</Label>
            <Input id="lead-name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email</Label>
            <Input id="lead-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Sending..." : "Send my results"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeadCaptureDialog;
