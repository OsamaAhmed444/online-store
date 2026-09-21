import {  useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
///////////////
export default function LoginPage (){
    const navigate = useNavigate();
    const {login} = useAuth();
    const {register, handleSubmit ,formState: { errors, isSubmitting },} = useForm();
    const onSubmit = async (data) => {
   try {
      await login(data);
      toast.success('Login successfully');
      navigate('/Home');
        }catch (error) {
      toast.error(error?.response?.data?.message || 'Wrong e-mail or password');
      }
  };
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-2xl">

        {/* h1*/}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Log in</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/*email */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Email</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"></i>
              <input
                type="email"
                placeholder="@.com"
                {...register('email', {
                  required: 'Email is required',
                })}
                className="w-full bg-muted border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
          </div>

         {/*password */}
          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Password</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm"></i>
              <input
                type="password"
                placeholder="......"
                {...register('password', {
                  required: 'Password is required',
                  minLength:{ value: 6, message: 'Password must be at least 6 characters' }
                })}
                className="w-full bg-muted border border-border rounded-xl py-2.5 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
            <div className="text-right mt-1.5">
              <Link to="/forgot-password" className="text-xs text-primary hover:underline font-medium">Forgot password?</Link>
            </div>
          </div>

        {/*submit*/ }
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium py-2.5 rounded-xl transition-all duration-200 mt-6 shadow-lg shadow-primary/20 disabled:opacity-50 cursor-pointer">
            {isSubmitting ? 'Loading...' : 'log in'}
          </button>
        </form>

        {/*link of register*/ }
        <p className="text-center text-xs text-muted-foreground mt-6">
          Don&apos;t have an account? <Link to="/register" className="text-primary hover:underline font-medium">Create one</Link>
        </p>

      </div>
    </div>
  );
    }