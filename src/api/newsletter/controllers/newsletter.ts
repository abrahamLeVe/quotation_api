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
      ctx.throw(500, "Error al crear la suscripción", {
        details: error.message,
      });
    }
  },
});
