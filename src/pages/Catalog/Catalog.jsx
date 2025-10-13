import { useState } from 'react'
import './Catalog.module.css'

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <div className="catalog">
      <div className="container">
        <h1>Каталог книг</h1>
        
        <div className="catalog-controls">
          <input
            type="text"
            placeholder="Поиск по названию, автору..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <div className="filters">
            <select className="filter-select">
              <option value="">Все категории</option>
              <option value="fiction">Художественная литература</option>
              <option value="non-fiction">Нехудожественная литература</option>
              <option value="science">Наука</option>
              <option value="children">Детские книги</option>
            </select>
            
            <select className="filter-select">
              <option value="popular">По популярности</option>
              <option value="new">Сначала новые</option>
              <option value="price-low">По возрастанию цены</option>
              <option value="price-high">По убыванию цены</option>
            </select>
          </div>
        </div>

        <div className="catalog-content">
          <div className="books-grid">
            <div className="book-card placeholder">
              <h3>Каталог книг в разработке</h3>
              <p>Скоро здесь появятся все доступные книги</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Catalog