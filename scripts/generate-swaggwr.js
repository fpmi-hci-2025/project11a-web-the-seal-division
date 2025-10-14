const fs = require('fs');
const path = require('path');

const swaggerDir = path.join(__dirname, '../public/swagger');
if (!fs.existsSync(swaggerDir)) {
  fs.mkdirSync(swaggerDir, { recursive: true });
}

const defaultSwaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "BookStore API",
    version: "1.0.0",
    description: "REST API для онлайн-магазина книг"
  },
  servers: [
    {
      url: "https://project11a-backend-the-seal-division.onrender.com",
      description: "Production server"
    }
  ],
  paths: {
    "/api/hello": {
      "get": {
        "summary": "Тестовый эндпоинт",
        "responses": {
          "200": {
            "description": "Успешный ответ",
            "content": {
              "application/json": {
                "example": {
                  "message": "Hello World from Bookstore Backend API!",
                  "version": "1.0.0"
                }
              }
            }
          }
        }
      }
    }
  }
};

fs.writeFileSync(
  path.join(swaggerDir, 'swagger.json'),
  JSON.stringify(defaultSwaggerSpec, null, 2)
);

console.log('Default Swagger specification generated');