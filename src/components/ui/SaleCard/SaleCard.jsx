import React from 'react';
import { useModal } from '../../../hooks/useModal';
import Modal from '../Modal/Modal';
import './SaleCard.css';

const SaleCard = ({ sale }) => {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <>
      <div className="sale-card" onClick={openModal}>
        <img src={sale.image} alt={sale.title} className="sale-card__image" />
        <div className="sale-card__overlay">
          <h3 className="sale-card__title">{sale.title}</h3>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} title={sale.title}>
        <div className="sale-modal-content">
          <img src={sale.image} alt={sale.title} className="sale-modal__image" />
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