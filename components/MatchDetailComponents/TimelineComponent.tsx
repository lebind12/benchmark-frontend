import Image from 'next/image';

const TimeLineComponent = () => {
  return (
    <div className="flex flex-col w-full h-full bg-primary-50 text-2xl rounded-xl font-['ONE-Mobile-POP']">
      <div className="flex w-full h-full p-4">
        <Image
          src={'https://media.api-sports.io/football/teams/33.png'}
          alt={''}
          width={120}
          height={120}
        />
        <div className="grid grid-cols-3 w-full h-full justify-center text-center items-center">
          <span className="text-5xl">0</span>
          <span className="text-5xl">:</span>
          <span className="text-5xl">0</span>
        </div>
        <Image
          src={'https://media.api-sports.io/football/teams/33.png'}
          alt={''}
          width={120}
          height={120}
        />
      </div>
      <div className="flex flex-col w-full h-fit justify-center text-center">
        <div className="w-full">
          <span className="text-xl">90</span>
          <span className="text-xl"> 분</span>
        </div>
        <span className="text-xl">에미레이트 스타디움</span>
      </div>
    </div>
  );
};

export default TimeLineComponent;
