import { useState } from 'react';

export const useLocalStorage = (key, defaultValue) => {
    const [value, setValue] = useState(() => {
        const storedData = localStorage.getItem(key);
        if ((storedData !== null || undefined) && (storedData !== "[object Object]")) {
            if (storedData.length !== 0) {
                // console.log(storedData)
                return JSON.parse(storedData)
            }
        }
        return { defaultValue }

    });

    const setLocalStorageValue = (newValue) => {
        localStorage.setItem(key, JSON.stringify(newValue));

        setValue(newValue);
    };

    return [
        value,
        setLocalStorageValue,
    ];
}