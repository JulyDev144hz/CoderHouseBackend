const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const productsSchema = {
  type: "object",
  properties: {
    id: { type: "integer", descripcion: "id unico de la tarea" },
    title: { type: "string", descripcion: "titulo de la tarea" },
    description: { type: "string", descripcion: "descripcion de la tarea" },
  },
};

const options = {
  definition: {
    info: {
      title: "Ecommerce Coderhouse Backend",
      version: "1.0.0",
      description: "Ecommerce del curso de coderhouse Backend",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
  },
  apis: ["./src/components/*/index.js"],
  components:{
    schemas:{
        Products:productsSchema
    }
  }
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
