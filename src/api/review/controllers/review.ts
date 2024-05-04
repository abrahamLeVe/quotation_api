import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::review.review",
  ({ strapi }) => ({
    async create(ctx) {
      try {
        const { rating, message, product, user } = ctx.request.body.data;
        const { body } = ctx.request;

        const existingRating = await strapi.entityService.findMany(
          "api::review.review",
          {
            filters: {
              user: user.id,
              product: product.id,
            },
          }
        );

        if (existingRating.length > 0) {
          return ctx.badRequest("Ya has calificado este producto.");
        }

        const productEntity = await strapi.entityService.findOne(
          "api::product.product",
          product.id
        );
        const newRatingAccumulated = Number(productEntity.rating) + rating;
        const newRatingCount = Number(productEntity.rating_count) + 1;

        await strapi.entityService.update("api::product.product", product.id, {
          data: {
            rating: newRatingAccumulated,
            rating_count: newRatingCount,
          },
        });

        await strapi.service("api::review.review").create(body);
        return {
          message: "Revisión creada correctamente",
        };
      } catch (error) {
        console.error("Error handling the product rating creation:", error);
        return ctx.internalServerError(
          "An error occurred during the creation process."
        );
      }
    },
  })
);
