import { Text } from "@react-email/components";

import { EmailLayout, ICONS_CDN, emphasis, paragraphDark } from "../components/layout.js";

/**
 * Approver notification — the applicant's form was returned for revision.
 * Figma: DK.Notif › node 1380:7603, "Email content" frame.
 */
export interface ApplicationReturnedApproverEmailProps {
  companyName?: string;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  year?: number;
}

export default function ApplicationReturnedApproverEmail({
  companyName = "{Company Name}",
  supportEmail,
  helpUrl,
  privacyUrl,
  year,
}: ApplicationReturnedApproverEmailProps) {
  return (
    <EmailLayout
      statusIconUrl={`${ICONS_CDN}/icon-warning.png`}
      statusIconSize={84}
      supportEmail={supportEmail}
      helpUrl={helpUrl}
      privacyUrl={privacyUrl}
      year={year}
    >
      <Text style={{ ...paragraphDark, marginTop: 20 }}>Dear Approver,</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>
        This is to inform you that the account opening application for{" "}
        <strong style={emphasis}>{companyName}</strong> has been returned to the applicant for
        revision following the approval review.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 12 }}>
        We will notify you via email once the applicant has updated and resubmitted the application
        for your further review and approval.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationReturnedApproverEmail.PreviewProps = {
  companyName: "{Company Name}",
} satisfies ApplicationReturnedApproverEmailProps;
