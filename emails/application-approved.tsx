import { Text } from "@react-email/components";

import { EmailLayout, ICONS_CDN, paragraph, paragraphDark } from "../components/layout.js";

/**
 * Applicant notification — signed off by all approvers, in final processing.
 * Figma: DK.Notif › node 1349:8215, "Email content" frame.
 */
export interface ApplicationApprovedEmailProps {
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  year?: number;
}

export default function ApplicationApprovedEmail({
  supportEmail,
  helpUrl,
  privacyUrl,
  year,
}: ApplicationApprovedEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-success.png`}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraph, marginTop: 20 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 20 }}>
        Your account opening form has been signed off by all approvers and is now going through
        final processing at DK Bank. We will contact you once it’s complete.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 4 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationApprovedEmail.PreviewProps = {} satisfies ApplicationApprovedEmailProps;
