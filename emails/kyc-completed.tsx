import { Link, Text } from "@react-email/components";

import { CtaButton } from "../components/cta-button.js";
import {
  EmailLayout,
  ICONS_CDN,
  SUPPORT_EMAIL,
  inlineLink,
  paragraph,
  paragraphDark,
} from "../components/layout.js";

/**
 * "Form Approved" — company KYC completed.
 * Figma: DK.Notif › Form Approved (node 1347:7090), "Email content" frame.
 */
export interface KycCompletedEmailProps {
  companyName?: string;
  continueUrl?: string;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  /** Base URL where the files in `static/` are hosted (no trailing slash). */
  assetBaseUrl?: string;
  year?: number;
}

export default function KycCompletedEmail({
  companyName = "{Company Name}",
  continueUrl = "https://example.com/onboarding",
  supportEmail = SUPPORT_EMAIL,
  helpUrl,
  privacyUrl,
  assetBaseUrl = "static",
  year,
}: KycCompletedEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-success.png`}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraph, marginTop: 20 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>
        The KYC verification of {companyName} has been successfully completed.
      </Text>

      <Text style={{ ...paragraph, marginTop: 12 }}>
        Please return to the onboarding portal to finish your account opening form.
      </Text>

      <CtaButton href={continueUrl} assetBaseUrl={assetBaseUrl}>
        Continue onboarding
      </CtaButton>

      <Text style={{ ...paragraphDark, marginTop: 0 }}>
        If you need any help, please contact our support team at{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 4 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

KycCompletedEmail.PreviewProps = {
  companyName: "{Company Name}",
} satisfies KycCompletedEmailProps;
