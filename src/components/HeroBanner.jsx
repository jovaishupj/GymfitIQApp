import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import HeroBannerImage from '../assets/images/Banner3.jpg';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] },
  },
};

const HeroBanner = () => (
  <Box
    sx={{
      position: 'relative',
      minHeight: { lg: '100vh', xs: '80vh' },
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      mt: '72px',
    }}
  >
    {/* Background image with gradient overlay */}
    <Box
      sx={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${HeroBannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        '&::after': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to right, #0A0A0A 35%, rgba(10,10,10,0.6) 65%, rgba(10,10,10,0.3) 100%)',
        },
      }}
    />

    {/* Watermark */}
    <Typography
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: { lg: '280px', md: '180px', xs: '120px' },
        fontWeight: 900,
        color: 'rgba(255, 255, 255, 0.02)',
        whiteSpace: 'nowrap',
        userSelect: 'none',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      GYMFIT
    </Typography>

    {/* Content */}
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '0 40px',
        maxWidth: '700px',
      }}
    >
      <motion.div variants={itemVariants}>
        <Typography
          sx={{
            color: '#FF2625',
            fontWeight: 700,
            fontSize: '14px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            mb: 2,
          }}
        >
          Welcome to GymFitIQ
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Typography
          sx={{
            fontSize: { lg: '68px', md: '52px', xs: '40px' },
            fontWeight: 900,
            color: '#fff',
            lineHeight: 1.05,
            letterSpacing: '-2px',
            mb: 3,
          }}
        >
          Fitness is not a{' '}
          <br />
          <span
            style={{
              background: 'linear-gradient(135deg, #FF2625, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            destination
          </span>
          <br />
          it's a way of life.
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Typography
          sx={{
            fontSize: { lg: '18px', xs: '16px' },
            color: '#A0A0A0',
            lineHeight: 1.7,
            mb: 5,
            maxWidth: '500px',
          }}
        >
          Discover exercises personalized to your goals, equipment, and
          experience level.
        </Typography>
      </motion.div>

      <motion.div variants={itemVariants}>
        <a
          href="#exercises"
          style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #FF2625, #cc1f1e)',
            color: '#fff',
            padding: '16px 40px',
            fontSize: '16px',
            fontWeight: 700,
            borderRadius: '40px',
            letterSpacing: '0.5px',
            boxShadow: '0 8px 30px rgba(255, 38, 37, 0.35)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow =
              '0 12px 40px rgba(255, 38, 37, 0.5)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 8px 30px rgba(255, 38, 37, 0.35)';
          }}
        >
          Explore Exercises
        </a>
      </motion.div>
    </motion.div>
  </Box>
);

export default HeroBanner;
