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
        allowedFields: ["quotations", "payments", "observer"],
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
          defaultFrom: "consorcio.electrica.sac@gmail.com",
          defaultReplyTo: "consorcio.electrica.sac@gmail.com",
        },
      },
    },
  },
});
