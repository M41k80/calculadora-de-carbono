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

interface CardsliderProps {
  onChange?: (seleccionados: string[]) => void;
}

const Cardslider: React.FC<CardsliderProps> = ({ onChange }) => {
  const [mesesDisponibles, setMesesDisponibles] = useState<string[]>([]);
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  useEffect(() => {
    const mesActual = new Date().getMonth();
    setMesesDisponibles(TODOS_LOS_MESES.slice(mesActual + 1));
  }, []);

  useEffect(() => {
    if (onChange) onChange(seleccionados);
  }, [seleccionados, onChange]);

  const seleccionarMes = (mes: string) => {
    setSeleccionados((prev) =>
      prev.includes(mes) || prev.length >= 12 ? prev : [...prev, mes]
    );
  };

  return (
    <div className="mt-3 mb-3">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={5}
        loop={false}
        navigation
        className="w-200 custom-swiper"
      >
        {mesesDisponibles.map((mes, idx) => (
          <SwiperSlide key={idx}>
            <div
              onClick={() => seleccionarMes(mes)}
              className={`p-4 rounded-lg shadow-md flex items-center justify-center cursor-pointer transition-colors
                ${
                  seleccionados.includes(mes)
                    ? "bg-[#EA5105] text-white"
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
