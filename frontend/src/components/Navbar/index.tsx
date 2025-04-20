"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <header className="w-full px-6 py-4 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          MiEmpresa
        </Link>

        {/* Botones de Autenticacion */}
        <div className="flex gap-4">
          <Link
            href="/login"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          >
            Iniciar Sesión
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Registrarse
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
