import { CheckinForm } from "@/components/portal/checkin-form";
import { PortalHeader } from "@/components/portal/portal-header";

export default function CheckinPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <PortalHeader title="Weekly check-in">
        Take a few minutes to review the week honestly. There are no perfect answers.
        The purpose is to understand what worked, what did not and what should change
        next.
      </PortalHeader>
      <CheckinForm />
    </div>
  );
}
