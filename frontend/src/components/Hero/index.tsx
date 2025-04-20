import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-3xl text-center">
        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Calculadora de Huella de Carbono para Empresas
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Mide, visualiza y reduce el impacto ambiental de tu empresa con
          predicciones inteligentes y recomendaciones personalizadas.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-6 py-3 bg-green-600 text-white rounded-2xl shadow hover:bg-green-700 transition"
          >
            Comenzar gratis
          </Link>

          <Link
            href="/login"
            className="px-6 py-3 border border-green-600 text-green-600 rounded-2xl shadow hover:bg-green-50 transition"
          >
            Ya tengo una cuenta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
