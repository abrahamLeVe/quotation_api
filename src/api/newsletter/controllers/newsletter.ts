import { factories } from "@strapi/strapi";
import { sendEmailNewsLleter } from "../../email/services/emailNewsLetterService";

export default factories.createCoreController("api::newsletter.newsletter", {
  async create(ctx) {
    try {
      const { body } = ctx.request;
      await strapi.service("api::newsletter.newsletter").create(body);
      await sendEmailNewsLleter(body.data.email);

      return {
        message: "Suscripción creada correctamente",
      };
    } catch (error) {
      strapi.log.error("Failed to create newsletter subscription", { error });

      ctx.response.status = 500;
      return {
        message:
          "Error al procesar la solicitud, por favor intente de nuevo más tarde.",
      };
    }
  },
});
