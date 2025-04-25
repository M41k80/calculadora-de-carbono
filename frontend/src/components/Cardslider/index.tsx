"use client";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const TODOS_LOS_MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const Cardslider = () => {
  const [mesesDisponibles, setMesesDisponibles] = useState<string[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  useEffect(() => {
    const mesActual = new Date().getMonth(); // 0-enero, 1-febrero, ..., 11-diciembre
    const mesesFuturos = TODOS_LOS_MESES.slice(mesActual + 1);
    setMesesDisponibles(mesesFuturos);
  }, []);

  const toggleSeleccion = (mes: string) => {
    setSeleccionados(prev =>
      prev.includes(mes) ? prev.filter(m => m !== mes) : [...prev, mes]
    );
  };

  return (
    <div className="mt-3 mb-3">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={5}
        loop={false}
        navigation={true}
        className="w-200 custom-swiper"
      >
        {mesesDisponibles.map((mes, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => toggleSeleccion(mes)}
              className={`p-4 rounded-lg shadow-md flex items-center justify-center cursor-pointer 
                ${
                  seleccionados.includes(mes)
                    ? "bg-green-600 text-white"
                    : "bg-[#212226] text-white"
                }`}
            >
              {mes.charAt(0).toUpperCase() + mes.slice(1)}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Cardslider;
