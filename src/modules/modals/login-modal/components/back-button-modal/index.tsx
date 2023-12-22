type BackButtonModal = {
  handleClick: (e: any, ...args: any[]) => void;
}

const BackButtonModal: React.FC<BackButtonModal> = ({
  handleClick,
}) => {
  return (
      <button
        className="m-auto w-min caption1-link-mobile-regular-italic capitalize"
        onClick={handleClick}
      >
        back
      </button>
  );
};

export default BackButtonModal;