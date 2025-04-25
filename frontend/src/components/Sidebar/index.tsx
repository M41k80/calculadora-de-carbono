"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear(); // Limpiar sesión simulada
    router.push("/"); // Redirigir al Home
  };

  return (
    <aside className="mt-6 mb-6 w-20 md:w-20 sm:w-40 h-[70vh] md:h-[60vh] lg:h-[112vh] bg-[#212226] text-white flex flex-col p-4 rounded-full shadow-lg">
      <div className="flex items-center justify-center mb-4"></div>
      <nav className="flex flex-col justify-between flex-1">
        {/* Top icons */}
        <div className="flex flex-col gap-6 mt-4">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link href="/dashboard">
              <div className="w-22 h-20 relative">
                <Image
                  src="/carboniq.png"
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          <Link
            href="/dashboard"
            className="hover:bg-[#EA5105] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/dashboard-icon2.svg"
              alt="Dashboard"
              width={30}
              height={30}
            />
          </Link>

          <Link
            href="/dashboard/cargadata"
            className="hover:bg-[#EA5105] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/loadData-icon.svg"
              alt="Cargar datos"
              width={30}
              height={30}
            />
          </Link>

          <Link
            href="/dashboard/calendar"
            className="hover:bg-[#EA5105] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/history.svg"
              alt="Historial"
              width={30}
              height={30}
            />
          </Link>

          <Link
            href="/dashboard/historial"
            className="hover:bg-[#EA5105] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/history2.svg"
              alt="Historial alternativo"
              width={30}
              height={30}
            />
          </Link>

          <Link
            href="/dashboard/profile"
            className="hover:bg-[#EA5105] p-1.5 rounded-full text-white cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/user.png"
              alt="Perfil de usuario"
              width={30}
              height={30}
            />
          </Link>
        </div>

        {/* Bottom logout icon */}
        <button
          onClick={handleLogout}
          className="hover:bg-white p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/logout.svg"
            alt="Cerrar sesión"
            width={30}
            height={30}
          />
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
