import { formatDate } from "../../../utilities/dataFech";
import { Product } from "../../quotation/models/quotation.model";

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
        <li><a href="${
          process.env.CLIENT_URL
        }/dashboard/order">Descargar comprobante N°${quotation.id}</a></li>

        <table style="border-collapse: collapse; width: 100%; border: 1px solid black;">
          <thead>
            <tr>
              <th style="border: 1px solid black;">Item</th>
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
                (product: Product, index) => `
              <tr>
                <td style="border: 1px solid black; text-align: center; padding: 1em;">${
                  index + 1
                }</td>
                <td style="border: 1px solid black; padding: 1em;">
                <a href="${process.env.CLIENT_URL}/product/${product.slug}">${
                  product.title
                }</a>                
                </td>
                <td style="border: 1px solid black; text-align: center; padding: 1em;">${
                  product.size || "-"
                }</td>
                <td style="border: 1px solid black; text-align: center; padding: 1em;">${
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
        <p>Usted puede descargar sus comprobantes atravez de su panel de administración en la página web:</p>

        <ul>
          <li><a href=${
            process.env.CLIENT_URL
          }>Visite nuestra tienda virtual</a></li>
          <li><a href="${
            process.env.CLIENT_URL
          }/dashboard/order">Ver mis cotizaciones</a></li>
                           
        </ul>
        <br><br>
        <p>Gracias nuevamente por confiar en nosotros para tu cotización.</p>
        <p><strong>Atentamente,</strong></p>
        <p><strong>Equipo de Cotizaciones</strong></p> 
        <a href=${
          process.env.CLIENT_URL
        }><img src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1710720912/logo_app_e0c73ca462.png" alt="Logo de la empresa" style="max-width: 200px;"></a>       
        <p><strong>Telefono de contacto: <a href="tel:+51948125398">948125398</a></strong></p>
        <p><strong>Email de contacto: <a href="mailto:consorcio.electrica.sac@gmail.com">consorcio.electrica.sac@gmail.com</a></strong></p>
              
        
        
    </body>
    `,
  };
  return emailTemplate;
};
