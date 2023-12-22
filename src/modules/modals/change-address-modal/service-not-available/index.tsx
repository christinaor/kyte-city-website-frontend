import Image from "next/image";
import { useCallback } from "react";

import CloseModalButton from "../../common/close-modal-button";

import AlertIcon from "public/icons/alert-circle-rounded.svg";

import { DeliveryDetailsFormType } from "..";

import { mockServiceableCities } from "@/lib/data";

type ServiceNotAvailableProps = {
  setDeliveryDetailsForm: (newForm: DeliveryDetailsFormType) => void;
  handleClose: () => void;
  updateToPreviousStep: () => void;
};

const ServiceNotAvailable: React.FC<ServiceNotAvailableProps> = ({
  setDeliveryDetailsForm,
  handleClose,
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

  // TODO: Set global user state, clear login creds used for authentication, and close popup after a short time.

  return (
    <section className="relative flex flex-col justify-between p-10 pb-5 w-[328px] h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleClose}
      />

      <div className="flex flex-col gap-5 justify-center items-center h-[236px]">
        <Image
          src={AlertIcon}
          alt="sign in success icon"
          width={80}
          height={80}
        />

        <div className="flex flex-col justify-center items-center gap-1">
          <h5 className="h5-mobile-semi text-error-3 capitalize">service not available</h5>

          <p className="p1-mobile-light text-center">We are sorry that we currently don’t serve in your area. Here are the serviceable cities: </p>

          <ul>
            {mockServiceableCities?.map((city) => (
              <li key={`service-available-city-${city}`} className="list-disc p1-mobile-light">{city}</li>
            ))}
          </ul>
        </div>
      </div>

      <button
        className="self-center w-min caption1-link-mobile-regular-italic capitalize"
        onClick={handleBack}
      >
        back
      </button>
    </section>
  );
};

export default ServiceNotAvailable;