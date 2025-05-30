import React from 'react';
import { Grid, Typography, Box, Breadcrumbs, Theme, alpha } from '@mui/material';
import NextLink from 'next/link';

import breadcrumbImg from '../../../../../public/images/breadcrumb/ChatBc.png';
import { IconCircle } from '@tabler/icons-react';
import Image from 'next/image';

interface BreadCrumbType {
  subtitle?: string;
  items?: any[];
  title?: string;
  children?: JSX.Element;
}

const Breadcrumb = ({ subtitle, items, title, children }: BreadCrumbType) => (
  <Grid
    container
    sx={(theme) => ({
      backgroundColor: alpha(theme.palette.primary.light, 0.7),
      color: 'white',
      borderRadius: theme.shape.borderRadius / 4,
      p: '30px 25px 20px',
      marginBottom: '30px',
      position: 'relative',
      overflow: 'hidden',
    })}
  >
    <Grid item xs={12} sm={6} lg={8} mb={1}>
      <Typography variant="h4">{title}</Typography>
      <Typography
        color="white"
        variant="h6"
        fontWeight={400}
        mt={0.8}
        mb={0}
      >
        {subtitle}
      </Typography>
      <Breadcrumbs
        separator={
          <IconCircle
            size="5"
            fill="white"
            fillOpacity={'0.6'}
            style={{ margin: '0 5px' }}
          />
        }
        sx={{ alignItems: 'center', mt: items ? '10px' : '' }}
        aria-label="breadcrumb"
      >
        {items
          ? items.map((item) => (
            <div key={item.title}>
              {item.to ? (
                <NextLink href={item.to} passHref>
                  <Typography color="white">{item.title}</Typography>
                </NextLink>
              ) : (
                <Typography color="textPrimary">{item.title}</Typography>
              )}
            </div>
          ))
          : ''}
      </Breadcrumbs>
    </Grid>
    <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
      <Box
        sx={{
          display: { xs: 'none', md: 'block', lg: 'flex' },
          alignItems: 'center',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <Box sx={{ top: '0px', position: 'absolute' }}>{children}</Box>
      </Box>
    </Grid>
  </Grid>
);

export default Breadcrumb;
