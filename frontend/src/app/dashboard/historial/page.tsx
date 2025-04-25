"use client"
import { useEffect, useState } from 'react'
import { Flame, Plane, Droplet, Truck, Trash2, ChevronDown, ChevronUp } from 'lucide-react'
import Sidebar from '@/components/Sidebar'

// Define data types

type DetalleMensual = {
    id: number
    mes: string
    anio: number
    electricidad_uso: number
    avion_uso: number
    residuos_uso: number
    agua_uso: number
    auto_uso: number
    emisiones: number
}

type ResumenAnual = {
    id: number
    anio: number
    electricidad: number
    auto: number
    avion: number
    residuos: number
    agua: number
}

type ApiResponse = {
    detalle_mensual?: DetalleMensual[]
    resumen_anual?: ResumenAnual[]
}

const ordenMeses = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
]

export default function Historial() {
    const [historial, setHistorial] = useState<DetalleMensual[]>([])
    const [resumen, setResumen] = useState<ResumenAnual[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [aniosExpandidos, setAniosExpandidos] = useState<Record<number, boolean>>({})

    const toggleAnioExpandido = (anio: number) => {
        setAniosExpandidos(prev => ({
            ...prev,
            [anio]: !prev[anio]
        }))
    }

    useEffect(() => {
        const fetchHistorial = async () => {
            try {
                setLoading(true)
                setError(null)
                const token = localStorage.getItem('token')
                const email = localStorage.getItem('email')
                if (!token || !email) throw new Error('Token o email faltante')
                const response = await fetch(`http://localhost:3000/historial/save?email=${email}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                if (!response.ok) throw new Error(`Error ${response.status}`)
                const data: ApiResponse = await response.json()
                // Ordenar por año y mes
                const detalle = (data.detalle_mensual || []).sort((a, b) => {
                    if (a.anio !== b.anio) return a.anio - b.anio
                    return ordenMeses.indexOf(a.mes) - ordenMeses.indexOf(b.mes)
                })
                setHistorial(detalle)
                setResumen(data.resumen_anual || [])
                // Expandir años por defecto
                const exp: Record<number, boolean> = {}
                detalle.forEach((d: DetalleMensual) => { exp[d.anio] = true; });
                (data.resumen_anual || []).forEach(r => { exp[r.anio] = true })
                setAniosExpandidos(exp)
            } catch (err) {
                console.error('Error al cargar historial:', err)
                setError(err instanceof Error ? err.message : 'Error desconocido')
            } finally {
                setLoading(false)
            }
        }
        fetchHistorial()
    }, [])

    const formatNumber = (num: number) =>
        num.toLocaleString('es-CL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

    // Agrupar por año
    const historialPorAnio = historial.reduce((acc, item) => {
        (acc[item.anio] ||= []).push(item)
        return acc
    }, {} as Record<number, DetalleMensual[]>)

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500" />
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black">
                <div className="bg-red-900/20 border border-red-700 text-red-300 p-4 rounded-lg">
                    <p>Error: {error}</p>
                    <button onClick={() => window.location.reload()} className="mt-2 text-orange-400 hover:text-orange-300">
                        Reintentar
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black flex px-4">
            <Sidebar />
            <main className="flex-1 px-4 sm:px-6 md:px-8 py-10 overflow-auto">
                <h1 className="text-3xl font-bold mb-8 text-orange-500">Historial de emisiones</h1>

                <section>
                    <h2 className="text-2xl font-bold mt-6 mb-4 text-white">Detalle mensual</h2>
                    {historial.length === 0 ? (
                        <p className="text-gray-400">No hay datos mensuales disponibles</p>
                    ) : (
                        <div className="space-y-8">
                            {Object.entries(historialPorAnio).map(([anio, items]) => {
                                const añoNum = Number(anio)
                                return (
                                    <div key={anio} className="space-y-4">
                                        <button
                                            onClick={() => toggleAnioExpandido(añoNum)}
                                            className="flex items-center gap-2 text-xl font-semibold text-orange-500 hover:text-orange-400"
                                        >
                                            {aniosExpandidos[añoNum] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                            Año {anio}
                                        </button>
                                        {aniosExpandidos[añoNum] && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {items.map(item => (
                                                    <div key={item.id} className="bg-zinc-900 border border-zinc-700 p-6 rounded-xl">
                                                        <h4 className="text-lg font-medium text-orange-400 mb-3 capitalize">{item.mes}</h4>
                                                        <div className="grid grid-cols-1 gap-3 text-sm text-white">
                                                            <div className="flex items-center gap-2"><Flame size={16} /><span>Electricidad: {formatNumber(item.electricidad_uso)} kWh</span></div>
                                                            <div className="flex items-center gap-2"><Truck size={16} /><span>Auto: {formatNumber(item.auto_uso)} km</span></div>
                                                            <div className="flex items-center gap-2"><Plane size={16} /><span>Vuelos: {formatNumber(item.avion_uso)} hrs</span></div>
                                                            <div className="flex items-center gap-2"><Trash2 size={16} /><span>Residuos: {formatNumber(item.residuos_uso)} kg</span></div>
                                                            <div className="flex items-center gap-2"><Droplet size={16} /><span>Agua: {formatNumber(item.agua_uso)} litros</span></div>
                                                        </div>
                                                        <p className="mt-4 font-bold text-lg text-white">Emisiones: <span className="text-orange-500">{formatNumber(item.emisiones)} kg CO₂</span></p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </section>

                <section className="mt-16">
                    <h2 className="text-2xl font-bold mb-4 text-white">Resumen anual</h2>
                    {resumen.length === 0 ? (
                        <p className="text-gray-400">No hay datos anuales disponibles</p>
                    ) : (
                        <div className="space-y-4">
                            {resumen.map(r => (
                                <div key={r.id} className="bg-zinc-900 border border-zinc-700 rounded-xl">
                                    <button
                                        onClick={() => toggleAnioExpandido(r.anio)}
                                        className="w-full px-4 py-3 flex justify-between items-center text-white hover:bg-zinc-800 rounded-t-xl"
                                    >
                                        <span className="font-semibold text-orange-500">Año {r.anio}</span>
                                        {aniosExpandidos[r.anio] ? <ChevronUp /> : <ChevronDown />}
                                    </button>
                                    {aniosExpandidos[r.anio] && (
                                        <div className="p-6 text-white grid grid-cols-1 gap-3 text-sm">
                                            <div className="flex items-center gap-2"><Flame size={16} /><span>Electricidad: {formatNumber(r.electricidad)} kWh/mes</span></div>
                                            <div className="flex items-center gap-2"><Truck size={16} /><span>Auto: {formatNumber(r.auto)} km/mes</span></div>
                                            <div className="flex items-center gap-2"><Plane size={16} /><span>Vuelos: {formatNumber(r.avion)} hrs/mes</span></div>
                                            <div className="flex items-center gap-2"><Trash2 size={16} /><span>Residuos: {formatNumber(r.residuos)} kg/mes</span></div>
                                            <div className="flex items-center gap-2"><Droplet size={16} /><span>Agua: {formatNumber(r.agua)} litros/mes</span></div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    )
}
