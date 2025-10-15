import { useState, useEffect, useRef } from 'react'
import SwaggerUI from 'swagger-ui-react'
import 'swagger-ui-react/swagger-ui.css'
import './APIDocs.module.css'

const APIDocs = () => {
  const [swaggerSpec, setSwaggerSpec] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadSwaggerSpec = async () => {
      try {
        const response = await fetch('https://https://project11a-backend-the-seal-division.onrender.com/swagger/doc.json')
        
        if (!response.ok) {
          throw new Error(`Failed to load Swagger spec: ${response.status}`)
        }
        
        const spec = await response.json()
        
        const updatedSpec = {
          ...spec,
          host: 'https://project11a-backend-the-seal-division.onrender.com',
          schemes: ['https'],
          servers: [
            {
              url: 'https://https://project11a-backend-the-seal-division.onrender.com',
              description: 'Production server'
            }
          ]
        }
        
        setSwaggerSpec(updatedSpec)
      } catch (err) {
        console.error('Error loading Swagger spec:', err)
        setError(err.message)
        
        try {
          const localResponse = await fetch('/swagger/swagger.json')
          const localSpec = await localResponse.json()
          setSwaggerSpec(localSpec)
        } catch (localErr) {
          console.error('Error loading local Swagger spec:', localErr)
        }
      } finally {
        setLoading(false)
      }
    }

    loadSwaggerSpec()
  }, [])

  if (loading) {
    return (
      <div className="api-docs-container">
        <div className="loading">Загрузка документации...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="api-docs-container">
        <div className="error">
          <h2>Ошибка загрузки документации</h2>
          <p>{error}</p>
          <p>Используется локальная версия документации</p>
        </div>
        {swaggerSpec && (
          <SwaggerUI 
            spec={swaggerSpec}
            tryItOutEnabled={true}
            supportedSubmitMethods={['get', 'post', 'put', 'delete']}
            requestSnippetsEnabled={true}
          />
        )}
      </div>
    )
  }

  return (
    <div className="api-docs-container">
      <div className="api-docs-header">
        <h1>BookStore API Documentation</h1>
        <p>Интерактивная документация REST API</p>
        <div className="api-info">
          <strong>Base URL:</strong> https://project11a-backend-the-seal-division.onrender.com
        </div>
      </div>
      
      {swaggerSpec && (
        <SwaggerUI 
          spec={swaggerSpec}
          tryItOutEnabled={true}
          supportedSubmitMethods={['get', 'post', 'put', 'delete']}
          requestSnippetsEnabled={true}
          persistAuthorization={true}
          displayRequestDuration={true}
          deepLinking={true}
          filter={true}
          onComplete={(system) => {
            console.log('Swagger UI loaded', system)
          }}
        />
      )}
    </div>
  )
}

export default APIDocs