import {useState, useCallback, useRef, useEffect} from 'react';

export const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    // turn into reference which is peace of data which will be not changed when this func. runs again
    const activeHttpRequests = useRef([]);

    // wrap it with callback so this function never gets recreated when the component that uses this hook re-renders
    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            setIsLoading(true);
            // represents a controller object that allows you to abort one or more Web requests as and when desired
            const httpAbortCtrl = new AbortController();
            activeHttpRequests.current.push(httpAbortCtrl);

            try {
                const response = await fetch(url, {
                    method,
                    body,
                    headers,
                    signal: httpAbortCtrl.signal
                });

                const responseData = await response.json();

                activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                );

                if (!response.ok) {
                    throw new Error(responseData.message);
                }

                setIsLoading(false);
                return responseData;
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
                throw err;
            }
        },
        []
    );

    const clearError = () => {
        setError(null);
    };

    useEffect(() => {
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
        };
    }, []);

    return {isLoading, error, sendRequest, clearError};
};
