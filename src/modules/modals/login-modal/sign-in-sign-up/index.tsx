"use client"

import CloseModalButton from "../../common/close-modal-button";
// import LargeButtonWithIcon from "@/modules/common/components/large-button-with-icon";
import LargeDarkButton from "@/modules/common/components/large-dark-button";
import LargeLightButton from "@/modules/common/components/large-light-button";
import TextboxInput from "../../common/textbox-input";
import TitleWithSubtext from "../../common/title-with-subtext";

// import AppleIcon from "public/icons/social-media/apple.svg";
// import FacebookIcon from "public/icons/social-media/facebook.svg";
// import GoogleIcon from "public/icons/social-media/google.svg";

import { LoginCredsType } from "@/types/loginCreds";

import { useModalStepStore } from "@/store/modal-store/ModalStep";

type SignInSignUpProps = {
  handleCloseModal: () => void;
  handleSignIn: (e: React.FormEvent<HTMLButtonElement>) => void;
  loginCreds: LoginCredsType;
  setLoginCreds: (loginCreds: LoginCredsType) => void;
};

const SignInSignUp: React.FC<SignInSignUpProps> = ({
  handleCloseModal,
  handleSignIn,
  loginCreds,
  setLoginCreds,
}) => {
  const {
    updateToNextStep,
  } = useModalStepStore();

  return (
    <section className="relative flex flex-col gap-6 p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleCloseModal}
      />

      <div className="flex-grow flex flex-col gap-6 w-full h-full">
        <TitleWithSubtext
          title="sign in to your account"
          subtext="* Required Information"
        />

        <div className="flex-grow flex flex-col items-center gap-2 w-full h-full">
          <form className="flex-grow flex flex-col justify-between w-full h-full">
            <TextboxInput
              name="sign-in-username"
              type="text"
              value={loginCreds.username}
              placeholder="Email / Phone number (ex. 1234567890)*"
              handleChange={(e) => setLoginCreds({...loginCreds, username: e.target.value})}
            />

            <div className="flex flex-col gap-2">
              <LargeDarkButton
                text="enter"
                styles={loginCreds.username === "" ? "border-neutral-5 bg-neutral-5 text-main-2" : "border-main-1 bg-main-1 text-main-2"}
                handleClick={handleSignIn}
              />

              <LargeLightButton
                text="create account"
                handleClick={() => updateToNextStep(4)}
                styles="max-w-full"
              />
            </div>
          </form>

          {/* <p className="caption1-mobile-light-italic capitalize">or</p>

          <div className="flex flex-col gap-2 w-full">
            <LargeButtonWithIcon
              text="continue with google"
              handleClick={() => console.log("CONTINUE WITH GOOGLE")}
              icon={GoogleIcon}
              iconAlt="Google logo icon"
              color="#5382EE"
            />

            <LargeButtonWithIcon
              text="continue with facebook"
              handleClick={() => console.log("CONTINUE WITH FACEBOOK")}
              icon={FacebookIcon}
              iconAlt="Facebook logo icon"
              color="#425892"
            />

            <LargeButtonWithIcon
              text="continue with apple"
              handleClick={() => console.log("CONTINUE WITH APPLE")}
              icon={AppleIcon}
              iconAlt="Apple logo icon"
              color="#000"
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default SignInSignUp;