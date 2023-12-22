"use client"

import clsx from "clsx";
import { useCallback, useRef, useEffect, useState } from "react";
import { DateTime } from "luxon";

import CloseModalButton from "../common/close-modal-button";
import LargeDarkButton from "@/modules/common/components/large-dark-button";

// import ArrowRightIcon from "@/modules/common/icons/arrow-right";

import useModalStore from "@/store/Modal";
import { useScheduleDeliveryStore } from "@/store/modal-store/ScheduleDelivery";

// TODO: Fetch available dates and times from backend.

const CheckoutScheduleDeliveryModal: React.FC = () => {
  const { closeModal, isModalOpen } = useModalStore();
  const { updateAll } = useScheduleDeliveryStore();

  // const scrollDateContainer = useRef<HTMLDivElement>(null);
  // const scrollTimeContainer = useRef<HTMLDivElement>(null);

  const [availableDates, setAvailableDates] = useState<{
    dayStr: string | null;
    monthStr: string | null;
    dayNum: string | null;
  }[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[][]>(Array.from(
    { length: 7 }, 
    () => [
      "9AM - 11AM",
      "11AM - 1PM",
      "1PM - 3PM",
      // "3PM - 5PM",
      // "5PM - 7PM",
    ]
  ));
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<number>(0);

  useEffect(() => {
    // TODO: Fetch and check if date/time time is available. Then set to corresponding index of first date and time available to start.

    const today = DateTime.local();
    const nextSevenDays = [];

    for (let i = 0; i < 7; i++) {
      const nextDay = today.plus({ days: i });

      nextSevenDays.push({
        dayStr: String(nextDay.weekdayLong),
        monthStr: String(nextDay.monthShort),
        dayNum: String(nextDay.day),
      });
    }
    setAvailableDates(nextSevenDays);
  }, [availableTimes, updateAll]);

  const handleCloseModal = useCallback(() => {
    closeModal("scheduleDeliveryOption")
  }, [closeModal]);

  const handleConfirm = useCallback(() => {
    const selectedDate = availableDates[selectedDateIndex];
    const selectedTime = availableTimes[selectedDateIndex][selectedTimeIndex];
    if (
      selectedDate.dayStr !== null
      && selectedDate.monthStr !== null
      && selectedDate.dayNum !== null
      && selectedTime !== null
    ) {
      updateAll({
        ...availableDates[selectedDateIndex],
        time: availableTimes[selectedDateIndex][selectedTimeIndex],
      });
      closeModal("scheduleDeliveryOption");
    }
  }, [closeModal, availableDates, availableTimes, selectedDateIndex, selectedTimeIndex, updateAll]);

  // const scrollRight = (scrollContainer: React.RefObject<HTMLDivElement>) => {
  //   if (scrollContainer.current) {
  //     scrollContainer.current.scrollBy(200, 0); // Can readjust scroll amount
  //   }
  // };

  return (
    <>
      {isModalOpen("scheduleDeliveryOption") && (
        <div className={clsx({
          ["fixed inset-0 flex justify-center items-center w-screen h-screen bg-black bg-opacity-30 visible z-50"] : isModalOpen("scheduleDeliveryOption"),
          ["hidden"]: !isModalOpen("scheduleDeliveryOption"),
        })}>
          <section className="relative flex flex-col gap-6 p-10 w-[328px] min-h-[336px] rounded-sm bg-secondary-1">
            <CloseModalButton
              handleClick={handleCloseModal}
            />

            <h5 className="h5-mobile-semi capitalize">schedule a delivery</h5>

            <div className="flex flex-col gap-2">
              {/* Date selectors */}
              <p className="caption1-mobile-light-italic">Please select a date.</p>

              <div className="flex flex-wrap gap-1 items-center">
                {availableDates && availableDates?.map((date, i) => (
                  <button 
                    key={`checkout-schedule-delivery-${date.monthStr}-${date.dayNum}`} 
                    className={clsx({
                      ["flex flex-col gap-[0.5px] px-2 py-[7px] bg-main-1 border border-solid border-main-1 rounded-sm"]: selectedDateIndex === i,
                      ["flex flex-col gap-[0.5px] px-2 py-[7px] bg-transparent border border-solid border-main-1 rounded-sm"]: selectedDateIndex !== i,
                    })}
                    onClick={() => setSelectedDateIndex(i)}
                  >
                    <p className={clsx({
                      ["p2-mobile-semi w-full text-center text-secondary-1 whitespace-nowrap"]: selectedDateIndex === i,
                      ["p2-mobile-semi w-full text-center text-main-1 whitespace-nowrap"]: selectedDateIndex !== i,
                    })}>{date.dayStr}</p>

                    <p className="p2-mobile-light w-full text-center text-neutral-4 whitespace-nowrap">{`${date.monthStr} ${date.dayNum}`}</p>
                  </button>
                ))}
              </div>

              {/* Time selectors */}
              <p className="caption1-mobile-light-italic">Please select a time.</p>

              <div className="flex flex-wrap gap-1 items-center w-full">
                {availableTimes[selectedDateIndex] && availableTimes[selectedDateIndex]?.map((time, i) => (
                  <button 
                    key={`checkout-schedule-delivery-${time}`} 
                    className={clsx({
                      ["px-2 py-[7px] bg-main-1 border border-solid border-main-1 rounded-sm"]: selectedTimeIndex === i,
                      ["px-2 py-[7px] bg-transparent border border-solid border-main-1 rounded-sm"]: selectedTimeIndex !== i,
                    })}
                    onClick={() => setSelectedTimeIndex(i)}
                  >
                    <p className={clsx({
                      ["p2-mobile-semi text-secondary-1 text-center whitespace-nowrap"]: selectedTimeIndex === i,
                      ["p2-mobile-semi text-main-1 text-center whitespace-nowrap"]: selectedTimeIndex !== i,
                    })}>{time}</p>
                  </button>
                ))}
              </div>
            </div>

            <LargeDarkButton
              text="confirm"
              handleClick={handleConfirm}
            />

            {/* <div className="flex-grow flex flex-col justify-between">
              <div className="flex flex-col gap-6 h-full">
                <div className="flex flex-col gap-1">
                  <h5 className="pb-6 h5-mobile-semi capitalize">schedule a delivery</h5>

                  <p className="caption1-mobile-light-italic">Please select a date and time.</p>
                </div>

                <div className="flex flex-col gap-2"> */}
                  {/* Date selectors */}
                  {/* <p className="caption1-mobile-light-italic">Please select a date.</p>

                  <div className="flex gap-3 items-center">
                    {availableDates && availableDates?.map((date, i) => (
                      <button 
                        key={`checkout-schedule-delivery-${date.monthStr}-${date.dayNum}`} 
                        className={clsx({
                          ["flex flex-col gap-[0.5px] px-2 py-[7px] bg-main-1 border border-solid border-main-1 rounded-sm"]: selectedDateIndex === i,
                          ["flex flex-col gap-[0.5px] px-2 py-[7px] bg-transparent border border-solid border-main-1 rounded-sm"]: selectedDateIndex !== i,
                        })}
                        onClick={() => setSelectedDateIndex(i)}
                      >
                        <p className={clsx({
                          ["p2-mobile-semi text-center text-secondary-1 whitespace-nowrap"]: selectedDateIndex === i,
                          ["p2-mobile-semi text-center text-main-1 whitespace-nowrap"]: selectedDateIndex !== i,
                        })}>{date.dayStr}</p>

                        <p className="p2-mobile-light text-center text-neutral-4 whitespace-nowrap">{`${date.monthStr} ${date.dayNum}`}</p>
                      </button>
                    ))}
                  </div> */}

                  {/* Scrolling date selector */}
                  {/* <div className="flex gap-3 items-center">
                    <div ref={scrollDateContainer} className="flex items-center gap-1 w-full h-min overflow-auto hide-scroll-bar">
                      {availableDates && availableDates?.map((date, i) => (
                        <button 
                          key={`checkout-schedule-delivery-${date.monthStr}-${date.dayNum}`} 
                          className={clsx({
                            ["flex flex-col gap-[0.5px] px-2 py-[7px] bg-main-1 border border-solid border-main-1 rounded-sm"]: selectedDateIndex === i,
                            ["flex flex-col gap-[0.5px] px-2 py-[7px] bg-transparent border border-solid border-main-1 rounded-sm"]: selectedDateIndex !== i,
                          })}
                          onClick={() => setSelectedDateIndex(i)}
                        >
                          <p className={clsx({
                            ["p2-mobile-semi text-center text-secondary-1 whitespace-nowrap"]: selectedDateIndex === i,
                            ["p2-mobile-semi text-center text-main-1 whitespace-nowrap"]: selectedDateIndex !== i,
                          })}>{date.dayStr}</p>

                          <p className="p2-mobile-light text-center text-neutral-4 whitespace-nowrap">{`${date.monthStr} ${date.dayNum}`}</p>
                        </button>
                      ))}
                    </div>

                    <ArrowRightIcon 
                      size={16}
                      onClick={() => scrollRight(scrollDateContainer)}
                    />
                  </div> */}

                  {/* Time selectors */}
                  {/* <p className="caption1-mobile-light-italic">Please select a time.</p>

                  <div className="flex gap-3 items-center w-full">
                    {availableTimes[selectedDateIndex] && availableTimes[selectedDateIndex]?.map((time, i) => (
                      <button 
                        key={`checkout-schedule-delivery-${time}`} 
                        className={clsx({
                          ["px-2 py-[7px] bg-main-1 border border-solid border-main-1 rounded-sm"]: selectedTimeIndex === i,
                          ["px-2 py-[7px] bg-transparent border border-solid border-main-1 rounded-sm"]: selectedTimeIndex !== i,
                        })}
                        onClick={() => setSelectedTimeIndex(i)}
                      >
                        <p className={clsx({
                          ["p2-mobile-semi text-secondary-1 text-center whitespace-nowrap"]: selectedTimeIndex === i,
                          ["p2-mobile-semi text-main-1 text-center whitespace-nowrap"]: selectedTimeIndex !== i,
                        })}>{time}</p>
                      </button>
                    ))}
                  </div> */}

                  {/* Scrolling time selector */}
                  {/* <div className="flex gap-3 items-center w-full">
                    <div ref={scrollTimeContainer} className="flex items-center gap-1 w-full h-min overflow-auto hide-scroll-bar">
                      {availableTimes[selectedDateIndex] && availableTimes[selectedDateIndex]?.map((time, i) => (
                        <button 
                          key={`checkout-schedule-delivery-${time}`} 
                          className={clsx({
                            ["px-2 py-[7px] bg-main-1 border border-solid border-main-1 rounded-sm"]: selectedTimeIndex === i,
                            ["px-2 py-[7px] bg-transparent border border-solid border-main-1 rounded-sm"]: selectedTimeIndex !== i,
                          })}
                          onClick={() => setSelectedTimeIndex(i)}
                        >
                          <p className={clsx({
                            ["p2-mobile-semi text-secondary-1 text-center whitespace-nowrap"]: selectedTimeIndex === i,
                            ["p2-mobile-semi text-main-1 text-center whitespace-nowrap"]: selectedTimeIndex !== i,
                          })}>{time}</p>
                        </button>
                      ))}
                    </div>

                    <ArrowRightIcon 
                      size={16}
                      onClick={() => scrollRight(scrollTimeContainer)}
                    />
                  </div> */}
                {/* </div>
              </div>

              <LargeDarkButton
                text="confirm"
                handleClick={handleConfirm}
              /> */}
            {/* </div> */}
          </section>
        </div>
      )}
    </>
  );
};

export default CheckoutScheduleDeliveryModal;