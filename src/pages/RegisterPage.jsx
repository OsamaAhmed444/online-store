import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
///////////////////////
export default function RegisterPage() {
  const navigate = useNavigate();
  const { registerUser } = useAuth();
  const {register, handleSubmit,formState: { errors, isSubmitting },} = useForm();
  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      toast.success('OTP sent successfully');
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Wrong e-mail or password');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#121212] border border-zinc-800/80 rounded-2xl p-8 shadow-2xl relative z-10">
        
        {/*h1 */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2 mb-2">
            <div className="bg-orange-500 text-black font-extrabold px-2.5 py-1 rounded-lg text-xl">K</div>
            <div className="text-left">
              <span className="text-xl font-bold tracking-wide block leading-none">Koda</span>
              <span className="text-[10px] text-zinc-400 tracking-widest uppercase">KODA STORE</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-orange-500 mt-4">Create an account</h1>
        </div>

        {/*Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          
          <div>
            <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Username</label>
            <div className="relative">
              <i className="fa-solid fa-user absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
              <input
                type="text"
                placeholder="your username"
                {...register('username', { required: 'Username is required' })}
                className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            {errors.username && <p className="text-red-500 text-xs mt-1 font-medium">{errors.username.message}</p>}
          </div>

          {/*email */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Email</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
              <input
                type="email"
                placeholder="@.com"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    message: 'Invalid email address'
                  }
                })}
                className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
          </div>

          {/*phone */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Phone</label>
            <div className="relative">
              <i className="fa-solid fa-phone absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
              <input
                type="text"
                placeholder="01000000000"
                {...register('phone', { required: 'Phone number is required' })}
                className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone.message}</p>}
          </div>

         {/*password */}
          <div>
            <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Password</label>
            <div className="relative">
              <i className="fa-solid fa-lock absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 text-sm"></i>
              <input
                type="password"
                placeholder="......"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {  message: 'Password must be at least 6 characters' }
                })}
                className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
          </div>

          {/*submit*/ }
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium py-2.5 rounded-xl transition-all duration-200 mt-6 shadow-lg shadow-orange-500/20 disabled:opacity-50 cursor-pointer">
            {isSubmitting ? 'Loading....' : 'Create Account'}
          </button>
        </form>

        {/*link of login*/ }
        <p className="text-center text-xs text-zinc-400 mt-6">
          Already have an account? <Link to="/login" className="text-orange-500 hover:underline font-medium">Sign in</Link>
        </p>

      </div>
    </div>
  );
}





