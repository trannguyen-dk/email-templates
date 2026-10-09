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
 * Related-party notification — the reviewer has asked the related party to
 * complete their identity verification (ID&V) again.
 * The retry counterpart to `related-party-idv-submission`.
 * Subject: "Action Required: Re-verify Your Profile – DK Bank Application"
 * Figma: DK.Notif › "Notif - Bhutan Corp onboarding" (3209:4290), node
 * 3209:5596 — no status icon.
 *
 * The subject's en dash is verbatim from the frame; the other onboarding
 * subjects use a hyphen.
 */
export interface RelatedPartyIdvResubmissionEmailProps {
  /** The related party's first name. */
  firstName?: string;
  companyName?: string;
  /** The reviewer's note, rendered in semibold after "Reason:". */
  reason?: string;
  /** The related party's personal ID&V link. */
  verificationUrl?: string;
  rfiEmail?: string;
}

export default function RelatedPartyIdvResubmissionEmail({
  firstName = "{First Name}",
  companyName = "{Company Name}",
  reason = "{Resubmission Reason}",
  verificationUrl = "{url}",
  rfiEmail = RFI_EMAIL,
}: RelatedPartyIdvResubmissionEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear {firstName},</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        We were unable to complete your identity verification for {companyName}&rsquo;s
        application with DK Bank.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Reason: <strong style={emphasis}>{reason}</strong>
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please use the link below to complete the verification again.
      </Text>

      <Button href={verificationUrl} spacing={16}>
        Re-verify my identity
      </Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        This link is personal to you and should not be shared with anyone else.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
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

RelatedPartyIdvResubmissionEmail.PreviewProps = {} satisfies RelatedPartyIdvResubmissionEmailProps;
