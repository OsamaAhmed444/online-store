import {  useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
///////////////
export default function VerifyOtpPage (){
    const navigate = useNavigate();
    const {VerifyOtp} = useAuth();
    const {register, handleSubmit ,formState: { errors, isSubmitting },} = useForm();
    const onSubmit = async (data) => {
   try {
      await VerifyOtp(data.otp);
      toast.success('Account verified successfully');
      navigate('/login');
        }catch (error) {
      toast.error(error?.response?.data?.message || 'Invalid verification code');
      }
  };
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 shadow-2xl">

        {/* h1*/}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Verify OTP</h1>
          <p className="text-xs text-muted-foreground mt-2"> Please enter the 6-digit code sent to your email.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs text-muted-foreground mb-2">OTP Code</label>
            <input type="text" maxLength={6} placeholder="123456" className="w-full bg-muted border border-border rounded-xl px-4 py-3 text-center text-lg tracking-widest text-foreground focus:outline-none focus:border-primary"
              {...register('otp', {
                required: 'OTP code is required',
                minLength: { value: 6, message: 'OTP must be 6 digits' },
              })}
            />
            {errors.otp && (
              <p className="text-red-500 text-xs mt-1">{errors.otp.message}</p>
            )}
          </div>

          <button type="submit" disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground font-bold py-3 rounded-xl transition cursor-pointer disabled:opacity-50">
            {isSubmitting ? 'Loading....' : 'Verify Code'}
          </button>
        </form>
      </div>
    </div>
  );
    }


