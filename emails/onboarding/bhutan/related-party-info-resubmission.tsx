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
 * Applicant notification — the reviewer has asked for the related party
 * information on the application to be updated.
 * Subject: "Action Required: Related Party Information Update - DK Bank Application"
 * Figma: DK.Notif › "Notif - Bhutan Corp onboarding" (3209:4290), node
 * 3209:5327 — no status icon.
 */
export interface RelatedPartyInfoResubmissionEmailProps {
  /** The applicant's first name. */
  firstName?: string;
  companyName?: string;
  /** The reviewer's note, rendered in semibold after "Reason:". */
  reason?: string;
  portalUrl?: string;
  rfiEmail?: string;
}

export default function RelatedPartyInfoResubmissionEmail({
  firstName = "{First Name}",
  companyName = "{Company Name}",
  reason = "{Resubmission Reason}",
  portalUrl = "https://onboarding.uat.digitalkidu.bt/auth/login",
  rfiEmail = RFI_EMAIL,
}: RelatedPartyInfoResubmissionEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear {firstName},</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Thank you for submitting {companyName}&rsquo;s application to open a corporate account with
        DK Bank.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Our team has reviewed the related party information you submitted and found that some
        details require your attention.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
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

RelatedPartyInfoResubmissionEmail.PreviewProps =
  {} satisfies RelatedPartyInfoResubmissionEmailProps;
