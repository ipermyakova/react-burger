import React, { useState, ChangeEvent } from 'react';

export function useForm<T>(inputValues: T) {
    const [edit, setEdit ] = useState<boolean>(false);
    const [values, setValues] = useState<T>(inputValues);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {value, name} = event.target;
        setValues({...values, [name]: value});
        setEdit(true);
    };
    return {values, handleChange, setValues, edit, setEdit};
}