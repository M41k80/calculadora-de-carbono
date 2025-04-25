export const getFutureMonths = (count: number) => {
    const now = new Date();
    const monthsList = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const futureMonths = [];

    for (let i = 0; i < count; i++) {
        const monthIndex = now.getMonth() + i;
        const year = now.getFullYear() + Math.floor(monthIndex / 12);
        const monthName = monthsList[monthIndex % 12];
        futureMonths.push({ month: monthName, year });
    }

    return futureMonths;
};
