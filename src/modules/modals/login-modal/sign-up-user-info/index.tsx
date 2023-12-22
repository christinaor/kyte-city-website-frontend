"use client"

import CloseModalButton from "../../common/close-modal-button";
import BackButtonModal from "../components/back-button-modal";
import LargeDarkButton from "@/modules/common/components/large-dark-button";
import TextboxInput from "../../common/textbox-input";
import TitleWithSubtext from "../../common/title-with-subtext";

import { LoginCredsType } from "@/types/loginCreds";

import { useModalStepStore } from "@/store/modal-store/ModalStep";

type SignUpUserInfoProps = {
  handleCloseModal: () => void;
  handleSignUp: (e: React.FormEvent<HTMLButtonElement>) => void;
  loginCreds: LoginCredsType;
  setLoginCreds: (loginCreds: LoginCredsType) => void;
};

const SignUpUserInfo: React.FC<SignUpUserInfoProps> = ({
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
            title="user information"
            subtext="* Required Information"
          />

          <div className="flex flex-col gap-2">
            <TextboxInput
              name="sign-up-first-name"
              type="text"
              value={loginCreds.firstName}
              placeholder="First Name*"
              handleChange={(e) => setLoginCreds({...loginCreds, firstName: e.target.value})}
            />

            <TextboxInput
              name="sign-up-last-name"
              type="text"
              value={loginCreds.lastName}
              placeholder="Last Name*"
              handleChange={(e) => setLoginCreds({...loginCreds, lastName: e.target.value})}
            />

            <TextboxInput
              name="sign-up-email"
              type="text"
              value={loginCreds.username}
              placeholder="Email Address*"
              handleChange={(e) => setLoginCreds({...loginCreds, username: e.target.value})}
            />
            
            <TextboxInput
              name="sign-up-phone"
              type="text"
              value={loginCreds.phone}
              placeholder="Phone Number (ex. 1234567890)*"
              maxLength={10}
              handleChange={(e) => setLoginCreds({...loginCreds, phone: e.target.value})}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <LargeDarkButton
            text="next"
            styles={(!loginCreds.firstName || !loginCreds.lastName || !loginCreds.username || !loginCreds.phone) ? "border-neutral-5 bg-neutral-5 text-main-2" : "border-main-1 bg-main-1 text-main-2"}
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

export default SignUpUserInfo;