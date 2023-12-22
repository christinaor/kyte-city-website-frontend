"use client"

import CloseModalButton from "../../common/close-modal-button";
import StripeBillingAddress from "../stripe-billing-address";

import { PaymentChoiceDataType } from "@/store/modal-store/PaymentOptions";

import { Elements } from '@stripe/react-stripe-js';
import getStripe from "@/lib/get-stripejs";

type PaymentBillingAddressProps = {
  cards: PaymentChoiceDataType[];
  setCards: (cards: PaymentChoiceDataType[]) => void;
  setSelectedPayment: (payment: PaymentChoiceDataType) => void;
  handleClose: (e: React.FormEvent<HTMLButtonElement>) => void;
  updateToNextStep: (step: number) => void;
  updateToPreviousStep: () => void;
  resetAll: () => void;
};

const PaymentBillingAddress: React.FC<PaymentBillingAddressProps> = ({
  cards,
  setCards,
  setSelectedPayment,
  handleClose,
  updateToNextStep,
  updateToPreviousStep,
  resetAll,
}) => {

  return (
    <section className="relative flex flex-col p-10 pb-5 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleClose}
      />
      
      <div className="flex flex-col gap-2 pb-6">
        <h5 className="h5-mobile-semi capitalize">billing address</h5>

        <p className="caption1-mobile-light-italic">* Required Information</p>
      </div>

      <Elements stripe={getStripe()}>
        <StripeBillingAddress
          cards={cards}
          setCards={setCards}
          setSelectedPayment={setSelectedPayment}
          updateToNextStep={updateToNextStep}
          updateToPreviousStep={updateToPreviousStep}
          resetAll={resetAll}
        />
      </Elements>
    </section>
  );
};

export default PaymentBillingAddress;