"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";

const ArtistAlbumsSlider = () => {
  return (
    <div className="relative h-64 w-full">
      <div className="absolute inset-0">
        <Swiper
          slidesPerView="auto"
          spaceBetween={0}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode]}
          className="mySwiper h-full w-full"
        >
          <SwiperSlide className="flex !h-64 !w-96 bg-indigo-600">
            Slide 1
          </SwiperSlide>
          <SwiperSlide className="flex !h-64 !w-96 bg-red-400">
            Slide 1
          </SwiperSlide>
          <SwiperSlide className="flex !h-64 !w-96 bg-slate-950">
            Slide 1
          </SwiperSlide>
          <SwiperSlide className="flex !h-64 !w-96 bg-gray-100">
            Slide 1
          </SwiperSlide>
          <SwiperSlide className="flex !h-64 !w-96 bg-indigo-600">
            Slide 1
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default ArtistAlbumsSlider;
