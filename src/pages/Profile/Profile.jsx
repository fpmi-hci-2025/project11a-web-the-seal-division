import React from 'react';
import Header from '../../components/common/Header/Header';
import Footer from '../../components/common/Footer/Footer';
import Breadcrumbs from '../../components/common/Breadcrumbs/Breadcrumbs';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/helpers';
import './Profile.css';

const Profile = () => {
  const { user, markNotificationsRead } = useAuth();

  const notifications = user?.notifications || [];
  const hasNotifications = notifications.length > 0;

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
                {!user?.orders || user.orders.length === 0 ? (
                  <p className="profile-orders__empty">
                    У вас пока нет заказов. Добавьте книги в корзину и оформите первый заказ!
                  </p>
                ) : (
                  <table className="orders-table">
                    <thead>
                      <tr>
                        <th>Номер</th>
                        <th>Дата</th>
                        <th>Товары</th>
                        <th>Сумма</th>
                        <th>Статус</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.orders.map((order) => (
                        <tr key={order.id}>
                          <td>#{order.id}</td>
                          <td>{new Date(order.date).toLocaleString('ru-RU')}</td>
                          <td>{order.items.reduce((sum, i) => sum + i.quantity, 0)}</td>
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