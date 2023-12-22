import clsx from "clsx";
import { useCallback, useState } from "react";

import ArrowRightIcon from "@/modules/common/icons/arrow-right";

type DeliveryOptionsDropdown = {
  options: string[];
  displayedOption: string;
  setDisplayedOption: (newOption: string) => void;
};

const DeliveryOptionsDropdown: React.FC<DeliveryOptionsDropdown> = ({
  options,
  displayedOption,
  setDisplayedOption,
}) => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const handleClickOption = useCallback((option: string) => {
    setDisplayedOption(option);
    setToggleDropdown(false);
  }, [setDisplayedOption]);

  return (
    <div className="relative">
      
      {/* Untoggled dropdown */}
      <button className="flex justify-between items-center px-2 pb-1 w-full border-b border-b-solid border-neutral-5" onClick={() => setToggleDropdown(!toggleDropdown)}>
        <div className="flex flex-col items-start">
          <p className="caption1-mobile-light-italic text-neutral-5">Delivery options</p>

          <p className="p1-mobile-semi">{displayedOption}</p>
        </div>

        <ArrowRightIcon 
          size={16}
          className={clsx({
            ["rotate-90 z-40"]: !toggleDropdown,
            ["rotate-[270deg] z-40"]: toggleDropdown,
          })}
        />
      </button>
    
      {/* Dropdown list */}
      {toggleDropdown && (
        <div className="absolute inset-0 w-full divide-y divide-solid divide-neutral-5">
          {options.map((option) => (
            <button key={`edit-delivery-instructions-dropdown-${option}`} className="flex flex-col w-full" onClick={() => handleClickOption(option)}>
              
              {/* Display untoggled dropdown for first option as part of the list */}
              {(option === displayedOption && (
                <div className="flex justify-between items-center px-2 pb-1 w-full bg-secondary-1">
                  <div className="flex flex-col items-start">
                    <p className="caption1-mobile-light-italic text-neutral-5">Delivery options</p>
          
                    <p className="p1-mobile-semi">{option}</p>
                  </div>

                  <ArrowRightIcon 
                    size={16}
                    className={clsx({
                      ["rotate-90 z-40"]: !toggleDropdown,
                      ["rotate-[270deg] z-40"]: toggleDropdown,
                    })}
                  />
                </div>
              ))}

              {/* Display the rest of the options */}
              {(option !== displayedOption) && (
                <div className="text-start p-2 w-full bg-main-2">
                  <p className="p1-mobile-semi">{option}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveryOptionsDropdown;