import {ChangeEvent, useState, Dispatch, SetStateAction} from 'react';

export function useForm<T>(inputValues: T): [T, (event: ChangeEvent<HTMLInputElement>)=>void,  Dispatch<SetStateAction<T>>] {
  const [values, setValues] = useState<T>(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = event.target;
    setValues({...values, [name]: value});
  };

  return [values, handleChange, setValues];
}
