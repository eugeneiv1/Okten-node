import { EEmailAction } from "../enums/email-action.enums";

export const emailTemplates1 = {
  [EEmailAction.WELCOME]: {
    templateName: "welcome",
    subject: "hey there",
  },
};
