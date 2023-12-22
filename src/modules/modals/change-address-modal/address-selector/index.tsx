import clsx from "clsx";
import Image from "next/image";
import { useCallback } from "react";

import CloseModalButton from "../../common/close-modal-button";

import AddRoundIcon from "public/icons/add-round.svg";
import LocationIcon from "public/icons/location-filled.svg";
import PencilIcon from "public/icons/pencil.svg";

import { AddressDataProps } from "@/lib/data";
import { ShippingAddressDetailsState } from "@/store/AddressDetails";

import { DeliveryDetailsFormType } from "..";

type AddressSelectorProps = {
  addresses: Array<{
    default: boolean;
    streetAddress: string;
    city: string;
    state: string;
    apt?: string;
  }>;
  shippingDetails: ShippingAddressDetailsState;
  setDeliveryDetailsForm: (newForm: DeliveryDetailsFormType) => void;
  setEditedAddress: (oldAddress: DeliveryDetailsFormType) => void;
  handleClose: () => void;
  updateShippingDetails: (newDetails: ShippingAddressDetailsState) => void;
  updateToNextStep: (step: number) => void;
};

const AddressSelector: React.FC<AddressSelectorProps> = ({
  addresses,
  shippingDetails,
  setDeliveryDetailsForm,
  setEditedAddress,
  handleClose,
  updateShippingDetails,
  updateToNextStep,
}) => {
  const handleSelectAddress = useCallback((address: AddressDataProps) => {
    // TODO: Add Google Places API. When user selects an address from the list of suggested addresses, update the form to the selected address.
    updateShippingDetails({
      ...shippingDetails,
      streetAddress: address.streetAddress,
      city: address.city,
      state: address.state,
    });
    handleClose();
  }, [shippingDetails, handleClose, updateShippingDetails]);

  const handleEditAddress = useCallback((address: AddressDataProps) => {
    setEditedAddress({
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      streetAddress: address.streetAddress ? address.streetAddress : "",
      city: address.city ? address.city : "",
      state: address.state ? address.state : "",
      apt: address.apt ? address.apt : "",
    });
    setDeliveryDetailsForm({
      streetAddress: address.streetAddress || "",
      city: address.city || "",
      state: address.state || "",
      firstName: shippingDetails.firstName,
      lastName: shippingDetails.lastName,
      apt: address.apt || "",
      instructions: "",
    });
    updateToNextStep(5);
  }, [setDeliveryDetailsForm, setEditedAddress, shippingDetails, updateToNextStep]);

  return (
    <section className="relative p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleClose}
      />

      <h5 className="pb-6 h5-mobile-semi capitalize">deliver to</h5>

      {/* TODO: Change to step 2 when modals are complete */}
      <button className="flex gap-2 px-2 pb-4" onClick={() => updateToNextStep(2)}> 
        <Image
          src={AddRoundIcon}
          alt="add new address icon"
          width="16"
          height="16"
        />
        
        <h6 className="h6-mobile-semi capitalize">add new address</h6>
      </button>
      
      <div className="flex flex-col gap-2">
        {addresses?.map((address, i) => (
          <div key={`address-selector-existing-address-${i}`} className={clsx({
            ["flex justify-between px-2 pb-1 border-b border-b-solid border-b-neutral-5"]: shippingDetails.streetAddress !== address.streetAddress,
            ["flex justify-between px-2 pb-1 border-b border-b-solid border-b-neutral-5 bg-main-2"]: shippingDetails.streetAddress === address.streetAddress,
          })}>
            <button className="flex-grow flex items-center gap-2" onClick={() => handleSelectAddress(address)}>
              <Image 
                src={LocationIcon}
                alt="address location icon"
                width="16"
                height="16"
              />

              <div className="flex flex-col items-start">
                <p className="p1-mobile-semi">{`${address.streetAddress}${address.apt ? ` ${address.apt}` : ""}`}</p>
                <p className="caption1-mobile-light-italic text-neutral-5">{`${address.city}, ${address.state}`}</p>
              </div>
            </button>

            <button onClick={() => handleEditAddress(address)}>
              <Image 
                src={PencilIcon}
                alt="edit shipping address icon"
                width="16"
                height="16"
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AddressSelector;