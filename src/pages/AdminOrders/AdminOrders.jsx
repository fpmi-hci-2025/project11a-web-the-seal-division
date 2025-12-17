import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { formatPrice } from '../../utils/helpers';
import './AdminOrders.css';

const ORDERS_STORAGE_KEY = 'orders';

const loadOrders = () => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to load orders from storage', e);
    return [];
  }
};

const saveOrders = (orders) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save orders to storage', e);
  }
};

const STATUS_OPTIONS = ['новый', 'в обработке', 'завершён'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = loadOrders();
    setOrders(stored);
  }, []);

  const handleStatusChange = (index, newStatus) => {
    setOrders((prev) => {
      const updated = prev.map((order, i) =>
        i === index
          ? {
              ...order,
              status: newStatus
            }
          : order
      );
      saveOrders(updated);
      return updated;
    });
  };

  return (
    <div className="admin-orders-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Администрирование заказов' }
            ]}
          />

          <section className="admin-orders-section">
            <h1 className="page-title">Администрирование заказов</h1>

            {orders.length === 0 ? (
              <p className="admin-orders__empty">
                Заказов пока нет. Они появятся здесь после оформления заказов пользователями.
              </p>
            ) : (
              <div className="admin-orders-table-wrapper">
                <table className="admin-orders-table">
                  <thead>
                    <tr>
                      <th>№ заказа</th>
                      <th>Дата</th>
                      <th>Клиент</th>
                      <th>E-mail</th>
                      <th>Сумма</th>
                      <th>Товаров</th>
                      <th>Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, index) => {
                      const date = order.orderDate || order.date;
                      const total = order.total || order.totalPrice;
                      const items = order.items || [];
                      const itemsCount = items.reduce(
                        (sum, item) => sum + (item.quantity || 1),
                        0
                      );

                      return (
                        <tr key={order.orderNumber || order.id || index}>
                          <td>{order.orderNumber || order.id || index + 1}</td>
                          <td>
                            {date
                              ? new Date(date).toLocaleString('ru-RU')
                              : '—'}
                          </td>
                          <td>{order.customerName || order.firstName || '—'}</td>
                          <td>{order.customerEmail || order.email || '—'}</td>
                          <td>{total ? formatPrice(total) : '—'}</td>
                          <td>{itemsCount}</td>
                          <td>
                            <select
                              className="admin-orders-status-select"
                              value={order.status || 'новый'}
                              onChange={(e) =>
                                handleStatusChange(index, e.target.value)
                              }
                            >
                              {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminOrders;


