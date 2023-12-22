"use client"

import clsx from "clsx";
import { useCallback } from "react";

import CloseModalButton from "../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";

import useModalStore from "@/store/Modal";

import { useAddGiftStore } from "@/store/modal-store/AddGift";

const AddGiftMessageModal: React.FC = () => {
  const { closeModal, isModalOpen } = useModalStore();

  const {
    recipientName,
    giftMessage,
    // confirmGiftMessage,
    updateRecipientName,
    updateGiftMessage,
    updateConfirmGiftMessage,
  } = useAddGiftStore();

  const handleCloseModal = useCallback(() => {
    closeModal("addGiftOption")
    updateRecipientName("");
    updateGiftMessage("");
  }, [closeModal, updateGiftMessage, updateRecipientName]);

  const handleConfirmGiftMessage = useCallback(() => {
    // Add to global store
    if (recipientName !== "" && giftMessage !== ""){
      updateConfirmGiftMessage(true);
      closeModal("addGiftOption")
    } else {
      updateConfirmGiftMessage(false);
      console.error("Recipient and/or Gift Message missing")
    }
  }, [closeModal, giftMessage, recipientName, updateConfirmGiftMessage]);

  return (
    <>
      {isModalOpen("addGiftOption") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"] : isModalOpen("addGiftOption"),
          ["hidden"]: !isModalOpen("addGiftOption"),
        })}>
          <section className="relative p-10 pb-5 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
            <CloseModalButton
              handleClick={handleCloseModal}
            />

            <form className="flex flex-col">
              <h5 className="pb-6 h5-mobile-semi capitalize">add a gift message</h5>

              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="shopping-bag-recipient-name" 
                    className="p1-mobile-semi capitalize"
                  >
                    {`recipient's name`}
                  </label>
                  <input 
                    type="text" 
                    inputMode="text" 
                    id="shopping-bag-recipient-name" 
                    value={recipientName} 
                    onChange={(e) => updateRecipientName(e.target.value)} 
                    placeholder="Add delivery instructions"
                    className="
                      p-2 w-full 
                      resize-none text-left
                      text-mobile-light-italic"
                    required 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label 
                    htmlFor="shopping-bag-gift-message" className="p1-mobile-semi capitalize"
                  >
                    gift message
                  </label>
                  <textarea 
                    id="shopping-bag-gift-message" 
                    name="shopping-bag-gift-message"
                    value={giftMessage}
                    onChange={(e) => updateGiftMessage(e.target.value)}
                    placeholder="Add a Gift Message (Maximum characters 250)"
                    required
                    className="
                      p-2 min-h-[68px] w-full 
                      resize-none text-left
                      text-mobile-light-italic
                    "
                  />
                </div>
              </div>
            </form>

            <div className="pt-4">
              <LargeDarkButton
                text="confirm"
                handleClick={handleConfirmGiftMessage}
              />
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default AddGiftMessageModal;