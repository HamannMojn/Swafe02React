import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import authService from '../services/auth.service';
import styles from '../Styles/login.module.scss';


export default function Login() {

    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const onLogin = async (data: { email: string; password: string; }) => {
        authService.login(data.email, data.password);
        navigate('/Dashboard');
    }
  return (
    <div className="react-hooks-form">
        <form onSubmit={handleSubmit(onLogin)} className={styles.body}>
          <h1>Fitness web app</h1>
          <div>
            <input
              id="email"
              {...register("email", {
                required: "required",
              })}
              type="email" placeholder="E-mail" className={styles.email}
            />
          </div>
          <div>
            <input
              id="password"
              {...register("password",
                {
                  required: "required",
                })}
              type="password" placeholder="Password" className={styles.password}
            />
          </div>
          <br />
          <input type="submit" className={styles.loginButton} />
        </form>
    </div>
  );
}

