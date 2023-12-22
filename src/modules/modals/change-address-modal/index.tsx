"use client"

import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

import AddDeliveryDetails from "./add-delivery-details";
import AddNewAddressSearch from "./add-new-address-search";
import AddressSelector from "./address-selector";
import EditDeliveryDetails from "./edit-delivery-details";
import ServiceNotAvailable from "./service-not-available";

import useModalStore from "@/store/Modal";
import { useModalStepStore } from "@/store/modal-store/ModalStep";
import { useAddressDetailsStore } from "@/store/AddressDetails";

import { AddressDataProps, mockAddresses } from "@/lib/data";
import EditAddressSearch from "./edit-address-search";

export type DeliveryDetailsFormType = {
  streetAddress: string;
  city: string;
  state: string;
  firstName: string;
  lastName: string;
  apt?: string;
  instructions?: string;
};

const ChangeAddressModal: React.FC = () => {
  const { isModalOpen, closeModal } = useModalStore();
  const { step, resetAll, updateToPreviousStep, updateToNextStep } = useModalStepStore();
  const { shippingDetails, updateShippingDetails } = useAddressDetailsStore();

  const [deliveryDetailsForm, setDeliveryDetailsForm] = useState<DeliveryDetailsFormType>({
    streetAddress: "",
    city: "",
    state: "",
    firstName: "",
    lastName: "",
    apt: "",
    instructions: "",
  });
  const [editedAddress, setEditedAddress] = useState<DeliveryDetailsFormType>({
    streetAddress: "",
    city: "",
    state: "",
    firstName: "",
    lastName: "",
    apt: "",
    instructions: "",
  });
  const [options, setOptions] = useState<AddressDataProps[]>([]);

  const handleCloseModal = useCallback(() => {
    resetAll();
    closeModal("changeAddress");
    document.body.classList.remove('no-scroll');
    setDeliveryDetailsForm({
      streetAddress: "",
      city: "",
      state: "",
      firstName: "",
      lastName: "",
      apt: "",
      instructions: "",
    });
    setEditedAddress({
      streetAddress: "",
      city: "",
      state: "",
      firstName: "",
      lastName: "",
      apt: "",
      instructions: "",
    })
  }, [closeModal, resetAll]);

  const handleAddDeliveryDetails = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // TODO: Validate new delivery details on backend, then add to existing addresses with this new address as the chosen delivery location. Once done, close modal with new address set as shipping address.
    const addedNewAddress = (
      deliveryDetailsForm.firstName
      && deliveryDetailsForm.lastName
      && deliveryDetailsForm.streetAddress
      && deliveryDetailsForm.city
      && deliveryDetailsForm.state
    );
    if (addedNewAddress) {
      const updatedOptions = [
        ...options,
        {
          default: false,
          streetAddress: deliveryDetailsForm.streetAddress,
          city: deliveryDetailsForm.city,
          state: deliveryDetailsForm.state,
        }
      ];
      setOptions(updatedOptions);
      updateShippingDetails({
        ...shippingDetails,
        firstName: deliveryDetailsForm.firstName,
        lastName: deliveryDetailsForm.lastName,
        streetAddress: deliveryDetailsForm.streetAddress,
        city: deliveryDetailsForm.city,
        state: deliveryDetailsForm.state,
        apt: deliveryDetailsForm.apt ? deliveryDetailsForm.apt : "",
      });
      setDeliveryDetailsForm({
        streetAddress: "",
        city: "",
        state: "",
        firstName: "",
        lastName: "",
        apt: "",
        instructions: "",
      });
      updateToNextStep(1);
    }
  }, [deliveryDetailsForm, options, shippingDetails, updateShippingDetails, updateToNextStep]);

  const handleEditAddress = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const updatedAddress = (
      deliveryDetailsForm.firstName !== editedAddress.firstName
      || deliveryDetailsForm.lastName !== editedAddress.lastName
      || deliveryDetailsForm.streetAddress !== editedAddress.streetAddress
      || deliveryDetailsForm.city !== editedAddress.city
      || deliveryDetailsForm.state !== editedAddress.state
      || deliveryDetailsForm.apt !== editedAddress.apt
    );
    if (updatedAddress) {
      const updatedOptions = [
        ...(options.filter((option) => ((option.apt) ? `${option.streetAddress} ${option.apt}` : `${option.streetAddress}`) !== (editedAddress.apt ? `${editedAddress.streetAddress} ${editedAddress.apt}` : `${editedAddress.streetAddress}`))),
        {
          default: false,
          streetAddress: deliveryDetailsForm.streetAddress,
          city: deliveryDetailsForm.city,
          state: deliveryDetailsForm.state,
          apt: deliveryDetailsForm.apt? deliveryDetailsForm.apt : "",
        }
      ];
      setOptions(updatedOptions);
      updateShippingDetails({
        ...shippingDetails,
        firstName: deliveryDetailsForm.firstName,
        lastName: deliveryDetailsForm.lastName,
        streetAddress: deliveryDetailsForm.streetAddress,
        city: deliveryDetailsForm.city,
        state: deliveryDetailsForm.state,
        apt: deliveryDetailsForm.apt ? deliveryDetailsForm.apt : "",
      });
      setDeliveryDetailsForm({
        streetAddress: "",
        city: "",
        state: "",
        firstName: "",
        lastName: "",
        apt: "",
        instructions: "",
      });
      updateToNextStep(1);
    }
  }, [deliveryDetailsForm, editedAddress, options, shippingDetails, updateShippingDetails, updateToNextStep]);

  const handleDeleteAddress = useCallback((existingStreetAddress: string) => {    
    // TODO: Find existing delivery details on backend, then delete and refetch address options. Return to step 1 once deleted.

    const updatedOptions = options.filter((option) => option.streetAddress !== existingStreetAddress);

    if (updatedOptions.length > 0) {
      updateShippingDetails({
        ...deliveryDetailsForm,
        streetAddress: updatedOptions[0].streetAddress,
        city: updatedOptions[0].city || "",
        state: updatedOptions[0].state || "",
        firstName: deliveryDetailsForm.firstName,
        lastName: deliveryDetailsForm.lastName,
        apt: updatedOptions[0].apt || "",
        // instructions: deliveryDetailsForm.instructions,
      });
    } else {
      updateShippingDetails({
        ...deliveryDetailsForm,
        streetAddress: "",
        city: "",
        state: "",
        firstName: "",
        lastName: "",
        apt: "",
        // instructions: "",
      });
    }
    setDeliveryDetailsForm({
      ...deliveryDetailsForm,
      streetAddress: "",
      city: "",
      state: "",
      firstName: "",
      lastName: "",
      apt: "",
      instructions: "",
    });
    setOptions(updatedOptions);
    updateToNextStep(1);
    
  }, [deliveryDetailsForm, options, setDeliveryDetailsForm, setOptions, updateToNextStep, updateShippingDetails]);

  useEffect(() => {
    // TODO: Fetch all addresses from backend.
    if (options.length === 0) {
      setOptions([...mockAddresses]);
    }
  }, [options]);

  return (
    <>
      {isModalOpen("changeAddress") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"]: isModalOpen("changeAddress"),
          ["hidden"]: !isModalOpen("changeAddress"),
        })}>
          {(step === 1) && (
            <AddressSelector 
              addresses={options}
              shippingDetails={shippingDetails}
              setDeliveryDetailsForm={setDeliveryDetailsForm}
              setEditedAddress={setEditedAddress}
              handleClose={handleCloseModal}
              updateShippingDetails={updateShippingDetails}
              updateToNextStep={updateToNextStep}
            />
          )}

          {(step === 2) && (
            <AddNewAddressSearch 
              deliveryDetailsForm={deliveryDetailsForm}
              setDeliveryDetailsForm={setDeliveryDetailsForm}
              handleClose={handleCloseModal}
              updateToNextStep={updateToNextStep}
              updateToPreviousStep={updateToPreviousStep}
            />
          )}

          {(step === 3) && (
            <AddDeliveryDetails 
              deliveryDetailsForm={deliveryDetailsForm}
              setDeliveryDetailsForm={setDeliveryDetailsForm}
              handleClose={handleCloseModal}
              handleSubmit={handleAddDeliveryDetails}
              updateToNextStep={updateToNextStep}
              updateToPreviousStep={updateToPreviousStep}
            />
          )}

          {(step === 4) && (
            <ServiceNotAvailable 
              setDeliveryDetailsForm={setDeliveryDetailsForm}
              handleClose={handleCloseModal}
              updateToPreviousStep={updateToPreviousStep}
            />
          )}

          {(step === 5) && (
            <EditDeliveryDetails
              deliveryDetailsForm={deliveryDetailsForm}
              setDeliveryDetailsForm={setDeliveryDetailsForm}
              handleClose={handleCloseModal}
              handleDelete={handleDeleteAddress}
              handleSubmit={handleEditAddress}
              updateToNextStep={updateToNextStep}
              updateToPreviousStep={updateToPreviousStep}
            />
          )}

          {(step === 6) && (
            <EditAddressSearch 
              deliveryDetailsForm={deliveryDetailsForm}
              setDeliveryDetailsForm={setDeliveryDetailsForm}
              handleClose={handleCloseModal}
              updateToNextStep={updateToNextStep}
              updateToPreviousStep={updateToPreviousStep}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ChangeAddressModal;