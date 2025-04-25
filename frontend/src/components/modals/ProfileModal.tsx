"use client";
import React from "react";

interface SuccessModalProps {
  onClose: () => void;
}

const ProfileModal: React.FC<SuccessModalProps> = ({ onClose }) => {
  return (
    <div className="flex justify-center items-center w-full mt-10 sm:mt-20">
      <div className="bg-[#202226] p-8 rounded-2xl shadow-md w-full max-w-lg text-white text-left">
        <h2 className="text-3xl font-bold text-white mb-4">¡Perfil actualizado!</h2>

        <p className="text-lg sm:text-lg text-[#D1D1D1] mb-6 font-light">
        Tus cambios fueron guardados exitosamente.
        </p>

        <div className="justify-center flex">
          <button
            onClick={onClose}
            className="bg-[#EA5105] hover:bg-orange-700 text-white font-medium py-2 px-6 sm:px-10 rounded-xl transition cursor-pointer"
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
