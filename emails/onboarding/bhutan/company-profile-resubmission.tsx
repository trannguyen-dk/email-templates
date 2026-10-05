import { Link, Text } from "@react-email/components";

import { Button } from "../../../components/button.js";
import {
  EmailLayout,
  RFI_EMAIL,
  paragraph,
  paragraphDark,
  plainLink,
} from "../../../components/layout.js";

/**
 * Applicant notification — the reviewer has asked for the Company Profile
 * section of the application to be resubmitted.
 * Subject: "Action Required: Resubmit the Company Profile - DK Bank Application"
 * Figma: Corporate-Onboarding-Portal › node 6009:13060, "Company Profile
 * resubmission - Email Sheet" (desktop 6006:12512, mobile 6007:80274) — pending icon.
 */
export interface CompanyProfileResubmissionEmailProps {
  userName?: string;
  companyName?: string;
  /** The reviewer's note, rendered verbatim after "Reason:". */
  reason?: string;
  portalUrl?: string;
  rfiEmail?: string;
}

export default function CompanyProfileResubmissionEmail({
  userName = "{User's Name}",
  companyName = "{Company Name}",
  reason = "{Reason}",
  portalUrl = "https://onboarding.uat.digitalkidu.bt/auth/login",
  rfiEmail = RFI_EMAIL,
}: CompanyProfileResubmissionEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-pending-v2.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear {userName},</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Thank you for submitting {companyName}&rsquo;s application to open a corporate account with
        DK Bank.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Our team has reviewed the Company Profile section of your application and found that some
        information requires your attention before we can proceed.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Reason: {reason}</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please log back in to the onboarding portal to review and update the required information.
      </Text>

      <Button href={portalUrl} spacing={16}>
        Return to Application
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
