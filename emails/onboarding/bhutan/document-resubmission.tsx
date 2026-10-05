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
 * Applicant notification — the reviewer has asked for one or more uploaded
 * documents to be resubmitted.
 * Subject: "Action Required: Documents Needed - DK Bank Application"
 * Figma: Corporate-Onboarding-Portal › node 6006:12588, "email / Document
 * resubmission / desktop" — pending icon.
 */
export interface DocumentResubmissionEmailProps {
  userName?: string;
  companyName?: string;
  /**
   * The document(s) to resubmit, already joined for display, e.g. "Board
   * Resolution, Account Mandate or Power of Attorney".
   */
  documentNames?: string;
  /** The reviewer's note, rendered verbatim after "Reason:". */
  reason?: string;
  portalUrl?: string;
  rfiEmail?: string;
}

export default function DocumentResubmissionEmail({
  userName = "{User's Name}",
  companyName = "{Company Name}",
  documentNames = "{Document Names}",
  reason = "{Reason}",
  portalUrl = "https://onboarding.uat.digitalkidu.bt/auth/login",
  rfiEmail = RFI_EMAIL,
}: DocumentResubmissionEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-pending-v2.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear {userName},</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Thank you for submitting {companyName}&rsquo;s application to open a corporate account with
        DK Bank.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Our team has reviewed the documents submitted and found that the following document(s)
        require resubmission:
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>{documentNames}</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Reason: {reason}</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please log back in to the onboarding portal to re-upload the required document(s).
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

DocumentResubmissionEmail.PreviewProps = {} satisfies DocumentResubmissionEmailProps;
