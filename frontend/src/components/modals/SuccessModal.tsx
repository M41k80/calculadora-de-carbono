"use client";
import React from "react";

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <div className="flex justify-center items-center w-full mt-10 sm:mt-20">
      <div className="bg-[#202226] p-8 rounded-2xl shadow-md w-full max-w-lg text-white text-left">
        <h2 className="text-4xl font-bold text-white mb-4">¡Listo!</h2>

        <p className="text-sm sm:text-base text-[#D1D1D1] mb-3 font-light">
          Tus datos fueron cargados exitosamente.
        </p>

        <p className="text-sm sm:text-base text-[#B1B1B1] mb-3 leading-relaxed font-light">
          Ahora ya podés analizarlos desde el dashboard, visualizar
          tendencias y generar predicciones con base en los consumos de tu empresa.
        </p>

        <p className="text-sm sm:text-base text-[#B1B1B1] mb-6 font-light">
          Si querés hacer ajustes o subir nuevos archivos, podés volver a
          esta sección en cualquier momento.
        </p>

        <button
          onClick={onClose}
          className="bg-[#EA5105] hover:bg-orange-700 text-white font-medium py-2 px-10 rounded-xl transition cursor-pointer"
        >
          Volver a cargar datos
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;
