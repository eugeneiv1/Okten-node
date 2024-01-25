import { EEmailAction } from "../enums/email-action.enums";

export const emailTemplates = {
  [EEmailAction.WELCOME]: {
    templateName: "welcome",
    subject: "Happy here",
  },
};
