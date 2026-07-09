     function Input({field}){

        return (

        
     
     <input className="block min-w-0 grow bg-amber-200 py-1.5 pr-3 pl-1 text-base text-blue placeholder:text-gray-500 focus:outline-1 sm:text-sm/6"
        value={field.state.value}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value || [e.target.value])}
        
      />
        )
    }
    export default Input;