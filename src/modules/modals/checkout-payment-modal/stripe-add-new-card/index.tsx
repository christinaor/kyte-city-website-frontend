import { useState } from "react";

import BackButtonModal from "../../login-modal/components/back-button-modal";
import HelpCircleIcon from "@/modules/common/icons/help-circle";

import { useStripePaymentStore } from "@/store/modal-store/StripePayment";

import { ELEMENT_STYLES } from "@/lib/styles";
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { StripeElementChangeEvent } from '@stripe/stripe-js';

type StripeAddNewCardProps = {
  updateToNextStep: (step: number) => void;
  resetAll: () => void;
};

const StripeAddNewCard: React.FC<StripeAddNewCardProps> = ({
  updateToNextStep,
  resetAll,
}) => {
  const { customerId, updatePaymentMethodId } = useStripePaymentStore();

  const stripe = useStripe();
  const elements = useElements();

  const [isHoveringOnDate, setIsHoveringOnDate] = useState<boolean>(false);
  const [isHoveringOnCvc, setIsHoveringOnCvc] = useState<boolean>(false);

  // Card Number states
  const [isCardNumberFocused, setCardNumberFocused] = useState(false);
  const [cardNumberFilled, setCardNumberFilled] = useState(false);
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  // Card Expiry states
  const [isCardExpiryFocused, setCardExpiryFocused] = useState(false);
  const [cardExpiryFilled, setCardExpiryFilled] = useState(false);
  const [isCardExpiryValid, setIsCardExpiryValid] = useState(true);
  // Card CVC states
  const [isCardCvcFocused, setCardCvcFocused] = useState(false);
  const [cardCvcFilled, setCardCvcFilled] = useState(false);
  const [isCardCvcValid, setIsCardCvcValid] = useState(true);

  const getCardNumberElementOptions = () => ({
    ...ELEMENT_STYLES,
    style: {
      ...ELEMENT_STYLES.style,
      base: {
        ...ELEMENT_STYLES.style.base,
        '::placeholder': {
          color: isCardNumberFocused ? '#818488' : 'transparent',
          // color: '#818488',
          fontSize: '0.75rem', // Equivalent to text-[0.75rem]
          // lineHeight: '1rem', // Equivalent to leading-[1rem]
          fontWeight: '300' // Equivalent to font-light (usually 300)
        },
      },
    },
  });

  const getCardExpiryElementOptions = () => ({
    ...ELEMENT_STYLES,
    style: {
      ...ELEMENT_STYLES.style,
      base: {
        ...ELEMENT_STYLES.style.base,
        '::placeholder': {
          color: isCardExpiryFocused ? '#818488' : 'transparent',
          // color: '#818488',
          fontSize: '0.75rem', // Equivalent to text-[0.75rem]
          // lineHeight: '1rem', // Equivalent to leading-[1rem]
          fontWeight: '300' // Equivalent to font-light (usually 300)
        },
      },
    },
  });

  const getCardCvcElementOptions = () => ({
    ...ELEMENT_STYLES,
    style: {
      ...ELEMENT_STYLES.style,
      base: {
        ...ELEMENT_STYLES.style.base,
        '::placeholder': {
          color: isCardCvcFocused ? '#818488' : 'transparent',
          // color: '#818488',
          fontSize: '0.75rem', // Equivalent to text-[0.75rem]
          // lineHeight: '1rem', // Equivalent to leading-[1rem]
          fontWeight: '300' // Equivalent to font-light (usually 300)
        },
      },
    },
  });

  const handleCardNumberChange = (event: StripeElementChangeEvent) => {
    setCardNumberFilled(event.complete);
    setIsCardNumberValid(!event?.error);
  };
  const handleCardExpiryChange = (event: StripeElementChangeEvent) => {
    setCardExpiryFilled(event.complete);
    setIsCardExpiryValid(!event.error);
  };
  
  const handleCardCvcChange = (event: StripeElementChangeEvent) => {
    setCardCvcFilled(event.complete);
    setIsCardCvcValid(!event.error);
  };

  const sendTokenToServer = async (token: string, customerId: string | null) => {
    try {
      const response = await fetch('api/create-payment-method-with-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, customerId }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  };  

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();
  
    if (!stripe || !elements) {
      console.error("Stripe.js has not loaded");
      // Handle error: Stripe.js has not yet loaded.
      return;
    }
  
    // Validate Card Expiry and CVC before proceeding
    if (!cardExpiryFilled || !isCardExpiryValid || !cardCvcFilled || !isCardCvcValid) {
      console.error("Card expiry or CVC is invalid");
      // Handle error: Card expiry or CVC is not valid
      return;
    }
  
    const cardElement = elements.getElement(CardNumberElement);
    if (!cardElement) {
      console.error("Card number element not found");
      // Handle error: CardNumberElement is not mounted.
      return;
    }

    // Create token and send to backend to create a payment method linked to the token.
    try {
      const newToken = await stripe.createToken(cardElement);
      if (newToken.error) {
        // Handle error in result.error.message
        console.error(newToken.error.message);
      } else {
        // Send the token to your server
        const newPaymentMethodResponse = await sendTokenToServer(newToken.token.id, customerId);
        updatePaymentMethodId(newPaymentMethodResponse.paymentMethod); // Store in database with user data in backend.
        updateToNextStep(3);
      }
    } catch (error) {
      console.error("Error in token creation:", error);
    }
  };
  
  return (
    <div className="flex-grow flex flex-col justify-between">
      <form id="stripe-add-new-card-form" className="flex flex-col gap-2">
        {/* Card number */}
        <div className="relative pb-2 border-b border-primary-5 leading-none">
          {!isCardNumberFocused && !cardNumberFilled && isCardNumberValid && (
            <p className="absolute top-0 left-0 p1-mobile-light text-neutral-5">Card number*</p>
          )}

          <CardNumberElement 
            options={getCardNumberElementOptions()}
            onFocus={() => setCardNumberFocused(true)}
            onBlur={() => setCardNumberFocused(false)}
            onChange={handleCardNumberChange}
          />
        </div>

        <div className="flex gap-4">
          {/* Card Expiry */}
          <div className="relative flex-1 pb-2 border-b border-b-primary-5 leading-none">
            {!isCardExpiryFocused && !cardExpiryFilled && isCardExpiryValid && (
              <p className="absolute top-0 left-0 p1-mobile-light text-neutral-5">MM/YY*</p>
            )}

            <CardExpiryElement
              options={getCardExpiryElementOptions()}
              onFocus={() => setCardExpiryFocused(true)}
              onBlur={() => setCardExpiryFocused(false)}
              onChange={handleCardExpiryChange}
            />

            <div 
              onMouseEnter={() => setIsHoveringOnDate(true)}
              onMouseLeave={() => setIsHoveringOnDate(false)}
              onTouchStart={() => setIsHoveringOnDate(!isHoveringOnDate)}
              className="absolute top-0 right-0"
            >
              <HelpCircleIcon
                size={12}
                fill={isHoveringOnDate ? "#CFB454" : "#A4A9B2"}
                className="shrink-0"
              />
            </div>
          </div>

          {/* Card CVC */}
          <div className="relative flex-1 pb-2 border-b border-b-primary-5 leading-none">
            {!isCardCvcFocused && !cardCvcFilled && isCardCvcValid && (
              <p className="absolute top-0 left-0 p1-mobile-light text-neutral-5">CVC*</p>
            )}
            
            <CardCvcElement
              options={getCardCvcElementOptions()}
              onFocus={() => setCardCvcFocused(true)}
              onBlur={() => setCardCvcFocused(false)}
              onChange={handleCardCvcChange}
            />

            <div 
              onMouseEnter={() => setIsHoveringOnCvc(true)}
              onMouseLeave={() => setIsHoveringOnCvc(false)}
              onTouchStart={() => setIsHoveringOnCvc(!isHoveringOnCvc)}
              className="absolute top-0 right-0"
            >
              <HelpCircleIcon
                size={12}
                fill={isHoveringOnCvc ? "#CFB454" : "#A4A9B2"}
                className="shrink-0"
              />
            </div>
          </div>
        </div>
      </form>

      {isHoveringOnDate && (
        <div className="flex flex-col gap-1 p-4 border-[1px] border-solid border-warning-3 bg-warning-1">
          <p className="text-warning-4 p2-mobile-semi capitalize">expiration date</p>
          <p className="text-warning-4 caption1-mobile-light-italic">This date is on the front of your card, under the card number.</p>
        </div>
      )}

      {isHoveringOnCvc && (
        <div className="flex flex-col gap-1 p-4 border-[1px] border-solid border-warning-3 bg-warning-1">
          <p className="text-warning-4 p2-mobile-semi capitalize">CVV</p>
          <p className="text-warning-4 caption1-mobile-light-italic">A three-digit code can be found on the back of your card.</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {/* <LargeDarkButton
          text="confirm"
          handleClick={handleSubmit}
        /> */}
        <button 
          className="
            flex justify-center items-center px-5 py-1 w-full h-[40px] 
            border border-solid rounded-sm 
            border-main-1 bg-main-1 text-main-2
            caption2-mobile-bold uppercase 
            whitespace-nowrap
          "
          type="submit" 
          disabled={!stripe}
          onClick={handleSubmit}
        >
          next
        </button>

        <BackButtonModal
          handleClick={() => resetAll()}
        />
      </div>
    </div>
  );
};

export default StripeAddNewCard;