import React from 'react';
import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import gym from '../assets/images/gym.png';
import cardio from '../assets/images/cardio.png';
import back from '../assets/images/back.png';
import chest from '../assets/images/chest.png';
import lowerarms from '../assets/images/lowerarms.png';
import shoulders from '../assets/images/shoulders.png';
import lowerlegs from '../assets/images/lowerlegs.png';
import upperlegs from '../assets/images/upperlegs.png';
import upperarms from '../assets/images/upperarms.png';
import waist from '../assets/images/waist.png';
import neck from '../assets/images/neck.png';

const bodyPartImages = {
  back,
  cardio,
  chest,
  lowerarms,
  shoulders,
  lowerlegs,
  upperlegs,
  upperarms,
  waist,
  neck,
};

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const handleClick = () => {
    setBodyPart(item);
    window.scrollTo({ top: 1800, left: 0, behavior: 'smooth' });
  };

  const isActive = bodyPart === item;

  return (
    <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        className="bodyPart-card"
        onClick={handleClick}
        sx={{
          background: isActive ? 'rgba(255, 38, 37, 0.08)' : '#161616',
          border: isActive
            ? '2px solid #FF2625'
            : '1px solid rgba(255,255,255,0.06)',
          borderRadius: '20px',
          width: '240px',
          height: '240px',
          cursor: 'pointer',
          gap: '20px',
          mx: 'auto',
          transition: 'all 0.3s ease',
          boxShadow: isActive
            ? '0 8px 30px rgba(255, 38, 37, 0.15)'
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        <img
          src={bodyPartImages[item?.toLowerCase().replace(/\s+/g, '')] || gym}
          alt={item}
          style={{
            width: '200px',
            height: '200px',
            filter: isActive
              ? 'drop-shadow(0 0 12px rgba(255, 38, 37, 0.6))'
              : 'none',
            transition: 'filter 0.3s ease',
          }}
        />
        <Typography
          fontSize="18px"
          fontWeight={700}
          color={isActive ? '#FF2625' : '#fff'}
          textTransform="capitalize"
          sx={{ transition: 'color 0.3s ease' }}
        >
          {item}
        </Typography>
      </Stack>
    </motion.div>
  );
};

export default BodyPart;
