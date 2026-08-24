import { Link, Text } from "@react-email/components";

import {
  EmailLayout,
  ICONS_CDN,
  SUPPORT_EMAIL,
  paragraph,
  paragraphDark,
} from "../components/layout.js";

/**
 * Applicant/approver notification — declined by an approver.
 * Figma: DK.Notif › node 1349:8337, "Email content" frame.
 */
export interface ApplicationDeclinedEmailProps {
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  year?: number;
}

export default function ApplicationDeclinedEmail({
  supportEmail = SUPPORT_EMAIL,
  helpUrl,
  privacyUrl,
  year,
}: ApplicationDeclinedEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-blocked.png`}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraph, marginTop: 20 }}>Dear Applicant/Approver,</Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>
        Your account opening form has been declined by one of the approvers, and DK Bank will not be
        proceeding with this application.
      </Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>
        If you have any questions, please contact our support team at{" "}
        <Link
          href={`mailto:${supportEmail}`}
          style={{ color: paragraph.color, textDecoration: "underline" }}
        >
          {supportEmail}
        </Link>
      </Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>Thank you for your interest in DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationDeclinedEmail.PreviewProps = {} satisfies ApplicationDeclinedEmailProps;
