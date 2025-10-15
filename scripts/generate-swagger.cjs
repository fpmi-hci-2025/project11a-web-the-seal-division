const fs = require('fs');
const path = require('path');

function shouldGenerateSwagger() {
  const swaggerFilePath = path.join(__dirname, '../public/swagger/swagger.json');
  
  if (!fs.existsSync(swaggerFilePath)) {
    console.log('Swagger file does not exist, generating...');
    return true;
  }
  
  const stats = fs.statSync(swaggerFilePath);
  if (stats.size === 0) {
    console.log('Swagger file is empty, regenerating...');
    return true;
  }
  
  try {
    const fileContent = fs.readFileSync(swaggerFilePath, 'utf8');
    const jsonContent = JSON.parse(fileContent);
    
    if (!jsonContent.paths || Object.keys(jsonContent.paths).length === 0) {
      console.log('Swagger file has no paths, regenerating...');
      return true;
    }
    
    console.log('Swagger file already exists and is valid, skipping generation');
    return false;
  } catch (error) {
    console.log('Swagger file is invalid, regenerating...');
    return true;
  }
}

function generateSwaggerSpec() {
  const swaggerDir = path.join(__dirname, '../public/swagger');
  
  if (!fs.existsSync(swaggerDir)) {
    fs.mkdirSync(swaggerDir, { recursive: true });
    console.log('Created swagger directory');
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
        url: "https://https://project11a-backend-the-seal-division.onrender.com",
        description: "Production server"
      },
      {
        url: "http://localhost:8080",
        description: "Development server"
      }
    ],
    paths: {
      "/api/hello": {
        "get": {
          "summary": "Тестовый эндпоинт",
          "description": "Возвращает приветственное сообщение от API",
          "responses": {
            "200": {
              "description": "Успешный ответ",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "message": {
                        "type": "string",
                        "example": "Hello World from Bookstore Backend API!"
                      },
                      "version": {
                        "type": "string", 
                        "example": "1.0.0"
                      },
                      "service": {
                        "type": "string",
                        "example": "bookstore-backend"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/health": {
        "get": {
          "summary": "Проверка здоровья сервера",
          "description": "Проверяет, что сервер работает корректно",
          "responses": {
            "200": {
              "description": "Сервер работает нормально",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "object",
                    "properties": {
                      "status": {
                        "type": "string",
                        "example": "OK"
                      },
                      "message": {
                        "type": "string",
                        "example": "Server is running"
                      },
                      "version": {
                        "type": "string",
                        "example": "1.0.0"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
              example: "Error message"
            },
            code: {
              type: "integer",
              example: 400
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
}

function main() {
  console.log('Checking if Swagger generation is needed...');
  
  if (shouldGenerateSwagger()) {
    generateSwaggerSpec();
  } else {
    console.log('Swagger generation skipped - file already exists and is valid');
  }
}

main();