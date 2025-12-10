import transporter from "./transporter.js";
import dotenv from "dotenv";
dotenv.config();

export default async function sendMail(to, subject, html) {
    try{
        await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            html,
        });
        return "Email sent successfully to " + to;
    }catch(error){
        return "Error sending email to " + to + ": " + error;
    }
};