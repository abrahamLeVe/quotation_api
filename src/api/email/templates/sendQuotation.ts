import { formatDate } from "../../../utilities/dataFech";

export const sendtemplateEmailQuotation = (quotation: any) => {
  const emailTemplate = {
    subject: `Detalles de Cotización ${quotation.id}`,
    text: ``,
    html: `
    <body>
        <h2>Detalle de Cotización</h2>
        <p><strong>Gracias por solicitar su cotización</strong>, a continuación 
        encontrará el detalle de la cotización que solicitó. 
        Si tiene alguna pregunta o necesita más información, no dude en contactarnos.</p>
        <p><strong>ID de Cotización:</strong> ${quotation.id}</p>
        <p><strong>Fecha de Creación:</strong> ${formatDate(
          quotation.createdAt
        )}</p>
        <p><strong>Email:</strong> ${quotation.email}</p>
        <p><strong>Fecha Límite:</strong> ${formatDate(quotation.dateLimit)}</p>
        <p><strong>Estado:</strong> ${quotation.codeStatus}</p>
        <table style="border-collapse: collapse; width: 100%; border: 1px solid black;">
          <thead>
            <tr>
              <th style="border: 1px solid black;">Id</th>
              <th style="border: 1px solid black;">Producto</th>
              <th style="border: 1px solid black;">Medida</th>
              <th style="border: 1px solid black;">Cantidad</th>
              <th style="border: 1px solid black;">Colores</th>
              <th style="border: 1px solid black;">Imagen</th>
            </tr>
          </thead>
          <tbody>
            ${quotation.products
              .map(
                (product: any) => `
              <tr>
                <td style="border: 1px solid black; text-align: center;">${
                  product.id
                }</td>
                <td style="border: 1px solid black;">${product.title}</td>
                <td style="border: 1px solid black; text-align: center;">${
                  product.size || "-"
                }</td>
                <td style="border: 1px solid black; text-align: center;">${
                  product.quantity
                }</td>
                <td style="border: 1px solid black;">
                  ${
                    product.colors.length > 0
                      ? `<ul>${product.colors
                          .map(
                            (color: any) => `
                      <li style="list-style-type: none; display: inline-block; margin-right: 10px;">
                        <span style="display: inline-block; width: 20px; height: 20px; border-radius: 50%; background-color: ${color.color.attributes.code};"></span>
                        <span>${color.color.attributes.name} - Cantidad: ${color.quantity}</span>
                      </li>
                    `
                          )
                          .join("")}</ul>`
                      : "-"
                  }
                </td>
                <td style="border: 1px solid black; text-align: center;"><img src="${
                  product.picture_url
                }" alt="${product.title}" style="max-width: 100px;"></td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
        <br><br>
        <p>Gracias nuevamente por confiar en nosotros para tu cotización.</p>
        <p><strong>Atentamente,</strong></p>
        <p><strong>Equipo de Cotizaciones</strong></p>
        <p><strong>Telefono de contacto: 948125398</strong></p>
        <img src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1710720912/logo_app_e0c73ca462.png" alt="Logo de la empresa" style="max-width: 200px;">
    </body>
    `,
  };
  return emailTemplate;
};
