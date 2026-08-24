import { Text } from "@react-email/components";

import { EmailLayout, ICONS_CDN, paragraph, paragraphDark } from "../components/layout.js";

/**
 * Application received — pending review by the company's approver(s).
 * Figma: DK.Notif › node 1370:6946, "Email content" frame.
 */
export interface ApplicationPendingEmailProps {
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  year?: number;
}

export default function ApplicationPendingEmail({
  supportEmail,
  helpUrl,
  privacyUrl,
  year,
}: ApplicationPendingEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-pending.png`}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraph, marginTop: 20 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>
        Your application has been successfully received and is currently pending review by your
        company’s designated approver(s). You will be notified once the review process is complete
        or if any further action is required from your side.
      </Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>Thank you for your interest in DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationPendingEmail.PreviewProps = {} satisfies ApplicationPendingEmailProps;
