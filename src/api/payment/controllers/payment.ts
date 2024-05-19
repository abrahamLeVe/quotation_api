import { factories } from "@strapi/strapi";
import { sendEmailPayment } from "../../email/services/paymentService";
import { senMessage } from "../../message/sendMessage";
import { handleEvent } from "../../message/eventService";

export default factories.createCoreController("api::payment.payment", {
  async create(ctx) {
    const userData = {
      observer: false,
    };
    const { body } = ctx.request;
    console.log("ctx createPayment:", JSON.stringify(ctx, null, 2));

    try {
      let payStatus = "Pago pendiente";
      let idStatus = 8;
      const payment = await strapi.service("api::payment.payment").create(body);

      if (payment.status === "approved") {
        payStatus = "Cerrada";
        idStatus = 6;
        await strapi.entityService.update(
          "plugin::users-permissions.user",
          body.data.user.id,
          { data: userData }
        );
      }

      const quotationUp = await strapi.entityService.update(
        "api::quotation.quotation",
        body.data.cotizacion.id,
        {
          data: {
            state: idStatus,
            codeStatus: payStatus,
          },
        }
      );
      console.log(
        "paymentCreate quotationUp:",
        JSON.stringify(quotationUp, null, 2)
      );
      await sendEmailPayment(quotationUp.email, quotationUp, payment);

      await senMessage(body.data.cotizacion.id, "Nuevo pago");

      ctx.response.status = 200;
      ctx.body = {
        message: "Pago registrado correctamente",
      };
    } catch (error) {
      await handleEvent({
        type: "error",
        details: {
          id: body.data.cotizacion.id,
          message: error.message,
        },
      });
      ctx.throw(500, "Error al crear el pago", { details: error.message });
    }
  },

  async update(ctx) {
    console.log("update payment:", JSON.stringify(ctx, null, 2));
    try {
      const userData = {
        observer: false,
      };
      const { data } = ctx.request.body;

      let payStatus = "cancelled";
      let codeStatus = "Cancelada";
      let idStatus = 5;
      let publishedAt = null;

      if (data.publishedAt === null) {
        await strapi.entityService.update(
          "api::payment.payment",
          data.paymentId,
          {
            data,
          }
        );
      } else {
        if (data.status === "approved") {
          payStatus = "approved";
          codeStatus = "Cerrada";
          idStatus = 6;
          publishedAt = data.publishedAt;
        }

        await strapi.entityService.update(
          "plugin::users-permissions.user",
          data.userId,
          { data: userData }
        );

        const payment = await strapi.entityService.update(
          "api::payment.payment",
          data.paymentId,
          {
            data: {
              status: payStatus,
              publishedAt: publishedAt,
            },
          }
        );

        const quotationUp = await strapi.entityService.update(
          "api::quotation.quotation",
          data.quotationId,
          {
            data: {
              codeStatus: codeStatus,
              state: idStatus,
              notes:
                "Cancelado mediante Mercado Pago ID de pago N°: " +
                payment.payment_id,
            },
          }
        );

        await sendEmailPayment(quotationUp.email, quotationUp, payment);
      }

      ctx.response.status = 200;
      ctx.body = {
        message: "Pago actualizado correctamente",
      };
    } catch (error) {
      ctx.throw(500, "Error al actualizar el pago", {
        details: error.message,
      });
    }
  },
});
