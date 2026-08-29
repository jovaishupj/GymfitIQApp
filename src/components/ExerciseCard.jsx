import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';


const ExerciseCard = ({ exercise }) => {
  const [imageSrc, setImageSrc] = useState('');
  const RAPIDAPI_KEY = import.meta.env.VITE_EXERCISE_DB_RAPIDAPI_KEY;
 const BASE_URL = import.meta.env.VITE_EXERCISE_DB_BASE_URL;
   const HOST=import.meta.env.VITE_EXERCISE_DB_RAPIDAPI_HOST;
   
  useEffect(() => {
    const fetchImages = async () => {
      try {
        console.log("🔥 BASE_URL FROM VITE:", BASE_URL);
console.log("🔥 ENV:", import.meta.env);
        const url = `${BASE_URL}/image?exerciseId=${exercise.id}&resolution=180`;
          console.log("🔥 url FROM VITE:", url);
        const response = await fetch(url, {
          headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': HOST,
          },
        });
         
        if (response.ok) {
          const blob = await response.blob();
          setImageSrc(URL.createObjectURL(blob));
        }
      } catch (error) {
        console.error('Failed to fetch image:', error);
      }
    };
    fetchImages();
  }, [exercise.id, RAPIDAPI_KEY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.25, 0.8, 0.25, 1] }}
    >
      <Link className="exercise-card" to={`/ExcerciseDetail/${exercise.id}`}>
        {imageSrc ? (
          <img src={imageSrc} alt={exercise.name} loading="lazy" />
        ) : (
          <Box
            sx={{
              height: '260px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#1a1a1a',
            }}
          >
            <Typography color="#555" fontSize="14px">
              Loading...
            </Typography>
          </Box>
        )}

        <Stack sx={{ p: '16px 20px', gap: '12px', flex: 1 }}>
          <Stack direction="row" gap="8px" flexWrap="wrap">
            <Button
              size="small"
              sx={{
                color: '#fff',
                background: 'linear-gradient(135deg, #FF2625, #ff4444)',
                fontSize: '12px',
                fontWeight: 700,
                borderRadius: '20px',
                textTransform: 'capitalize',
                px: '14px',
                py: '4px',
                minHeight: 'unset',
                boxShadow: '0 2px 8px rgba(255, 38, 37, 0.25)',
                '&:hover': { background: 'linear-gradient(135deg, #FF2625, #ff4444)' },
              }}
            >
              {exercise.bodyPart}
            </Button>
            <Button
              size="small"
              sx={{
                color: '#ccc',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: '12px',
                fontWeight: 600,
                borderRadius: '20px',
                textTransform: 'capitalize',
                px: '14px',
                py: '4px',
                minHeight: 'unset',
                '&:hover': { background: 'rgba(255,255,255,0.1)' },
              }}
            >
              {exercise.target}
            </Button>
          </Stack>

          <Typography
            fontSize="17px"
            fontWeight={700}
            color="#fff"
            textTransform="capitalize"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {exercise.name}
          </Typography>
        </Stack>
      </Link>
    </motion.div>
  );
};

export default ExerciseCard;