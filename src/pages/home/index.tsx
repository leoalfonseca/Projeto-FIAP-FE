import { Box, Grid } from '@mui/material';
import PageContainer from 'components/container/PageContainer';
import NewTransaction from 'components/dashboards/modern/NewTransaction';

import RevenueUpdates from 'components/dashboards/modern/RevenueUpdates';
import LastTransactions from 'components/dashboards/modern/LastTransactions';
import Transactions from 'components/dashboards/modern/Transactions';
import Head from 'next/head';

const Modern = () => {
  return (
    <PageContainer>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <RevenueUpdates />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Transactions />
          </Grid>
          <Grid item xs={24} lg={24}>
            <LastTransactions />
          </Grid>
        </Grid>
    </Box>
    </PageContainer >
  );
};

export default Modern;
