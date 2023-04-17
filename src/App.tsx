import "./styles/global.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function App() {
  const userFormSchema = z.object({
    name: z.string().nonempty("Please fill in your name.").toLowerCase(),

    email: z
      .string()
      .nonempty("Please fill in your email address.")
      .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/, "Invalid email address.")
      .toLowerCase(),

    password: z
      .string()
      .nonempty("Please fill in your password.")
      .regex(/^(?=.*?[A-Z])(?=.*?[^\w\s])(?=.*?\d)(.{8,})$/, "The password should contain at least 8 characters, one number, a special character and a uppercase letter."),

    confirm_password: z
      .string()
      .nonempty("Please fill in your password again.")
      .regex(/^(?=.*?[A-Z])(?=.*?[^\w\s])(?=.*?\d)(.{8,})$/)
      
  });

  type userFormSchema = z.infer<typeof userFormSchema>

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<userFormSchema>({
    resolver: zodResolver(userFormSchema),
  });

  function createUser(data: any) {
    console.log(data)
  }

  return (
    <main className="h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <div className="flex items-center justify-center h-screen">
        <form
          action=""
          className="flex flex-col gap-5 text-zinc-800 w-full max-w-md bg-white pb-8 pt-6 px-20 rounded-3xl"
          onSubmit={handleSubmit(createUser)}
        >
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-zinc-950 font-bold mt-5 text-md">Sign Up</h1>
            <h2 className="text-zinc-500 text-sm mt-1">
              Create an account to continue
            </h2>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="ml-4 font-semibold text-sm">
              Name
            </label>
            <input
              type="name"
              placeholder="Enter your Name"
              className="outline outline-zinc-200 outline-1 rounded-xl px-4 h-10 text-sm"
              {...register("name")}
            />
            {errors.name?.message && 
              <span className="text-red-500 text-sm ml-4 mt-2 font-medium">
                {errors.name.message}
              </span>}
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="ml-4 font-semibold text-sm">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              className="outline outline-zinc-200 outline-1 rounded-xl px-4 h-10 text-sm"
              {...register("email")}
            />
            {errors.email?.message && 
              <span className="text-red-500 text-sm ml-4 mt-2 font-medium">
                {errors.email.message}
              </span>}
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="ml-4 font-semibold text-sm">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="outline outline-zinc-200 outline-1 rounded-xl px-4 h-10 text-sm"
              {...register("password")}
            />
            {errors.password?.message && 
              <span className="text-red-500 text-sm ml-4 mt-2 font-medium">
                {errors.password.message}
              </span>}
          </div>
          
          <div className="flex flex-col">
            <label htmlFor="" className="ml-4 font-semibold text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="outline outline-zinc-200 outline-1 rounded-xl px-4 h-10 text-sm"
              {...register("confirm_password")}
            />
            {errors.confirm_password?.message && 
                <span className="text-red-500 text-sm ml-4 mt-2 font-medium">
                  {errors.confirm_password.message}
                </span>}


          </div>
          <button
            type="submit"
            className="bg-violet-500 rounded-xl p-2.5 font-semibold text-sm h-14 text-white"
          >
            Sign Up
          </button>

          <h3 className="flex flex-row items-center justify-center text-sm text-zinc-500">
            Already have an account?{" "}
            <button className="ml-1 text-violet-500 font-semibold">
              Sign in
            </button>
          </h3>
        </form>
      </div>
    </main>
  );
}

export default App;

