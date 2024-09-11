import advertise from '@/public/assets/cafeImage.png';
import Image from 'next/image';

const RightSideNavigation = () => {
  return (
    <aside className="flex h-full min-w-[320px] items-center justify-center">
      <div className="fixed">
        <a href="https://cafe.naver.com/eaglekoplockerroom">
          <Image src={advertise} alt="광고창"></Image>
        </a>
      </div>
    </aside>
  );
};

export default RightSideNavigation;
