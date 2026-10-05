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
 * Related-party notification — sent to each related party listed on the
 * application to start their identity verification (ID&V).
 * Subject: "Please Verify Your Profile - DK Bank"
 * Figma: Corporate-Onboarding-Portal › node 6009:13349, "Related Party ID&V
 * Submission - Email Sheet" (desktop 6006:12171, mobile 6006:12275) — pending icon.
 *
 * Addressed to the related party, not the applicant. The CTA is their personal
 * verification link, so it is a per-record `{url}` token rather than the portal.
 */
export interface RelatedPartyIdvSubmissionEmailProps {
  relatedPartyName?: string;
  companyName?: string;
  /** The related party's personal ID&V link. */
  verificationUrl?: string;
  rfiEmail?: string;
}

export default function RelatedPartyIdvSubmissionEmail({
  relatedPartyName = "{Related Party Name}",
  companyName = "{Company Name}",
  verificationUrl = "{url}",
  rfiEmail = RFI_EMAIL,
}: RelatedPartyIdvSubmissionEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-pending-v2.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear {relatedPartyName},</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        {companyName} has submitted an application to open a corporate account with DK Bank, and
        you have been listed as a related party on this application.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        To proceed, we kindly ask you to verify your identity by completing a short online process.
        This includes uploading a copy of your identification document and completing a quick
        photo/liveness check.
      </Text>

      <Button href={verificationUrl} spacing={16}>
        Verify My Identity
      </Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        This link is personal to you and should not be shared with anyone else.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        If you did not expect this email or believe it was sent to you in error, please contact us
        at{" "}
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

RelatedPartyIdvSubmissionEmail.PreviewProps = {} satisfies RelatedPartyIdvSubmissionEmailProps;
