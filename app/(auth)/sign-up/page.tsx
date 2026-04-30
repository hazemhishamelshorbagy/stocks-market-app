"use client";
import CountryField from "@/components/forms/CountryField";
import FooterLink from "@/components/forms/FooterLink";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { Button } from "@/components/ui/button";
import {signupWithEmail} from "@/lib/actions/auth.action";
import {
  investmentGoalsOptions,
  riskToleranceOptions,
  industryOptions,
} from "@/lib/constants";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useForm } from "react-hook-form";

const SignUp = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "US",
      investmentGoals: "Growth",
      riskTolerance: "Medium",
      preferredIndustry: "Technology",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: SignUpFormData) => {
    console.log(data);

    try {
      // signupwith email server actions
      const response = await signupWithEmail(data);
      
      if (response.success) {
        toast.success("Account created successfully!");
        router.push("/");
      }
    } catch (error) {
      
      toast.error("Signup failed. Please try again.");
      return {
        success: false,
        message: error instanceof Error ? error.message : String(error),
      };
    }
  };
  return (
    <>
      <h1 className="form-title">Sign up & Personalize</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form space-y-5">
        <InputField
          label="Full Name"
          name="fullName"
          placeholder="john doe"
          register={register}
          error={errors.fullName}
          validation={{ required: "full name required", minLength: 2 }}
        />
        <InputField
          label="Email"
          name="email"
          placeholder="test@test.com"
          register={register}
          type="email"
          error={errors.email}
          validation={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          }}
        />
        <CountryField
          label="Country"
          name="country"
          error={errors.country}
          control={control}
          required
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

        <SelectField
          control={control}
          name="investmentGoals"
          label="Investment Goals"
          options={investmentGoalsOptions}
          placeholder="Investements   Goals"
          error={errors.investmentGoals}
          required
        />
        <SelectField
          control={control}
          placeholder="Risk Tolerance"
          name="riskTolerance"
          label="Risk Tolerance"
          options={riskToleranceOptions}
          error={errors.riskTolerance}
          required
        />
        <SelectField
          control={control}
          name="preferredIndustry"
          placeholder="Preferred  Industry"
          label="Preferred Industry"
          options={industryOptions}
          error={errors.preferredIndustry}
          required
        />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="yellow-btn w-full mt-5"
        >
          {isSubmitting ? "Creating Account" : "Start Your Investing Journey"}
        </Button>

        <FooterLink
          text="Already have an account?"
          linkText="Sign in"
          href="/sign-in"
        />
      </form>
    </>
  );
};

export default SignUp;
