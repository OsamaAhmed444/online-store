export default function Input({label,error,className="", ...props})
{
return(
  <div className="w-full">
    {label && <label className="mb-2 block text-sm font-medium text-white">{label}</label>}
  
  <input {...props} className={`
          w-full rounded-lg
          border border-white/10
          bg-white/5
          px-4 py-3
          text-sm text-white
          outline-none
          placeholder:text-gray-500
          transition
          focus:border-orange-500
          ${error ? "border-red-500" : ""}
          ${className}
        `}/>
          {error && (<p className="mt-1 text-sm text-red-500">{error}</p>)}
        
  </div>
  
)
};