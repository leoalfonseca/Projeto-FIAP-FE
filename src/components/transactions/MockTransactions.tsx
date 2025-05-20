import { TransactionType } from "components/dashboards/modern/LastTransactionsData";

export const mockTransactions: TransactionType[] = [
  {
    id: '1',
    type: 'Entrada',
    time: '10:30',
    paymentMethod: 'Cartão de Crédito',
    value: '150.00'
  },
  {
    id: '2',
    type: 'Estorno',
    time: '14:00',
    paymentMethod: 'Pix',
    value: '75.00'
  },
  {
    id: '3',
    type: 'Assinatura',
    time: '09:45',
    paymentMethod: 'Boleto',
    value: '49.90'
  }
];
