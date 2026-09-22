import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { verifyPasswordOtp } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const email = sessionStorage.getItem('pendingResetEmail');
      await verifyPasswordOtp({ email, otp: data.otp, newPassword: data.newPassword });
      sessionStorage.removeItem('pendingResetEmail');
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Invalid or expired code');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-2xl">

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Reset Password</h1>
          <p className="text-xs text-muted-foreground mt-2">
            Enter the code sent to your email and choose a new password.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-2">OTP Code</label>
            <input type="text" maxLength={6} placeholder="123456"
              className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-center text-lg tracking-widest text-foreground focus:outline-none focus:border-primary"
              {...register('otp', {
                required: 'OTP code is required',
                minLength: { value: 6, message: 'OTP must be 6 digits' },
              })}
            />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">New Password</label>
            <input type="password" placeholder="......"
              className="w-full bg-muted border border-border rounded-xl py-2.5 px-4 text-sm text-foreground focus:outline-none focus:border-primary"
              {...register('newPassword', {
                required: 'New password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
              })}
            />
            {errors.newPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs text-muted-foreground mb-1.5 font-medium">Confirm Password</label>
            <input type="password" placeholder="......"
              className="w-full bg-muted border border-border rounded-xl py-2.5 px-4 text-sm text-foreground focus:outline-none focus:border-primary"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) => value === watch('newPassword') || 'Passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3 rounded-xl transition disabled:opacity-50">
            {isSubmitting ? 'Loading...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
