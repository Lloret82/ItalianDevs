import React from 'react';
import { useForm } from 'react-hook-form';

function Form({ _id }) {

      const {
            register,
            handleSubmit,
            formState: { errors },
      } = useForm();
      const onSubmit = (data) => console.log(data);

      return (
            <form onSubmit={handleSubmit(onSubmit)}>
                  <input {...register('name', { required: true })} />
                  {errors.name && <p>Name is required.</p>}
                  <textarea name="text" ref={register}></textarea>{errors.text && <p>Comment is required</p>}
                  <input type="submit" />
            </form>
      );
}
export default Form