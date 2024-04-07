import { factories } from "@strapi/strapi";
import { sendEmail } from "../../email/services/emailService";
const axios = require("axios");

export default factories.createCoreController("api::quotation.quotation", {
  async create(ctx) {
    try {
      const user = ctx.state.user;
      const { body } = ctx.request;
      console.log("use ", user);

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

      console.log("quotationUp ", JSON.stringify(quotationUp, null, 2));

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
      const { body } = ctx.request;
      console.log("use ", user);

      console.log("body ", JSON.stringify(body, null, 2));

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

async function senMessage(id) {
  const message = {
    notification: {
      title: "Nueva cotización",
      body: `Código: ${id}`,
    },
    data: {
      screen: "/",
    },
    to: `${process.env.MESSAGE_APP_TOKEN}`,
  };
  const requestOptions = {
    method: "post",
    url: `${process.env.MESSAGE_API_URL}`,
    headers: {
      Authorization: `Bearer ${process.env.MESSAGE_API_TOKEN}`,
    },
    data: message,
  };

  // @ts-ignore
  const sendMessageRes = await axios(requestOptions);

  if (sendMessageRes.status !== 200) {
    throw new Error("Error al enviar la notificación");
  }
  console.log("message", message);

  console.log("sendMessageRes.data ", sendMessageRes.data);
  return sendMessageRes.data;
}
