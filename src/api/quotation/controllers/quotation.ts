import { factories } from "@strapi/strapi";
import { sendEmail } from "../../email/services/emailService";
import { senMessage } from "../../message/sendMessage";

export default factories.createCoreController("api::quotation.quotation", {
  async create(ctx) {
    try {
      const user = ctx.state.user;
      if (user.observer) {
        ctx.throw(403, "Ya tiene una cotización en proceso.");
      }

      const { body } = ctx.request;
      const userData = {
        observer: true,
      };

      const quotation = await strapi
        .service("api::quotation.quotation")
        .create(body);

      const { createdAt, dayLimit } = quotation;
      const newDateLimit = new Date(createdAt);
      newDateLimit.setDate(newDateLimit.getDate() + dayLimit);

      await strapi.entityService.update(
        "plugin::users-permissions.user",
        user.id,
        { data: userData }
      );

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

      await sendEmail(quotationUp.email, quotationUp);
      await senMessage(Number(quotationUp.id), "Nueva cotización");

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
      // const user = ctx.state.user;
      const { data } = ctx.request.body;

      const userData = {
        observer: false,
      };
      // console.log("data ", JSON.stringify(data, null, 2));

      if (data.publishedAt !== null || data.codeStatus === "Vencido") {
        if (data.codeStatus !== "Completada") {
          await strapi.entityService.update(
            "plugin::users-permissions.user",
            data.userId,
            { data: userData }
          );
        }
      }

      const status = await strapi.entityService.findMany("api::state.state", {
        filters: {
          name: data.codeStatus,
        },
      });

      const quotationUp = await strapi.entityService.update(
        "api::quotation.quotation",
        data.id,
        {
          data: {
            ...data,
            state: status[0].id,
            codeStatus: status[0].name,
          },
        }
      );

      if (data.publishedAt !== null) {
        await sendEmail(data.email, quotationUp);
      }

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
