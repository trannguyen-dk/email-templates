import { Link, Text } from "@react-email/components";

import {
  EmailLayout,
  SUPPORT_EMAIL,
  inlineLink,
  paragraph,
  paragraphDark,
} from "../../components/layout.js";

/**
 * Applicant/approver notification — declined by an approver.
 * Figma: DK.Notif › node 2464:4427, "Content" frame.
 *
 * UNVERIFIED against the frame — the Figma MCP was unreachable when this was
 * written, so the copy is carried verbatim from the superseded node 1349:8337
 * and the spacing/colour follow CONVENTIONS.md. Two things to re-check once
 * Figma is reachable: the wording, and whether the frame shows a status icon
 * at all (node 2464:4339 dropped its icon in this same batch).
 */
export interface ApplicationDeclinedEmailProps {
  supportEmail?: string;
}

export default function ApplicationDeclinedEmail({
  supportEmail = SUPPORT_EMAIL,
}: ApplicationDeclinedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-blocked.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Applicant / Approver,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your account opening form has been declined by one of the approvers, and DK Bank will not be
        proceeding with this application.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        If you have any questions, please contact our support team at{" "}
        <Link href={`mailto:${supportEmail}`} style={inlineLink}>
          {supportEmail}
        </Link>
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for your interest in DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationDeclinedEmail.PreviewProps = {} satisfies ApplicationDeclinedEmailProps;
