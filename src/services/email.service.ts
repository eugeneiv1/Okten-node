import nodemailer, { Transporter } from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

import { configs } from "../configs/config";
import { emailTemplates } from "../constants/email.constants";
import { EEmailAction } from "../enums/email-action.enums";
class EmailService {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
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
        layoutDir: path.join(process.cwd(), "src", "templates", "layouts"),
        partialDir: path.join(process.cwd(), "src", "templates", "partials"),
      },
      viewPath: path.join(process.cwd(), "src", "templates", "views"),
      extName: ".hbs",
    };

    this.transporter.use("compile", hbs(hbsOptions));
  }
  public async sendMail(
    email: string,
    emailAction: EEmailAction,
    name: string,
  ) {
    const { subject, templateName } = emailTemplates[emailAction];
    const mailOptions = {
      to: email,
      subject,
      template: templateName,
      context: { name },
    };
    await this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
