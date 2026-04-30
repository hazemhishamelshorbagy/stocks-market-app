"use client";
import { useForm } from "react-hook-form";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import { Button } from "@/components/ui/button";
import { signInWithEmail } from "@/lib/actions/auth.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SignIn = () => {
   const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignInFormData) => {
   
    try {
      console.log(data);
      const response = await signInWithEmail(data);
      if (response.success) {
        toast.success("Logged in successfully!");
        router.push("/");

      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Sign-in failed:", error);
         toast.error("SignIn failed. Please try again.");
    }
  };

  return (
    <>
      <h1 className="form-title">Log In Your Account </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form space-y-5">
        <InputField
          label="Email"
          name="email"
          placeholder="test@gmail.com"
          register={register}
          error={errors.email}
         validation={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
        />
        <InputField
          label="Password"
          name="password"
          placeholder="***********"
          register={register}
          type="password"
          error={errors.password}
          validation={{ required: "Password is required", minLength: 8 }}
        />
        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Signing In..." : "Sign In"}
        </Button>

        <FooterLink
          text="Don't have an account?"
          linkText="Create an account"
          href="/sign-up"
        />
      </form>
    </>
  );
};

export default SignIn;
