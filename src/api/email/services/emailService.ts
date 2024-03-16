export const sendEmail = async (email: string) => {
  try {
    await strapi.plugins["email"].services.email.sendTemplatedEmail(
      {
        to: email,
      },
      emailTemplate
    );

    console.log("Correo electrónico enviado correctamente a:", email);
  } catch (error) {
    console.error("Error al enviar correo electrónico:", error);
    throw error;
  }
};

const emailTemplate = {
  subject: "Welcome user.firstname",
  text: `Welcome to mywebsite.fr!
        Your account is now linked with: user.email.`,
  html: `<h1>Welcome to mywebsite.fr!</h1>
        <p>Your account is now linked with: user.email.<p>`,
};
