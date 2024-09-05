import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

type TimeLineComponentProps = {
  HomeId: number;
  AwayId: number;
};

const TimeLineComponent = ({ HomeId, AwayId }: TimeLineComponentProps) => {
  return (
    <div className="flex flex-col w-full h-full bg-primary-50 text-2xl rounded-xl font-['ONE-Mobile-POP']">
      <div className="flex w-full h-fit p-4 justify-evenly">
        <Image
          src={'https://media.api-sports.io/football/teams/' + HomeId + '.png'}
          alt={''}
          width={36}
          height={36}
        />
        <Separator orientation="vertical"></Separator>
        <Image
          src={'https://media.api-sports.io/football/teams/' + AwayId + '.png'}
          alt={''}
          width={36}
          height={36}
        />
      </div>
      <Separator></Separator>
      <div className="flex flex-col w-full h-full justify-center text-lg font-light p-4">
        <span className="text-start">홈팀 골</span>
        <span className="text-end">어웨이팀 골</span>
        <span className="text-start">홈팀 경고</span>
        <span className="text-end">어웨이팀 경고</span>
        <span className="text-start">홈팀 퇴장</span>
        <span className="text-end">어웨이팀 퇴장</span>
      </div>
    </div>
  );
};

export default TimeLineComponent;
