import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";

const Cardslider = () => {
  return (
    <div>
      <div className="mt-6">
        <Swiper
          modules={[Pagination, Navigation]}
          spaceBetween={20}
          slidesPerView={5}
          pagination={{ clickable: true }}
          navigation={true}
          className="w-64 h-64"
        >
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              1
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              2
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              3
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              4
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              5
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              6
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              7
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      
    </div>
  );
};

export default Cardslider;
