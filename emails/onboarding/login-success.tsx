import { Link, Text } from "@react-email/components";

import {
  EmailLayout,
  SUPPORT_EMAIL,
  emphasis,
  inlineLink,
  paragraph,
  paragraphDark,
} from "../../components/layout.js";

/**
 * Security alert fired on every successful login to the DK Onboarding Portal.
 * Requested in Slack (#C0B1QDSKPP1); there is no Figma frame yet, so the
 * layout follows the shared shell and the other onboarding notifications.
 *
 * No status icon — like `otp`, the copy follows straight on from the logo.
 * The logo is passed at 98x31, the hosted asset's true ratio (176x56); the
 * shared 98x28 default squashes it. Other templates keep the default for now.
 */
export interface LoginSuccessEmailProps {
  userName?: string;
  /** When the login happened, already formatted for display. */
  dateTime?: string;
  supportEmail?: string;
}

export default function LoginSuccessEmail({
  userName = "{User's Name}",
  dateTime = "{date_time}",
  supportEmail = SUPPORT_EMAIL,
}: LoginSuccessEmailProps) {
  return (
    <EmailLayout logoSize={{ width: 98, height: 31 }}>
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear {userName},</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        A new login to your DK Onboarding Portal account was made on{" "}
        <strong style={emphasis}>{dateTime}</strong>.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        If this was you, no further action is needed.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        If you did not initiate this login, please contact our customer support team immediately
        at{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>
        .
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

LoginSuccessEmail.PreviewProps = {} satisfies LoginSuccessEmailProps;
