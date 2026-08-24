import { Link, Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import {
  EmailLayout,
  SUPPORT_EMAIL,
  heading,
  inlineLink,
  paragraph,
  paragraphDark,
} from "../../components/layout.js";

/**
 * Corporate account successfully opened — welcome / first log-in.
 * Figma: DK.Notif › node 2464:4707, "Content" frame.
 *
 * UNVERIFIED against the frame — the Figma MCP was unreachable when this was
 * written, so the copy is carried verbatim from the superseded node 1393:8505
 * and the spacing/colour follow CONVENTIONS.md. Two things to re-check once
 * Figma is reachable: the wording, and whether the frame keeps the `success`
 * status icon.
 */
export interface AccountOpenedEmailProps {
  portalUrl?: string;
  supportEmail?: string;
}

export default function AccountOpenedEmail({
  portalUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
  supportEmail = SUPPORT_EMAIL,
}: AccountOpenedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success.png">
      <Text style={{ ...heading, marginTop: 16 }}>Congratulations!</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your DK Bank corporate account has been successfully opened. Welcome aboard.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        You can now log in to the DK Bank Corporate Banking Portal to access your account and start
        using our services.
      </Text>

      <Button href={portalUrl}>
        Go to DK Bank portal
      </Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        For your first time log-in, please click &ldquo;Set up account&rdquo; when you access the
        internet banking portal, then follow the steps to set up your account.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        For any questions or assistance, please contact us at{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>
        .
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you and welcome to DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

AccountOpenedEmail.PreviewProps = {} satisfies AccountOpenedEmailProps;
