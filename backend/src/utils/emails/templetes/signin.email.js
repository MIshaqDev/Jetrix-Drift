export default function signinOTPEmail(otp) {
    return `
    <h1>Your OTP code is:</h1>
    <h2 style="color: blue;">${otp}</h2>
    <p>This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
    `;
}