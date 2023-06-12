import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "react-router-dom";

export function ResetPassword() {
  const userFormSchema = z
    .object({
      password: z
        .string()
        .nonempty("Please fill in your password.")
        .regex(
          /^(?=.*?[A-Z])(?=.*?[^\w\s])(?=.*?\d)(.{8,})$/,
          "The password should contain at least 8 characters, a number, a special character and an uppercase letter."
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

  const [loading, setLoading] = useState(false);

  const [passwordRedefinedScreen, setPasswordRedefinedScreen] = useState(false);

  let { recoverCode } = useParams();

  console.log(recoverCode)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userFormSchema)
  });

  async function handlePasswordSubmit(useFormData: any) {
    setLoading(true);
    const { password } = useFormData;

    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/reset-password/${recoverCode}`, { 
          password: password,
        }
      );

      if (response.status === 200) {
        setPasswordRedefinedScreen(true);
      }
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <>
      <main className="h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
        <div className="flex items-center justify-center h-screen">
          <form
            action=""
            className="flex flex-col gap-5 text-zinc-800 w-full max-w-md bg-white pb-8 pt-6 px-20 rounded-3xl"
            onSubmit={handleSubmit(handlePasswordSubmit)}
          >
            <div className="flex items-center justify-center flex-col text-center">
              <h1 className="text-zinc-950 font-bold mt-5 text-md">
                {passwordRedefinedScreen
                  ? "Success! Your password was redefined"
                  : "Redefine your password"}
              </h1>
              <h2 className="text-zinc-500 text-sm mt-1">
                {passwordRedefinedScreen
                  ? "You can already log in with your new password"
                  : "Please enter your new password."}
              </h2>
            </div>

            <Input
              type="password"
              placeholder="Enter your new password"
              label="Password"
              register={register("password")}
              errors={errors.password?.message}
            />

            <Input
              type="password"
              placeholder="Confirm your new password"
              label="Confirm Password"
              register={register("confirm_password")}
              errors={errors.confirm_password?.message}
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
                {loading
                  ? "Changing password..."
                  : "Change my password"}
              </span>
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
