import React from 'react';
import { useModal } from '../../../hooks/useModal';
import Modal from '../Modal/Modal';
import './SaleCard.css';

const SaleCard = ({ sale }) => {
  const { isOpen, openModal, closeModal } = useModal();

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.parentElement.style.background = 'linear-gradient(135deg, #11433D 0%, #1a5a52 100%)';
  };

  return (
    <>
      <div className="sale-card" onClick={openModal}>
        <img 
          src='https://img.freepik.com/free-vector/illustration-red-color-paper-sale-label-with-shadow_91128-760.jpg?semt=ais_hybrid&w=740&q=80' 
          alt={sale.title} 
          className="sale-card__image"
          onError={handleImageError}
        />
        <div className="sale-card__overlay">
          <h3 className="sale-card__title">{sale.title}</h3>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} title={sale.title}>
        <div className="sale-modal-content">
          <img src='https://img.freepik.com/free-vector/illustration-red-color-paper-sale-label-with-shadow_91128-760.jpg?semt=ais_hybrid&w=740&q=80' alt={sale.title} className="sale-modal__image" />
          <p className="sale-modal__description">{sale.description}</p>
          <button className="modal__action" onClick={closeModal}>
            Понятно
          </button>
        </div>
      </Modal>
    </>
  );
};

export default SaleCard;