import { Text } from "@react-email/components";

import { EmailLayout, paragraph, paragraphDark, emphasis} from "../../components/layout.js";


export interface RecurringDepositDebitEmailProps {
  userName?: string;
  amount?: string;
}

export default function RecurringDepositDebitEmail({
  userName = "{User's Name}",
  amount = "{Amount}",
}: RecurringDepositDebitEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 20 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        As per your standing instruction, <strong style={emphasis}>{amount}</strong> has been debited from your
        current account and successfully deposited into your recurring Fixed Deposit.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

RecurringDepositDebitEmail.PreviewProps = {} satisfies RecurringDepositDebitEmailProps;