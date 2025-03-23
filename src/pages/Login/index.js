import * as React from 'react'; 
import { InputText, InputPassword, Button, FormControl, Card, LayoutOne } from 'upkit';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import StoreLogo from '../../components/StoreLogo';
import { userLogin } from '../../features/Auth/actions';
import { rules } from './validation';
import { login } from '../../api/auth';

const statusList = {
  idle: 'idle', 
  process: 'process', 
  success: 'success', 
  error: 'error',
};

export default function Login() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm(); 
  const [status, setStatus] = React.useState(statusList.idle);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate dari react-router-dom v6+

  const onSubmit = async ({ email, password }) => {
    setStatus(statusList.process);

    try {
      let { data } = await login(email, password); 

      if (data.error) {
        setError('password', { type: 'invalidCredential', message: data.message });
        setStatus(statusList.error);
      } else {
        let { user, token } = data;
        dispatch(userLogin(user, token));
        navigate('/'); // Redirect ke halaman utama
      }
    } catch (error) {
      setStatus(statusList.error);
    }
  };

  return (
    <LayoutOne size="small">
      <br />
      <Card color="white">
        <div className="text-center mb-5">
          <StoreLogo />
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl errorMessage={errors.email?.message}>
            <InputText
              placeholder="Email"
              fitContainer
              {...register("email", rules.email)}
            />
          </FormControl>

          <FormControl errorMessage={errors.password?.message}>
            <InputPassword 
              placeholder="Password"
              fitContainer
              {...register("password", rules.password)}
            />
          </FormControl>

          <Button fitContainer size="large" disabled={status === 'process'}>
            {status === 'process' ? 'Memproses...' : 'Login'}
          </Button>
        </form>
        
        <div className="text-center mt-2">
          Belum punya akun? <Link to="/register"><b>Daftar sekarang.</b></Link>
        </div>
      </Card>
    </LayoutOne>
  );
}
