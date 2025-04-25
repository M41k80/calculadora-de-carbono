"use client";

import React, { useState, useRef } from "react";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import Link from "next/link";
import ProfileModal from "@/components/modals/ProfileModal";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGuardarCambios = () => {
    setIsLoading(true);
    setShowProfile(false);

    setTimeout(() => {
      setIsLoading(false);
      setShowProfile(true);
    }, 3000);
  };

  const handleReset = () => {
    setShowProfile(false);
  };

  const handleFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0D] flex px-4">
      <Sidebar />

      <div className="flex flex-col w-full pl-6 pr-2 pt-6 text-white relative">
        <h1 className="text-2xl sm:text-4xl font-semibold mb-8 ml-12">
          Configuración de perfil
        </h1>

        {isLoading ? (
          <div className="flex-1 flex flex-col justify-center items-center text-white">
            <p className="mb-6 text-xl font-normal text-white">
              Guardando cambios...
            </p>
            <div className="animate-spin rounded-full h-40 w-40 border-[12px] border-[#7A2E09] border-t-[#EA5105]" />
          </div>
        ) : showProfile ? (
          <ProfileModal onClose={handleReset} />
        ) : (
          <div className="bg-[#1C1D1F] rounded-xl px-8 py-8 space-y-6 shadow-lg max-w-4xl ml-12 pt-10">
            <div className="flex flex-col sm:flex-row gap-8">
              {/* Imagen de perfil */}
              <div className="flex flex-col items-center">
                <Image
                  src={selectedImage || "/profile.png"}
                  alt="Foto de perfil"
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <button
                  onClick={handleFileClick}
                  className="mt-3 px-5 py-1 text-sm text-white bg-[#4C4C4C] rounded-lg hover:bg-[#3b3b3b] transition cursor-pointer"
                >
                  Cambiar foto
                </button>
              </div>

              {/* Datos del perfil */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-1 rounded-md bg-[#1C1D1F] border-2 border-[#4C4C4C] outline-none text-white focus:border-[#EA5105] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-1 rounded-md bg-[#18191B] border-2 border-[#4C4C4C] outline-none text-white focus:border-[#EA5105] transition"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1 font-semibold">
                    Nombre de Empresa
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-1 rounded-md bg-[#18191B] border-2 border-[#4C4C4C] outline-none text-white focus:border-[#EA5105] transition"
                  />
                </div>
              </div>
            </div>

            {/* Seguridad */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-[130px_1fr] gap-6 items-start">
              <h2 className="text-lg font-semibold">Seguridad</h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="password"
                    placeholder="Contraseña actual"
                    className="w-full px-4 py-1 rounded-md bg-[#18191B] border-2 border-[#4C4C4C] outline-none text-white focus:border-[#EA5105] transition"
                  />
                  <input
                    type="password"
                    placeholder="Nueva contraseña"
                    className="w-full px-4 py-1 rounded-md bg-[#18191B] border-2 border-[#4C4C4C] outline-none text-white focus:border-[#EA5105] transition"
                  />
                  <input
                    type="password"
                    placeholder="Confirmar nueva contraseña"
                    className="w-full px-4 py-1 rounded-md bg-[#18191B] border-2 border-[#4C4C4C] outline-none text-white focus:border-[#EA5105] transition"
                  />
                </div>

                {/* Switch de Notificaciones */}
                <div className="flex items-center gap-3">
                  <label className="relative inline-block w-12 h-6 cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked
                    />
                    <div className="w-full h-full bg-[#4C4C4C] rounded-full peer-checked:bg-[#EA5105] transition-colors duration-300"></div>
                    <div className="absolute top-[2px] left-[2px] w-5 h-5 bg-[#D9D9D9] rounded-full transition-all duration-300 peer-checked:translate-x-6" />
                  </label>

                  <span className="text-sm font-semibold">
                    Recibir notificaciones por correo
                  </span>
                </div>

                {/* Botones */}
                <div className="flex gap-4 flex-col sm:flex-row items-center">
                  <button
                    onClick={handleGuardarCambios}
                    className="bg-[#EA5105] hover:bg-orange-600 text-white font-semibold sm:px-4 px-10 py-2 rounded-lg cursor-pointer"
                  >
                    Guardar cambios
                  </button>
                  <Link
                    href="/dashboard"
                    className="bg-[#4C4C4C] hover:bg-[#3b3b3b] text-white font-normal px-10 py-2 rounded-lg cursor-pointer"
                  >
                    Cancelar
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
