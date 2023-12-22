"use client"

import AlertText from "../../common/alert-text";
import BackButtonModal from "../components/back-button-modal";
import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";
import TextboxInput from "../../common/textbox-input";
import TitleWithSubtext from "../../common/title-with-subtext";

import { useModalStepStore } from "@/store/modal-store/ModalStep";

import { LoginCredsType } from "@/types/loginCreds";

type SignInExistingPasswordProps = {
  isPasswordIncorrect?: boolean | null;
  handleCloseModal: () => void;
  handleSignIn: (e: React.FormEvent<HTMLButtonElement>) => void;
  loginCreds: LoginCredsType;
  setLoginCreds: (loginCreds: LoginCredsType) => void;
};

const SignInExistingPassword: React.FC<SignInExistingPasswordProps> = ({
  isPasswordIncorrect,
  handleCloseModal,
  handleSignIn,
  loginCreds,
  setLoginCreds,
}) => {
  // TODO: Research authentication options. Once submit is clicked, need to authenticate password through backend.
  const {
    updateToNextStep,
    updateToPreviousStep,
  } = useModalStepStore();

  return (
    <section className="relative p-10 pb-5 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleCloseModal}
      />

      <form className="flex flex-col justify-between min-h-[276px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <TitleWithSubtext
            title="enter your password"
            subtext="* Required Information"
          />

          {/* {isExistingUser && (
            <AlertText
              text="The account you entered is found in our database. Please enter your password to sign in."
            />
          )} */}

          {isPasswordIncorrect && (
            <AlertText
              text="Incorrect password. Please try again."
            />
          )}
          </div>
          

          <div className="flex flex-col gap-2">
            <TextboxInput
              name="sign-in-password"
              type="password"
              value={loginCreds.password}
              placeholder="Password*"
              handleChange={(e) => setLoginCreds({
                ...loginCreds, 
                password: e.target.value
              })}
            />

            <button 
              className="self-end flex justify-end caption1-link-mobile-light-italic whitespace-nowrap"
              onClick={() => updateToNextStep(11)}
            >
              Forgot password?
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <LargeDarkButton
            text="sign in"
            styles={loginCreds.password === "" ? "border-neutral-5 bg-neutral-5 text-main-2" : "border-main-1 bg-main-1 text-main-2"}
            handleClick={handleSignIn}
          />

          <BackButtonModal
            handleClick={() => updateToPreviousStep()}
          />
        </div>
      </form>
    </section>
  );
};

export default SignInExistingPassword;