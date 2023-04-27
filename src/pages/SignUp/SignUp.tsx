import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";

export function SignUp() {
  const navigate = useNavigate();

  const userFormSchema = z
    .object({
      name: z.string().nonempty("Please fill in your name.").toLowerCase(),

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

      confirm_password: z
        .string()
        .nonempty("Please fill in your password again.")
        .regex(/^(?=.*?[A-Z])(?=.*?[^\w\s])(?=.*?\d)(.{8,})$/),
    })
    // Checks if both users passwords match
    .refine((data) => data.password === data.confirm_password, {
      message: "Passwords do not match.",
      path: ["confirm_password"],
    });

  type userFormSchema = z.infer<typeof userFormSchema>;

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<userFormSchema>({
    resolver: zodResolver(userFormSchema),
  });

  async function createUser(userFormData: userFormSchema) {
    const { confirm_password, ...userData } = userFormData;

    try {
      await axios.post("http://localhost:3000/api/v1/create-account", {
        data: userData,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleSignIn() {
    navigate("/login");
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

          <Input
            type="name"
            errors={errors.name?.message}
            register={register("name")}
            placeholder="Enter your name"
            label="Name"
          />

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

          <Input
            type="password"
            errors={errors.confirm_password?.message}
            register={register("confirm_password")}
            placeholder="Enter your password again"
            label="Confirm Password"
          />

          <button
            type="submit"
            className="bg-violet-500 rounded-xl p-2.5 font-semibold text-sm h-14 text-white"
          >
            Sign Up
          </button>

          <h3 className="flex flex-row items-center justify-center text-sm text-zinc-500">
            Already have an account?
            <button 
            className="ml-1 text-violet-500 font-semibold"
            onClick={handleSignIn}
            >
              Sign in
            </button>
          </h3>
        </form>
      </div>
    </main>
  );
}
