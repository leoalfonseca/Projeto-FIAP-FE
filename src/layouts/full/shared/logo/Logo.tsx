import { Box } from '@mui/material';
import Image from 'next/image';
import { AppState } from "store/Store";
import { useSelector } from "store/Store";

const Logo = () => {

  const customizer = useSelector((state: AppState) => state.customizer);

  return (
    <Box display={'flex'} alignItems="center" justifyContent="center" width={'100%'} height={60}>
      <Image
        src={"/images/logos/logo.png"}
        alt="logo"
        height={customizer.isCollapse ? "20" : "30"}
        width={customizer.isCollapse ? "60" : "140"}
        priority
      />
    </Box>
  );
};

export default Logo;
