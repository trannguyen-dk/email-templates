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
 * Applicant notification — the reviewer has asked for one or more uploaded
 * documents to be resubmitted.
 * Subject: "Action Required: Documents Needed - DK Bank Application"
 * Figma: DK.Notif › "Notif - Bhutan Corp onboarding" (3209:4290), node
 * 3209:5231 — no status icon.
 *
 * The document list and "Reason:" are one paragraph on two lines.
 */
export interface DocumentResubmissionEmailProps {
  /** The applicant's first name. */
  firstName?: string;
  companyName?: string;
  /**
   * The rejected document type(s), already joined for display, e.g. "Board
   * Resolution, Account Mandate or Power of Attorney".
   */
  documentNames?: string;
  /** The reviewer's note, rendered in semibold after "Reason:". */
  reason?: string;
  portalUrl?: string;
  rfiEmail?: string;
}

export default function DocumentResubmissionEmail({
  firstName = "{First Name}",
  companyName = "{Company Name}",
  documentNames = "{List of Rejected Document Types}",
  reason = "{Resubmission Reason}",
  portalUrl = "https://onboarding.uat.digitalkidu.bt/auth/login",
  rfiEmail = RFI_EMAIL,
}: DocumentResubmissionEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear {firstName},</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Thank you for submitting {companyName}&rsquo;s application to open a corporate account with
        DK Bank.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Our team has reviewed the documents submitted and found that the following document(s)
        require resubmission:
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        {documentNames}
        <br />
        Reason: <strong style={emphasis}>{reason}</strong>
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please log back in to the onboarding portal to re-upload the required document(s).
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

DocumentResubmissionEmail.PreviewProps = {} satisfies DocumentResubmissionEmailProps;
