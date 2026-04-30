"use server"

import { headers } from "next/headers";
import { auth } from "../better-auth/auth";
import { inngest } from "../inngest/client";

export const signupWithEmail = async ({ email, password, fullName, country, investmentGoals, preferredIndustry, riskTolerance }: SignUpFormData) => {

    try {
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name: fullName
            }
        })

        if (!response) {
            console.error("signupWithEmail: no response from auth.api.signUpEmail");
            return {
                success: false,
                message: "Signup failed: no response from auth service"
            }
        }
        const eventPayload = {
            name: "app/user.created",
            data: {
                email,
                name: fullName,
                country,
                investmentGoals,
                preferredIndustry,
                riskTolerance,
            }
        };

        if (response) {
            console.log("signupWithEmail: sending Inngest event", eventPayload);
            await inngest.send(eventPayload);
            console.log("signupWithEmail: Inngest event sent successfully");
        }

        return {
            success: true,
            data: response
        }
    } catch (error) {
        console.error("Error in signupWithEmail:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : String(error)
        }
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({ headers: await headers() });
    } catch (error) {
        console.error("Error in signOut:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : String(error)
        }
    }
}

export const signInWithEmail = async ({ email, password }: SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body: {
                email,
                password
            }
        })
        if (!response) {
            console.error("signInWithEmail: no response from auth.api.signInEmail");
            return {
                success: false,
                message: "Sign-in failed: no response from auth service"
            }
        }
        return {
            success: true,
            data: response
        }
    } catch (error) {
        console.error("Error in signInWithEmail:", error);
        return {
            success: false,
            message: error instanceof Error ? error.message : String(error)
        }
    }
}