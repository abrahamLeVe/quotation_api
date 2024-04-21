/**
 * contact controller
 */

import { factories } from "@strapi/strapi";
import { sendEmailContact } from "../../email/services/emailContactService";

export default factories.createCoreController("api::contact.contact", {
  async create(ctx) {
    try {
      const { body } = ctx.request;
      const res = await strapi.service("api::contact.contact").create(body);
      await sendEmailContact(
        body.data.email,
        res.id,
        res.createdAt,
        res.stateMessage
      );

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
  async update(ctx) {
    try {
      const { data } = ctx.request.body;

      const res = await strapi.entityService.update(
        "api::contact.contact",
        data.id,
        {
          data,
        }
      );
      console.log("res ", JSON.stringify(res, null, 2));

      await sendEmailContact(
        res.email,
        data.id,
        res.createdAt.toString(),
        res.stateMessage,
        res.responseContact
      );

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
