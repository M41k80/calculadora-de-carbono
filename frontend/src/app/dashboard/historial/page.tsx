// "use client"
// import { useEffect, useState } from 'react'
// import { Flame, Plane, Droplet, Truck, Trash2 } from 'lucide-react'

// type DetalleMensual = {
//     id: number
//     mes: string
//     anio: number
//     electricidad_uso: number
//     avion_uso: number
//     residuos_uso: number
//     agua_uso: number
//     auto_uso: number
//     emisiones: number
// }

// type ResumenAnual = {
//     id: number
//     anio: number
//     electricidad: number
//     auto: number
//     avion: number
//     residuos: number
//     agua: number
// }

// type ApiResponse = {
//     detalle_mensual?: DetalleMensual[]
//     resumen_anual?: ResumenAnual[]
// }


// const ordenMeses = [
//     'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
//     'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
// ]

// export default function Historial() {
//     const [historial, setHistorial] = useState<DetalleMensual[]>([])
//     const [resumen, setResumen] = useState<ResumenAnual[]>([])
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState<string | null>(null)
    

//     useEffect(() => {
//         const fetchHistorial = async () => {
//             try {
//                 setLoading(true)
//                 setError(null)
                
//                 const token = localStorage.getItem('token')
//                 const email = localStorage.getItem("email")
                
//                 if (!token || !email) {
//                     throw new Error('No se encontró token o email en localStorage')
//                 }

//                 const response = await fetch(`http://localhost:3000/historial/save?email=${email}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 })

//                 if (!response.ok) {
//                     throw new Error(`Error ${response.status}: ${response.statusText}`)
//                 }

//                 const data: ApiResponse = await response.json()
                
//                 // Ordenar el historial por año y luego por mes
//                 const historialOrdenado = (data.detalle_mensual || [])
//                     .sort((a, b) => {
//                         if (a.anio !== b.anio) {
//                             return a.anio - b.anio
//                         }
//                         return ordenMeses.indexOf(a.mes) - ordenMeses.indexOf(b.mes)
//                     })

//                 setHistorial(historialOrdenado)
//                 setResumen(data.resumen_anual || [])
//             } catch (err) {
//                 console.error('Error al cargar historial:', err)
//                 setError(err instanceof Error ? err.message : 'Error desconocido')
//             } finally {
//                 setLoading(false)
//             }
//         }

//         fetchHistorial()
//     }, [])

//     const formatNumber = (num: number) => {
//         return num.toLocaleString('es-CL', {
//             minimumFractionDigits: 2,
//             maximumFractionDigits: 2,
//         })
//     }

//     // Agrupar el historial por año
//     const historialPorAnio = historial.reduce((acc, item) => {
//         if (!acc[item.anio]) {
//             acc[item.anio] = []
//         }
//         acc[item.anio].push(item)
//         return acc
//     }, {} as Record<number, DetalleMensual[]>)

//     if (loading) {
//         return (
//             <main className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-10">
//                 <div className="flex justify-center py-20">
//                     <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//                 </div>
//             </main>
//         )
//     }

//     if (error) {
//         return (
//             <main className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-10">
//                 <div className="bg-red-900/20 border border-red-700 text-red-300 p-4 rounded-lg">
//                     Error: {error}
//                     <button 
//                         onClick={() => window.location.reload()} 
//                         className="ml-4 text-orange-400 hover:text-orange-300"
//                     >
//                         Reintentar
//                     </button>
//                 </div>
//             </main>
//         )
//     }

//     return (
//         <main className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-10">
//             <h1 className="text-3xl font-bold mb-8 text-orange-500">Historial de emisiones</h1>

