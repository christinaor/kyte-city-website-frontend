import clsx from "clsx";

import AlertText from "../../common/alert-text";
import BackButtonModal from "../../login-modal/components/back-button-modal";
import CloseModalButton from "../../common/close-modal-button";
import InfoText from "../../login-modal/components/info-text";
import LargeDarkButton from "@/modules/common/components/large-dark-button";
import LargeLightButton from "@/modules/common/components/large-light-button";
import TitleWithSubtext from "../../common/title-with-subtext";
import VerificationCodeBoxes from "../../login-modal/components/verification-code-boxes";

type PhoneNumberVerificationProps = {
  isCodeIncorrect: boolean;
  isResent: boolean;
  verificationCode: string[];
  setVerificationCode: (newCode: string[]) => void;
  resendCode: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleBack: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleClose: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const PhoneNumberVerification: React.FC<PhoneNumberVerificationProps> = ({
  isCodeIncorrect,
  isResent,
  verificationCode,
  setVerificationCode,
  resendCode,
  handleBack,
  handleClose,
  handleSubmit,
}) => {

  return (
    <section className="relative p-10 pb-5 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleClose}
      />

      <form className={clsx({
        ["flex flex-col gap-9 min-h-[276px] w-full h-full"]: !isCodeIncorrect
        && !isResent,
        ["flex flex-col min-h-[276px] w-full h-full"]: isCodeIncorrect || isResent,
      })}>
        <div className="flex flex-col gap-1">
          <TitleWithSubtext
            title="verification code"
            subtext="Please enter the 6-digit verification code that was sent to your phone number."
          />

          {isCodeIncorrect && (
            <div className="pb-5">
              <AlertText
                text="The code you entered is incorrect. Please try again."
              />
            </div>
          )}

          {isResent && (
            <div className="pb-5">
              <InfoText
                text="Code resent."
              />
            </div>
          )}
        </div>
        
        <div className={clsx({
          ["pb-9"]: isCodeIncorrect || isResent,
        })}>
          <VerificationCodeBoxes
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
          />
        </div>

        <div className="flex flex-col gap-2">
          <LargeDarkButton
            text="verify"
            handleClick={handleSubmit}
            styles={verificationCode.some((digit) => digit === "") ? "border-neutral-5 bg-neutral-5 text-main-2" : "border-main-1 bg-main-1 text-main-2"}
          />

          <LargeLightButton
            text="resend"
            handleClick={resendCode}
            styles="min-w-screen"
          />
          
          <BackButtonModal
            handleClick={handleBack}
          />
        </div>
      </form>
    </section>
  );
};

export default PhoneNumberVerification;