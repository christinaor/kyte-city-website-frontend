import { useCallback, useState } from "react";

import BackButtonModal from "../../login-modal/components/back-button-modal";

// import { useAddressDetailsStore } from "@/store/AddressDetails";
import { useStripePaymentStore } from "@/store/modal-store/StripePayment";
import { useUserStore } from "@/store/User";

import { useStripe } from '@stripe/react-stripe-js';

import { usePaymentChoiceStore, PaymentChoiceDataType } from "@/store/modal-store/PaymentOptions";

type StripeBillingAddressProps = {
  cards: PaymentChoiceDataType[];
  setCards: (cards: PaymentChoiceDataType[]) => void;
  setSelectedPayment: (payment: PaymentChoiceDataType) => void;
  updateToNextStep: (step: number) => void;
  updateToPreviousStep: () => void;
  resetAll: () => void;
};

const StripeBillingAddress: React.FC<StripeBillingAddressProps> = ({
  cards,
  setCards,
  setSelectedPayment,
  updateToNextStep,
  updateToPreviousStep,
  resetAll,
}) => {
  // const { billingDetails, updateBillingDetails } = useAddressDetailsStore();

  const { paymentMethodId, updateCustomerId } = useStripePaymentStore();
  const { user } = useUserStore();
  const { username, phone } = user;
  const { updateAll } = usePaymentChoiceStore();

  const stripe = useStripe();

  const [billingDetails, updateBillingDetails] = useState({
    fullName: "",
    email: username,
    phone: phone,
    streetAddress: "",
    city: "",
    state: "",
    apt: "",
    zip: "",
    country: "US",
  });
  
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.preventDefault();

    if (!stripe) {
      console.error("Stripe.js has not loaded");
      // Handle error: Stripe.js has not yet loaded.
      return;
    }

    if (!paymentMethodId) {
      console.error("paymentMethodId not present");
      // Handle error: paymentMethodId is not yet present.
      return;
    }
    
    const stripeBillingDetails = {
      address: {
        city: billingDetails.city,
        country: billingDetails.country,
        line1: billingDetails.streetAddress,
        line2: billingDetails.apt,
        postal_code: billingDetails.zip,
        state: billingDetails.state,
      },
      email: billingDetails.email,
      name: billingDetails.fullName,
      phone: billingDetails.phone,
    }

    // Send payment method ID and billing details to backend to update payment method in Stripe.
    try {
      const updateBillingAddressResponse = await fetch("api/update-billing-address", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          paymentMethodId, 
          billingDetails: stripeBillingDetails,
        }),
      });

      if (!updateBillingAddressResponse.ok) {
        throw new Error("Failed to update billing address")
      }

      const updateBillingAddressData = await updateBillingAddressResponse.json();

      const confirmCardSetup = await stripe.confirmCardSetup(updateBillingAddressData.secret);
      if (confirmCardSetup.error) {
        console.error('Error confirming card setup:', confirmCardSetup.error.message);
      } else {
        // console.log('SetupIntent confirmed:', confirmCardSetup.setupIntent);
        updateCustomerId(updateBillingAddressData.customer);
        setCards([...cards, {...updateBillingAddressData.card}]);
        setSelectedPayment({...updateBillingAddressData.card});
        updateAll({...updateBillingAddressData.card})
        updateToNextStep(1);
      }
    } catch (error) {
      console.error('[error]', error)
    }
  };

  const handleBack = useCallback(() => {
    updateToPreviousStep();
  }, [updateToPreviousStep]);

  return (
    <div className="flex-grow flex flex-col justify-between">
      {/* <form id="payment-billing-adress-form" className="flex flex-col gap-2" onSubmit={handleSubmit}> */}
      <form id="payment-billing-adress-form" className="flex flex-col gap-2">
        <input 
          className="pb-2 w-full border-b border-primary-5 leading-none p1-mobile-light bg-transparent"
          name="add-billing-address-fullname"
          type="text"
          value={billingDetails.fullName}
          placeholder="Full Name*"
          onChange={(e) => updateBillingDetails({...billingDetails, fullName: e.target.value})}
          required
        />

        <input 
          className="pb-2 w-full border-b border-primary-5 leading-none p1-mobile-light bg-transparent"
          name="add-billing-address-address-1"
          type="text"
          value={billingDetails.streetAddress}
          placeholder="Address line 1*"
          onChange={(e) => updateBillingDetails({...billingDetails, streetAddress: e.target.value})}
          required
        />

        <div className="flex gap-4">
          <input 
            className="pb-2 w-full border-b border-primary-5 leading-none p1-mobile-light bg-transparent"
            name="add-billing-address-address-2"
            type="text"
            value={billingDetails.apt}
            placeholder="Address line 2*"
            onChange={(e) => updateBillingDetails({...billingDetails, apt: e.target.value})}
            required
          />

          <input 
            className="pb-2 w-full border-b border-primary-5 leading-none p1-mobile-light bg-transparent"
            name="add-billing-address-city"
            type="text"
            value={billingDetails.city}
            placeholder="City*"
            onChange={(e) => updateBillingDetails({...billingDetails, city: e.target.value})}
            required
          />
        </div>

        <div className="flex gap-4">
          <input 
            className="pb-2 w-full border-b border-primary-5 leading-none p1-mobile-light bg-transparent"
            name="add-billing-address-state"
            type="text"
            value={billingDetails.state}
            placeholder="State*"
            onChange={(e) => updateBillingDetails({...billingDetails, state: e.target.value})}
            maxLength={2}
            required
          />

          <input 
            className="pb-2 w-full border-b border-primary-5 leading-none p1-mobile-light bg-transparent"
            name="add-billing-address-zip"
            type="text"
            value={billingDetails.zip}
            placeholder="Zip*"
            onChange={(e) => updateBillingDetails({...billingDetails, zip: e.target.value})}
            maxLength={5}
            required
          />
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <button 
          className="
            flex justify-center items-center px-5 py-1 w-full h-[40px] 
            border border-solid rounded-sm 
            border-main-1 bg-main-1 text-main-2
            caption2-mobile-bold uppercase 
            whitespace-nowrap
          "
          type="submit" 
          // disabled={!stripe}
          onClick={handleSubmit}
        >
          next
        </button>

        <BackButtonModal
          handleClick={handleBack}
        />
      </div>
    </div>
  );
};

export default StripeBillingAddress;