"use client"

import { useCallback } from "react";
import Image from "next/image";

import BackButtonModal from "../../login-modal/components/back-button-modal";
import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";

import LocationIcon from "public/icons/location-filled.svg";

import { DeliveryDetailsFormType } from "..";

type AddDeliveryDetailsProps = {
  deliveryDetailsForm: DeliveryDetailsFormType;
  setDeliveryDetailsForm: (newForm: DeliveryDetailsFormType) => void;
  handleClose: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
  updateToNextStep: (step: number) => void;
  updateToPreviousStep: () => void;
};

const AddDeliveryDetails: React.FC<AddDeliveryDetailsProps> = ({
  deliveryDetailsForm,
  setDeliveryDetailsForm,
  handleClose,
  handleSubmit,
  updateToPreviousStep,
}) => {
  const handleBack = useCallback(() => {
    updateToPreviousStep();
    setDeliveryDetailsForm({
      streetAddress: "",
      city: "",
      state: "",
      firstName: "",
      lastName: "",
      apt: "",
      instructions: "",
    })
  }, [setDeliveryDetailsForm, updateToPreviousStep]);

  const fullAddress = `${deliveryDetailsForm.streetAddress ? deliveryDetailsForm.streetAddress : ""}${deliveryDetailsForm.city ? `, ${deliveryDetailsForm.city}` : ""}${deliveryDetailsForm.state ? `, ${deliveryDetailsForm.state}` : ""}`

  return (
    <section className="relative flex flex-col p-10 pb-5 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleClose}
      />

      <div className="flex flex-col gap-2 pb-2">
        <h5 className="h5-mobile-semi capitalize">delivery details</h5>

        <p className="caption1-mobile-light-italic">* Required Information</p>
      </div>

      <div className="flex-grow flex flex-col justify-between">
        <form className="flex flex-col gap-2">
          {/* Full Street Address */}
          <div className="flex gap-2 py-2 border-b border-primary-5 leading-none">
            <Image
              src={LocationIcon}
              alt="address input icon"
              width="16"
              height="16"
            />

            <input 
              className="w-full p1-mobile-light bg-transparent"
              name="add-new-address"
              type="text"
              value={fullAddress}
              placeholder="Address*"
              // onChange={(e) => setDeliveryDetailsForm({...deliveryDetailsForm, streetAddress: e.target.value})}
              onClick={() => updateToPreviousStep()}
              required
              readOnly
            />
          </div>

          <div className="flex gap-4">
            {/* First Name */}
            <div className="flex justify-between pb-2 border-b border-primary-5 leading-none">
              <input 
                className="w-full p1-mobile-light bg-transparent"
                name="add-first-name"
                type="text"
                value={deliveryDetailsForm.firstName}
                placeholder="First name*"
                onChange={(e) => setDeliveryDetailsForm({...deliveryDetailsForm, firstName: e.target.value})}
                required
              />
            </div>

            {/* Last Name */}
            <div className="flex justify-between pb-2 border-b border-primary-5 leading-none">
              <input 
                className="w-full p1-mobile-light bg-transparent"
                name="add-last-name"
                type="text"
                value={deliveryDetailsForm.lastName}
                placeholder="Last name*"
                onChange={(e) => setDeliveryDetailsForm({...deliveryDetailsForm, lastName: e.target.value})}
                required
              />
            </div>
          </div>

          {/* Apt (optional) */}
          <div className="flex justify-between pb-2 border-b border-primary-5 leading-none">
            <input 
              className="w-full p1-mobile-light bg-transparent"
              name="add-apt-optional"
              type="text"
              value={deliveryDetailsForm.apt}
              placeholder="Apt / suite number (optional)"
              onChange={(e) => setDeliveryDetailsForm({...deliveryDetailsForm, apt: e.target.value})}
            />
          </div>

          {/* Delivery instructions (optional) */}
          <div className="flex justify-between pb-2 border-b border-primary-5 leading-none">
            <input 
              className="w-full p1-mobile-light bg-transparent"
              name="add-instructions-optional"
              type="text"
              value={deliveryDetailsForm.instructions}
              placeholder="Add delivery instructions (optional)"
              onChange={(e) => setDeliveryDetailsForm({...deliveryDetailsForm, instructions: e.target.value})}
              maxLength={250}
            />
          </div>
        </form>
        
        <div className="flex flex-col gap-2">
          <LargeDarkButton
            text="save"
            handleClick={handleSubmit}
          />

          <BackButtonModal
            handleClick={handleBack}
          />
        </div>
      </div>
    </section>
  );
};

export default AddDeliveryDetails;