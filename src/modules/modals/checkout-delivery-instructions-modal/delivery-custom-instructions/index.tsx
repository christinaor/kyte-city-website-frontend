import clsx from "clsx";

type DeliveryCustomInstructionsProps = {
  displayedCustomInstructions: string;
  setDisplayedCustomInstructions: (newInstructions: string) => void;
};

const DeliveryCustomInstructions: React.FC<DeliveryCustomInstructionsProps> = ({
  displayedCustomInstructions,
  setDisplayedCustomInstructions,
}) => {
  return (
    <form className="flex-grow flex flex-col items-end gap-4 w-full">
      <textarea 
        name="delivery-instructions-form"
        value={displayedCustomInstructions}
        onChange={(e) => setDisplayedCustomInstructions(e.target.value)}
        placeholder="Add delivery instructions (Maximum characters 250)"
        maxLength={250}
        className={clsx({
          ["flex-grow p-4 w-full resize-none text-left p1-mobile-semi"]: displayedCustomInstructions !== "",
          ["flex-grow p-4 w-full resize-none text-left text-mobile-light-italic"]: displayedCustomInstructions === "",
        })}
        required
      />
    </form>
  );
};

export default DeliveryCustomInstructions;