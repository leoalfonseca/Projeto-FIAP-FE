import { Grid } from '@mui/material';

import RevenueUpdates from 'components/dashboards/modern/RevenueUpdates';
import LastTransactions from 'components/dashboards/modern/LastTransactions';
import Transactions from 'components/dashboards/modern/Transactions';
import MonthlyEarnings from 'components/dashboards/modern/MonthlyEarnings';
import YearlyBreakup from 'components/dashboards/modern/YearlyBreakup';
import { useSelector } from 'store/Store';

const Modern = () => {
  const widgets = useSelector((state) => state.widgets);

  return (
    <Grid container spacing={3}>
      {widgets.revenueUpdates && (
        <Grid item xs={12} lg={8}><RevenueUpdates /></Grid>
      )}
      {widgets.transactions && (
        <Grid item xs={12} lg={4}><Transactions /></Grid>
      )}
      {widgets.monthlyEarnings && (
        <Grid item xs={12} lg={8}><MonthlyEarnings /></Grid>
      )}
      {widgets.yearlyBreakup && (
        <Grid item xs={12} lg={4}><YearlyBreakup /></Grid>
      )}
      {widgets.lastTransactions && (
        <Grid item xs={24} lg={12}><LastTransactions /></Grid>
      )}
    </Grid>
  );
};

export default Modern;
