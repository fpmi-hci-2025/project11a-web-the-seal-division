import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { formatPrice } from '../../utils/helpers';
import { apiService } from '../../services/apiService';
import './AdminOrders.css';

const STATUS_OPTIONS = ['новый', 'в обработке', 'завершён'];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllOrders();
        const mapped = Array.isArray(data)
          ? data.map((o) => ({
              id: o.id,
              address: o.address,
              total: o.total_amount,
              status: o.status || 'новый',
              itemsRaw: o.items,
              user: o.user || null
            }))
          : [];
        setOrders(mapped);
      } catch (e) {
        console.error('Failed to load orders from API', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (index, newStatus) => {
    setOrders((prev) =>
      prev.map((order, i) =>
        i === index
          ? {
              ...order,
              status: newStatus
            }
          : order
      )
    );

    const order = orders[index];
    if (!order) return;

    try {
      await apiService.updateOrderStatus(order.id, newStatus);
    } catch (e) {
      console.error('Failed to update order status', e);
    }
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

            {loading && <p className="admin-orders__empty">Загрузка заказов...</p>}
            {error && !orders.length && (
              <p className="admin-orders__empty">Не удалось загрузить заказы.</p>
            )}

            {orders.length === 0 && !loading ? (
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
                      let items = [];
                      try {
                        items = order.itemsRaw ? JSON.parse(order.itemsRaw) : [];
                      } catch (error) {
                        console.error('Failed to update order status', error.message || error);
                        items = [];
                      }
                      const itemsCount = items.reduce(
                        (sum, item) => sum + (item.quantity || 1),
                        0
                      );

                      return (
                        <tr key={order.id || index}>
                          <td>{order.id || index + 1}</td>
                          <td>—</td>
                          <td>
                            {order.user
                              ? `${order.user.first_name || ''} ${order.user.last_name || ''}`.trim()
                              : '—'}
                          </td>
                          <td>{order.user ? order.user.email : '—'}</td>
                          <td>{order.total ? formatPrice(order.total) : '—'}</td>
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


