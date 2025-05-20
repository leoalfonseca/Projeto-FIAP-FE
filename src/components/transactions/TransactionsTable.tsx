import { Box, Button, Grid } from '@mui/material';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import ptBRLocale from 'date-fns/locale/pt-BR';
import TransactionsRegisterForm from './TransactionsRegisterForm';
import { useEffect, useState } from 'react';
import EditTransactionForm from './EditTransactionForm';
import { useSelector } from 'react-redux';
import { AppState } from 'store/Store';
import { TransactionType } from 'components/dashboards/modern/LastTransactionsData';
import { IValueGetter } from 'types/valueGetter';
import CustomChip from 'components/CustomChip';
import { mockTransactions } from './MockTransactions';

const TransactionsTable = () => {

  const columns = [
    {
      field: 'type',
      headerName: 'Tipo',
      headerClassName: 'header',
      flex: 0.5,
      minWidth: 140,
      type: 'singleSelect',
      valueOptions: ['Entrada', 'Saída', 'Estorno', 'Assinatura'],
      renderCell: (params: any) => (
        <Box>
          {params.value === 'Entrada' ? (
            <CustomChip label="Entrada" type="success" />
          ) : params.value === 'Saída' ? (
            <CustomChip label="Saída" type="error" />
          ) : params.value === 'Estorno' ? (
            <CustomChip label="Estorno" type="warning" />
          ) : params.value === 'Assinatura' ? (
            <CustomChip label="Assinatura" type="primary" />
          ) : null}
        </Box>
      ),
    },
    {
      field: 'time',
      headerName: 'Hora da Transação',
      headerClassName: 'header',
      flex: 1,
    },
    {
      field: 'paymentMethod',
      headerName: 'Tipo de Pagamento',
      headerClassName: 'header',
      flex: 1,
    },
    {
      field: 'value',
      headerName: 'Valor',
      headerClassName: 'header',
      flex: 1,
      valueGetter: (params: IValueGetter) => {
        return 'R$ ' + params.value;
      },
    },

    {
      field: 'actions',
      headerName: 'Ações',
      flex: 1,
      type: 'actions',
      minWidth: 240,
      headerClassName: 'header',
      renderCell: (params: { row: any }) => (
        <Box>
          <Button
            startIcon={<IconEdit />}
            onClick={() => handleEdit(params.row.id)}
            sx={
              customizer.activeMode === 'dark'
                ? {
                  color: '#EAEFF4',
                  mr: 0.8,
                  '&:hover': {
                    color: '#EAEFF4',
                  },
                  '& .MuiButton-startIcon': {
                    margin: 'auto',
                  },
                }
                : {
                  color: '#ffffff',
                  mr: 0.8,
                  '&:hover': {
                    backgroundColor: '#4261b7',
                    color: '#ffffff',
                  },
                  '& .MuiButton-startIcon': {
                    margin: 'auto',
                  },
                }
            }
          />
          <Button onClick={() => handleDeleteTransaction(params.row.id)} color="error">
            <IconTrash />
          </Button>
        </Box>
      ),
    },
  ];

  const [rows, setRows] = useState<TransactionType[]>([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<TransactionType | null>(null);
  const customizer = useSelector((state: AppState) => state.customizer);

  const handleOpen = () => setOpen(true);

  const handleOpenEdit = async () => {
    try {
      setOpenEdit(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEdit(false);
  };

  const getTransactions = async () => {
    setRows(mockTransactions);
  };

  const handleEdit = (id: string) => {
    const objToEdit = rows.find((transaction) => transaction.id === id);

    if (objToEdit) {
      setEditingTransaction(objToEdit);
      handleOpenEdit();
    }
  };

  const handleConfirmEdit = (id: string, data: Partial<TransactionType>) => {
    const updated = rows.map((transaction) =>
      transaction.id === id ? { ...transaction, ...data } : transaction
    );
    setRows(updated);
  };


  const handleDeleteTransaction = (id: string) => {
    setRows((prevRows) => prevRows.filter((transaction) => transaction.id !== id));
  };


  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={ptBRLocale}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            display={'flex'}
            alignItems={'right'}
            justifyContent={'right'}
            marginRight={5}
          >
            <Button
              onClick={handleOpen}
              startIcon={<IconPlus />}
              sx={
                customizer.activeMode === 'dark'
                  ? {
                    color: '#EAEFF4',
                    '&:hover': {
                      color: '#EAEFF4',
                    },
                    '& .MuiButton-startIcon': {
                      margin: 'auto',
                    },
                  }
                  : {
                    color: '#ffffff',
                    '&:hover': {
                      color: '#ffffff',
                    },
                    '& .MuiButton-startIcon': {
                      margin: 'auto',
                    },
                  }
              }
            >
              Adicionar Novo
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box
            height={350}
            width="100%"
            paddingX={5}
            sx={{
              '& .header': {
                backgroundColor: 'primary',
              },
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              hideFooterSelectedRowCount
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 10 },
                },
              }}
              autoHeight
              pageSizeOptions={[5, 10, 50, 100]}
              sx={{
                border: 1,
                borderColor: 'divider',
                '& .MuiDataGrid-cell': {
                  border: 1,
                  borderColor: 'divider',
                  ':focus': {
                    outline: 'none',
                  },
                  cursor: 'default',
                },
              }}
              localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
            />
          </Box>
        </Grid>
      </Grid>

      <TransactionsRegisterForm open={open} handleClose={handleClose} onHandleTransaction={(transaction) => setRows([...rows, transaction])} />
      <EditTransactionForm
        open={openEdit}
        handleClose={handleClose}
        transaction={editingTransaction}
        onHandleEdit={handleConfirmEdit}
      />
    </LocalizationProvider>
  );
};

export default TransactionsTable;
