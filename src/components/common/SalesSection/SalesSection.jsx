import React from 'react';
import { useSales } from '../../../hooks/api/useSales';
import { staticData } from '../../../utils/staticData';
import SaleCard from '../../ui/SaleCard/SaleCard';
import './SalesSection.css';

const SalesSection = () => {
  const { sales, loading, error } = useSales();
  
  // Используем статические данные, если API не доступно
  const displaySales = sales.length > 0 ? sales : staticData.sales;

  const handleAllSales = () => {
    // Навигация на страницу всех акций
    console.log('Navigate to all sales');
  };

  if (loading) return <div className="loading">Загрузка акций...</div>;
  if (error) console.error('Error loading sales:', error);

  return (
    <section className="sales-section">
      <h2 className="section-title">Акции</h2>
      <div className="sales-grid">
        {displaySales.map(sale => (
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