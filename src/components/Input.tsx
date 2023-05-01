interface Props {
  errors?: any,
  register?: any;
  type: string;
  placeholder: string;
  label: string;
}

export function Input({ errors, type, placeholder, register, label }: Props) {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="ml-4 font-semibold text-sm">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="outline outline-zinc-200 outline-1 rounded-xl px-4 h-10 text-sm"
        {...register}
      />
      {errors && (
        <span className="text-red-500 text-sm ml-4 mt-2 font-medium">
          {errors}
        </span>
      )}
    </div>
  );
}

