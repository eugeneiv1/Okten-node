import nodemailer, { Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

import { configs } from "../configs/config";
import { emailTemplates1 } from "../constants/email.constant1";
import { EEmailAction1 } from "../enums/email-action.enums1";

class EmailService1 {
  private transport: Transporter;
  constructor() {
    this.transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: configs.SMTP_USER,
        pass: configs.SMTP_PASSWORD,
      },
    });

    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutDir: path.join(process.cwd(), "templates", "layouts"),
        partialDir: path.join(process.cwd(), "templates", "partials"),
      },
      viewPath: path.join(process.cwd(), "templates", "views"),
      extName: ".hbs",
    };

    this.transport.use("compile", hbs(hbsOptions));
  }

  public async sendMail(
    email: string,
    emailAction: EEmailAction1,
    name: string,
  ) {
    const { subject, templateName } = emailTemplates1[emailAction];
    const mailOptions = {
      to: email,
      subject,
      template: templateName,
      context: { name },
    };

    await this.transport.sendMail(mailOptions);
  }
}

export const emailService = new EmailService1();
