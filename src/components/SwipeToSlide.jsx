import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import BodyPart from './BodyPart';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

function SwipeToSlide({ bodyParts, setBodyPart, bodyPart }) {
  return (
    <div className="slider-container">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 12 },
          480: { slidesPerView: 2, spaceBetween: 12 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
        }}
      >
        {bodyParts.map((item, index) => (
          <SwiperSlide key={index}>
            <BodyPart item={item} setBodyPart={setBodyPart} bodyPart={bodyPart} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwipeToSlide;
