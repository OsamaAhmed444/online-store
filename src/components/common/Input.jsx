export default function Input({label,error,className="", ...props})
{
return(
  <div className="w-full">
    {label && <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>}

  <input {...props} className={`
          w-full rounded-lg
          border border-border
          bg-muted
          px-4 py-3
          text-sm text-foreground
          outline-none
          placeholder:text-muted-foreground
          transition
          focus:border-primary
          ${error ? "border-red-500" : ""}
          ${className}
        `}/>
          {error && (<p className="mt-1 text-sm text-red-500">{error}</p>)}
        
  </div>
  
)
};