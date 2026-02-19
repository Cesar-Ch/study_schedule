import { useState } from "react"

export const useDownloadSchedule = (ref) => {
    const [downloadState, setDownloadState] = useState('idle')

    const download = async (e) => {
        e.preventDefault()
        setDownloadState('loading')

        const original = ref.current
        if (!original) return

        const clone = original.cloneNode(true)
        clone.style.cssText = `
            width: ${original.scrollWidth}px;
            max-width: none;
            position: absolute;
            top: -9999px;
            left: 0;
            overflow: visible;
            background: #ffffff;
        `
        document.body.appendChild(clone)

        try {
            const { default: html2canvas } = await import(
                'https://cdn.jsdelivr.net/npm/html2canvas-pro@1.5.8/+esm'
            )
            const canvas = await html2canvas(clone, {
                scale: 2,
                backgroundColor: '#ffffff',
                scrollX: 0,
                scrollY: 0,
                useCORS: true
            })

            const link = document.createElement('a')
            link.download = 'horario.jpg'
            link.href = canvas.toDataURL('image/jpeg', 0.95)
            link.click()

            setDownloadState('success')
            setTimeout(() => setDownloadState('idle'), 2000)
        } catch (err) {
            if (import.meta.env.DEV) console.error('Error al descargar:', err)
            setDownloadState('idle')
        } finally {
            document.body.removeChild(clone)
        }
    }

    return { downloadState, download }
}