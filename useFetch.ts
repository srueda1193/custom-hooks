import { useEffect, useState } from 'react'
import { StateInterface } from '../interfaces/StateInterface';

const localCache: any = {};

export const useFetch = (url: string) => {

    const [state, setState] = useState<StateInterface>({
        data: null,
        isLoading: true,
        hasError: false,
        error: {
            code: 0,
            message: ''
        }
    });

    useEffect(() => {
        getFecth();
    }, [url]);

    const setLoadingState = () => {
        setState({
            data: null,
            isLoading: true,
            hasError: false,
            error: {
                code: 0,
                message: ''
            }
        });
    }

    const getFecth = async () => {

        if(localCache[url]){
            console.log('usando el cache');
            setState({
                data: localCache[url],
                isLoading: false,
                hasError: false,
                error: null
            });
            return;
        }

        setLoadingState();
        const response = await fetch(url);

        if (!response.ok) {
            setState({
                data: null,
                isLoading: false,
                hasError: true,
                error: {
                    code: response.status,
                    message: response.statusText
                }
            });

            return;
        }

        const data = await response.json();

        setState({
            data: data,
            isLoading: false,
            hasError: false,
            error: null
        })

        localCache[url]= data;


        console.log(state);
    }

    return {
        data: state.data,
        isLoading: state.isLoading,
        hasError: state.hasError,
    }
}
