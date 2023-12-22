"use client"

import Image from "next/image";

import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";
import MenuBar from "@/modules/common/components/menu-bar";

import AddPaymentIcon from "public/icons/add-outline.svg";
import CheckmarkFilledIcon from "public/icons/checkmark-circle-dark-on.svg";
import CheckmarkEmptyIcon from "public/icons/checkmark-circle-outline.svg";
import CreditCardIcon from "public/icons/credit-card.svg";
import { PaymentChoiceDataType } from "@/store/modal-store/PaymentOptions";
// import PayPalIcon from "public/icons/logo-paypal.svg";
// import StripeIcon from "public/icons/logo-stripe.svg";

type PaymentOptionsProps = {
  cards: PaymentChoiceDataType[];
  selectedPayment: PaymentChoiceDataType;
  setSelectedPayment: (payment: PaymentChoiceDataType) => void;
  handleAddCard: () => void;
  handleClose: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const PaymentOptions: React.FC<PaymentOptionsProps> = ({
  cards,
  selectedPayment,
  setSelectedPayment,
  handleAddCard,
  handleClose,
  handleSubmit,
}) => {
  return (
    <section className="relative flex flex-col p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleClose}
      />

      <h5 className="pb-6 h5-mobile-semi capitalize">payment options</h5>

      <div className="flex-grow flex flex-col gap-2 pb-7">
        {cards && cards?.length > 0 && cards?.map((card, i) => (
          <button key={`checkout-payment-option-${i}`} onClick={() => setSelectedPayment({...card})}>
            <MenuBar
              leftIcon={CreditCardIcon}
              leftAlt="payment methods icon"
              rightIcon={(card?.last4 === selectedPayment?.last4) ? CheckmarkFilledIcon : CheckmarkEmptyIcon}
              rightAlt="go to payment methods icon"
              size={16}
              mainText={`${card.brand} - ${card.last4}`}
            />
          </button>
        ))}
        
        {/* <button onClick={handlePayPalOption}>
          <MenuBar
            leftIcon={PayPalIcon}
            leftAlt="payment methods icon"
            rightIcon={selectedPayment.type === "paypal" ? CheckmarkFilledIcon : CheckmarkEmptyIcon}
            rightAlt="go to payment methods icon"
            size={16}
            mainText="PayPal"
          />
        </button> */}

        {/* <button onClick={handleStripeOption}>
          <MenuBar
            leftIcon={StripeIcon}
            leftAlt="payment methods icon"
            rightIcon={selectedPayment.type === "stripe" ? CheckmarkFilledIcon : CheckmarkEmptyIcon}
            rightAlt="go to payment methods icon"
            size={16}
            mainText="Stripe"
          />
        </button> */}

        <button className="flex items-center gap-2 py-2" onClick={handleAddCard}>
          <Image 
            src={AddPaymentIcon}
            alt="add new card icon"
            width={16}
            height={16}
          />

          <p className="p1-mobile-semi capitalize">add new card</p>
        </button>
      </div>

      <LargeDarkButton
        text="confirm"
        handleClick={handleSubmit}
      />
    </section>
  );
};

export default PaymentOptions;