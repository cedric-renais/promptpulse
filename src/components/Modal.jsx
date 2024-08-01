import '@sass/components/Modal.scss';
import { useEffect, useRef } from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  const modalRef = useRef(null);
  const cancelButtonRef = useRef(null);
  const confirmButtonRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // Focus sur le premier bouton de la modal
      cancelButtonRef.current.focus();

      const handleKeyDown = (event) => {
        if (event.key === 'Tab') {
          // Gérer le cycle de focus
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey) {
            // Si Shift + Tab est pressé
            if (document.activeElement === firstElement) {
              event.preventDefault();
              lastElement.focus();
            }
          } else {
            // Si Tab est pressé
            if (document.activeElement === lastElement) {
              event.preventDefault();
              firstElement.focus();
            }
          }
        } else if (event.key === 'Escape') {
          // Fermer la modal avec la touche Échap
          onClose();
        }
      };

      const currentModalRef = modalRef.current;
      currentModalRef.addEventListener('keydown', handleKeyDown);

      return () => {
        if (currentModalRef) {
          currentModalRef.removeEventListener('keydown', handleKeyDown);
        }
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal__content" ref={modalRef}>
        <h2>Confirmation</h2>
        <p>Tu es sûr de vouloir supprimer ce prompt ?</p>
        <div className="modal__actions">
          <button
            type="button"
            className="modal__cancel"
            onClick={onClose}
            ref={cancelButtonRef}
          >
            Non
          </button>
          <button
            type="button"
            className="modal__confirm"
            onClick={onConfirm}
            ref={confirmButtonRef}
          >
            Oui
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
