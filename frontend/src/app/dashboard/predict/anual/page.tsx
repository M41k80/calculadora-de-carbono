'use client';
import { useState } from 'react';
import { getAnnualPrediction, PredictionAnualResponse } from '@/api/prediccion/predictionsAnual';

const UploadCSV = () => {
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [resultados, setResultados] = useState<PredictionAnualResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCsvFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!csvFile) return;

        const formData = new FormData();
        formData.append("csv", csvFile);

        try {
            setLoading(true);
            const data = await getAnnualPrediction(formData);
            setResultados(data);

            
            const email = localStorage.getItem("email");
            console.log('UserId:', email);
            const token = localStorage.getItem("token");
            console.log('Token enviado:', token);



            const response = await fetch("http://localhost:3000/historial/save", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, 
                    detalle_mensual: data.detalle_mensual,
                    resumen_anual: data.resumen_anual,
                }),
            });


            if (!response.ok) {
                if (response.status === 401) {
                    setError('Token de autenticación inválido o expirado');
                } else {
                    setError('Error al guardar el historial');
                }
                throw new Error('Error al guardar el historial');
            }


            alert('Predicción guardada correctamente');
        } catch (error: unknown) {
            setError(`Hubo un error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit" disabled={loading}>
                    {loading ? 'Cargando...' : 'Subir CSV'}
                </button>
            </form>

            {error && <p>{error}</p>}
            {resultados && (
                <div>
                    <h3>Resumen Anual</h3>
                    {resultados.resumen_anual.map((anio) => (
                        <div key={anio.anio}>
                            <h4>{anio.anio}</h4>
                            <p>Emisiones Anuales Totales: {anio.emisiones_totales.toFixed(2)} kg</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UploadCSV;
