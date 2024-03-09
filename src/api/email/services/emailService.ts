import axios from "axios";

export const sendEmail = async (email: string) => {
  try {
    await axios.post(process.env.SMTP_URL_API, {
      to: email,
      subject: "Nueva cotización",
      text: "Este mensaje es enviado desde strapi backend",
      token: process.env.SMTP_TOKEN,
    });

    console.log("Correo electrónico enviado correctamente a:", email);
  } catch (error) {
    console.error("Error al enviar correo electrónico:", error);
    throw error;
  }
};
