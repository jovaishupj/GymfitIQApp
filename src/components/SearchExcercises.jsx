import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setExercises, setBodyPart } from '../store/exerciseSlice';
import { motion } from 'framer-motion';
import { fetchData } from '../utillity/fetchData';
import HorizontalScrollbar from '../components/HorizontalScrollBarBodyParts';

const SearchExcercises = () => {
  const [search, setSearch] = useState('');
  const [bodyPartsList, setBodyPartsList] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { bodyPart, exercises } = useSelector((state) => state.exercise);

  const BASE_URL = import.meta.env.VITE_EXERCISE_DB_BASE_URL;

  useEffect(() => {
    if (bodyPartsList.length === 0) {
      fetchBodyPartsData();
    }
  }, []);

  useEffect(() => {
    if (exercises.length === 0) {
      fetchExercisesData();
    }
  }, []);

  const fetchBodyPartsData = async () => {
    try {
      const bodyPartsData = await fetchData(`${BASE_URL}/exercises/bodyPartList`);
      setBodyPartsList(['All', ...bodyPartsData]);
    } catch (error) {
      console.error('Failed to fetch body parts:', error);
    }
  };

  const fetchExercisesData = async (searchTerm = '') => {
    try {
      setLoading(true);
      let url = `${BASE_URL}/exercises?limit=1300&offset=0`;
      if (bodyPart !== 'All' && bodyPart !== 'all') {
        url = `${BASE_URL}/exercises/bodyPart/${bodyPart}?limit=1300&offset=0`;
      }
      let exercisesData = await fetchData(url);
      if (searchTerm) {
        exercisesData = exercisesData.filter(
          (item) =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.target.toLowerCase().includes(searchTerm) ||
            item.equipment.toLowerCase().includes(searchTerm) ||
            item.bodyPart.toLowerCase().includes(searchTerm)
        );
      }
      dispatch(setExercises(exercisesData));
    } catch (error) {
      console.error('Failed to fetch exercises:', error);
      dispatch(setExercises([]));
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    const searchTerm = search.trim();
    if (!searchTerm) return;
    await fetchExercisesData(searchTerm);
    setSearch('');
    window.scrollTo({ top: 1800, left: 0, behavior: 'smooth' });
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') handleSearch();
  };

  const handleBodyPartChange = (part) => {
    dispatch(setBodyPart(part));
  };

  return (
    <Stack alignItems="center" sx={{ py: '80px', px: '20px' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          sx={{
            fontSize: { lg: '40px', xs: '28px' },
            fontWeight: 800,
            color: '#fff',
            textAlign: 'center',
            mb: '40px',
            letterSpacing: '-1px',
          }}
        >
          Awesome Exercises You <br />
          <span style={{ color: '#FF2625' }}>Should Know</span>
        </Typography>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ width: '100%', maxWidth: '720px' }}
      >
        <Box
          sx={{
            display: 'flex',
            background: '#161616',
            borderRadius: '50px',
            border: '1px solid rgba(255,255,255,0.06)',
            overflow: 'hidden',
            boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
            mb: '60px',
          }}
        >
          <TextField
            fullWidth
            sx={{
              input: {
                fontWeight: 500,
                color: '#fff',
                padding: '18px 28px',
                fontSize: '16px',
                '&::placeholder': { color: '#555', opacity: 1 },
              },
              fieldset: { border: 'none' },
            }}
            value={search}
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            onKeyDown={handleKeyDown}
            placeholder="Search exercises..."
            type="text"
            variant="outlined"
          />
          <Button
            className="search-btn"
            onClick={handleSearch}
            disabled={loading}
            sx={{
              bgcolor: '#FF2625',
              color: '#fff',
              textTransform: 'none',
              width: { lg: '160px', xs: '100px' },
              fontSize: '16px',
              fontWeight: 700,
              borderRadius: '0 50px 50px 0',
              '&:hover': { bgcolor: '#cc1f1e' },
              '&:disabled': { bgcolor: '#333', color: '#666' },
            }}
          >
            {loading ? '...' : 'Search'}
          </Button>
        </Box>
      </motion.div>

      {/* Body Parts Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ width: '100%' }}
      >
        {bodyPartsList.length > 0 && (
          <HorizontalScrollbar
            bodyParts={bodyPartsList}
            setBodyPart={handleBodyPartChange}
            bodyPart={bodyPart}
          />
        )}
      </motion.div>
    </Stack>
  );
};

export default SearchExcercises;