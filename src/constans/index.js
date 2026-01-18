export const days = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
];

export const hours = Array.from({ length: 17 }, (_, i) => {
    const start = 6 + i;
    const end = start + 1;
    return `${start}:00 - ${end}:00`;
});

export const events = [
  {
    title: "Algoritmos II",
    day: 0, // Lunes
    start: 8,
    end: 10,
  },
  {
    title: "Cálculo Diferencial",
    day: 2, // Miércoles
    start: 9,
    end: 11,
  },
  {
    title: "Base de Datos",
    day: 4, // Viernes
    start: 11,
    end: 13,
  },
];