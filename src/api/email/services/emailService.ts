import { sendtemplateEmailQuotation } from "../templates/sendQuotation";

export const sendEmail = async (email: string, quotation: any) => {
  const tempplate = sendtemplateEmailQuotation(quotation);

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
