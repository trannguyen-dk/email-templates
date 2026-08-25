import { Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import { EmailLayout, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Corporate account successfully opened — welcome / first log-in.
 * Figma: DK.Notif › node 2464:4707, "Content" frame — success icon.
 *
 * The set-up instruction sits above the CTA, not below it: it is a
 * precondition for the click, so the frame puts it where it is read first.
 *
 * The greeting is the literal "Dear Customer," — this one goes out before
 * there is a named user to address.
 */
export interface AccountOpenedEmailProps {
  portalUrl?: string;
}

export default function AccountOpenedEmail({
  portalUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
}: AccountOpenedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Customer,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your DK Bank Business account has been successfully opened. Welcome aboard!
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        For your first time log-in, please click &ldquo;Set up account&rdquo; when you access the
        internet banking portal, then follow the steps to set up your account.
      </Text>

      <Button href={portalUrl}>Go to DK Business portal</Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you and welcome to DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

AccountOpenedEmail.PreviewProps = {} satisfies AccountOpenedEmailProps;
