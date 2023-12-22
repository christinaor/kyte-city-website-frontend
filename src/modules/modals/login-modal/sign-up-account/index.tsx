"use client"

import AlertText from "../../common/alert-text";
import BackButtonModal from "../components/back-button-modal";
import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";
import TextboxInput from "../../common/textbox-input";
import TitleWithSubtext from "../../common/title-with-subtext";

import { useModalStepStore } from "@/store/modal-store/ModalStep";

import { LoginCredsType } from "@/types/loginCreds";

type SignUpAccountProps = {
  isExistingUser: boolean | null;
  handleCloseModal: () => void;
  handleSignUp: (e: React.FormEvent<HTMLButtonElement>) => void;
  loginCreds: LoginCredsType;
  setLoginCreds: (loginCreds: LoginCredsType) => void;
};

const SignUpAccount: React.FC<SignUpAccountProps> = ({
  isExistingUser,
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
          <div className="flex flex-col gap-2">
            <TitleWithSubtext
              title="create new account"
              subtext="* Required Information"
            />

            {((isExistingUser !== null) && (isExistingUser === false)) && (
              <AlertText
                text="The account you entered is not found in our database. Please create a new account."
              />
            )}
          </div>
          
          <TextboxInput
            name="sign-up-account"
            type="text"
            value={loginCreds.username}
            placeholder="Email / Phone number (ex. 1234567890)*"
            handleChange={(e) => setLoginCreds({...loginCreds, username: e.target.value})}
          />
        </div>

        <div className="flex flex-col gap-2">
          <LargeDarkButton
            text="enter"
            styles={loginCreds.username === "" ? "border-neutral-5 bg-neutral-5 text-main-2" : "border-main-1 bg-main-1 text-main-2"}
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

export default SignUpAccount;