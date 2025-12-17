import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSales } from '../../../hooks/api/useSales';
import SaleCard from '../../ui/SaleCard/SaleCard';
import './SalesSection.css';

const SalesSection = () => {
  const navigate = useNavigate();
  const { sales, loading, error } = useSales();

  const handleAllSales = () => {
    navigate('/sales');
  };

  if (loading) return <div className="loading">Загрузка акций...</div>;
  if (error) console.error('Error loading sales:', error);

  return (
    <section className="sales-section">
      <h2 className="section-title">Акции</h2>
      <div className="sales-grid">
        {sales.map((sale) => (
          <SaleCard key={sale.id} sale={sale} />
        ))}
      </div>
      <button className="all-sales-btn" onClick={handleAllSales}>
        Все акции
      </button>
    </section>
  );
};

export default SalesSection;