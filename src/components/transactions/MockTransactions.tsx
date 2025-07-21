
export interface TransactionType {
  id: string;
  type: string;
  time: string;
  paymentMethod: string;
  value: string;
  attachment?: File | null;
}

export const mockTransactions: TransactionType[] = [
  { id: '1', type: 'Entrada', time: '08:12', paymentMethod: 'PIX', value: '3.250,00' },
  { id: '2', type: 'Saída', time: '13:53', paymentMethod: 'Boleto', value: '1.500,00' },
  { id: '3', type: 'Saída', time: '10:25', paymentMethod: 'Cartão de Crédito', value: '2.000,00' },
  { id: '4', type: 'Saída', time: '07:32', paymentMethod: 'PIX', value: '150,00' },
  { id: '5', type: 'Entrada', time: '09:45', paymentMethod: 'Cartão de Débito', value: '850,00' },
  { id: '6', type: 'Saída', time: '15:10', paymentMethod: 'Boleto', value: '900,00' },
  { id: '7', type: 'Entrada', time: '11:20', paymentMethod: 'PIX', value: '1.200,00' },
  { id: '8', type: 'Saída', time: '16:30', paymentMethod: 'Cartão de Crédito', value: '300,00' },
  { id: '9', type: 'Entrada', time: '17:40', paymentMethod: 'PIX', value: '500,00' },
  { id: '10', type: 'Entrada', time: '18:50', paymentMethod: 'Boleto', value: '2.700,00' },
  { id: '11', type: 'Saída', time: '19:15', paymentMethod: 'Cartão de Débito', value: '400,00' },
  { id: '12', type: 'Entrada', time: '20:05', paymentMethod: 'PIX', value: '950,00' },
  { id: '13', type: 'Saída', time: '21:10', paymentMethod: 'PIX', value: '720,00' },
  { id: '14', type: 'Entrada', time: '22:00', paymentMethod: 'Cartão de Crédito', value: '1.800,00' },
  { id: '15', type: 'Saída', time: '06:30', paymentMethod: 'Boleto', value: '2.300,00' },
  { id: '16', type: 'Entrada', time: '12:00', paymentMethod: 'Cartão de Débito', value: '1.000,00' },
  { id: '17', type: 'Saída', time: '13:00', paymentMethod: 'PIX', value: '110,00' },
  { id: '18', type: 'Entrada', time: '14:10', paymentMethod: 'PIX', value: '1.500,00' },
  { id: '19', type: 'Saída', time: '15:45', paymentMethod: 'Cartão de Crédito', value: '680,00' },
  { id: '20', type: 'Entrada', time: '16:55', paymentMethod: 'Boleto', value: '2.250,00' },
];
