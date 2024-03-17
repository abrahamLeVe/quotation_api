import { factories } from "@strapi/strapi";
import { sendEmail } from "../../email/services/emailService";

export default factories.createCoreController("api::quotation.quotation", {
  async create(ctx) {
    try {
      const { body } = ctx.request;

      const quotation = await strapi
        .service("api::quotation.quotation")
        .create(body);

      const { createdAt, dayLimit } = quotation;
      const newDateLimit = new Date(createdAt);
      newDateLimit.setDate(newDateLimit.getDate() + dayLimit);

      const status = await strapi.entityService.findMany("api::state.state", {
        filters: {
          code: "ENPRG",
        },
      });

      const quotationUp = await strapi.entityService.update(
        "api::quotation.quotation",
        quotation.id,
        {
          data: {
            dateLimit: newDateLimit,
            state: status[0].id,
            codeStatus: status[0].name,
          },
        }
      );
      console.log("quotationUp ", quotationUp);

      await sendEmail(body.data.email, quotationUp);

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
