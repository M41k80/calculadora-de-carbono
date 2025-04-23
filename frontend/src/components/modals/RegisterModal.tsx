"use client"

import { useState } from "react"
import { X, ArrowLeft } from "lucide-react"
import { registerUser } from "@/api/auth/authService"

type RegisterModalProps = {
  isOpen: boolean
  onClose: () => void
  onBackToLogin: () => void
}

const RegisterModal = ({ isOpen, onClose, onBackToLogin }: RegisterModalProps) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [companyname, setCompanyname] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.")
      return
    }

    setIsLoading(true)
    try {
      const res = await registerUser({ name, email, password, companyname })
      console.log("Registro exitoso:", res)
      onBackToLogin()
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error al registrar.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="relative w-full max-w-md mx-auto rounded-2xl px-10 py-6
        bg-black/70 backdrop-blur-sm border border-white/10
        shadow-[0_0_40px_rgba(255,255,255,0.05)] text-white pointer-events-auto"
      >
        <button onClick={onBackToLogin} className="absolute top-4 left-4 text-white hover:text-gray-300">
          <ArrowLeft size={22} />
        </button>
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300">
          <X size={22} />
        </button>

        <h2 className="text-xl font-medium text-center text-[#E9E9E9]">Creá tu cuenta gratis</h2>
        <p className="text-sm text-center text-gray-300 mt-1 mb-6 font-light">
          Unite a la plataforma y comenzá a calcular el impacto ambiental de tu empresa en minutos.
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Nombre completo:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} type="text" required
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black" placeholder="Tu nombre completo" />
          </div>

          <div>
            <label className="block text-sm mb-1">Correo electrónico:</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black" placeholder="tuemail@ejemplo.com" />
          </div>

          <div>
            <label className="block text-sm">Contraseña:</label>
            <p className="text-xs text-gray-400 mb-1">Mínimo 6 caracteres</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required minLength={6}
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black" placeholder="●●●●●●" />
          </div>

          <div>
            <label className="block text-sm">Confirmar contraseña:</label>
            <p className="text-xs text-gray-400 mb-1">Repetí tu contraseña</p>
            <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" required
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black" placeholder="●●●●●●" />
          </div>

          <div>
            <label className="block text-sm mb-1">Empresa:</label>
            <input value={companyname} onChange={(e) => setCompanyname(e.target.value)} type="text" required
              className="w-full px-4 py-2 rounded-lg bg-[#D9D9D9] text-black" placeholder="Nombre de tu empresa" />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button type="submit" disabled={isLoading}
            className="mt-4 px-10 py-1 self-center rounded-2xl border-2 border-[#838383] text-[#EA5105] font-semibold hover:bg-orange-600 hover:text-white transition disabled:opacity-50">
            {isLoading ? "Registrando..." : "Registrarme"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RegisterModal
