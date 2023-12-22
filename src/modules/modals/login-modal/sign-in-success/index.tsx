import Image from "next/image";

import CloseModalButton from "../../common/close-modal-button";

import SuccessIcon from "public/icons/success.svg";

type SignInSuccessProps = {
  handleCloseModal: () => void;
};

const SignInSuccess: React.FC<SignInSuccessProps> = ({
  handleCloseModal,
}) => {
  // TODO: Set global user state, clear login creds used for authentication, and close popup after a short time.

  return (
    <section className="relative p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleCloseModal}
      />

      <div className="flex flex-col gap-5 justify-center items-center h-[236px]">
        <Image
          src={SuccessIcon}
          alt="sign in success icon"
          width={80}
          height={80}
        />

        <div className="flex flex-col justify-center items-center gap-1">
          <h5 className="h5-mobile-semi text-success-3 capitalize">sign-in success</h5>

          <p className="p1-mobile-light text-center">You're now ready to use kytecity!</p>
        </div>
      </div>
    </section>
  );
};

export default SignInSuccess;