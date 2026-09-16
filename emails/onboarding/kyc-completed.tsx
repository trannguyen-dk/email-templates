import { Link, Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import {
  EmailLayout,
  SUPPORT_EMAIL,
  emphasis,
  inlineLink,
  paragraph,
  paragraphDark,
} from "../../components/layout.js";

/**
 * "Form Approved" — company KYC completed.
 * Figma: DK.Notif › node 2456:3654, "corp-onboarding / KYC-complete" —
 * success icon.
 */
export interface KycCompletedEmailProps {
  companyName?: string;
  continueUrl?: string;
  supportEmail?: string;
}

export default function KycCompletedEmail({
  companyName = "{Company Name}",
  continueUrl = "https://onboarding.uat.digitalkidu.bt/auth/login",
  supportEmail = SUPPORT_EMAIL,
}: KycCompletedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success-v2.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        The KYC verification of <strong style={emphasis}>{companyName}</strong> has been
        successfully completed.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please return to the onboarding portal to finish your account opening form.
      </Text>

      <Button href={continueUrl}>
        Continue onboarding
      </Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        If you need any help, please contact our support team at{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

KycCompletedEmail.PreviewProps = {
  companyName: "{Company Name}",
} satisfies KycCompletedEmailProps;
