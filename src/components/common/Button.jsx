import { LoaderCircle } from 'lucide-react';
export default function button ({
  children,
  loading=false,
  disabled =false,
  className="",
  onClick,
  type={button},

}){
const isdisabled  = disabled  || loading;

return(
  <button
  type={type}
  disabled ={isdisabled}
  onClick={onClick}
  className={`flex items-center justify-center gap-2 rounded-md bg-orange-500 px-5 py-2.5 font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
  >
    {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
{children}
  </button>
);

}