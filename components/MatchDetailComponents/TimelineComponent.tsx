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

type korLineupType = {
  [key: string]: string;
};

type TimeLineComponentProps = {
  HomeId: number | undefined;
  AwayId: number | undefined;
  homeName: string | undefined;
  awayName: string | undefined;
  eventData: Array<eventType> | undefined;
  korLineUp: {
    homeLineUp: korLineupType | undefined;
    awayLineUp: korLineupType | undefined;
  };
};

const TimeLineComponent = ({
  HomeId,
  AwayId,
  homeName,
  awayName,
  eventData,
  korLineUp,
}: TimeLineComponentProps) => {
  const generateName = (
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
    let playerInfo = '';
    switch (event.type) {
      case 'Var':
        teamName = generateName(event, homeName, awayName) ?? '';
        eventTitle = 'VAR';
        break;
      case 'subst':
        teamName = generateName(event, homeName, awayName) ?? '';
        eventTitle = '교체';
        if (event.team.id == HomeId) {
          playerInfo = `${korLineUp.homeLineUp?.[event.player.id]} -> ${
            event.assist?.id
              ? korLineUp.homeLineUp?.[event.assist.id] ?? event.assist?.name
              : event.assist?.name
          }`;
        } else {
          playerInfo = `${korLineUp.awayLineUp?.[event.player.id]} -> ${
            event.assist?.id
              ? korLineUp.awayLineUp?.[event.assist.id] ?? event.assist?.name
              : event.assist?.name
          }`;
        }
        break;
      case 'Card':
        teamName = generateName(event, homeName, awayName) ?? '';
        if (event.detail == 'Yellow Card') eventTitle = '경고';
        else eventTitle = '퇴장';
        break;
      case 'Goal':
        teamName = generateName(event, homeName, awayName) ?? '';
        eventTitle = '골!';
        break;
      default:
        break;
    }
    if (event.team.id == HomeId)
      return (
        <div className="flex flex-col">
          <span key={key} className="w-full text-start text-xl">
            {event.time.elapsed}분 {teamName} {eventTitle}
          </span>
          <span className="w-full text-start">
            {event.type === 'subst'
              ? playerInfo
              : korLineUp.homeLineUp?.[event.player.id]}
          </span>
        </div>
      );
    else
      return (
        <div className="flex flex-col">
          <span key={key} className="w-full text-end text-xl">
            {event.time.elapsed}분 {teamName} {eventTitle}
          </span>
          <span className="w-full text-end">
            {event.type === 'subst'
              ? playerInfo
              : korLineUp.awayLineUp?.[event.player.id]}
          </span>
        </div>
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
          className="w-fit h-full"
        />
        <Separator orientation="vertical"></Separator>
        <Image
          src={'https://media.api-sports.io/football/teams/' + AwayId + '.png'}
          alt={''}
          width={36}
          height={36}
          className="w-fit h-full"
        />
      </div>
      <Separator></Separator>
      <div className="flex flex-col w-full h-full justify-center text-sm font-['MangoDdobak-B'] font-light p-4">
        {eventData?.map((item, key) => makeTimelineData(item, key))}
      </div>
    </div>
  );
};

export default TimeLineComponent;
