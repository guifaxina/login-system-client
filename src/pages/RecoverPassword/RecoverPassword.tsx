import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../components/Input";
import axios from "axios";

export function RecoverPassword() {

  const [loading, setLoading] = useState(false);

  const [emailSentScreen, setEmailSentScreen] = useState(false);

  const {register, handleSubmit} = useForm();

  async function handleEmailSubmit(useFormData: any) {
    setLoading(true);
    const { email } = useFormData;
    
    try {
      const response = await axios.post("http://localhost:3000/api/v1/recover-password", { 
        data: email 
      })

      if (response.status === 200) {
        setEmailSentScreen(true);
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <main className="h-screen bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <div className="flex items-center justify-center h-screen">
        <form
          action=""
          className="flex flex-col gap-5 text-zinc-800 w-full max-w-md bg-white pb-8 pt-6 px-20 rounded-3xl"
          onSubmit={handleSubmit(handleEmailSubmit)}
        >
          <div className="flex items-center justify-center flex-col">
            <h1 className="text-zinc-950 font-bold mt-5 text-md">
              {emailSentScreen ? "An email with instructions was sent" : "Recover your password"}
            </h1>
              <h2 className="text-zinc-500 text-sm mt-1">
              {emailSentScreen ? "Please check your mailbox for more details" : "Please enter your email."}
              </h2>
          </div>

          {emailSentScreen ? "" : 
          <Input
            type="email"
            placeholder="Enter your email"
            label="Email"
            register={register("email")}
          />
          }

          {emailSentScreen ? "" : 
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
              {loading ? "Sending confirmation email..." : "Recover my password"}
            </span>
          </button>
          }
        </form>
      </div>
    </main>
    </>
  );
}