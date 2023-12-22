"use client"

import Image from "next/image";

import CloseModalButton from "../../common/close-modal-button";

import SuccessIcon from "public/icons/success.svg";

import { LoginCredsType } from "@/types/loginCreds";

type ForgotPasswordSuccessProps = {
  handleCloseModal: () => void;
  loginCreds: LoginCredsType;
};

const ForgotPasswordSuccess: React.FC<ForgotPasswordSuccessProps> = ({
  handleCloseModal,
  loginCreds,
}) => {
  // TODO: Set global user state, clear login creds used for authentication, and close popup after a short time.

  const subtitleFormOfCommunication = (loginCreds.username !== "")
    ? 'email'
    : 'text message'
  ;

  const textFormOfCommunication = (loginCreds.username !== "")
    ? 'email address'
    : 'inbox at'
  ;

  const textCred = (loginCreds.username !== "") 
    ? `${loginCreds.username}`
    : `${loginCreds.phone}`
  ;

  return (
    <section className="relative p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleCloseModal}
      />

      <div className="flex flex-col gap-5 justify-center items-center h-[236px]">
        <Image
          src={SuccessIcon}
          alt="sign in success icon"
          width={80}
          height={80}
        />

        <div className="flex flex-col justify-center items-center gap-1">
          <h5 className="h5-mobile-semi text-success-3 capitalize">{`check your ${subtitleFormOfCommunication}`}!</h5>

          <p className="p1-mobile-light text-center">{`Please check the ${textFormOfCommunication} ${textCred} for instructions to reset your password. `}</p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordSuccess;