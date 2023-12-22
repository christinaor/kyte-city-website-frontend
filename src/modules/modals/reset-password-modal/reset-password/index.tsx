"use client"

// import BackButtonModal from "../../login-modal/components/back-button-modal";
import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";
import TextboxInput from "../../common/textbox-input";
import TitleWithSubtext from "../../common/title-with-subtext";

type ResetPasswordProps = {
  handleCloseModal: () => void;
  handleResetPassword: (e: React.FormEvent<HTMLButtonElement>) => void;
  newPassword: string;
  setNewPassword: (newPasswordState: string) => void;
};

const ResetPassword: React.FC<ResetPasswordProps> = ({
  handleCloseModal,
  handleResetPassword,
  newPassword,
  setNewPassword,
}) => {
  // TODO: Link from email/text leads to this component and should include global login username - find how to ingest into global state. Will also need to activate global login modal state.

  return (
    <section className="relative p-10 pb-5 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleCloseModal}
      />

      <form className="flex flex-col justify-between min-h-[276px]">
        <div className="flex flex-col gap-6">
          <TitleWithSubtext
            title="enter new password"
            subtext="* Required Information"
          />

          <TextboxInput
            name="reset-password"
            type="text"
            value={newPassword}
            placeholder="Password*"
            handleChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <LargeDarkButton
            text="reset password"
            handleClick={handleResetPassword}
          />
          
          {/* <BackButtonModal
            handleClick={() => updateStep(1)}
          /> */}
        </div>
      </form>
    </section>
  );
};

export default ResetPassword;