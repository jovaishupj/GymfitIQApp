import React from 'react';
import { Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import AppLogo from '../assets/images/Logo3.png';

const Navbar = () => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        px: { sm: '40px', xs: '20px' },
        py: '12px',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'rgba(10, 10, 10, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        maxWidth: '1440px',
        mx: 'auto',
      }}
    >
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img
          src={AppLogo}
          alt="GymFitIQ"
          style={{
            width: '48px',
            height: '48px',
            objectFit: 'contain',
          }}
        />
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 800,
            color: '#fff',
            letterSpacing: '-0.5px',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          Gym<span style={{ color: '#FF2625' }}>FitIQ</span>
        </Typography>
      </Link>

      <Stack direction="row" gap="32px" alignItems="center">
        <Link
          to="/"
          style={{
            color: '#fff',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            position: 'relative',
            paddingBottom: '4px',
            borderBottom: '2px solid #FF2625',
          }}
        >
          Home
        </Link>
        <a
          href="#exercises"
          style={{
            color: '#A0A0A0',
            fontSize: '15px',
            fontWeight: 600,
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            transition: 'color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.color = '#fff')}
          onMouseOut={(e) => (e.target.style.color = '#A0A0A0')}
        >
          Exercises
        </a>
      </Stack>
    </Stack>
  );
};

export default Navbar;