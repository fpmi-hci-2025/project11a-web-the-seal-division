import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/helpers';
import { apiService } from '../../services/apiService';
import './Profile.css';

const Profile = () => {
  const { user, markNotificationsRead } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  const notifications = user?.notifications || [];
  const hasNotifications = notifications.length > 0;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        setLoadingOrders(true);
        const data = await apiService.getUserOrders(user.id);
        const mapped = Array.isArray(data)
          ? data.map((o) => {
              let items = [];
              try {
                items = o.items ? JSON.parse(o.items) : [];
              } catch {
                items = [];
              }
              return {
                id: o.id,
                total: o.total_amount,
                status: o.status || 'новый',
                items
              };
            })
          : [];
        setOrders(mapped);
      } catch (e) {
        console.error('Failed to load user orders', e);
        setOrdersError(e.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getItemsCount = (items) =>
    items.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="profile-page">
      <Header />
      <main className="main">
        <div className="container">
          <Breadcrumbs
            items={[
              { label: 'Главная', path: '/' },
              { label: 'Профиль' }
            ]}
          />
          <section className="profile-section">
            <h1 className="page-title">Личный кабинет</h1>

            <div className="profile-layout">
              <div className="profile-card">
                <h2>Покупатель</h2>
                <p><strong>Имя:</strong> {user?.name}</p>
                <p><strong>E-mail:</strong> {user?.email}</p>
              </div>

              <div className="profile-orders">
                <h2>История заказов</h2>
                {loadingOrders && <p className="profile-orders__empty">Загрузка заказов...</p>}
                {ordersError && !orders.length && (
                  <p className="profile-orders__empty">Не удалось загрузить заказы.</p>
                )}
                {!loadingOrders && orders.length === 0 && !ordersError ? (
                  <p className="profile-orders__empty">
                    У вас пока нет заказов. Добавьте книги в корзину и оформите первый заказ!
                  </p>
                ) : null}

                {orders.length > 0 && (
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Номер</th>
                        <th>Товары</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{getItemsCount(order.items)}</td>
                          <td>{formatPrice(order.total)}</td>
                          <td>{order.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>

              <div className="profile-notifications">
                <h2>Уведомления</h2>
                {!hasNotifications ? (
                  <p className="profile-orders__empty">Пока нет уведомлений.</p>
                ) : (
                  <>
                    <ul className="notifications-list">
                      {notifications.map((n) => (
                        <li
                          key={n.id}
                          className={`notification-item${n.read ? ' notification-item--read' : ''}`}
                        >
                          <span className="notification-text">{n.text}</span>
                          <span className="notification-date">
                            {new Date(n.date).toLocaleString('ru-RU')}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      className="notifications-read-btn"
                      onClick={markNotificationsRead}
                    >
                      Отметить как прочитанные
                    </button>
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;