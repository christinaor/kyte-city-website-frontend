"use client"

import clsx from "clsx";
import { useCallback } from "react";

import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";

import useModalStore from "@/store/Modal";

const TaxesAndServiceFeesInfoModal: React.FC = () => {
  const { closeModal, isModalOpen } = useModalStore();

  const handleCloseModal = useCallback(() => {
    closeModal("serviceFeeInfo");
  }, [closeModal]);

  return (
    <>
      {isModalOpen("serviceFeeInfo") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"] : isModalOpen("serviceFeeInfo"),
          ["hidden"]: !isModalOpen("serviceFeeInfo"),
        })}>
          <section className="relative p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
            <CloseModalButton
              handleClick={handleCloseModal}
            />

            <h5 className="pb-6 h5-mobile-semi capitalize">understanding service fees</h5>

            <div className="flex flex-col gap-2 pb-4">
              <p className="p1-mobile-regular">{`At Kyte, we want to be transparent about any service fees associated with your order. Here's what you need to know:`}</p>

              <div className="flex flex-col gap-2 py-2 pl-4 pr-5 w-full h-[184px] bg-white  overflow-y-auto">
                <ol type="1" className="flex flex-col gap-2 pl-2 list-decimal">
                  <li className="p2-mobile-regular">Service Fee Overview: Service fees may be applied to certain types of orders or services. These fees are optional and will be clearly itemized during checkout. You have the choice to add or remove these services based on your preferences.</li>

                  <li className="p2-mobile-regular">Promo Code Exemptions: Some promo codes or discounts may not apply to service fees. Please review the terms and conditions of the promo code to understand any limitations.</li>

                  <li className="p2-mobile-regular">Fee Waivers: Depending on your loyalty status, membership, or ongoing promotions, you may be eligible for fee waivers or discounts. Please check your account dashboard or the cart for any applicable discounts.</li>
                </ol>

                <p className="p2-mobile-regular">We believe in giving you control over your shopping experience, so you can choose the services that best suit your needs and budget.</p>

                <p className="p2-mobile-regular">{`If you have questions or need assistance with service fees, please reach out to our dedicated customer support team. We're here to help.`}</p>
              </div>
            </div>

            <LargeDarkButton
              text="close"
              handleClick={handleCloseModal}
            />
          </section>
        </div>
      )}
    </>
  );
};

export default TaxesAndServiceFeesInfoModal;