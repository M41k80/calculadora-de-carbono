import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const CardsliderYear = () => {
  return (
    <div>
      <div className="mt-3 mb-3">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          loop={true}
          navigation={true}
          className="w-200 custom-swiper"
        >
          <SwiperSlide>
            <div className="hover:bg-[#EA5105] bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              2023
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hover:bg-[#EA5105] bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              2024
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hover:bg-[#EA5105] bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              2025
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      
    </div>
  );
};

export default CardsliderYear;
