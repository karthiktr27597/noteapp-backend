import nodemailer from "nodemailer"

const transposter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.nodemailer_user,
        pass: process.env.nodemailer_password
    }
})

export function sendMail(toEmail, subject, content) {

    try {
        const mailOptions = {
            from: 'karthiktr27597@gmail.com',
            to: toEmail,
            subject: subject,
            html: content 
        }

        transposter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log("Error Occurred", err)

            } else {
                console.log('Email Sent: ' + info.response)
            }
        })

    } catch (error) {
        console.log(error)
    }

}