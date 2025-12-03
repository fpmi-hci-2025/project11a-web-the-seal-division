import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useSales } from '../../hooks/api/useSales';
import { staticData } from '../../utils/staticData';
import SaleCard from '../../components/ui/SaleCard/SaleCard';
import './SalesPage.css';

const SalesPage = () => {
  const { sales, loading, error } = useSales();
  const displaySales = sales.length > 0 ? sales : staticData.sales;

  return (
    <div className="sales-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Акции' }
            ]}
          />
          <section className="sales-section-page">
            <h1 className="page-title">Акции</h1>
            {loading && <div>Загрузка акций...</div>}
            {error && !displaySales.length && <div>Не удалось загрузить акции.</div>}
            <div className="sales-grid-page">
              {displaySales.map((sale) => (
                <SaleCard key={sale.id} sale={sale} />
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SalesPage;


