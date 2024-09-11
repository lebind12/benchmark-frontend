import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { makeComment } from '@/functions/CommentFunctions';

type eventType = {
  time: {
    elapsed: number;
    extra: number | null;
  };
  team: {
    id: number;
    name: string;
    logo: string;
  };
  player: {
    id: number;
    name: string;
  };
  assist: {
    id: number | null;
    name: number | null;
  };
  type: string;
  detail: string;
  comments: string;
};

type TimeLineComponentProps = {
  HomeId: number | undefined;
  AwayId: number | undefined;
  homeName: string | undefined;
  awayName: string | undefined;
  eventData: Array<eventType> | undefined;
};

const TimeLineComponent = ({
  HomeId,
  AwayId,
  homeName,
  awayName,
  eventData,
}: TimeLineComponentProps) => {
  const generateNAme = (
    event: eventType,
    homeName: string | undefined,
    awayName: string | undefined,
  ) => {
    if (event.team.id == HomeId) return homeName;
    else return awayName;
  };

  const makeTimelineData = (event: eventType, key: number) => {
    let teamName = '';
    let eventTitle = '';
    switch (event.type) {
      case 'Var':
        teamName = generateNAme(event, homeName, awayName) ?? '';
        eventTitle = 'VAR';
        break;
      case 'subst':
        teamName = generateNAme(event, homeName, awayName) ?? '';
        eventTitle = '교체';
        break;
      case 'Card':
        teamName = generateNAme(event, homeName, awayName) ?? '';
        if (event.detail == 'Yellow Card') eventTitle = '경고';
        else eventTitle = '퇴장';
        break;
      case 'Goal':
        teamName = generateNAme(event, homeName, awayName) ?? '';
        eventTitle = '골!';
        break;
      default:
        break;
    }
    if (event.team.id == HomeId)
      return (
        <span key={key} className="w-full text-start">
          {event.time.elapsed}분 {teamName} {eventTitle}
        </span>
      );
    else
      return (
        <span key={key} className="w-full text-end">
          {event.time.elapsed}분 {teamName} {eventTitle}
        </span>
      );
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
      <div className="flex flex-col w-full h-full justify-center text-sm font-light p-4">
        {eventData?.map((item, key) => makeTimelineData(item, key))}
      </div>
    </div>
  );
};

export default TimeLineComponent;
