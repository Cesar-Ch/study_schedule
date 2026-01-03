import { IconToastError, ToastCheck } from "./Icons"

const Toast = ({ typeToast, children }) => {
    return (

        <div className="z-50 top-10 right-10 fixed flex items-center justify-start w-[240px]  p-4 rounded-lg bg-[#fff]/80 backdrop-blur-sm dark:bg-[#0e0e11]/80 dark:bg-opacity-50 border border-gray-700 dark:border-gray-200 animation__toast ">
            {
                typeToast === "success" ? (
                    <ToastCheck />
                ) : (
                    <IconToastError />
                )
            }
            <p className="mx-2 text-sm font-medium">{children}</p>
        </div>
    )
}

export default Toast