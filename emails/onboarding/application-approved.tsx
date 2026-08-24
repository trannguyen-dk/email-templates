import { Text } from "@react-email/components";

import { EmailLayout, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Applicant notification — signed off by all approvers, in final processing.
 * Figma: DK.Notif › node 2464:4144, "Content" frame.
 *
 * UNVERIFIED against the frame — the Figma MCP was unreachable when this was
 * written. The copy is carried verbatim from the superseded node 1349:8215;
 * spacing and colour follow CONVENTIONS.md. Two judgement calls to re-check:
 * the body is split after "…final processing at DK Bank." (node 2464:3892 got
 * the same treatment for the same two-sentence shape), and the frame is
 * assumed to keep a status icon (node 2464:4339 dropped its off-spec one).
 */
export interface ApplicationApprovedEmailProps {
}

export default function ApplicationApprovedEmail({
}: ApplicationApprovedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your account opening form has been signed off by all approvers and is now going through
        final processing at DK Bank.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>We will contact you once it’s complete.</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationApprovedEmail.PreviewProps = {} satisfies ApplicationApprovedEmailProps;
