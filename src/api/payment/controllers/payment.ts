import { factories } from "@strapi/strapi";
import { sendEmailPayment } from "../../email/services/paymentService";
import { senMessage } from "../../message/sendMessage";

export default factories.createCoreController("api::payment.payment", {
  async create(ctx) {
    try {
      const user = ctx.state.user;
      const { body } = ctx.request;
      const userData = {
        observer: false,
      };

      // Encontrar el estado de la cotización
      // const status = await strapi.entityService.findMany("api::state.state", {
      //   filters: {
      //     code: "CERR",
      //   },
      // });

      const payment = await strapi.service("api::payment.payment").create(body);

      const quotationUp = await strapi.entityService.update(
        "api::quotation.quotation",
        body.data.cotizacion.id,
        {
          data: {
            state: 6,
            codeStatus: "Cerrada",
          },
        }
      );

      await sendEmailPayment(quotationUp.email, quotationUp, payment);

      await strapi.entityService.update(
        "plugin::users-permissions.user",
        user.id,
        { data: userData }
      );

      await senMessage(body.data.payment_id, "Nuevo pago");

      ctx.response.status = 200;
      ctx.body = {
        message: "Pago registrado correctamente",
      };
    } catch (error) {
      ctx.throw(500, "Error al crear el pago", {
        details: error.message,
      });
    }
  },
});
