import nodemailer from "nodemailer";

export const sendMail = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hustle.nodemail@gmail.com",
        pass: "gntgzxkqcefgjsvy",
      },
    });

    const mailOptions = {
      from: "hustle.nodemail@gmail.com",
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Error sending email" });
  }
};

export const sendConfirmationEmail = async (userEmail, confirmationCode) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "hustle.nodemail@gmail.com",
        pass: "gntgzxkqcefgjsvy",
      },
    });

    const confirmationLink = `http://localhost:8080/api/auth/confirm-registration/${confirmationCode}`;

    const mailOptions = {
      from: 'hustle.nodemail@gmail.com',
      to: userEmail,
      subject: 'Xác nhận tài khoản',
      html: `
        <p>Chào mừng bạn đến với ứng dụng! Vui lòng <a href="${confirmationLink}">click vào đây</a> để xác nhận tài khoản của bạn.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
