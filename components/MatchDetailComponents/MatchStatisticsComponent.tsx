import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

const MatchStatisticsComponent = () => {
  return (
    <div className="flex flex-col w-full h-full bg-primary-50 text-2xl rounded-xl font-['ONE-Mobile-POP']">
      <div className="flex w-full h-fit p-4 justify-evenly">
        <Image
          src={'https://media.api-sports.io/football/teams/33.png'}
          alt={''}
          width={36}
          height={36}
        />
        <Separator orientation="vertical"></Separator>
        <Image
          src={'https://media.api-sports.io/football/teams/33.png'}
          alt={''}
          width={36}
          height={36}
        />
      </div>
      <Separator></Separator>
      <div className="flex flex-col w-full h-fit justify-center text-lg font-light p-4 gap-2">
        <div className="flex w-full justify-evenly">
          <span>80%</span>
          <span>점유율</span>
          <span>20%</span>
        </div>
        <div className="flex w-full justify-evenly">
          <span>80%</span>
          <span>점유율</span>
          <span>20%</span>
        </div>
        <div className="flex w-full justify-evenly">
          <span>80%</span>
          <span>점유율</span>
          <span>20%</span>
        </div>
        <div className="flex w-full justify-evenly">
          <span>80%</span>
          <span>점유율</span>
          <span>20%</span>
        </div>
        <div className="flex w-full justify-evenly">
          <span>80%</span>
          <span>점유율</span>
          <span>20%</span>
        </div>
      </div>
    </div>
  );
};

export default MatchStatisticsComponent;
