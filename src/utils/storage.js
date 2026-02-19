export const getFromStorage = (key, fallback = null) => {
    try {
        const item = localStorage.getItem(key)
        return item ? JSON.parse(item) : fallback
    } catch {
        return fallback
    }
}

export const setToStorage = (key, value) => {
    try {
        localStorage.setItem(key, JSON.stringify(value))
    } catch (e) {
        console.warn(`Error saving to localStorage`)
    }
}