import advertise from '@/public/8.png';
import Image from 'next/image';

const LeftSideNavigation = () => {
  return (
    <aside className="flex h-full min-w-[320px] items-center justify-center">
      <div className="fixed">
        <a href="https://www.youtube.com/@%EC%9D%B4%EA%B8%80%EC%BD%A5?sub_confirmation=1">
          <Image src={advertise} alt="광고창"></Image>
        </a>
      </div>
    </aside>
  );
};

export default LeftSideNavigation;
