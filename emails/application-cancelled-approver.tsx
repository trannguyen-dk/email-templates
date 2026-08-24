import { Text } from "@react-email/components";

import { EmailLayout, ICONS_CDN, paragraphDark } from "../components/layout.js";

/**
 * Approver notification — the applicant cancelled the onboarding application.
 * Figma: DK.Notif › node 1389:7986, "Email content" frame.
 */
export interface ApplicationCancelledApproverEmailProps {
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  year?: number;
}

export default function ApplicationCancelledApproverEmail({
  supportEmail,
  helpUrl,
  privacyUrl,
  year,
}: ApplicationCancelledApproverEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-cancelled.png`}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraphDark, marginTop: 20 }}>Dear Approver,</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>
        We would like to inform you that the onboarding application for your company has been
        cancelled by the applicant.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 12 }}>
        No further action is required from you at this time.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>
        Thank you for your interest in DK Bank.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationCancelledApproverEmail.PreviewProps =
  {} satisfies ApplicationCancelledApproverEmailProps;
