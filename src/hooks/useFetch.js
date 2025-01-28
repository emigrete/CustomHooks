import { useState } from 'react';

export const useFetch = () => {
    const [state, setState] = useState({
        data: null,
        isLoading: true,
        error: null,
    });

    const fetchData = async (url, method, bodyData = null) => {
        if (!url) return; // Asegúrate de que la URL no sea nula o vacía

        try {

            const options = {
                method,
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                },
                body: method == 'GET' || method == 'DELETE' ? null: JSON.stringify(bodyData),
            }
            const res = await fetch(url, options);
            const data = await res.json();

            setState({
                data,
                isLoading: false,
                error: null,
            });
        } catch (error) {
            setState({
                data: null,
                isLoading: false,
                error: error.message || 'Algo Fallo', // Captura el error como string
            });
        }
    };

    return {
        data: state.data,
        isLoading: state.isLoading,
        error: state.error,
        fetchData,
    };
};
