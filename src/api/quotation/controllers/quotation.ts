import { factories } from "@strapi/strapi";
import { sendEmail } from "../../email/services/emailService";

export default factories.createCoreController("api::quotation.quotation", {
  async create(ctx) {
    try {
      const { body } = ctx.request;
      await strapi.service("api::quotation.quotation").create(body);
      await sendEmail(body.data.email);

      return {
        message: "Cotización creada correctamente",
      };
    } catch (error) {
      ctx.throw(500, "Error al crear la cotización", {
        details: error.message,
      });
    }
  },
});
