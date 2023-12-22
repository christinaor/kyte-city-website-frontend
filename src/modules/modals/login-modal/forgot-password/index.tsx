"use client"

import { useEffect } from "react";

import AlertText from "../../common/alert-text";
import BackButtonModal from "../components/back-button-modal";
import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";
import TextboxInput from "../../common/textbox-input";
import TitleWithSubtext from "../../common/title-with-subtext";

import { LoginCredsType } from "@/types/loginCreds";

import { useModalStepStore } from "@/store/modal-store/ModalStep";


type ForgotPasswordProps = {
  isAccountFound: boolean | null;
  handleCloseModal: () => void;
  handleForgotPassword: (e: React.FormEvent<HTMLButtonElement>) => void;
  loginCreds: LoginCredsType;
  setLoginCreds: (loginCreds: LoginCredsType) => void;
};

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  isAccountFound,
  handleCloseModal,
  handleForgotPassword,
  loginCreds,
  setLoginCreds,
}) => {
  const {
    updateToNextStep,
    updateToPreviousStep,
  } = useModalStepStore();

  useEffect(() => {
    setLoginCreds({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      phone: "",
    });
  }, [setLoginCreds])

  return (
    <section className="relative p-10 pb-5 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleCloseModal}
      />

      <form className="flex flex-col justify-between min-h-[276px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <TitleWithSubtext
              title="forgot password"
              subtext="Please enter your email address or phone number to receive a link to reset your password."
            />

            {(isAccountFound === false) && (
              <AlertText
                text="No account found with that email"
              />
            )}
          </div>

          <TextboxInput
            name="forgot-password-username"
            type="text"
            value={loginCreds.username}
            placeholder="Email*"
            handleChange={(e) => setLoginCreds({
              ...loginCreds, 
              username: e.target.value
            })}
          />
        </div>

        <div className="flex flex-col gap-2">
          <LargeDarkButton
            text="reset password"
            styles={loginCreds.username === "" ? "border-neutral-5 bg-neutral-5 text-main-2" : "border-main-1 bg-main-1 text-main-2"}
            handleClick={handleForgotPassword}
          />

          <div className="flex flex-col gap-1">
          {(isAccountFound === false) && (
            <div className="flex justify-center gap-1">
              <p className="caption1-mobile-regular-italic">{`Don't have an account?`}</p>
              
              <button 
                className="caption1-link-mobile-regular-italic"
                onClick={() => updateToNextStep(4)}
              >
                Join now
              </button>
            </div>
          )}

            <BackButtonModal
              handleClick={() => updateToPreviousStep()}
            />
          </div>
        </div>
      </form>
    </section>
  );
};

export default ForgotPassword;