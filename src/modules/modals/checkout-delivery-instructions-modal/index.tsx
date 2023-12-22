"use client"

import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";

import CloseModalButton from "../common/close-modal-button";
import DeliveryOptionsDropdown from "./delivery-options-dropdown";
import DeliveryCustomInstructions from "./delivery-custom-instructions";
import LargeDarkButton from "@/modules/common/components/large-dark-button";

import useModalStore from "@/store/Modal";
import { useDeliveryInstructionsStore } from "@/store/modal-store/DeliveryInstructions";

import { deliveryOptionsList } from "@/lib/constants";

const CheckoutDeliveryInstructionsModal: React.FC = () => {
  const { closeModal, isModalOpen } = useModalStore();
  const { updateAll } = useDeliveryInstructionsStore();

  const [displayedOption, setDisplayedOption] = useState<string>(deliveryOptionsList[0]);
  const [displayedCustomInstructions, setDisplayedCustomInstructions] = useState<string>("");
  const [optionsList, setOptionsList] = useState<string[]>([...deliveryOptionsList]);
  
  const handleCloseModal = useCallback(() => {
    closeModal("deliveryInstructions");
  }, [closeModal]);

  const handleConfirm = useCallback(() => {
    const updatedDeliveryInstructions = {
      dropdownOption: displayedOption,
      customInstructions: displayedCustomInstructions,
    };
    updateAll(updatedDeliveryInstructions); // TODO: Send to backend.
    closeModal("deliveryInstructions");
  }, [closeModal, displayedOption, displayedCustomInstructions, updateAll]);

  useEffect(() => {
    if (displayedOption !== optionsList[0]) {
      const reorderedOptions = [
        displayedOption,
        ...optionsList.filter((option) => option !== displayedOption)
      ];
      setOptionsList(reorderedOptions);
    }
  }, [displayedOption, optionsList]);

  return (
    <>
      {isModalOpen("deliveryInstructions") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"] : isModalOpen("deliveryInstructions"),
          ["hidden"]: !isModalOpen("deliveryInstructions"),
        })}>
          <section className="relative flex flex-col p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
            <CloseModalButton
              handleClick={handleCloseModal}
            />

            <h5 className="pb-6 h5-mobile-semi capitalize">edit delivery instructions</h5>

            <div className="flex-grow flex flex-col gap-4">
              <DeliveryOptionsDropdown 
                options={optionsList}
                displayedOption={displayedOption}
                setDisplayedOption={setDisplayedOption}
              />

              <DeliveryCustomInstructions 
                displayedCustomInstructions={displayedCustomInstructions}
                setDisplayedCustomInstructions={setDisplayedCustomInstructions}
              />

              <LargeDarkButton
                text="confirm"
                handleClick={handleConfirm}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default CheckoutDeliveryInstructionsModal;