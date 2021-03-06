module.exports = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Zombie API",
      description: "Simple CRUD Zombie API",
      version: "1.0.0",
      contact: {
        name: "Piotr Jalowiecki",
        email: "jalowieckipiotr@gmail.com"
      }
    },
    servers: [
      {
        url: "https://zombies-api-jalowieckipiotr.herokuapp.com"
      }
    ]
  },
  apis: ["./app/routes/*.js"]
};
