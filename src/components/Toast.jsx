import { useToast } from '../context/ToastContext';
import { IconX, Check } from './Icons';

export const Toast = () => {

    const { toasts,removeToast } = useToast()
    console.log(toasts)
    if (toasts.length === 0) return null

    return (
        <div className='fixed top-3 right-3 z-100 flex flex-col gap-2'>
            {
                toasts.map((toast) => (
                    <div key={toast.id} className="toast  pointer-events-auto bg-[#1E1E1E] border border-border-dim/80 border-l-4 border-l-emerald-500 rounded-xl p-4 shadow-2xl shadow-black/50 flex items-center gap-4 overflow-hidden group hover:border-emerald-500/50 transition-all backdrop-blur-xl opacity-100">
                        <div className="text-emerald-500 bg-emerald-500/10 p-2 rounded-full shrink-0 flex items-center justify-center ring-1 ring-emerald-500/20">
                            <span className="text-xl leading-none">
                                <Check />
                            </span>
                        </div>
                        <div className=" py-0.5">
                            <p className="text-xs font-medium text-zinc-400 leading-snug">{toast.message}</p>
                        </div>
                        <button className="text-zinc-500 hover:text-white hover:bg-white/10 p-1 rounded-lg transition-colors shrink-0 -mr-1 -mt-5" onClick={() => removeToast(toast.id)}>
                            <span className="text-lg">
                                <IconX />
                            </span>
                        </button>
                    </div>

                ))
            }

        </div>
    )
}



