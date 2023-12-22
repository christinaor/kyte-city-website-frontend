"use client"

import BackButtonModal from "../components/back-button-modal";
import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";
import TextboxInput from "../../common/textbox-input";
import TitleWithSubtext from "../../common/title-with-subtext";

import { LoginCredsType } from "@/types/loginCreds";

import { useModalStepStore } from "@/store/modal-store/ModalStep";

type SignInExistingPasswordProps = {
  handleCloseModal: () => void;
  handleSignIn: (e: React.FormEvent<HTMLButtonElement>) => void;
  loginCreds: LoginCredsType;
  setLoginCreds: (loginCreds: LoginCredsType) => void;
};

const SignInExistingPassword: React.FC<SignInExistingPasswordProps> = ({
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
          <TitleWithSubtext
            title="enter your password"
            subtext="* Required Information"
          />

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
              className="text-end caption1-link-mobile-light-italic"
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