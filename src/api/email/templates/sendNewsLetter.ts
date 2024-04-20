export const sendtemplateEmailNewsLetter = () => {
  const emailTemplate = {
    subject: `Bienvenido suscriptor`,
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
        <h1>Suscripción a las novedades de Consorcio A&C eléctrica S.A.C</h1>
        <p>No se perderá de las últimas novedades y actualizacines.</p>
        <a href="${process.env.CLIENT_URL}">Visite nuestra tienda virtual</a>
        <p>Gracias por utilizar nuestros servicios.</p>
    </div>
</body>
</html>
    `,
  };
  return emailTemplate;
};
