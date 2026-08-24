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
 * Account opening application returned for revision by an approver.
 * Figma: DK.Notif › node 1349:8051, "Email content" frame.
 */
export interface ApplicationReturnedEmailProps {
  portalUrl?: string;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  /** Base URL where the files in `static/` are hosted (no trailing slash). */
  assetBaseUrl?: string;
  year?: number;
}

export default function ApplicationReturnedEmail({
  portalUrl = "https://onboarding.uat.digitalkidu.bt",
  supportEmail = SUPPORT_EMAIL,
  helpUrl,
  privacyUrl,
  assetBaseUrl,
  year,
}: ApplicationReturnedEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-warning.png`}
      statusIconSize={84}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraph, marginTop: 20 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>
        One of the approvers has returned your account opening form for revision.
      </Text>

      <Text style={{ ...paragraph, marginTop: 12 }}>
        Please return to the onboarding portal to review and update the application.
      </Text>

      <CtaButton href={portalUrl} assetBaseUrl={assetBaseUrl}>
        Go to onboarding portal
      </CtaButton>

      <Text style={{ ...paragraphDark, marginTop: 0 }}>
        If you need any help, please contact our support team at{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>We appreciate your cooperation.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationReturnedEmail.PreviewProps = {} satisfies ApplicationReturnedEmailProps;
