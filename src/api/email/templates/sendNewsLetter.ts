export const sendtemplateEmailNewsLetter = () => {
  const emailTemplate = {
    subject: `Bienvenido`,
    text: ``,
    html: `
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
        text-align: left;
      }
      a {
        display: inline-block;
        padding: 10px 20px;
        margin: 20px 0;
        background-color: #007bff;
        color: #fff !important;
        text-decoration: none;
        border-radius: 5px;
      }
      .div-img {
        max-width: 500px;
        margin: auto; 
        padding: 10px;
        border: 1px solid #ccc; 
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
        border-radius: 10px; 
        transition: transform 0.3s; 
      }
      .div-img:hover {
        transform: translateY(-5px); 
        box-shadow: 0 12px 16px rgba(0, 0, 0, 0.2);
      }
      img {
        max-width: 100%; 
        height: auto; 
        border-radius: 10px; 
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Suscripción a las novedades de Consorcio A&C eléctrica S.A.C</h1>
      <p>Tenemos un regalo especial de bienvenida.</p>
      <div class="div-img">
        <img
          src="https://res.cloudinary.com/dmpmxzyrg/image/upload/v1713794274/Brown_Green_Illustrated_Clothing_Gift_Voucher_Card_3876ec8230.png"
          loading="eager"
        />
      </div>
      <a href="${process.env.CLIENT_URL}">Visite nuestra tienda virtual</a>
      <p>Gracias por utilizar nuestros servicios.</p>
    </div>
  </body>
</html>

    `,
  };
  return emailTemplate;
};
