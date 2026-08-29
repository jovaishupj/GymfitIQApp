import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import ExerciseCard from './ExerciseCard';
import { useSelector, useDispatch } from 'react-redux';
import { setExercises } from '../store/exerciseSlice';
import { fetchData } from '../utillity/fetchData';
import { motion } from 'framer-motion';

const Excercises = () => {
  const { exercises, bodyPart } = useSelector((state) => state.exercise);
  const dispatch = useDispatch();
  const BASE_URL = import.meta.env.VITE_EXERCISE_DB_BASE_URL;
  const [initialMount, setInitialMount] = useState(true);

  useEffect(() => {
    const fetchExercisesData = async () => {
      if (initialMount && exercises.length > 0) {
        setInitialMount(false);
        return;
      }
      let exercisesData = [];
      if (bodyPart === 'All' || bodyPart === 'all') {
        exercisesData = await fetchData(`${BASE_URL}/exercises?limit=1300&offset=0`);
      } else {
        exercisesData = await fetchData(
          `${BASE_URL}/exercises/bodyPart/${bodyPart}?limit=1300&offset=0`
        );
      }
      dispatch(setExercises(exercisesData));
      setInitialMount(false);
    };
    fetchExercisesData();
  }, [bodyPart, dispatch, BASE_URL]);

  const displayedExercises = Array.isArray(exercises) ? exercises : [];
  const currentExercises = displayedExercises.slice(0, 10);

  return (
    <Box id="exercises" sx={{ px: '20px', py: '80px' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          sx={{
            fontSize: { lg: '36px', xs: '26px' },
            fontWeight: 800,
            color: '#fff',
            textAlign: 'center',
            mb: '50px',
            letterSpacing: '-0.5px',
          }}
        >
          <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>
            {bodyPart}
          </span>{' '}
          Exercises
        </Typography>
      </motion.div>

      <Stack
        direction="row"
        flexWrap="wrap"
        justifyContent="center"
        gap="28px"
      >
        {currentExercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercise={exercise} />
        ))}
      </Stack>

      {currentExercises.length === 0 && (
        <Typography
          textAlign="center"
          color="#555"
          fontSize="16px"
          mt="40px"
        >
          No exercises found. Try a different search or category.
        </Typography>
      )}
    </Box>
  );
};

export default Excercises;