//             <h2 className="text-2xl font-bold mt-6 mb-4">Detalle mensual</h2>
//             {historial.length === 0 ? (
//                 <p className="text-gray-400">No hay datos mensuales disponibles</p>
//             ) : (
//                 <div className="space-y-8">
//                     {Object.entries(historialPorAnio).map(([anio, items]) => (
//                         <div key={`year-${anio}`} className="space-y-6">
//                             <h3 className="text-xl font-semibold text-orange-500">Año {anio}</h3>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                 {items.map((item) => (
//                                     <div
//                                         key={`month-${item.id}`}
//                                         className="border border-zinc-700 p-6 rounded-xl hover:border-zinc-600 transition-colors"
//                                     >
//                                         <h4 className="text-lg font-medium text-orange-400 mb-3 capitalize">
//                                             {item.mes}
//                                         </h4>
//                                         <div className="grid grid-cols-1 gap-3 text-sm">
//                                             <div className="flex items-center gap-2">
//                                                 <Flame size={16} className="text-orange-500" />
//                                                 <span>Electricidad: {formatNumber(item.electricidad_uso)} kWh</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <Truck size={16} className="text-orange-500" />
//                                                 <span>Auto: {formatNumber(item.auto_uso)} km</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <Plane size={16} className="text-orange-500" />
//                                                 <span>Vuelos: {formatNumber(item.avion_uso)} horas</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <Trash2 size={16} className="text-orange-500" />
//                                                 <span>Residuos: {formatNumber(item.residuos_uso)} kg</span>
//                                             </div>
//                                             <div className="flex items-center gap-2">
//                                                 <Droplet size={16} className="text-orange-500" />
//                                                 <span>Agua: {formatNumber(item.agua_uso)} litros</span>
//                                             </div>
//                                         </div>
//                                         <div className="mt-4 font-bold text-lg">
//                                             Emisiones totales: <span className="text-orange-500">{formatNumber(item.emisiones)} kg CO₂</span>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             <h2 className="text-2xl font-bold mt-16 mb-6">Resumen anual</h2>
//             {resumen.length === 0 ? (
//                 <p className="text-gray-400">No hay datos anuales disponibles</p>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {resumen.map((anio) => (
//                         <div
//                             key={`resumen-${anio.id}`}
//                             className="border border-zinc-700 p-6 rounded-xl hover:border-zinc-600 transition-colors"
//                         >
//                             <h3 className="text-xl font-semibold text-orange-500 mb-3">Año {anio.anio}</h3>
//                             <div className="grid grid-cols-1 gap-3 text-sm">
//                                 <div className="flex items-center gap-2">
//                                     <Flame size={16} className="text-orange-500" />
//                                     <span>Electricidad promedio: {formatNumber(anio.electricidad)} kWh/mes</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <Truck size={16} className="text-orange-500" />
//                                     <span>Auto promedio: {formatNumber(anio.auto)} km/mes</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <Plane size={16} className="text-orange-500" />
//                                     <span>Vuelos promedio: {formatNumber(anio.avion)} horas/mes</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <Trash2 size={16} className="text-orange-500" />
//                                     <span>Residuos promedio: {formatNumber(anio.residuos)} kg/mes</span>
//                                 </div>
//                                 <div className="flex items-center gap-2">
//                                     <Droplet size={16} className="text-orange-500" />
//                                     <span>Agua promedio: {formatNumber(anio.agua)} litros/mes</span>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </main>
//     )
// }

