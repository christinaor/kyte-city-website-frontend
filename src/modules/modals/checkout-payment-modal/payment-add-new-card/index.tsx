"use client"

import CloseModalButton from "../../common/close-modal-button";

import { useModalStepStore } from "@/store/modal-store/ModalStep";

import { Elements } from '@stripe/react-stripe-js';
import getStripe from "@/lib/get-stripejs";
import StripeAddNewCard from "../stripe-add-new-card";

type PaymentAddNewCardProps = {
  handleClose: (e: React.FormEvent<HTMLButtonElement>) => void;
  updateToNextStep: (step: number) => void;
};

const PaymentAddNewCard: React.FC<PaymentAddNewCardProps> = ({
  handleClose,
  updateToNextStep,
}) => {
  const { resetAll } = useModalStepStore();

  return (
    <section className="relative flex flex-col p-10 pb-5 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleClose}
      />
      
      <div className="flex flex-col gap-2 pb-6">
        <h5 className="h5-mobile-semi capitalize">add new card</h5>

        <p className="caption1-mobile-light-italic">* Required Information</p>
      </div>

      <Elements stripe={getStripe()}>
        <StripeAddNewCard
          updateToNextStep={updateToNextStep}
          resetAll={resetAll}
        />
      </Elements>
    </section>
  );
};

export default PaymentAddNewCard;