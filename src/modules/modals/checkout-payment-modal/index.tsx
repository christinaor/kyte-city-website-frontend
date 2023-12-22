"use client"

import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

import PaymentAddNewCard from "./payment-add-new-card";
import PaymentBillingAddress from "./payment-billing-address";
import PaymentOptions from "./payment-options";

import useModalStore from "@/store/Modal";
import { useModalStepStore } from "@/store/modal-store/ModalStep";
import { PaymentChoiceDataType, usePaymentChoiceStore } from "@/store/modal-store/PaymentOptions";
import { useStripePaymentStore } from "@/store/modal-store/StripePayment";

const CheckoutPaymentModal: React.FC = () => {
  const { isModalOpen, closeModal } = useModalStore();
  const { step, updateToNextStep, updateToPreviousStep, resetAll } = useModalStepStore();
  const { updateAll } = usePaymentChoiceStore();
  const { customerId } = useStripePaymentStore();

  const [cards, setCards] = useState<PaymentChoiceDataType[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<PaymentChoiceDataType>(null);

  const handleCloseModal = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    closeModal("checkoutPayment");
    resetAll();
  }, [closeModal, resetAll]);
  
  const handleAddCard = useCallback(() => {
    updateToNextStep(2);
  }, [updateToNextStep]);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // TODO: Look into stripe forms and storage.
    closeModal("checkoutPayment")
    updateAll(selectedPayment);
  }, [selectedPayment, closeModal, updateAll]);

  useEffect(() => {
    if (customerId && cards.length === 0) {
      try {
        const fetchExistingCards = async () => {
          const fetchCardsResponse = await fetch(`/api/get-cards/${customerId}`);
          if (!fetchCardsResponse.ok) {
            throw new Error('Network response was not ok fetching cards');
          }

          const cardsData = await fetchCardsResponse.json();
          if (cardsData.cards.length > 0) {
            setCards([...cardsData.cards]);
            setSelectedPayment(cardsData.cards.filter((card: PaymentChoiceDataType) => card.isDefault));
          }
        }

        fetchExistingCards();
      } catch (error) {
        console.error('Error fetching customer cards:', error);
      }
    }
  }, [customerId, cards]);

  return (
    <>
      {isModalOpen("checkoutPayment") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"]: isModalOpen("checkoutPayment"),
          ["hidden"]: !isModalOpen("checkoutPayment"),
        })}>
          {(step === 1) && (
            <PaymentOptions 
              cards={cards}
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              handleAddCard={handleAddCard}
              handleClose={handleCloseModal}
              handleSubmit={handleSubmit}
            />
          )}

          {(step === 2) && (
            <PaymentAddNewCard
              handleClose={handleCloseModal}
              updateToNextStep={updateToNextStep}
            />
          )}

          {(step === 3) && (
            <PaymentBillingAddress
              cards={cards}
              setCards={setCards}
              setSelectedPayment={setSelectedPayment}
              handleClose={handleCloseModal}
              updateToNextStep={updateToNextStep}
              updateToPreviousStep={updateToPreviousStep}
              resetAll={resetAll}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CheckoutPaymentModal;