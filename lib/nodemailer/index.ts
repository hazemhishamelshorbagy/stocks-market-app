
import nodemailer from "nodemailer";
import { NEWS_SUMMARY_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./templates";


export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODEMAILER_EMAIL!,
        pass: process.env.NODEMAILER_PASSWORD!,
    },
})

export const sendWelcomeEmail = async ({ email, name, intro }: WelcomeEmailData) => {
    const htmLTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace("{{intro}}", intro);
    const emailOptions = {
        from: `"Signalist" <signalist@gmail.com>`,
        to: email,
        subject: "Welcome to Signalist!",
        text:"Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.",
        html: htmLTemplate,
    }
    await transporter.sendMail(emailOptions);
}

export const sendDailyNewsSummaryEmail= async ({ email, name, summary,date }: { email: string; name: string; summary: string,date:string }) => {
    const htmLTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replace("{{newsContent}}", summary).replace("{{date}}",date);
    const emailOptions = {
        from: `"Signalist" <signalist@gmail.com>`,
        to: email,
        subject: "Your Daily News Summary",
        text: `Hi ${name},\n\nHere's your daily news summary:\n\n${summary}\n\nBest regards,\nThe Signalist Team`,
        html:htmLTemplate
    }
    await transporter.sendMail(emailOptions);
    
}