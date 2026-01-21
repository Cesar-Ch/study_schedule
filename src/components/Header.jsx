import { IconGithub, IconLogo } from './Icons'

export const Header = () => {
    return (
        <header className="fixed w-full top-0 left-0 border-b dark:border-gray-800 bg-bg-card z-50">
            <div className="flex justify-between items-center mx-auto px-6 py-3">
                <div className="flex items-center gap-2 transition-all duration-500 ease-in-out text-black dark:text-white">
                    <IconLogo />
                    Schedule
                </div>
                <a href="https://github.com/Cesar-Ch/study_schedule" target="_blank" title="Visita el repositorio de este proyecto en GitHub" className="transition-all duration-500 ease-in-out text-black dark:text-white">
                    <IconGithub />
                </a>
            </div>
        </header>
    )
}
