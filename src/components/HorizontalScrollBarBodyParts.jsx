import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';

import ExerciseCard from './ExerciseCard';
import BodyPart from './BodyPart';
import RightArrowIcon from '../assets/icons/right-arrow.png';
import LeftArrowIcon from '../assets/icons/left-arrow.png';

import SwipeToSlide from './SwipeToSlide';


const HorizontalScrollBarBodyParts = ({
  bodyParts,
  setBodyPart,
  bodyPart
}) => {
  console.log("bodyParts:", bodyParts);

  return (
    <SwipeToSlide
      bodyParts={bodyParts}
      setBodyPart={setBodyPart}
      bodyPart={bodyPart}
    />
  );
};
export default HorizontalScrollBarBodyParts;