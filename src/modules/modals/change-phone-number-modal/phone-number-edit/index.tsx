// import AlertText from "../../common/alert-text";
import BackButtonModal from "../../login-modal/components/back-button-modal";
import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";
import TextboxInput from "../../common/textbox-input";
import TitleWithSubtext from "../../common/title-with-subtext";

type PhoneNumberEditProps = {
  displayedPhone: string;
  setDisplayedPhone: (updatedDisplayedPhone: string) => void;
  handleClose: (e: React.FormEvent<HTMLButtonElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const PhoneNumberEdit: React.FC<PhoneNumberEditProps> = ({
  displayedPhone,
  setDisplayedPhone,
  handleClose,
  handleSubmit,
}) => {

  return (
    <section className="relative p-10 pb-5 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleClose}
      />

      <form className="flex flex-col justify-between min-h-[276px]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <TitleWithSubtext
              title="change phone number"
              subtext="Please enter your new phone number."
            />

            {/* {((isExistingUser !== null) && (isExistingUser === false)) && (
              <AlertText
                text="The account you entered is not found in our database. Please create a new account."
              />
            )} */}
          </div>
          
          <TextboxInput
            name="change-phone-number"
            type="text"
            maxLength={10}
            value={displayedPhone}
            placeholder="Phone Number (ex. 1234567890)"
            handleChange={(e) => setDisplayedPhone(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <LargeDarkButton
            text="next"
            styles={displayedPhone === "" ? "border-neutral-5 bg-neutral-5 text-main-2" : "border-main-1 bg-main-1 text-main-2"}
            handleClick={handleSubmit}
          />

          <BackButtonModal
            handleClick={handleClose}
          />
        </div>
      </form>
    </section>
  );
};

export default PhoneNumberEdit;