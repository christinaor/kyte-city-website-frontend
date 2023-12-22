"use client"

import clsx from "clsx";
import { useCallback } from "react";

import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";

import useModalStore from "@/store/Modal";

const DeliveryFeeInfoModal: React.FC = () => {
  const { closeModal, isModalOpen } = useModalStore();

  const handleCloseModal = useCallback(() => {
    closeModal("deliveryFeeInfo");
  }, [closeModal]);

  return (
    <>
      {isModalOpen("deliveryFeeInfo") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"] : isModalOpen("deliveryFeeInfo"),
          ["hidden"]: !isModalOpen("deliveryFeeInfo"),
        })}>
          <section className="relative p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
            <CloseModalButton
              handleClick={handleCloseModal}
            />

            <h5 className="pb-6 h5-mobile-semi capitalize">understanding delivery fees</h5>

            <div className="flex flex-col gap-2 pb-4">
              <p className="p1-mobile-regular">{`At Kyte, we are committed to providing you with a seamless shopping experience. To ensure transparency and clarity, let's break down our delivery fee policy:`}</p>

              <div className="flex flex-col gap-2 py-2 pl-4 pr-5 w-full h-[184px] bg-white  overflow-y-auto">
                <ol type="1" className="flex flex-col gap-2 pl-2 list-decimal">
                  <li className="p2-mobile-regular">Standard Delivery: We offer standard delivery to your doorstep at a nominal fee. This fee may vary depending on your location, the size of your order, and any ongoing promotions. You can view the exact delivery fee for your order in the cart before proceeding to checkout.</li>

                  <li className="p2-mobile-regular">Free Delivery Promotions: Keep an eye out for our free delivery promotions. Orders that meet specific criteria, such as a minimum purchase amount or membership perks, may qualify for free delivery. Please check our promotions page or cart for details.</li>

                  <li className="p2-mobile-regular">Expedited and Special Delivery: For those who need their items sooner, we offer expedited and special delivery options at an additional cost. You can select your preferred delivery speed during checkout.</li>
                </ol>

                <p className="p2-mobile-regular">We strive to keep our delivery fees as reasonable as possible while maintaining the quality and reliability of our delivery services.</p>

                <p className="p2-mobile-regular">{`If you have any questions or concerns about delivery fees, please don't hesitate to contact our customer support team. Your satisfaction is our top priority.`}</p>
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

export default DeliveryFeeInfoModal;