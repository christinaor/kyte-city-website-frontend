"use client"

import { useState } from 'react';
import { ANNOUNCEMENTS } from '@lib/constants';

const AnnouncementsBanner: React.FC = () => {
  // TODO: Load all and use aesthetic effects to rotate through along with setTimeout
  const [currentBanner, setCurrentBanner] = useState(0);

  setTimeout(() => {
    if (currentBanner === ANNOUNCEMENTS.length - 1) {
      setCurrentBanner(0);
    } else {
      setCurrentBanner(currentBanner + 1);
    }
  }, 5000)

  return (
    <div className="row-start-1 row-span-1 flex justify-center place-items-center align-bottom w-screen h-[24px] py-1.5 bg-main-2">
      <p className="p2-mobile-semi uppercase text-main-1">
      {ANNOUNCEMENTS[currentBanner]}
    </p>
    </div>
    
  )
}

export default AnnouncementsBanner;