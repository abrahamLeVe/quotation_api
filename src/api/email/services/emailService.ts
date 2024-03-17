export const sendEmail = async (email: string, quotation: any) => {
  const emailTemplate = {
    subject: `Detalles de Cotización`,
    text: `Gracias por tu cotización. Por favor, encuentra los detalles adjuntos.`,
    html: `
    <body>
        <h2>Detalle de Cotización</h2>
        <p><strong>ID de Cotización:</strong> ${quotation.id}</p>
        <p><strong>Fecha de Creación:</strong> ${quotation.createdAt}</p>
        <p><strong>Email:</strong> ${quotation.email}</p>
        <h3>Productos:</h3>
        <ul>
            ${quotation.products
              .map(
                (product: any) => `
            <li>
                <p><strong>ID:</strong> ${product.id}</p>
                <p><strong>Título:</strong> ${product.title}</p>
                ${
                  product.size
                    ? `<p><strong>Medida:</strong> ${product.size}</p>`
                    : ""
                }
                <p><strong>Cantidad:</strong> ${product.quantity}</p>
                ${
                  product.colors[0]?.id > 0
                    ? `
                    <p><strong>Colores:</strong></p>
                    <ul>
                        ${product.colors
                          .map(
                            (color: any) => `
                            <li>
                              <span style="background-color: ${color.color.attributes.code};">&nbsp;&nbsp;&nbsp;</span>
                              <strong>${color.color.attributes.name}</strong> - Cantidad: ${color.quantity}
                            </li>
                        `
                          )
                          .join("")}
                    </ul>
                `
                    : ""
                }
                <p><strong>Imagen:</strong> <img src="${
                  product.picture_url
                }" alt="${product.title}" style="max-width: 100px;"></p>
            </li>
            `
              )
              .join("")}
        </ul>
        <p><strong>Fecha Límite:</strong> ${quotation.dateLimit}</p>
        <p><strong>Estado:</strong> ${quotation.codeStatus}</p>
    </body>
    `,
  };

  try {
    await strapi.plugins["email"].services.email.sendTemplatedEmail(
      {
        to: email,
      },
      emailTemplate
    );

    console.log("Correo electrónico enviado correctamente a:", email);
  } catch (error) {
    console.error("Error al enviar correo electrónico:", error);
    throw error;
  }
};
