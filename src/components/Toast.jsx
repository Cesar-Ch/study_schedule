import { useToast } from '../context/ToastContext'
import { IconX, Check } from './Icons'

const toastColor = {
    success: 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20',
    error: 'bg-rose-500/10 text-red-500 ring-rose-500/20',
    warning: 'bg-amber-500/10 text-amber-500 ring-amber-500/20',
    info: 'bg-blue-500/10 text-blue-500 ring-blue-500/20'
}

const toastBorder = {
    success: 'border-l-emerald-500 hover:border-emerald-500/50',
    error: 'border-l-red-500 hover:border-rose-500/50',
    warning: 'border-l-amber-500 hover:border-amber-500/50',
    info: 'border-l-blue-500 hover:border-blue-500/50'
}

const ToastItem = ({ toast, onRemove }) => (
    <div className={`toast pointer-events-auto bg-bg-field border border-border-dim/80 border-l-4 rounded-xl p-4 shadow-2xl shadow-black/50 flex items-center gap-4 overflow-hidden group transition-all backdrop-blur-xl opacity-100 ${toastBorder[toast.type]}`}>
        <div className={`p-2 rounded-full shrink-0 flex items-center justify-center ring-1 ${toastColor[toast.type]}`}>
            <span className="text-xl leading-none">
                {toast.type === 'success' ? <Check /> : <IconX />}
            </span>
        </div>
        <div className="py-0.5">
            <p className="text-xs font-medium dark:text-zinc-400 text-zinc-500 leading-snug">{toast.message}</p>
        </div>
        <button
            className="text-zinc-500 hover:text-white hover:bg-white/10 p-1 rounded-lg transition-colors shrink-0 -mr-1 -mt-5"
            onClick={() => onRemove(toast.id)}
        >
            <span className="text-lg"><IconX /></span>
        </button>
    </div>
)

export const Toast = () => {
    const { toasts, removeToast } = useToast()
    if (toasts.length === 0) return null

    return (
        <div className='fixed top-3 right-3 z-100 flex flex-col gap-2'>
            {toasts.map(toast => (
                <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
            ))}
        </div>
    )
}