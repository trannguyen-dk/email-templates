import { Text } from "@react-email/components";

import { EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Approver notification — the applicant's form was returned for revision.
 * The approver-side counterpart to `application-returned`.
 * Figma: DK.Notif › node 2464:4339, "Content" frame (343x630).
 */
export interface ApplicationReturnedApproverEmailProps {
  companyName?: string;
}

export default function ApplicationReturnedApproverEmail({
  companyName = "{Company Name}",
}: ApplicationReturnedApproverEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Approver,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        This is to inform you that the account opening application for{" "}
        <strong style={emphasis}>{companyName}</strong> has been returned to the applicant for
        revision following the approval review.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        We will notify you via email once the applicant has updated and resubmitted the application
        for your further review and approval.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationReturnedApproverEmail.PreviewProps = {
  companyName: "{Company Name}",
} satisfies ApplicationReturnedApproverEmailProps;
