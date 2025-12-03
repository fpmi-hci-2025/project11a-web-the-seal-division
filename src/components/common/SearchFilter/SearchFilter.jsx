import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FiltersModal from '../../ui/FiltersModal/FiltersModal';
import './SearchFilter.css';

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const navigate = useNavigate();

  const buildQueryString = (extraParams = {}) => {
    const params = new URLSearchParams();

    if (searchTerm.trim()) {
      params.set('search', searchTerm.trim());
    }

    Object.entries(extraParams).forEach(([key, value]) => {
      if (value !== undefined && value !== '' && value !== null) {
        params.set(key, String(value));
      }
    });

    const query = params.toString();
    return query ? `?${query}` : '';
  };

  const handleSearch = () => {
    const query = buildQueryString();
    navigate(`/catalog${query}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleFilterClick = () => {
    setIsFiltersOpen(true);
  };

  const handleCloseFilters = () => {
    setIsFiltersOpen(false);
  };

  const handleApplyFilters = (filters) => {
    const activeCategories = Object.entries(filters.categories)
      .filter(([, checked]) => checked)
      .map(([key]) => key)
      .join(',');

    const query = buildQueryString({
      categories: activeCategories,
      minPrice: filters.priceRange.min,
      maxPrice: filters.priceRange.max,
      rating: filters.rating !== '0' ? filters.rating : undefined,
      inStock: filters.availability.inStock ? '1' : undefined,
      preOrder: filters.availability.preOrder ? '1' : undefined
    });

    navigate(`/catalog${query}`);
  };

  return (
    <>
      <section className="search-filter">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Поиск книг по названию, автору, тематике или издательству..."
            className="search-bar__input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className="search-bar__button" onClick={handleSearch}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z"
                fill="#11433D"
              />
            </svg>
          </button>
        </div>
        <button className="filter-btn" onClick={handleFilterClick}>
          <svg width="50" height="50" viewBox="0 0 24 24" fill="none">
            <path d="M10 18H14V16H10V18ZM3 6V8H21V6H3ZM6 13H18V11H6V13Z" fill="#11433D" />
          </svg>
        </button>
      </section>

      <FiltersModal
        isOpen={isFiltersOpen}
        onClose={handleCloseFilters}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
};

export default SearchFilter;