const AddCourse = () => {
    return (
        <div>

            <h2 className="text-2xl font-semibold mb-4">Agregar Curso</h2>
            <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-[#18181b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre del curso" required />

            <div className="mt-5 grid grid-cols-2 gap-4">
                <input type="text" id="first_name" className="col-span-[span 3] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#18181b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre del profesor" required />

                <input type="text" id="first_name" className="col-span-[50%] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-[#18181b] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Grupo" required />

            </div>


            <div className="p-4 bg-[#f1f5f9] dark:bg-[#27272a] rounded-lg mt-4 grid grid-cols-3 gap-4">
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-[#1f2023] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected value="LU">Lunes</option>
                    <option value="MA">Martes</option>
                    <option value="MI">Miércoles</option>
                    <option value="JU">Jueves</option>
                    <option value="VI">Viernes</option>
                    <option value="SA">Sábado</option>
                    <option value="DO">Domingo</option>
                </select>

                <input type="time" id="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-[#1f2023] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:[color-scheme:dark]" min="09:00" max="18:00" required />
                <input type="time" id="time" className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  p-2.5 dark:bg-[#1f2023] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:[color-scheme:dark]" min="09:00" max="18:00" required />

            </div>
            <div className="mt-5 flex justify-between items-center ">

                <button className="text-black bg-white hover:bg-[#f1f5f9] border border-black font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-black dark:text-white dark:hover:bg-[#27272a] dark:border-white ">
                    Añadir otro horario
                </button>
                <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">
                    Guardar curso
                </button>
            </div>

        </div>
    )
}

// 3a72ec

export default AddCourse