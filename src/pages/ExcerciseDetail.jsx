import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Stack, Typography } from '@mui/material';
import { fetchData} from '../utillity/fetchData';
import { motion } from 'framer-motion';

const ExcerciseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [exerciseDetail, setExerciseDetail] = useState({});
  const [imageSrc, setImageSrc] = useState('');
  const BASE_URL = import.meta.env.VITE_EXERCISE_DB_BASE_URL;
  const RAPIDAPI_KEY = import.meta.env.VITE_EXERCISE_DB_RAPIDAPI_KEY;
  const HOST=import.meta.env.VITE_EXERCISE_DB_RAPIDAPI_HOST;

  useEffect(() => {
    const fetchExerciseData = async () => {
      try {
        const detailData = await fetchData(`${BASE_URL}/exercises/exercise/${id}`);
        setExerciseDetail(detailData);
      } catch (error) {
        console.error("Failed to fetch exercise details", error);
      }
    };
    fetchExerciseData();
  }, [id, BASE_URL]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const url = `${BASE_URL}/image?exerciseId=${id}&resolution=180`;
        const response = await fetch(url, {
          headers: {
            'x-rapidapi-key': RAPIDAPI_KEY,
            'x-rapidapi-host': HOST
          }
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
  }, [id, RAPIDAPI_KEY]);

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' }, p: '20px', minHeight: '100vh' }}>
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
        <Button 
          onClick={() => navigate(-1)} 
          sx={{ 
            mb: 4, 
            background: 'rgba(255, 255, 255, 0.1)', 
            backdropFilter: 'blur(10px)',
            color: '#fff', 
            border: '1px solid rgba(255,255,255,0.1)',
            padding: '10px 30px',
            borderRadius: '30px',
            fontWeight: 'bold',
            '&:hover': { background: '#FF2625', color: '#fff', border: '1px solid #FF2625' } 
          }}
        >
          &larr; Back to Exercises
        </Button>
      </motion.div>

      <Stack sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'flex-start' }} gap="60px">
        {/* Left Side: Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="glass-card"
          style={{ padding: '20px', borderRadius: '30px', display: 'flex', justifyContent: 'center' }}
        >
          {imageSrc ? (
            <img src={imageSrc} alt={exerciseDetail.name} loading="lazy" style={{ borderRadius: '20px', width: '100%', maxWidth: '500px', objectFit: 'cover' }} />
          ) : (
            <div style={{ width: '400px', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20px', background: 'rgba(255,255,255,0.05)' }}>
              <Typography color="#aaa">Loading image...</Typography>
            </div>
          )}
        </motion.div>

        {/* Right Side: Details */}
        <Stack flex={1}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <Typography sx={{ fontSize: { lg: '64px', xs: '40px' } }} fontWeight={800} textTransform="capitalize" color="#fff">
              {exerciseDetail.name}
            </Typography>
            <Typography sx={{ fontSize: { lg: '22px', xs: '18px' } }} color="#bbb" mt={2} mb={4} lineHeight={1.8}>
              {exerciseDetail.description}
            </Typography>

            {/* Additional details tags */}
            <Stack direction="row" gap="15px" alignItems="center" mb={5} flexWrap="wrap">
              {['bodyPart', 'target', 'equipment'].map((key, index) => (
                exerciseDetail[key] && (
                  <Box key={index} sx={{ 
                    background: 'rgba(255, 38, 37, 0.1)', 
                    border: '1px solid rgba(255, 38, 37, 0.3)',
                    borderRadius: '20px', 
                    padding: '10px 25px', 
                    color: '#FF2625',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(5px)'
                  }}>
                    <Typography textTransform="capitalize" fontWeight={700} fontSize="16px">
                      {exerciseDetail[key]}
                    </Typography>
                  </Box>
                )
              ))}
            </Stack>
          </motion.div>

          {/* Instructions */}
          {exerciseDetail.instructions && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <Box mt={2} p={4} className="glass-card" borderRadius="20px">
                <Typography variant="h4" fontWeight={800} mb={3} color="#fff">
                  Instructions
                </Typography>
                <Stack gap={2}>
                  {exerciseDetail.instructions.map((step, index) => (
                    <Stack direction="row" gap={2} key={index} alignItems="flex-start">
                      <Box sx={{ 
                        background: '#FF2625', 
                        color: '#fff', 
                        borderRadius: '50%', 
                        width: '32px', 
                        height: '32px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        fontWeight: 'bold',
                        flexShrink: 0
                      }}>
                        {index + 1}
                      </Box>
                      <Typography sx={{ fontSize: '18px', color: '#ddd', lineHeight: 1.6 }}>
                        {step}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Box>
            </motion.div>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default ExcerciseDetail;