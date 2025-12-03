import React from 'react';
import { Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav className="breadcrumbs" aria-label="Навигация по сайту">
      <ul className="breadcrumbs__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label + index} className="breadcrumbs__item">
              {isLast || !item.path ? (
                <span className="breadcrumbs__current">{item.label}</span>
              ) : (
                <Link to={item.path} className="breadcrumbs__link">
                  {item.label}
                </Link>
              )}
              {!isLast && <span className="breadcrumbs__separator">/</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;


