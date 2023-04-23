import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "../../components/Input";

export function SignIn() {
  const userFormSchema = z
    .object({
      email: z
        .string()
        .nonempty("Please fill in your email address.")
        .regex(
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
          "Invalid email address."
        )
        .toLowerCase(),

      password: z
        .string()
        .nonempty("Please fill in your password.")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[^\w\s])(?=.*?\d)(.{8,})$/,
          "The password should contain at least 8 characters, one number, a special character and a uppercase letter."
        ),
    });

  type userFormSchema = z.infer<typeof userFormSchema>;

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<userFormSchema>({
    resolver: zodResolver(userFormSchema),
  });

  async function userLogin(userFormData: userFormSchema) {
    const { ...userData } = userFormData;

    try {
      await axios.post("http://localhost:3000/api/v1/login", {
        data: userData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <div className="flex items-center justify-center h-screen">
        <form
          action=""
          className="flex flex-col gap-5 text-zinc-800 w-full max-w-md bg-white pb-8 pt-6 px-20 rounded-3xl"
          onSubmit={handleSubmit(userLogin)}
        >
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-zinc-950 font-bold mt-5 text-md">Welcome Back</h1>
            <h2 className="text-zinc-500 text-sm mt-1">
              Login to your account
            </h2>
          </div>


          <Input
            type="email"
            errors={errors.email?.message}
            register={register("email")}
            placeholder="Enter your email"
            label="Email"
          />

          <Input
            type="password"
            errors={errors.password?.message}
            register={register("password")}
            placeholder="Enter your password"
            label="Password"
          />

          <button
            type="submit"
            className="bg-violet-500 rounded-xl p-2.5 font-semibold text-sm h-14 text-white"
          >
            Access your account
          </button>
        </form>
      </div>
    </main>
  );
}
