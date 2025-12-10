export default function resetPasswordEmail(resetLink) {
    return `
    <h1>Password Reset Request</h1>
    <p>We received a request to reset your password. Click the link below to set a new password:</p>
    <a href="${resetLink}">Reset Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
    `;
}