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

export const courseColors = [
    {
        schedule: 'bg-[#eef2ff] dark:bg-[#1b1b2b] border-[#6366f1] dark:border-[#5b5edf] text-[#3730a3] dark:text-[#a5b4fc]',
        list: 'checked:bg-[#6366f1] border-[#6366f1] dark:border-[#5b5edf]',
        indicator: 'bg-[#6366f1] dark:bg-[#5b5edf]',
        section: 'bg-[#eef2ff] dark:bg-[#1b1b2b] text-[#3730a3] dark:text-[#a5b4fc] border border-[#6366f1]/50 dark:border-[#5b5edf]/50'
    },
    {
        schedule: 'bg-[#eff6ff] dark:bg-[#0f1e33] border-[#3b82f6] dark:border-[#60a5fa] text-[#1e40af] dark:text-[#93c5fd]',
        list: 'checked:bg-[#3b82f6] border-[#3b82f6] dark:border-[#60a5fa]',
        indicator: 'bg-[#3b82f6] dark:bg-[#60a5fa]',
        section: 'bg-[#eff6ff] dark:bg-[#0f1e33] text-[#1e40af] dark:text-[#93c5fd] border border-[#3b82f6]/50 dark:border-[#60a5fa]/50'
    },
    {
        schedule: 'bg-[#fffbeb] dark:bg-[#2b1f0a] border-[#f59e0b] dark:border-[#fbbf24] text-[#92400e] dark:text-[#fde68a]',
        list: 'checked:bg-[#f59e0b] border-[#f59e0b] dark:border-[#fbbf24]',
        indicator: 'bg-[#f59e0b] dark:bg-[#fbbf24]',
        section: 'bg-[#fffbeb] dark:bg-[#2b1f0a] text-[#92400e] dark:text-[#fde68a] border border-[#f59e0b]/50 dark:border-[#fbbf24]/50'
    },
    {
        schedule: 'bg-[#f5f3ff] dark:bg-[#221b33] border-[#8b5cf6] dark:border-[#a78bfa] text-[#5b21b6] dark:text-[#c4b5fd]',
        list: 'checked:bg-[#8b5cf6] border-[#8b5cf6] dark:border-[#a78bfa]',
        indicator: 'bg-[#8b5cf6] dark:bg-[#a78bfa]',
        section: 'bg-[#f5f3ff] dark:bg-[#221b33] text-[#5b21b6] dark:text-[#c4b5fd] border border-[#8b5cf6]/50 dark:border-[#a78bfa]/50'
    },
    {
        schedule: 'bg-[#ecfdf5] dark:bg-[#0f2a1f] border-[#10b981] dark:border-[#34d399] text-[#065f46] dark:text-[#6ee7b7]',
        list: 'checked:bg-[#10b981] border-[#10b981] dark:border-[#34d399]',
        indicator: 'bg-[#10b981] dark:bg-[#34d399]',
        section: 'bg-[#ecfdf5] dark:bg-[#0f2a1f] text-[#065f46] dark:text-[#6ee7b7] border border-[#10b981]/50 dark:border-[#34d399]/50'
    },
    {
        schedule: 'bg-[#f0f9ff] dark:bg-[#0c2533] border-[#0ea5e9] dark:border-[#38bdf8] text-[#075985] dark:text-[#7dd3fc]',
        list: 'checked:bg-[#0ea5e9] border-[#0ea5e9] dark:border-[#38bdf8]',
        indicator: 'bg-[#0ea5e9] dark:bg-[#38bdf8]',
        section: 'bg-[#f0f9ff] dark:bg-[#0c2533] text-[#075985] dark:text-[#7dd3fc] border border-[#0ea5e9]/50 dark:border-[#38bdf8]/50'
    },
    {
        schedule: 'bg-[#fff7ed] dark:bg-[#2b160a] border-[#f97316] dark:border-[#fb923c] text-[#9a3412] dark:text-[#fdba74]',
        list: 'checked:bg-[#f97316] border-[#f97316] dark:border-[#fb923c]',
        indicator: 'bg-[#f97316] dark:bg-[#fb923c]',
        section: 'bg-[#fff7ed] dark:bg-[#2b160a] text-[#9a3412] dark:text-[#fdba74] border border-[#f97316]/50 dark:border-[#fb923c]/50'
    },
    {
        schedule: 'bg-[#fff1f2] dark:bg-[#2b1216] border-[#f43f5e] dark:border-[#fb7185] text-[#9f1239] dark:text-[#fda4af]',
        list: 'checked:bg-[#f43f5e] border-[#f43f5e] dark:border-[#fb7185]',
        indicator: 'bg-[#f43f5e] dark:bg-[#fb7185]',
        section: 'bg-[#fff1f2] dark:bg-[#2b1216] text-[#9f1239] dark:text-[#fda4af] border border-[#f43f5e]/50 dark:border-[#fb7185]/50'
    },
    {
        schedule: 'bg-[#f0fdfa] dark:bg-[#0f2a2a] border-[#14b8a6] dark:border-[#2dd4bf] text-[#115e59] dark:text-[#5eead4]',
        list: 'checked:bg-[#14b8a6] border-[#14b8a6] dark:border-[#2dd4bf]',
        indicator: 'bg-[#14b8a6] dark:bg-[#2dd4bf]',
        section: 'bg-[#f0fdfa] dark:bg-[#0f2a2a] text-[#115e59] dark:text-[#5eead4] border border-[#14b8a6]/50 dark:border-[#2dd4bf]/50'
    },
    {
        schedule: 'bg-[#fdf2f8] dark:bg-[#2b1220] border-[#ec4899] dark:border-[#f472b6] text-[#9d174d] dark:text-[#f9a8d4]',
        list: 'checked:bg-[#ec4899] border-[#ec4899] dark:border-[#f472b6]',
        indicator: 'bg-[#ec4899] dark:bg-[#f472b6]',
        section: 'bg-[#fdf2f8] dark:bg-[#2b1220] text-[#9d174d] dark:text-[#f9a8d4] border border-[#ec4899]/50 dark:border-[#f472b6]/50'
    }
];

export const getCourseColorIndex = (courseName, allCourses) => {
    const uniqueCourses = [...new Set(allCourses.map(c => c.nombre))];
    const index = uniqueCourses.indexOf(courseName);
    return index % courseColors.length;
};

export const getCourseColor = (courseName, allCourses) => {
    const index = getCourseColorIndex(courseName, allCourses);
    return courseColors[index];
};