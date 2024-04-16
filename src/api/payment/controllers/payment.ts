/**
 * payment controller
 */

import { factories } from "@strapi/strapi";
import { sendEmail } from "../../email/services/emailService";
import { senMessage } from "../../message/sendMessage";

export default factories.createCoreController("api::payment.payment", {
  async create(ctx) {
    try {
      const user = ctx.state.user;
      const { body } = ctx.request;
      const userData = {
        observer: false,
      };

      await strapi.service("api::payment.payment").create(body);

      const status = await strapi.entityService.findMany("api::state.state", {
        filters: {
          code: "CERR",
        },
      });

      const quotationUp = await strapi.entityService.update(
        "api::quotation.quotation",
        body.data.quotation.id,
        {
          data: {
            state: status[0].id,
            codeStatus: status[0].name,
          },
        }
      );

      /*Otra plantilla con diferente mensaje */
      await sendEmail(quotationUp.email, quotationUp);
      /*mensaje con diferente nombre*/
      await senMessage(quotationUp.id);
      await strapi.entityService.update(
        "plugin::users-permissions.user",
        user.id,
        { data: userData }
      );

      return {
        message: "Pago resgistrado correctamente",
      };
    } catch (error) {
      ctx.throw(500, "Error al crear el pago", {
        details: error.message,
      });
    }
  },
});
