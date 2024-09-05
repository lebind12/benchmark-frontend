import Image from 'next/image';
import LoadingImage from '@/public/assets/eaglekop.png';

const loadingpage = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <Image src={LoadingImage} alt={''} width={120} height={120}></Image>
    </div>
  );
};

export default loadingpage;
