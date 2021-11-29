import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import dataService from '../services/data.service';
import authService from '../services/auth.service';


function CreateUser() {
    const {register, handleSubmit, reset} = useForm();
    const [isPt, setIsPt] = useState(false);
    useEffect(() => {
        const user = authService.getCurrentUser();
        if(user.Role == "PersonalTrainer"){
            setIsPt(true);
        }
    }, []);

    const onCreate = async (data: {firstName: string,
        lastName: string,
        email: string,
        password: string,
        ptId : number | null}) => {
        dataService.createUser(
            data.firstName,
            data.lastName,
            data.email,
            data.password,
            data.ptId);
            reset();
    }

    return (
        <div className="react-hooks-form">
          <form onSubmit={handleSubmit(onCreate)}>
              <div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    {...register("firstName", {required: "required",})} type="firstName"/>
              </div>
              <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    {...register("lastName", {required: "required",})} type="lastName"/>
              </div>
              <div>
                  <label htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    {...register("email", {required: "required",})} type="email"/>
              </div>
              <div>
                  <label htmlFor="password">Password</label>
                  <input 
                  id="password" 
                  {...register("password", 
                  {required: "required",})} type="password"/>
              </div>
              {isPt && (
                  <div>
                      <label htmlFor="ptId">Personal Trainer Id</label>
                      <input
                      id="ptId"
                      {...register("ptId")}/>
                  </div>
              )}
              <input type="submit"/>
          </form>
      </div>
    )
}

export default CreateUser
