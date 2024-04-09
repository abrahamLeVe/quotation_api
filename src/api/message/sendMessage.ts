const axios = require("axios");

export async function senMessage(id) {
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