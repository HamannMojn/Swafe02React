import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import authService from '../services/auth.service';


export default function Login() {

    const {register, handleSubmit, reset} = useForm();

    const onLogin = async (data: { email: string; password: string; }) => {
        authService.login(data.email, data.password);
        reset();
    }
  return (
      <div className="react-hooks-form">
          <form onSubmit={handleSubmit(onLogin)}>
              <div>
                  <label htmlFor="email">E-mail</label>
                  <input
        id="email"
        {...register("email", {
          required: "required",
        })}
        type="email"
      />
              </div>
              <div>
                  <label htmlFor="password">Password</label>
                  <input 
                  id="password" 
                  {...register("password", 
                  {required: "required",
        })}
        type="password"
      />
              </div>
              <input type="submit"/>
          </form>
      </div>
  );
}
