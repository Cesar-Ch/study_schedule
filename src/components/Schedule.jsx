const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes","Sábado", "Domingo"]
const horas = Array.from({ length: 16 }, (_, i) => i + 7)



const Schedule = () => {

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="border border-[#64748b]/50 dark:border-[#a1a1aa]/50 p-2 bg-[#f1f5f9] text-[#64748b] font-bold dark:bg-[#27272a] dark:text-[#a1a1aa]">Hora</th>
                        {dias.map((dia) => (
                            <th key={dia} className="border border-[#64748b]/50 dark:border-[#a1a1aa]/50 p-2 bg-[#f1f5f9] text-[#64748b] font-bold dark:bg-[#27272a] dark:text-[#a1a1aa]">
                                {dia}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {horas.map((hora) => (
                        <tr key={hora}>
                            <td className="border border-[#64748b]/50 dark:border-[#a1a1aa]/50 p-2 bg-[#f1f5f9] text-[#64748b] dark:bg-[#27272a] dark:text-[#a1a1aa]">{`${hora}:00`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default Schedule