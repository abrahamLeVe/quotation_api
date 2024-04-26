import { sendtemplateEmailContact } from "../templates/sendContact";

export const sendEmailContact = async (
  email: string,
  id: number,
  createdAt: string,
  stateMessage: boolean,
  responseContact?: string,
  publishedAt?: string | null | undefined
) => {
  const tempplate = sendtemplateEmailContact(
    id,
    createdAt,
    stateMessage,
    responseContact,
    publishedAt
  );

  try {
    await strapi.plugins["email"].services.email.sendTemplatedEmail(
      {
        to: email,
        from: '"Consorcio A&C Eléctrica S.A.C" <consorcio.electrica.sac@gmail.com>',
      },
      tempplate
    );

    console.log("Correo electrónico enviado correctamente a:", email);
  } catch (error) {
    console.error("Error al enviar correo electrónico:", error);
    throw error;
  }
};
