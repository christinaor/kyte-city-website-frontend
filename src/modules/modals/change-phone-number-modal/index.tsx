"use client"

import clsx from "clsx";
import { useCallback, useState } from "react";

import PhoneNumberVerification from "./phone-number-verification";
import PhoneNumberEdit from "./phone-number-edit";

import useModalStore from "@/store/Modal";
import { useModalStepStore } from "@/store/modal-store/ModalStep";
import { useUserStore } from "@/store/User";
import useVerification from "@/lib/hooks/useVerification";

const ChangePhoneNumberModal: React.FC = () => {
  const { isModalOpen, closeModal } = useModalStore();
  const { step, resetAll, updateToPreviousStep, updateToNextStep } = useModalStepStore();
  const { updatePhone } = useUserStore();
  const { verificationCode, setVerificationCode, isCodeIncorrect, setIsCodeIncorrect, isResent, setIsResent, resendCode, verifyCode } = useVerification();

  const [displayedPhone, setDisplayedPhone] = useState<string>("");

  const handleCloseModal = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    closeModal("changePhoneNumber");
    setDisplayedPhone("");
  }, [closeModal]);

  const handleBackFromVerification = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsCodeIncorrect(false);
    setIsResent(true);
    updateToPreviousStep();
  }, [setIsCodeIncorrect, setIsResent, updateToPreviousStep]);

  const handleVerifyCode = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (verifyCode()) {
      closeModal("changePhoneNumber");
      updatePhone(displayedPhone);
      resetAll();
    }
  }, [closeModal, displayedPhone, resetAll, updatePhone, verifyCode]);
  
  const handleSubmit = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    // TODO: If valid phone, go to verification step. Add other checks.
    if (displayedPhone.length === 10) {
      updateToNextStep(2);
    }
  }, [displayedPhone, updateToNextStep]);

  return (
    <>
      {isModalOpen("changePhoneNumber") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"]: isModalOpen("changePhoneNumber"),
          ["hidden"]: !isModalOpen("changePhoneNumber"),
        })}>
          {(step === 1) && (
            <PhoneNumberEdit 
              displayedPhone={displayedPhone}
              setDisplayedPhone={setDisplayedPhone}
              handleClose={handleCloseModal}
              handleSubmit={handleSubmit}
            />
          )}

          {(step === 2) && (
            <PhoneNumberVerification 
              isCodeIncorrect={isCodeIncorrect}
              isResent={isResent}
              verificationCode={verificationCode}
              setVerificationCode={setVerificationCode}
              resendCode={resendCode}
              handleBack={handleBackFromVerification}
              handleClose={handleCloseModal}
              handleSubmit={handleVerifyCode}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ChangePhoneNumberModal;