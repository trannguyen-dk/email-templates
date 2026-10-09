import { Link, Text } from "@react-email/components";

import { Button } from "../../../components/button.js";
import {
  EmailLayout,
  RFI_EMAIL,
  emphasis,
  paragraph,
  paragraphDark,
  plainLink,
} from "../../../components/layout.js";

/**
 * Applicant notification — the reviewer has asked for the Company Profile
 * section of the application to be resubmitted.
 * Subject: "Action Required: Resubmit the Company Profile - DK Bank Application"
 * Figma: DK.Notif › "Notif - Bhutan Corp onboarding" (3209:4290), node
 * 3209:4298 — no status icon.
 *
 * "Reason:" is the closing line of the review paragraph, not its own paragraph.
 */
export interface CompanyProfileResubmissionEmailProps {
  /** The applicant's first name. */
  firstName?: string;
  companyName?: string;
  /** The reviewer's note, rendered in semibold after "Reason:". */
  reason?: string;
  portalUrl?: string;
  rfiEmail?: string;
}

export default function CompanyProfileResubmissionEmail({
  firstName = "{First Name}",
  companyName = "{Company Name}",
  reason = "{Resubmission Reason}",
  portalUrl = "https://onboarding.uat.digitalkidu.bt/auth/login",
  rfiEmail = RFI_EMAIL,
}: CompanyProfileResubmissionEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear {firstName},</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Thank you for submitting {companyName}&rsquo;s application to open a corporate account with
        DK Bank.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Our team has reviewed the Company Profile section of your application and found that some
        information requires your attention before we can proceed.
        <br />
        Reason: <strong style={emphasis}>{reason}</strong>
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please log back in to the onboarding portal to review and update the required information.
      </Text>

      <Button href={portalUrl} spacing={16}>
        Return to application
      </Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        If you have any questions, please contact us at{" "}
        <Link href={`mailto:${rfiEmail}`} style={plainLink}>
          {rfiEmail}
        </Link>
        .
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>
        DK Bank Onboarding Team
      </Text>
    </EmailLayout>
  );
}

CompanyProfileResubmissionEmail.PreviewProps = {} satisfies CompanyProfileResubmissionEmailProps;
