import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  Select,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers';
import GenericModal from 'components/genericModal/baseModal';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { TransactionType } from 'components/dashboards/modern/LastTransactionsData';
import * as yup from 'yup';
import { format } from 'date-fns';

interface EditTransactionFormProps {
  open: boolean;
  handleClose: () => void;
  transaction: TransactionType | null;
  onHandleEdit: (id: string, data: Partial<TransactionType>) => void;
}

const EditTransactionForm = ({
  open,
  handleClose,
  transaction,
  onHandleEdit,
}: EditTransactionFormProps) => {
  const [initialValues, setInitialValues] = useState<TransactionType>({
    id: '',
    type: '',
    time: '',
    value: '',
    paymentMethod: '',
  });

  const schemaTransactions = yup.object({
    type: yup.string().required('Campo obrigatório'),
    time: yup.date().required('Campo obrigatório'),
    value: yup.string().required('Campo obrigatório'),
    paymentMethod: yup.string().required('Campo obrigatório'),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: schemaTransactions,
    enableReinitialize: true,
    onSubmit: (values) => {

      values.time = format(new Date(values.time), 'HH:mm');
      values.value = values.value.replace(/[^\d,]/g, '').replace(',', '.');

      if (transaction) {
        const changes: Partial<TransactionType> = {};
        for (const key of Object.keys(values) as (keyof TransactionType)[]) {
          if (values[key] !== transaction[key]) {
            changes[key] = values[key];
          }
        }

        if (Object.keys(changes).length > 0) {
          onHandleEdit(transaction.id, changes);
          handleCloseAndClear();
        } else {
          toast.error('Nenhuma alteração foi feita!');
        }
      }
    },
  });

  const handleCloseAndClear = () => {
    handleClose();
    formik.resetForm();
  };

useEffect(() => {
  if (transaction) {
    const [hours, minutes] = transaction.time.split(':').map(Number);
    const dateWithTime = new Date();
    dateWithTime.setHours(hours, minutes, 0, 0);

    setInitialValues({
      ...transaction,
      time: dateWithTime.toISOString(),
    });
  }
}, [transaction]);


  return (
    <GenericModal
      isLoading={false}
      handleClose={handleCloseAndClear}
      formikhandleSubmit={formik.handleSubmit}
      isOpen={open}
      title="Editar Transação"
    >
      <Grid container spacing={3} sx={{ marginTop: '10px' }}>
        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="type" htmlFor="type">
              Tipo *
            </InputLabel>
            <Select
              label="Tipo *"
              labelId="type"
              id="type"
              {...formik.getFieldProps('type')}
              error={formik.touched.type && Boolean(formik.errors.type)}
            >
              <MenuItem value="Entrada">Entrada</MenuItem>
              <MenuItem value="Saída">Saída</MenuItem>
              <MenuItem value={'Estorno'}>Estorno</MenuItem>
              <MenuItem value={'Assinatura'}>Assinatura</MenuItem>
            </Select>
            <Typography color="error">
              {formik.touched.type && formik.errors.type}
            </Typography>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Valor *"
            fullWidth
            id="value"
            name="value"
            value={formik.values.value}
            onChange={(e) => {
              const rawValue = e.target.value.replace(/\D/g, '');
              const numeric = Number(rawValue) / 100;
              const formatted = numeric.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              });
              formik.setFieldValue('value', formatted);
            }}
            error={formik.touched.value && Boolean(formik.errors.value)}
          />
          <Typography color="error">
            {formik.touched.value && formik.errors.value}
          </Typography>
        </Grid>

         <Grid item xs={12}>
          <FormControl fullWidth>
            <TimePicker
              label="Hora *"
              value={formik.values.time ? new Date(formik.values.time) : null}
              onChange={(value) => {
                formik.setFieldValue('time', value?.toISOString());
              }}
            />
            <Typography color="error">
              {formik.touched.time && formik.errors.time}
            </Typography>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="paymentMethod" htmlFor="paymentMethod">
              Forma de Pagamento *
            </InputLabel>
            <Select
              label="Forma de Pagamento *"
              labelId="paymentMethod"
              id="paymentMethod"
              {...formik.getFieldProps('paymentMethod')}
              error={
                formik.touched.paymentMethod &&
                Boolean(formik.errors.paymentMethod)
              }
            >
              <MenuItem value="Pix">PIX</MenuItem>
              <MenuItem value="Cartão de Crédito">Cartão de Crédito</MenuItem>
              <MenuItem value="Boleto">Boleto</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </Select>
            <Typography color="error">
              {formik.touched.paymentMethod && formik.errors.paymentMethod}
            </Typography>
          </FormControl>
        </Grid>
      </Grid>
    </GenericModal>
  );
};

export default EditTransactionForm;
