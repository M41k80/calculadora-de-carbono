import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";





const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, detalle_mensual, resumen_anual } = body;

    if (!email) {
        return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    try {
        const detalleWithUser = detalle_mensual.map((item: { mes: string; electricidad: number; auto: number; avion: number; residuos: number; agua: number }) => ({
            ...item,
            email,
        }));

        const { error: detalleError } = await supabase
            .from("detalle_mensual")
            .upsert(detalleWithUser, { onConflict: "email,anio,mes" });




        if (detalleError) throw detalleError;

        const resumenWithUser = resumen_anual.map((item: {
            anio: number;
            promedios_mensuales: {
                electricidad: number;
                auto: number;
                avion: number;
                residuos: number;
                agua: number;
            }
        }) => ({
            anio: item.anio,
            email,
            electricidad: item.promedios_mensuales.electricidad,
            auto: item.promedios_mensuales.auto,
            avion: item.promedios_mensuales.avion,
            residuos: item.promedios_mensuales.residuos,
            agua: item.promedios_mensuales.agua,
        }));

        const { error: resumenError } = await supabase
            .from("resumen_anual")
            .insert(resumenWithUser);

        if (resumenError) throw resumenError;

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error al guardar historial en Supabase:", error);
        return NextResponse.json({ error: "Error al guardar historial" }, { status: 500 });
    }
}




export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
        return NextResponse.json({ error: "Email es requerido" }, { status: 400 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    try {
        const { data: detalle, error: detalleError } = await supabase
            .from("detalle_mensual")
            .select("*")
            .eq("email", email)
            .order("mes");

        if (detalleError) throw detalleError;

        const { data: resumen, error: resumenError } = await supabase
            .from("resumen_anual")
            .select("*")
            .eq("email", email)
            .order("anio");

        if (resumenError) throw resumenError;

        return NextResponse.json({
            detalle_mensual: detalle,
            resumen_anual: resumen,
        });
    } catch (error: unknown) {
        console.error("Error al obtener historial:", error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
    }
}
