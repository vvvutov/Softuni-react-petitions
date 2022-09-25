import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const storedData = localStorage.getItem(key);
            if (storedData) {
                return JSON.parse(storedData)
            }
        return defaultValue;
    });

    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));

        setValue(newValue);
    };
console.log(value, defaultValue)
    return [
        value,
        setLocalStorageValue,
    ];
}