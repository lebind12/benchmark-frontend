import Image from 'next/image';
import '@/styles/fonts.css';

type ScoreBoardComponentProps = {
  HomeId: number;
  AwayId: number;
  venue: string;
  fixtureId: number;
};

const ScoreBoardComponent = ({
  HomeId,
  AwayId,
  venue,
  fixtureId,
}: ScoreBoardComponentProps) => {
  return (
    <div className="flex flex-col w-full h-full bg-primary-50 text-2xl rounded-xl font-['ONE-Mobile-POP']">
      <div className="flex w-full h-full p-4">
        <Image
          src={'https://media.api-sports.io/football/teams/' + HomeId + '.png'}
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
          src={'https://media.api-sports.io/football/teams/' + AwayId + '.png'}
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
        <span className="text-xl">{venue}</span>
      </div>
    </div>
  );
};

export default ScoreBoardComponent;
