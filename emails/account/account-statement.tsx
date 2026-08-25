import { Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import { EmailLayout, paragraph, paragraphDark } from "../../components/layout.js";


export interface StatementAvailableEmailProps {
  userName?: string;
  accountNumber?: string;
  dateRange?: string;
  portalUrl?: string;
}

export default function StatementAvailableEmail({
  userName = "{User's Name}",
  accountNumber = "{account_number}",
  dateRange = "{date_range}",
  portalUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
}: StatementAvailableEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 20 }}>
        Dear <strong>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your account statement for account <strong>{accountNumber}</strong> for the period{" "}
        <strong>{dateRange}</strong> is now available for download on the DK Business Portal.
      </Text>

      <Button href={portalUrl}>Go to DK Bank portal</Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

StatementAvailableEmail.PreviewProps = {} satisfies StatementAvailableEmailProps;