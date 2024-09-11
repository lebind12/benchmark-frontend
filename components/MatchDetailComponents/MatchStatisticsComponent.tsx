import Image from 'next/image';
import { Separator } from '@/components/ui/separator';

type statisticsType = Array<{
  team: {
    id: number;
    name: string;
    logo: string;
  };
  statistics: Array<{
    type: string;
    value: number;
  }>;
}>;

type MatchStatisticsComponentProps = {
  HomeId: number | undefined;
  AwayId: number | undefined;
  statistics: statisticsType | undefined;
};

const MatchStatisticsComponent = ({
  HomeId,
  AwayId,
  statistics,
}: MatchStatisticsComponentProps) => {
  const translateTypeName = (typeName: string | undefined) => {
    switch (typeName) {
      case 'Shots on Goal':
        return '유효 슈팅';
      case 'Total Shots':
        return '전체 슈팅';
      case 'Fouls':
        return '파울';
      case 'Corner Kicks':
        return '코너킥';
      case 'Offsides':
        return '오프사이드';
      case 'Ball Possession':
        return '점유율';
      case 'Yellow Cards':
        return '경고';
      case 'Red Cards':
        return '퇴장';
      case 'expected_goals':
        return '기대 득점';
      default:
        return null;
    }
  };

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
      <div className="flex flex-col w-full h-fit justify-center text-lg font-light p-4 gap-2">
        {[...new Array(10)]
          .map((_, i) => i)
          .map((index, key) => {
            if (statistics !== undefined) {
              let statisticsName = translateTypeName(
                statistics[0].statistics[index].type,
              );
              if (statisticsName == null) return <></>;
              return (
                <div className="grid grid-cols-3 w-full justify-evenly">
                  <span className="text-center">
                    {statistics[0].statistics[index].value}
                  </span>
                  <span className="text-center">{statisticsName}</span>
                  <span className="text-center">
                    {statistics[1].statistics[index].value}
                  </span>
                </div>
              );
            }
            return <></>;
          })}
      </div>
    </div>
  );
};

export default MatchStatisticsComponent;
