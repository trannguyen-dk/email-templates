import { Link, Text } from "@react-email/components";

import { CtaButton } from "../components/cta-button.js";
import {
  EmailLayout,
  ICONS_CDN,
  SUPPORT_EMAIL,
  heading,
  inlineLink,
  paragraphDark,
} from "../components/layout.js";

/**
 * Corporate account successfully opened — welcome / first log-in.
 * Figma: DK.Notif › node 1393:8505, "Email content" frame.
 */
export interface AccountOpenedEmailProps {
  portalUrl?: string;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  /** Base URL where the files in `static/` are hosted (no trailing slash). */
  assetBaseUrl?: string;
  year?: number;
}

export default function AccountOpenedEmail({
  portalUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
  supportEmail = SUPPORT_EMAIL,
  helpUrl,
  privacyUrl,
  assetBaseUrl,
  year,
}: AccountOpenedEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-success.png`}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...heading, marginTop: 20 }}>Congratulations!</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>
        Your DK Bank corporate account has been successfully opened. Welcome aboard.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 12 }}>
        You can now log in to the DK Bank Corporate Banking Portal to access your account and start
        using our services.
      </Text>

      <CtaButton href={portalUrl} assetBaseUrl={assetBaseUrl}>
        Go to DK Bank portal
      </CtaButton>

      <Text style={{ ...paragraphDark, marginTop: 0 }}>
        For your first time log-in, please click &ldquo;Set up account&rdquo; when you access the
        internet banking portal, then follow the steps to set up your account.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>
        For any questions or assistance, please contact us at{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>
        .
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Thank you and welcome to DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

AccountOpenedEmail.PreviewProps = {} satisfies AccountOpenedEmailProps;
