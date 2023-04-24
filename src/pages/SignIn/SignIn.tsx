import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Input } from "../../components/Input";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const userFormSchema = z.object({
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

  const navigate = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<userFormSchema>({
    resolver: zodResolver(userFormSchema),
  });

  const [loading, setLoading] = useState(false);

  async function userLogin(userFormData: userFormSchema) {
    setLoading(true);
    const { ...userData } = userFormData;

    try {
      const response = await axios.post("http://localhost:3000/api/v1/login", {
        data: userData,
      });
      
      if (response.status === 200) return navigate("/home")
      
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
            <h1 className="text-zinc-950 font-bold mt-5 text-md">
              Welcome Back
            </h1>
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
            className="flex items-center justify-center bg-violet-500 hover:bg-violet-600 transition-colors rounded-xl p-2.5 font-semibold text-sm h-14 text-white"
          >
            {loading && (
              <svg
                className="mr-3 h-5 w-5 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
            <span>
              {loading ? "Accessing your account..." : "Access your account."}
            </span>
          </button>
        </form>
      </div>
    </main>
  );
}
