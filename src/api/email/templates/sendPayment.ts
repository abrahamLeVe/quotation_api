import { formatDate } from "../../../utilities/dataFech";

export const sendtemplateEmailPayment = (quotation: any, payment: any) => {
  const emailTemplate = {
    subject: `Detalles de pago ${quotation.id}`,
    text: ``,
    html: `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f9; color: #333; }
          h2 { color: #444; }
          a { color: #fff !important; text-decoration: none; }
          .footer { background-color: #f0f0f0; padding: 20px; text-align: center; }
          .button { background-color: #4CAF50; color: white; padding: 10px 20px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px; margin: 4px 2px; cursor: pointer; border-radius: 5px; }
          .logo { max-width: 200px; margin-bottom: 20px; }
        </style>
      </head>
      <body>
        <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2>Detalle de Pago</h2>
          <p><strong>Gracias por su compra</strong>, a continuación encontrará el detalle su compra.
          Si tiene alguna pregunta o necesita más información, no dude en contactarnos.</p>
          <p><strong>Id mercado pago:</strong> ${payment.payment_id}</p>
          <p><strong>Estado de pago:</strong> Aprobado</p>
          <p><strong>Fecha de pago:</strong> ${formatDate(
            payment.createdAt
          )}</p>
          <p><strong>Cotización N°:</strong> ${quotation.id}</p>
          <p><strong>Estado de cotización:</strong> ${quotation.codeStatus}</p>
          <div class="footer">
            <a href="${
              process.env.CLIENT_URL
            }" class="button">Visite nuestra tienda virtual</a>
            <a href="${
              process.env.CLIENT_URL
            }/dashboard/order" class="button">Ver mis cotizaciones y/o pagos</a>
            <a href="${
              process.env.CLIENT_URL
            }/dashboard/order" class="button">Descargar boleta N° ${
      quotation.id
    }</a>
          </div>
          <br>
          <img src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1710720912/logo_app_e0c73ca462.png" alt="Logo de la empresa" class="logo">
          <p>Gracias nuevamente por confiar en nosotros para su cotización.</p>
          <p><strong>Atentamente,</strong></p>
          <p><strong>Equipo de Cotizaciones</strong></p>
          <p><strong>Telefono de contacto: <a href="tel:+51948125398">948125398</a></strong></p>
          <p><strong>Email de contacto: <a href="mailto:consorcio.electrica.sac@gmail.com">consorcio.electrica.sac@gmail.com</a></strong></p>
          <p>Usted puede descargar sus comprobantes a través de su panel de administración en la página web.</p>
        </div>
      </body>
    </html>
    `,
  };
  return emailTemplate;
};
