"use client"

import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import ResetPassword from "./reset-password";
import ResetPasswordSuccess from "./reset-password-success";

import useModalStore from "@/store/Modal";
import { useModalStepStore } from "@/store/modal-store/ModalStep";
import { useUserStore } from "@/store/User";

// TODO: For password reset, user clicks URL in email, and URL includes a token as a search param. Once clicked, the app captures the token, and backend verifies token is in db and hasn't expired, and is associated with user. If token is valid, step 1 pops up for password reset for specific user. Once user submits password, update password in backend.

const ResetPasswordModal: React.FC = () => {
  const router = useRouter();

  const { closeModal, isModalOpen } = useModalStore();
  const { 
    step,
    updateToNextStep,
    resetAll,
  } = useModalStepStore();
  const {
    updateUser,
  } = useUserStore();

  const [resetRequested, setResetRequested] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");

  const handleCloseModal = useCallback(() => {
    closeModal("resetPassword");
    setNewPassword("");
    resetAll();
    router.push("/")
  }, [closeModal, resetAll, router]);

  const handleResetPassword = useCallback((e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // TODO: Implement password reset logic/form validation using the resetToken in URL. Make a backend API call to verify token and update password. Assume successful reset for now.
    if (newPassword !== "") {
      const isResetSuccessful = true;
      if (isResetSuccessful) {
        updateToNextStep(2);
      } else {
        console.error("COULD NOT RESET")
      }
    } else {
      console.error("PASSWORD EMPTY")
    }
  }, [newPassword, updateToNextStep]);

  useEffect(() => {
    if (resetRequested) {
      updateToNextStep(1);
    }
  }, [resetRequested, updateToNextStep]);

    // useEffect(() => {
  //   // Check if there's a token in the URL when the component mounts
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const token = urlParams.get("token");
  
  //   if (token) {
  //     // If there's a token, set it in the state
  //     setResetToken(token);
  //     // TODO: You might want to do additional checks here or redirect the user
  //   }
  // }, []);

  return (
    <>
      {isModalOpen("resetPassword") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"] : isModalOpen("resetPassword"),
          ["hidden"]: !isModalOpen("resetPassword"),
        })}>
          {(step === 1) && (
            <ResetPassword
              handleCloseModal={handleCloseModal}
              handleResetPassword={handleResetPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
            />
          )}

          {(step === 2) && (
            <ResetPasswordSuccess
              handleCloseModal={handleCloseModal}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ResetPasswordModal;