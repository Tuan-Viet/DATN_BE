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

    const confirmationLink = `http://localhost:5173/signin?confirmationCode=${confirmationCode}`;
    const mailOptions = {
      from: 'hustle.nodemail@gmail.com',
      to: userEmail,
      subject: 'Xác nhận tài khoản',
      html: `
      <div style="width:100%;text-align:center;height: 100vh">
    <p>Chào bạn đến với HUSTLE</p>
    <div class="text-center w-[350px]"> Chào mừng bạn đến với <span style="font-weight: 600;">Hustle</span> click
      vào
      nút <span style="font-weight: 600;">bên dưới</span>
      dể tạo
      một tài khoản</div>
    <table style="width:100%;text-align:center;display:flex;justify-content:center;">
    <tr>
      <td style="padding:0 16px;line-height:30px;">
        <p style="margin-top: 20px;cursor: pointer;">
          <a href=${confirmationLink}
            style="width:300px;display:block;background-color:#000;border-radius:12px;margin-top:0px auto;color:#fff;text-decoration:none;text-align:center;padding:12px 24px;box-sizing:border-box"
            target="_blank"
            data-saferedirecturl="https://www.google.com/url?q=https://qv3ydl8m.r.ap-southeast-1.awstrack.me/L0/https:%252F%252Fwww.coolmate.me%252Faccount%252Factivation%252F6c18aedbb88ffb5a50b01f3a3f3db4ab80db0921b848e76f9609b1c405f4b5a5/1/010e018b6bcf2461-32031420-acd1-4d15-8a48-2524aea37e5d-000000/SbaNfPRdpmNbHR9FqYx1Y1nS2Og%3D130&amp;source=gmail&amp;ust=1701851859129000&amp;usg=AOvVaw1LuM25Y4eGBRD4OK9gTCRe">
            Xác minh email
          </a>
        </p>
      </td>
    </tr>
    </table>
    <p style="margin-right: -250px;margin-top: 10px;">Thanks !</p>
  </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};
export const forgotPasswordMail = async (userEmail, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "hustle.nodemail@gmail.com",
        pass: "gntgzxkqcefgjsvy",
      },
    });

    const confirmationLink = `http://localhost:5173/resetPassword?token=${token}`;
    const mailOptions = {
      from: 'hustle.nodemail@gmail.com',
      to: userEmail,
      subject: 'Quên mật khẩu',
      html: `
        <p>Vui lòng <a href="${confirmationLink}">click vào đây</a> để đặt lại mật khẩu của bạn.</p>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
};