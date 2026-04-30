import { inngest } from "./client";
import { sendWelcomeEmail } from "../nodemailer";

export const sendSignupEmail = inngest.createFunction(
    { id: "signup-email", triggers: { event: "app/user.created" } },
    async ({ event, step }) => {
       
        await step.run("send-welcome-email", async () => {
           
            return await sendWelcomeEmail({
                email: event.data.email,
                name: event.data.name,
                intro: event.data.intro || "Welcome to Signalist! We're excited to have you on board."
            });

        });
        
    }
);

export const functions = [sendSignupEmail];