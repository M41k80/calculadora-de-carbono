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
          loop={true}
          navigation={true}
          className="w-200 custom-swiper"
        >
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Enero
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Febrero
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Marzo
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Abril
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Mayo
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Junio
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Julio
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Agosto
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Septiembre
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Octubre
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#212226] p-4 rounded-lg shadow-md text-white flex items-center justify-center">
              Noviembre
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      
    </div>
  );
};

export default Cardslider;
