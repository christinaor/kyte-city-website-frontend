"use client"

import LargeDarkButton from "@/modules/common/components/large-dark-button";
import BackButtonModal from "../components/back-button-modal";
import CloseModalButton from "../../common/close-modal-button";
import TextboxInput from "../../common/textbox-input";
import TitleWithSubtext from "../../common/title-with-subtext";

import { LoginCredsType } from "@/types/loginCreds";

import { useModalStepStore } from "@/store/modal-store/ModalStep";

type SignUpPasswordProps = {
  handleCloseModal: () => void;
  handleSignUp: (e: React.FormEvent<HTMLButtonElement>) => void;
  loginCreds: LoginCredsType;
  setLoginCreds: (loginCreds: LoginCredsType) => void;
};

const SignUpPassword: React.FC<SignUpPasswordProps> = ({
  handleCloseModal,
  handleSignUp,
  loginCreds,
  setLoginCreds,
}) => {
  const {
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
            title="set your password"
            subtext="* Required Information"
          />

          <TextboxInput
            name="sign-up-password"
            type="password"
            value={loginCreds.password}
            placeholder="Password*"
            handleChange={(e) => setLoginCreds({...loginCreds, password: e.target.value})}
          />
        </div>

        <div className="flex flex-col gap-2">
          <LargeDarkButton
            text="next"
            styles={loginCreds.password === "" ? "border-neutral-5 bg-neutral-5 text-main-2" : "border-main-1 bg-main-1 text-main-2"}
            handleClick={handleSignUp}
          />

          <BackButtonModal
            handleClick={() => updateToPreviousStep()}
          />
        </div>
      </form>
    </section>
  );
};

export default SignUpPassword;