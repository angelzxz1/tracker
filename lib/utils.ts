import { Data } from "@/components/charts/charts";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type byDayType = { day: string; spent: number };

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function Max(array: byDayType[]) {
    if (array.length === 0) {
        throw new Error("El array está vacío");
    }

    let maximo = array[0];
    for (let i = 0; i < array.length; i++) {
        if (array[i].spent > maximo.spent) {
            maximo = array[i];
        }
    }
    return maximo;
}
export function Min(array: byDayType[]) {
    let min = array[0];
    for (let i = 0; i < array.length; i++) {
        if (
            (array[i].spent < min.spent && array[i].spent > 0) ||
            min.spent === 0
        ) {
            min = array[i];
        }
    }
    return min;
}

export function Average(array: byDayType[]) {
    if (array.length === 0) {
        0;
    }
    let average = 0;
    for (let i = 1; i < array.length; i++) {
        average += array[i].spent;
    }
    return average / array.length;
}

export const getDayOfTheWeek = (day: number): string => {
    const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    if (day < 0 || day > 6) {
        throw new Error("Day must be a number between 0 and 6.");
    }
    return daysOfWeek[day];
};
export const getMonthOfTheYear = (month: number): string => {
    const monthsOfTheYear = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];
    if (month < 0 || month > 12) {
        throw new Error("Month must be a number between 0 and 11.");
    }
    return monthsOfTheYear[month];
};
export const getFullMonthOfTheYear = (month: number): string => {
    const monthsOfTheYear = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    if (month < 0 || month > 12) {
        throw new Error("Month must be a number between 0 and 11.");
    }
    return monthsOfTheYear[month];
};
export const getFormat = (date: Date) => {
    return {
        day: date.getDay(),
        month: date.getMonth(),
        year: date.getFullYear(),
        date: date.getDate(),
    };
};

export const formatCurrency = (
    amount: number,
    locale: string = "en-US",
    currency: string = "USD"
): string => {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currency,
    }).format(amount);
};

export const calcDec = (num: number) => {
    const toStr = num.toString();
    const decs = toStr.length - 2;
    const mult = 10 ** decs;
    return (Math.round(num / mult) + 2) * mult;
};

export const byDay = (arr: Data[]) => {
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
    }
};

export function groupItemsByDate(items: Data[]): {
    [date: string]: Data[];
} {
    const groupedItems: { [date: string]: Data[] } = {};
    const currentDate = new Date().toISOString().split("T")[0];
    const last7 = obtenerUltimos7Dias(currentDate);
    let last7count = 0;
    for (let i = 0; i < last7.length; i++) {
        groupedItems[last7[i]] = [];
    }
    items.forEach((item) => {
        const date = new Date(item.createdAt).toISOString().split("T")[0]; // Fecha del item
        groupedItems[date].push(item);
    });
    return groupedItems;
}

export function groupMedia(items: { [date: string]: Data[] }) {
    const mediaArray: byDayType[] = [];

    for (const date in items) {
        let sum = 0;
        if (items[date].length > 0) {
            for (let j = 0; j < items[date].length; j++) {
                sum += items[date][j].amountSpent;
            }
        }
        mediaArray.push({
            day: date,
            spent: sum,
        });
    }
    return mediaArray;
}

function obtenerUltimos7Dias(fecha: string): string[] {
    const fechaBase = new Date(fecha);
    const ultimos7Dias: string[] = [];
    for (let i = 0; i < 7; i++) {
        const fechaAnterior = new Date(fechaBase);
        fechaAnterior.setDate(fechaBase.getDate() + 1 - i);
        const año = fechaAnterior.getFullYear();
        const mes = (fechaAnterior.getMonth() + 1).toString().padStart(2, "0");
        const dia = fechaAnterior.getDate().toString().padStart(2, "0");
        const fechaFormateada = `${año}-${mes}-${dia}`;

        ultimos7Dias.push(fechaFormateada);
    }

    return ultimos7Dias;
}

export const date7DaysAgo = (): Date => {
    const fechaActual = new Date(new Date().toISOString().split("T")[0]);
    const hace7Dias = new Date(fechaActual);
    hace7Dias.setDate(fechaActual.getDate() - 6);
    return hace7Dias;
};

export const formatDate = (date: Date): string => {
    return `${getDayOfTheWeek(date.getDay())}, ${getMonthOfTheYear(
        date.getMonth()
    )} ${date.getDate()} ${date.getFullYear()}`;
};
