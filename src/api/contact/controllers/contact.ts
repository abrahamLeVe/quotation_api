/**
 * contact controller
 */

import { factories } from "@strapi/strapi";
import { sendEmailContact } from "../../email/services/emailContactService";
import { senMessage } from "../../message/sendMessage";

export default factories.createCoreController("api::contact.contact", {
  async create(ctx) {
    try {
      const { body } = ctx.request;
      const res = await strapi.service("api::contact.contact").create(body);
      const publishedAtStr = res.publishedAt
        ? res.publishedAt.toString()
        : null;
      await sendEmailContact(
        body.data.email,
        res.id,
        res.createdAt,
        res.stateMessage,
        res.responseContact,
        publishedAtStr
      );
      await senMessage(Number(res.id), "Nuevo mensaje");

      return {
        message: "Mensaje creada correctamente",
      };
    } catch (error) {
      strapi.log.error("Failed to create contact", { error });

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
      if (!data.id) {
        ctx.throw(400, "El ID es requerido para actualizar el contacto");
      }

      // Realiza la actualización
      const res = await strapi.entityService.update(
        "api::contact.contact",
        data.id,
        {
          data,
        }
      );

      // Intenta enviar un correo electrónico con la información actualizada
      try {
        const createdAtStr = res.createdAt
          ? res.createdAt.toString()
          : "Fecha desconocida";
        const publishedAtStr = res.publishedAt
          ? res.publishedAt.toString()
          : null;

        await sendEmailContact(
          res.email,
          data.id,
          createdAtStr,
          res.stateMessage,
          res.responseContact,
          publishedAtStr
        );
      } catch (error) {
        console.error("Error al enviar correo electrónico:", error);
      }

      // Responde con éxito
      ctx.body = {
        message: "Contacto actualizado correctamente",
      };
    } catch (error) {
      console.error("Error al actualizar el contacto:", error);
      ctx.throw(500, "Error al actualizar el contacto", {
        details: error.message,
      });
    }
  },
});
