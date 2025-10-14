import './APIDocsLink.module.css'

const APIDocsLink = () => {
  return (
    <a 
      href="/api-docs.html" 
      target="_blank" 
      rel="noopener noreferrer"
      className="api-docs-link"
    >
      API Documentation
    </a>
  )
}

export default APIDocsLink