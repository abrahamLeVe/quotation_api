export default ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "10h",
      },
      register: {
        allowedFields: ["quotations", "status"],
      },
    },
  },
  email: {
    config: {
      provider: "nodemailer",
      providerOptions: {
        service: "gmail",
        auth: {
          user: env("SMTP_USERNAME"),
          pass: env("SMTP_PASSWORD"),
        },
        settings: {
          defaultFrom:
            '"Consorcio A&C Eléctrica S.A.C 👻" <consorcio.electrica.sac@gmail.com>',
          defaultReplyTo:
            '"Consorcio A&C Eléctrica S.A.C 👻" <consorcio.electrica.sac@gmail.com>',
        },
      },
    },
  },
});
