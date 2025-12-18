import React, { useState, useEffect } from 'react';
import { useCategories } from '../../../hooks/api/useCategories';
import './FiltersModal.css';

const FiltersModal = ({ isOpen, onClose, onApplyFilters }) => {
  const { categories, loading: categoriesLoading } = useCategories();
  
  // Инициализируем фильтры категорий на основе данных из API
  const [filters, setFilters] = useState({
    categories: {},
    priceRange: {
      min: '',
      max: ''
    },
    rating: '0',
    availability: {
      inStock: true,
      preOrder: false
    }
  });

  // Инициализируем категории из API при загрузке
  useEffect(() => {
    if (categories.length > 0) {
      const initialCategories = {};
      categories.forEach(cat => {
        const categoryName = cat.name || cat;
        initialCategories[categoryName] = true; // По умолчанию все категории выбраны
      });
      setFilters(prev => ({
        ...prev,
        categories: initialCategories
      }));
    }
  }, [categories]);

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      categories: {
        ...prev.categories,
        [category]: !prev.categories[category]
      }
    }));
  };

  const handlePriceChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [field]: value
      }
    }));
  };

  const handleRatingChange = (rating) => {
    setFilters(prev => ({
      ...prev,
      rating
    }));
  };

  const handleAvailabilityChange = (type) => {
    setFilters(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [type]: !prev.availability[type]
      }
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    const resetCategories = {};
    categories.forEach(cat => {
      const categoryName = cat.name || cat;
      resetCategories[categoryName] = true;
    });
    setFilters({
      categories: resetCategories,
      priceRange: {
        min: '',
        max: ''
      },
      rating: '0',
      availability: {
        inStock: true,
        preOrder: false
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div className="filters-modal-overlay" onClick={onClose}>
      <div className="filters-modal" onClick={(e) => e.stopPropagation()}>
        <div className="filters-modal__header">
          <h2 className="filters-modal__title">Фильтры</h2>
          <button className="filters-modal__close" onClick={onClose}>
            &times;
          </button>
        </div>

        <div className="filters-modal__content">
          {/* Категории */}
          <div className="filters-section">
            <h3 className="filters-section__title">Категории</h3>
            {categoriesLoading ? (
              <p>Загрузка категорий...</p>
            ) : categories.length === 0 ? (
              <p>Категории не найдены</p>
            ) : (
              <div className="filters-checkbox">
                {categories.map((cat) => {
                  const categoryName = cat.name || cat;
                  const checked = filters.categories[categoryName] || false;
                  return (
                    <label key={cat.id || categoryName} className="filter-label">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => handleCategoryChange(categoryName)}
                      />
                      <span className="checkmark"></span>
                      {categoryName}
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Цена */}
          <div className="filters-section">
            <h3 className="filters-section__title">Цена, BYN</h3>
            <div className="price-range">
              <div className="price-inputs">
                <input
                  type="number"
                  className="price-input"
                  placeholder="0"
                  value={filters.priceRange.min}
                  onChange={(e) => handlePriceChange('min', e.target.value)}
                />
                <span className="price-separator">—</span>
                <input
                  type="number"
                  className="price-input"
                  placeholder="5000"
                  value={filters.priceRange.max}
                  onChange={(e) => handlePriceChange('max', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Рейтинг */}
          <div className="filters-section">
            <h3 className="filters-section__title">Рейтинг</h3>
            <div className="rating-filters">
              <label className="filter-label">
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  checked={filters.rating === '5'}
                  onChange={() => handleRatingChange('5')}
                />
                <span className="radio-mark"></span>
                <span className="stars">★★★★★</span>
              </label>
              <label className="filter-label">
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  checked={filters.rating === '4'}
                  onChange={() => handleRatingChange('4')}
                />
                <span className="radio-mark"></span>
                <span className="stars">★★★★☆ и выше</span>
              </label>
              <label className="filter-label">
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  checked={filters.rating === '3'}
                  onChange={() => handleRatingChange('3')}
                />
                <span className="radio-mark"></span>
                <span className="stars">★★★☆☆ и выше</span>
              </label>
              <label className="filter-label">
                <input
                  type="radio"
                  name="rating"
                  value="0"
                  checked={filters.rating === '0'}
                  onChange={() => handleRatingChange('0')}
                />
                <span className="radio-mark"></span>
                Любой рейтинг
              </label>
            </div>
          </div>

          {/* Наличие */}
          <div className="filters-section">
            <h3 className="filters-section__title">Наличие</h3>
            <div className="availability-filters">
              <label className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.availability.inStock}
                  onChange={() => handleAvailabilityChange('inStock')}
                />
                <span className="checkmark"></span>
                В наличии
              </label>
              <label className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.availability.preOrder}
                  onChange={() => handleAvailabilityChange('preOrder')}
                />
                <span className="checkmark"></span>
                Предзаказ
              </label>
            </div>
          </div>
        </div>

        <div className="filters-modal__actions">
          <button className="filters-reset" onClick={handleReset}>
            Сбросить
          </button>
          <button className="filters-apply" onClick={handleApply}>
            Применить фильтры
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiltersModal;