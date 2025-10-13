import { Link } from 'react-router-dom'
import './Home.module.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              Добро пожаловать в <span>BookStore</span>
            </h1>
            <p className="hero-description">
              Откройте для себя мир увлекательных книг. От классики до современных бестселлеров - 
              всё в одном месте.
            </p>
            <div className="hero-actions">
              <Link to="/catalog" className="btn btn-primary">
                Смотреть каталог
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Почему выбирают нас?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Быстрая доставка</h3>
              <p>Доставка по всему миру в кратчайшие сроки</p>
            </div>
            <div className="feature-card">
              <h3>Лучшие цены</h3>
              <p>Конкурентные цены и регулярные акции</p>
            </div>
            <div className="feature-card">
              <h3>Широкий выбор</h3>
              <p>Сотни книг различных жанров и авторов</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home