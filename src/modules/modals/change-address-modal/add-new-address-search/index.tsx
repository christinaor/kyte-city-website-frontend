import clsx from "clsx";
import { useEffect, useRef } from "react";
import Image from "next/image";

import ArrowRightIcon from "@/modules/common/icons/arrow-right";
import CloseModalButton from "../../common/close-modal-button";

import LocationIcon from "public/icons/location-filled-gray.svg";

import { DeliveryDetailsFormType } from "..";

import { mockServiceableCities } from "@/lib/data";

// Extend the Window interface
declare global {
  interface Window {
    initAutocomplete?: () => void;
  }
};

type AddNewAddressSearchProps = {
  deliveryDetailsForm: DeliveryDetailsFormType;
  setDeliveryDetailsForm: (newDeliveryDetailsForm: DeliveryDetailsFormType) => void;
  updateToNextStep: (step: number) => void;
  updateToPreviousStep: () => void
  handleClose: (e: React.FormEvent<HTMLButtonElement>) => void;
};

const AddNewAddressSearch: React.FC<AddNewAddressSearchProps> = ({
  deliveryDetailsForm,
  setDeliveryDetailsForm,
  updateToPreviousStep,
  updateToNextStep,
  handleClose,
}) => {
  const autocompleteInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Define initAutocomplete within useEffect
    window.initAutocomplete = () => {
      if (autocompleteInputRef.current && typeof google !== 'undefined') {
        const autocomplete = new google.maps.places.Autocomplete(autocompleteInputRef.current, {
          types: ['address'],
        });

        autocomplete.addListener('place_changed', () => {
          const place = autocomplete.getPlace();
          if (!place.address_components) {
            console.error('No address details available for this place.');
            return;
          }

          let streetNumber = '';
          let route = '';
          let aptNumber = '';
          let city = '';
          let state = '';

          for (const component of place.address_components) {
            const componentType = component.types[0];

            switch (componentType) {
              case 'street_number':
                streetNumber = component.long_name;
                break;
              case 'route':
                route = component.long_name;
                break;
              case 'subpremise': // Represents an apartment number
                aptNumber = component.long_name;
                break;
              case 'locality': // City
                city = component.long_name;
                break;
              case 'administrative_area_level_1': // State
                state = component.short_name;
                break;
            }
          }

          const streetAddress = streetNumber ? `${streetNumber} ${route}` : route;
          // console.log(`Address: ${streetAddress}, Apt: ${aptNumber}, City: ${city}, State: ${state}`);
          // // Use these details as needed...
          setDeliveryDetailsForm({
            ...deliveryDetailsForm,
            streetAddress: streetAddress ? streetAddress : "",
            city: city ? city : "",
            state: state ? state : "",
            apt: aptNumber ? aptNumber : "",
          });
          // TODO: Validate in backend whether address is serviceable.
          console.log(city)
          if (city && mockServiceableCities.includes(city)) {
            updateToNextStep(3);
          } else {
            updateToNextStep(4);
          }
        });
      }
    };

    // Function to load the Google Maps script
    const loadGoogleMapsScript = () => {
      if (!document.getElementById('google-maps-script') && typeof google === 'undefined') {
        const script = document.createElement('script');
        script.id = 'google-maps-script';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places&callback=initAutocomplete`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      } else {
        // Safely invoke initAutocomplete if it's defined
        window.initAutocomplete?.();
      }
    };

    loadGoogleMapsScript();

    // Cleanup function
    return () => {
      // Remove pac-container elements when the component unmounts
      document.querySelectorAll('.pac-container').forEach(element => element.remove());

      // Remove the initAutocomplete property
      delete window.initAutocomplete;
    };
  }, [deliveryDetailsForm, setDeliveryDetailsForm, updateToNextStep]);

  return (
    <section className="relative p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
      <CloseModalButton
        handleClick={handleClose}
      />

      <div className="flex flex-col gap-2">
        <h5 className="h5-mobile-semi capitalize">add new address</h5>

        <button className="flex items-center gap-1 w-min" onClick={() => updateToPreviousStep()}>
          <ArrowRightIcon
            size={12}
            // stroke={styles}
            // color={color}
            className="rotate-180"
          />

          <p className={"p1-mobile-regular"}>Back</p>
        </button>

        <div className="flex gap-2 p-2 w-full h-stetch bg-white">
          <Image
            src={LocationIcon}
            alt="new address input icon"
            width="16"
            height="16"
          />

          <input 
            ref={autocompleteInputRef} 
            className="flex-grow rounded-sm caption1-mobile-light-italic"
            // className={clsx({
            //   ["flex-grow rounded-sm caption1-mobile-light-italic"]: autocompleteInputRef.current !== null && autocompleteInputRef.current !== "",
            //   ["flex-grow rounded-sm p1-mobile-regular"]: autocompleteInputRef.current,
            // })}
            name="add-new-address-search"
            type="text" 
            // value={displayedAddress}
            placeholder="Search for an address"
          />
        </div>
      </div>
    </section>
  );
};

export default AddNewAddressSearch;