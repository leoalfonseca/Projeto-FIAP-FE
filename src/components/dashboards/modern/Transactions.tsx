import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Avatar, Box, IconButton } from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { IconCoin, IconEdit, IconLogout2, IconTrash } from '@tabler/icons-react';

const Transactions = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.primary.light;
  const secondary = theme.palette.success.main;
  const secondarylight = theme.palette.success.light;


  const transactions = [
    {
      title: 'Depósito',
      subtitle: 'R$2.500,00',
      color: primary,
      lightcolor: primarylight,
      icon: <IconCoin width={18} />,
    },
    {
      title: 'Transferência',
      subtitle: '-R$1.500,00',
      color: secondary,
      lightcolor: secondarylight,
      icon: <IconLogout2 width={18} />,
    },
    {
      title: 'Transferência',
      subtitle: '-R$500,00',
      color: secondary,
      lightcolor: secondarylight,
      icon: <IconLogout2 width={18} />,
    },
    {
      title: 'Depósito',
      subtitle: 'R$600,00',
      color: primary,
      lightcolor: primarylight,
      icon: <IconCoin width={18} />,
    },
    {
      title: 'Depósito',
      subtitle: 'R$500,00',
      color: primary,
      lightcolor: primarylight,
      icon: <IconCoin width={18} />,
    },
    {
      title: 'Depósito',
      subtitle: 'R$40,00',
      color: primary,
      lightcolor: primarylight,
      icon: <IconCoin width={18} />,
    },
  ];

  return (
    <DashboardCard title="Extrato" >
      <>
        <Stack spacing={3} mt={3}>
          {transactions.map((stat, i) => (
            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              alignItems="center"
              key={i}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: 'transparent',
                    color: stat.color,
                    width: 40,
                    height: 40,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="h6" mb="4px">
                    {stat.title}
                  </Typography>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.subtitle}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    width: 42,
                    height: 40,
                  }}
                >
                   <IconButton size="small" sx={{color: stat.color}}>
                    <IconEdit size={16} />
                  </IconButton>
                </Avatar>
                <Avatar
                  sx={{
                    bgcolor: 'transparent',
                    color: 'primary.main',
                    width: 42,
                    height: 40,
                  }}
                >
                  <IconButton size="small" sx={{color: stat.color}}>
                    <IconTrash size={16} />
                  </IconButton>
                </Avatar>

              </Stack>
            </Stack>
          ))}
        </Stack>
      </>
    </DashboardCard>
  );
};

export default Transactions;
