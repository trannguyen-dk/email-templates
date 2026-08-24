import { Text } from "@react-email/components";

import { EmailLayout, ICONS_CDN, paragraphDark } from "../components/layout.js";

/**
 * Applicant/approver notification — the onboarding application was cancelled.
 * Figma: DK.Notif › node 1390:8390, "Email content" frame.
 */
export interface ApplicationCancelledEmailProps {
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  year?: number;
}

export default function ApplicationCancelledEmail({
  supportEmail,
  helpUrl,
  privacyUrl,
  year,
}: ApplicationCancelledEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-cancelled.png`}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraphDark, marginTop: 20 }}>Dear Applicant/Approver,</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>
        We would like to inform you that your onboarding application with DK Bank has been
        cancelled.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 12 }}>
        If you believe this cancellation was made in error or if you require further clarification,
        please contact your Relationship Manager or our Customer Service team for assistance.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>We appreciate your understanding.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>
        Thank you for your interest in DK Bank
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationCancelledEmail.PreviewProps = {} satisfies ApplicationCancelledEmailProps;