"use client"
import { useEffect, useState } from 'react'
import { Flame, Plane, Droplet, Truck, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

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
                const email = localStorage.getItem("email")
                
                if (!token || !email) {
                    throw new Error('No se encontró token o email en localStorage')
                }

                const response = await fetch(`http://localhost:3000/historial/save?email=${email}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error(`Error ${response.status}: ${response.statusText}`)
                }

                const data: ApiResponse = await response.json()
                
                // historial por año y luego por mes
                const historialOrdenado = (data.detalle_mensual || [])
                    .sort((a, b) => {
                        if (a.anio !== b.anio) {
                            return a.anio - b.anio
                        }
                        return ordenMeses.indexOf(a.mes) - ordenMeses.indexOf(b.mes)
                    })

                setHistorial(historialOrdenado)
                setResumen(data.resumen_anual || [])

                
                const nuevosExpandidos: Record<number, boolean> = {}
                
                historialOrdenado.forEach(item => {
                    nuevosExpandidos[item.anio] = true
                })
                
                if (data.resumen_anual) {
                    data.resumen_anual.forEach(item => {
                        nuevosExpandidos[item.anio] = true
                    })
                }

                setAniosExpandidos(nuevosExpandidos)
            } catch (err) {
                console.error('Error al cargar historial:', err)
                setError(err instanceof Error ? err.message : 'Error desconocido')
            } finally {
                setLoading(false)
            }
        }

        fetchHistorial()
    }, [])

    const formatNumber = (num: number) => {
        return num.toLocaleString('es-CL', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
    }

    // Agrupar el historial por año
    const historialPorAnio = historial.reduce((acc, item) => {
        if (!acc[item.anio]) {
            acc[item.anio] = []
        }
        acc[item.anio].push(item)
        return acc
    }, {} as Record<number, DetalleMensual[]>)

    if (loading) {
        return (
            <main className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-10">
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
                </div>
            </main>
        )
    }

    if (error) {
        return (
            <main className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-10">
                <div className="bg-red-900/20 border border-red-700 text-red-300 p-4 rounded-lg">
                    Error: {error}
                    <button 
                        onClick={() => window.location.reload()} 
                        className="ml-4 text-orange-400 hover:text-orange-300"
                    >
                        Reintentar
                    </button>
                </div>
            </main>
        )
    }

    return (
        <main className="px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-10">
            <h1 className="text-3xl font-bold mb-8 text-orange-500">Historial de emisiones</h1>

            <h2 className="text-2xl font-bold mt-6 mb-4">Detalle mensual</h2>
            {historial.length === 0 ? (
                <p className="text-gray-400">No hay datos mensuales disponibles</p>
            ) : (
                <div className="space-y-8">
                    {Object.entries(historialPorAnio).map(([anio, items]) => {
                        const anioNum = parseInt(anio)
                        return (
                            <div key={`year-${anio}`} className="space-y-4">
                                <button
                                    onClick={() => toggleAnioExpandido(anioNum)}
                                    className="flex items-center gap-2 text-xl font-semibold text-orange-500 hover:text-orange-400"
                                >
                                    {aniosExpandidos[anioNum] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    Año {anio}
                                </button>
                                
                                {aniosExpandidos[anioNum] && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {items.map((item) => (
                                            <div
                                                key={`month-${item.id}`}
                                                className="border border-zinc-700 p-6 rounded-xl hover:border-zinc-600 transition-colors"
                                            >
                                                <h4 className="text-lg font-medium text-orange-400 mb-3 capitalize">
                                                    {item.mes}
                                                </h4>
                                                <div className="grid grid-cols-1 gap-3 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <Flame size={16} className="text-orange-500" />
                                                        <span>Electricidad: {formatNumber(item.electricidad_uso)} kWh</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Truck size={16} className="text-orange-500" />
                                                        <span>Auto: {formatNumber(item.auto_uso)} km</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Plane size={16} className="text-orange-500" />
                                                        <span>Vuelos: {formatNumber(item.avion_uso)} horas</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Trash2 size={16} className="text-orange-500" />
                                                        <span>Residuos: {formatNumber(item.residuos_uso)} kg</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Droplet size={16} className="text-orange-500" />
                                                        <span>Agua: {formatNumber(item.agua_uso)} litros</span>
                                                    </div>
                                                </div>
                                                <div className="mt-4 font-bold text-lg">
                                                    Emisiones totales: <span className="text-orange-500">{formatNumber(item.emisiones)} kg CO₂</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            )}

            <h2 className="text-2xl font-bold mt-16 mb-4">Resumen anual</h2>
            {resumen.length === 0 ? (
                <p className="text-gray-400">No hay datos anuales disponibles</p>
            ) : (
                <div className="space-y-4">
                    {resumen.map((anio) => (
                        <div key={`resumen-${anio.id}`} className="border border-zinc-700 rounded-xl overflow-hidden">
                            <button
                                onClick={() => toggleAnioExpandido(anio.anio)}
                                className="w-full p-4 text-left flex items-center justify-between hover:bg-zinc-800 transition-colors"
                            >
                                <h3 className="text-xl font-semibold text-orange-500">
                                    Año {anio.anio}
                                </h3>
                                {aniosExpandidos[anio.anio] ? <ChevronUp /> : <ChevronDown />}
                            </button>
                            
                            {aniosExpandidos[anio.anio] && (
                                <div className="p-6 bg-zinc-900/50">
                                    <div className="grid grid-cols-1 gap-3 text-sm">
                                        <div className="flex items-center gap-2">
                                            <Flame size={16} className="text-orange-500" />
                                            <span>Electricidad promedio: {formatNumber(anio.electricidad)} kWh/mes</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Truck size={16} className="text-orange-500" />
                                            <span>Auto promedio: {formatNumber(anio.auto)} km/mes</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Plane size={16} className="text-orange-500" />
                                            <span>Vuelos promedio: {formatNumber(anio.avion)} horas/mes</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Trash2 size={16} className="text-orange-500" />
                                            <span>Residuos promedio: {formatNumber(anio.residuos)} kg/mes</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Droplet size={16} className="text-orange-500" />
                                            <span>Agua promedio: {formatNumber(anio.agua)} litros/mes</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}