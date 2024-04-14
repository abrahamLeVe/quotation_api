import { factories } from "@strapi/strapi";
import { sendEmail } from "../../email/services/emailService";
import { senMessage } from "../../message/sendMessage";

export default factories.createCoreController("api::quotation.quotation", {
  async create(ctx) {
    try {
      const user = ctx.state.user;
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

      // console.log("quotationUp ", JSON.stringify(quotationUp, null, 2));

      await sendEmail(quotationUp.email, quotationUp);
      await senMessage(quotationUp.id);

      return {
        message: "Cotización creada correctamente",
      };
    } catch (error) {
      ctx.throw(500, "Error al crear la cotización", {
        details: error.message,
      });
    }
  },

  async update(ctx) {
    try {
      const user = ctx.state.user;
      const { data } = ctx.request.body;

      const quotationUp = await strapi.entityService.update(
        "api::quotation.quotation",
        data.id,
        {
          data,
        }
      );

      await sendEmail(data.email, quotationUp);

      ctx.body = {
        message: "Cotización actualizada correctamente",
      };
    } catch (error) {
      ctx.throw(500, "Error al actualizar la cotización", {
        details: error.message,
      });
    }
  },
});
