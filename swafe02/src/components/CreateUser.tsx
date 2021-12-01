import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import dataService from '../services/data.service';
import authService from '../services/auth.service';
import styles from '../Styles/createUser.module.scss';


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
        <div className="react-hooks-form" style={{float: 'left', marginLeft:'15%'}}>
            <h2>
                Create user 
            </h2>
          <form onSubmit={handleSubmit(onCreate)}>
              <div>
                  <input
                  className={styles.inputField}
                    id="firstName"
                    placeholder='First name'
                    {...register("firstName", {required: "required",})} type="firstName"/>
              </div>
              <div>
                  <input
                  className={styles.inputField}
                    id="lastName" 
                    placeholder='Last name'
                    {...register("lastName", {required: "required",})} type="lastName"/>
              </div>
              <div>
                  <input className={styles.inputField}
                    id="email"
                    placeholder='E-mail'
                    {...register("email", {required: "required",})} type="email"/>
              </div>
              <div>
                  <input className={styles.password}
                  id="password" 
                  placeholder='Password'
                  {...register("password", 
                  {required: "required",})} type="password"/>
              </div>
              {isPt && (
                  <div>
                      <input
                      className={styles.inputField}
                      placeholder='Personal trainer ID'
                      id="ptId"
                      {...register("ptId")}/>
                  </div>
              )}
              <input
              className={styles.standardButton} type="submit"/>
          </form>
      </div>
    )
}

export default CreateUser
