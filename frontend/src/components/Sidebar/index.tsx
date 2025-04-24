"use client";
import Link from "next/link";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="mt-6 mb-6 w-20 md:w-20 sm:w-40 h-[70vh] md:h-[60vh] lg:h-[115vh] bg-[#212226] text-white flex flex-col p-4 rounded-full shadow-lg">
      <div className="flex items-center justify-center mb-4"></div>
      <nav className="flex flex-col justify-between flex-1">
        {/* Top icons */}

        <div className="flex flex-col gap-6 mt-4">
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link href="/dashboard">
              <div className="w-22 h-20 relative">
                {" "}
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
            <img src="/dashboard-icon2.svg" alt="Dashboard" />
          </Link>

          <Link
            href="/dashboard/cargadata"
            className="hover:bg-[#EA5105] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <img src="/loadData-icon.svg" alt="Cargar datos" />
          </Link>

          <Link
            href="/dashboard/calendar"
            className="hover:bg-[#EA5105] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <img src="/history.svg" alt="Historial" />
          </Link>

          <Link
            href="/dashboard/historial"
            className="hover:bg-[#EA5105] p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <img src="/history2.svg" alt="Historial alternativo" />
          </Link>

          <Link
            href="/dashboard/profile"
            className="hover:bg-[#EA5105] p-1.5 rounded-full text-white cursor-pointer transform transition-transform duration-300 hover:scale-105"
          >
            <img src="/user.png" alt="Historial alternativo" />
          </Link>
        </div>

        {/* Bottom logout icon */}
        <a
          href="#"
          className="hover:bg-white p-2 rounded-full cursor-pointer transform transition-transform duration-300 hover:scale-105"
        >
          <img src="/logout.svg"></img>
        </a>
      </nav>
    </aside>
  );
};

export default Sidebar;
