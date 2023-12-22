"use client"

import clsx from "clsx";
import { useCallback } from "react";

import CloseModalButton from "../../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";

import useModalStore from "@/store/Modal";

const PromoCodeInfoModal: React.FC = () => {
  const { closeModal, isModalOpen } = useModalStore();

  const handleCloseModal = useCallback(() => {
    closeModal("promoCodeInfo")
  }, [closeModal]);

  return (
    <>
      {isModalOpen("promoCodeInfo") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"] : isModalOpen("promoCodeInfo"),
          ["hidden"]: !isModalOpen("promoCodeInfo"),
        })}>
          <section className="relative p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
            <CloseModalButton
              handleClick={handleCloseModal}
            />

            <h5 className="pb-6 h5-mobile-semi capitalize">applying promo codes</h5>

            <div className="flex flex-col gap-2 pb-4">
              <p className="p1-mobile-regular">{`At Kyte, we love rewarding our valued customers with special promotions and discounts. Here's how to apply promo codes during checkout:`}</p>

              <div className="flex flex-col gap-2 py-2 pl-4 pr-5 w-full h-[184px] bg-white  overflow-y-auto">
                <ol type="1" className="flex flex-col gap-2 pl-2 list-decimal">
                  <li className="p2-mobile-regular">{`Promo Code Entry: In the checkout process, you'll find a field labeled "Add a Promo Code". Enter your valid promo code into this field.`}</li>

                  <li className="p2-mobile-regular">{`Apply Code: Click the "Apply" button next to the promo code field to activate your discount. The total amount of your order will be updated to reflect the applied discount.`}</li>

                  <li className="p2-mobile-regular">Code Restrictions: Please note that promo codes are subject to certain terms and conditions, including expiration dates and minimum purchase requirements. Make sure your promo code meets these criteria for it to be valid.</li>

                  <li>One Code per Order: Generally, only one promo code can be used per order. If you have multiple valid codes, you may need to choose the one that offers the best discount for your purchase.</li>

                  <li>{`Code Verification: Our system will verify the promo code's eligibility, and if it's valid, the discount will be applied to your order.`}</li>
                </ol>

                <p className="p2-mobile-regular">If you encounter any issues while applying promo codes or have questions about specific promotions, please contact our customer support team for assistance.</p>
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

export default PromoCodeInfoModal;