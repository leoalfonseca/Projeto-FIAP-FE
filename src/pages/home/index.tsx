import { Box, Grid } from '@mui/material';
import PageContainer from 'components/container/PageContainer';
import NewTransaction from 'components/dashboards/modern/NewTransaction';

import RevenueUpdates from 'components/dashboards/modern/RevenueUpdates';
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
          <Grid item xs={12} lg={12}>
            <NewTransaction />
          </Grid>
        </Grid>
    </Box>
    </PageContainer >
  );
};

export default Modern;
