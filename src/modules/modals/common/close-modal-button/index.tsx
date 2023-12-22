import Image from "next/image";

import CloseIcon from "public/icons/close.svg";

type CloseModalButtonProps = {
  handleClick: (e: any, ...args: any[]) => void;
}

const CloseModalButton: React.FC<CloseModalButtonProps> = ({
  handleClick,
}) => {
  return (
    <div className="absolute top-0 right-0 p-5">
      <button
        onClick={handleClick}
      >
        <Image
          src={CloseIcon}
          alt="close sign in icon"
          width="20"
          height="20"
        />
      </button>
    </div>
  );
};

export default CloseModalButton;