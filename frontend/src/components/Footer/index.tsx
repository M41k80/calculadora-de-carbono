import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 border-t py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="mt-4 gap-8">
          <Image
            src="/next.svg"
            alt="MiEmpresa Logo"
            width={32}
            height={32}
            className="h-6 w-auto"
          />
        </div>

        {/* Enlaces */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-600 mt-4">
          <Link href="/contact" className="hover:underline">
            Contacto
          </Link>
          <Link href="/terms" className="hover:underline">
            Términos
          </Link>
          <Link href="/politics" className="hover:underline">
            Política de Privacidad
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 text-xs text-gray-500">
        © {new Date().getFullYear()} Next.js Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
