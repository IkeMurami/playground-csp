

const LocalStorage = (function () {
    const addObjectToLocalStorage = (key: string, value: object) => {
        window.localStorage.setItem(key, JSON.stringify(value))
    }
    
    const getObjectFromLocalStorage = (key: string, defaultValue?: object) => {
        const value = window.localStorage.getItem(key)
    
        return value && JSON.parse(value) || defaultValue
    }
    
    const removeObjecFromLocalStorage = (key: string) => {
        window.localStorage.removeItem(key)
    }

    return {
        add: addObjectToLocalStorage,
        get: getObjectFromLocalStorage,
        remove: removeObjecFromLocalStorage
    }
}())

export default LocalStorage