import { useState } from "react";

interface FormData{
    username?: string,
    email?: string,
    password?: string,
    description?:string
}

export const useForm = (initialForm: FormData) => {


    const [formState, setFormState] = useState(initialForm);


    const onInputChange = ({ target }:any) => {

        const { name, value } = target;
        setFormState({
            ...formState,
            [name]: value
        });

    }

    const onResetForm = () =>{
        setFormState(initialForm);
    }


    return {
        ...formState,
        onInputChange,
        onResetForm
    }
}
