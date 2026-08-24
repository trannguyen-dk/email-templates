import { Link, Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import {
  EmailLayout,
  SUPPORT_EMAIL,
  inlineLink,
  paragraph,
  paragraphDark,
} from "../../components/layout.js";

/**
 * Account opening application returned for revision by an approver.
 * The applicant-side counterpart to `application-returned-approver`.
 * Figma: DK.Notif › node 2464:4246, "Content" frame — no status icon.
 */
export interface ApplicationReturnedApplicantEmailProps {
  portalUrl?: string;
  supportEmail?: string;
}

export default function ApplicationReturnedApplicantEmail({
  portalUrl = "https://onboarding.uat.digitalkidu.bt/auth/login",
  supportEmail = SUPPORT_EMAIL,
}: ApplicationReturnedApplicantEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        One of the approvers has returned your account opening form for revision.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please return to the onboarding portal to review and update the application.
      </Text>

      <Button href={portalUrl}>
        Go to onboarding portal
      </Button>

      <Text style={{ ...paragraphDark, marginTop: 0 }}>
        If you need any help, please contact our support team at{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationReturnedApplicantEmail.PreviewProps =
  {} satisfies ApplicationReturnedApplicantEmailProps;
