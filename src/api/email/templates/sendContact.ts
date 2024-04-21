import { formatDate } from "../../../utilities/dataFech";

export const sendtemplateEmailContact = (
  id: number,
  createdAt: string,
  stateMessage: boolean,
  responseContact?: string
) => {
  const emailTemplate = {
    subject: `Consulta N° ${id}`,
    text: ``,
    html: `
    <!DOCTYPE html>
    <html lang="es">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restablecimiento de Contraseña</title>
   <style>
    body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f9;
        margin: 0;
        padding: 20px;
    }
    .container {
        background-color: #ffffff;
        border: 1px solid #dce0e4;
        padding: 20px;
        max-width: 600px;
        margin: auto;
        text-align: center;
    }
    a {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #007BFF;
        color: #fff !important;
        text-decoration: none;
        border-radius: 5px;
    }
    </style>
    </head>
    <body>
    <div class="container">
        <h1>Gracias por contactarse con nosotros</h1>
        <p><strong>Código de consulta:</strong> ${id}</p>
        <p><strong>Fecha de Creación:</strong> ${formatDate(createdAt)}</p>
        <p><strong>Estado: </strong> ${
          !stateMessage ? "En proceso" : "Cerrado"
        }</p>
        ${
          stateMessage === false
            ? "<p>Su mensaje está en proceso de atención, muy pronto recibirá su respuesta.</p>"
            : "<p>Su mensaje a sido atendida, y pasa a cerrado.</p>"
        }
        ${
          !responseContact
            ? ""
            : `<p><strong>Detalles adicionales: </strong> ${responseContact}</p>`
        }
       
        <a href="${process.env.CLIENT_URL}">Visite nuestra tienda virtual</a>
        <p>Gracias por utilizar nuestros servicios.</p>
    </div>
</body>
</html>
    `,
  };
  return emailTemplate;
};
