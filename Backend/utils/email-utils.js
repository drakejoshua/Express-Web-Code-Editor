// import util dependencies
import { Resend } from "resend"
import { ERROR_CODES } from "./error-utils.js"


// initialize the resend client with api-key from .env
const resend = new Resend( process.env.RESEND_API_KEY )


// function to send an email using resend SDK
export async function sendEmail( to, subject, html ) {
    try {
        // send the email using resend SDK
        // with from, to, subject and html content as derived
        // from parameters
        const { data, error } = await resend.emails.send({
            from: "CodeBloks <info@resend.dev>",
            to: to,
            subject: subject,
            html: html
        })

        // if any error is returned from resend SDK,
        // throw the error to be caught in catch block
        if ( error ) {
            throw error
        }

        // if email is sent successfully, return true
        return true
    } catch( err ) {
        // if any error occurs during sending email,
        // create a custom error with the error message and throw it
        const emailSendError = new Error(`Failed to send email, Please try again later. Error: ${err.message}`)
        emailSendError.statusCode = 500
        emailSendError.errorCode = ERROR_CODES.EMAIL_SEND_FAILURE
        throw emailSendError
    }
}


// function to send a verification email
export async function sendVerificationEmail( to, verificationLink ) {
    // email subject/title
    const subject = "Verify your email for CodeBloks"

    // email html content with verification link embbedded
    // in an anchor tag
    const html = `
        <p>Hi there,</p>
        <p>Thank you for signing up for CodeBloks! Please click the link below to verify your email address:</p>
        <p><a href="${verificationLink}">Verify Email</a></p>
        <p>If you did not sign up for CodeBloks, please ignore this email.</p>
    `

    // send the email using sendEmail function
    return sendEmail( to, subject, html )
}


// function to send a password reset email
export async function sendPasswordResetEmail( to, resetLink ) {
    // email subject/title
    const subject = "Reset your password for your CodeBloks account"

    // email html content with password reset link embbedded
    // in an anchor tag
    const html = `
        <p>Hi there,</p>
        <p>We received a request to reset your password for your CodeBloks account. Please click the link below to reset your password:</p>
        <p><a href="${resetLink}">Reset Password</a></p>
        <p>If you did not request a password reset, please ignore this email.</p>
    `

    // send the email using sendEmail function
    return sendEmail( to, subject, html )
}


// function to send a magic link email
export async function sendMagicLinkEmail( to, loginLink ) {
    // email subject/title
    const subject = "Your magic link for CodeBloks"

    // email html content with magic link embedded
    const html = `
        <p>Hi there,</p>
        <p>We received a request for you to receive a magic link for CodeBloks! Please click the link below to log in:</p>
        <p><a href="${loginLink}">Log In</a></p>
        <p>If you did not request this link, please ignore this email.</p>
    `

    // send the email using sendEmail function
    return sendEmail( to, subject, html )
}
