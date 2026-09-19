import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
//////////////////
export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data.email);
      toast.success('Reset link sent to your email');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'e-mail is wrong');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#121212] border border-[#27272a] rounded-2xl p-8 shadow-2xl">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#f97316]">Forgot Password</h1>
          <p className="text-xs text-zinc-400 mt-2">
           Enter your email address to receive a link to reset your password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs text-zinc-300 mb-1.5 font-medium">Email</label>
            <input type="email" placeholder="@.com"
              {...register('email', { required: 'Email is required' })}
              className="w-full bg-[#1c1c1e] border border-zinc-800 rounded-xl py-2.5  pl-10 px-4 text-sm text-white focus:outline-none focus:border-[#f97316]"/>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#f97316] hover:bg-[#ea580c] text-white font-bold py-3 rounded-xl transition disabled:opacity-50">
            {isSubmitting ? 'Loading...' : 'Send'}
          </button>
        </form>
      </div>
    </div>
  );
}