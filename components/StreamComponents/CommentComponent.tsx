import useInterval from '@/hooks/intervalHook';
import KopImage from '@/public/assets/eaglekop.png';
import Image, { StaticImageData } from 'next/image';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { makeComment } from '@/functions/CommentFunctions';
import { footballAPI } from '@/apis/footballAPI';

type lineupData = {
  [key: number]: lineupPlayerData[];
};
type korLineupType = {
  [key: number]: string;
};

type lineupPlayerData = {
  id: number;
  name: string;
  jerseyNumber: number;
  goalCount: number;
  isWarned: boolean;
  isBanned: boolean;
  substitution: boolean;
  position: string;
};

type CommentComponentProps = {
  fixtureHomeLineup: lineupData;
  fixtureAwayLineup: lineupData;
  korHomeLineup: korLineupType;
  korAwayLineup: korLineupType;
  homeTotalLineup: any;
  awayTotalLineup: any;
  setFixtureHomeLineup: any;
  setFixtureAwayLineup: any;
  homeId: number;
  awayId: number;
  fixtureId: string;
  setChangeCount: Dispatch<SetStateAction<number>>;
  changeCount: number;
  pageReady: boolean;
};

type EventResponseType = {
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
    name: string | null;
  };
  type: string;
  detail: string;
  comments: string | null;
};

const CommentComponent = ({
  fixtureHomeLineup,
  fixtureAwayLineup,
  korHomeLineup,
  korAwayLineup,
  homeId,
  awayId,
  homeTotalLineup,
  awayTotalLineup,
  setFixtureHomeLineup,
  setFixtureAwayLineup,
  fixtureId,
  setChangeCount,
  changeCount,
  pageReady,
}: CommentComponentProps) => {
  const [eventQueue, setEventQueue] = useState<Array<EventResponseType>>([]);
  const index = useRef(0);
  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [flagUrl, setFlagUrl] = useState<string | StaticImageData>('');
  const [commentUpdate, setCommentUpdate] = useState(false);

  const headers = {
    'x-rapidapi-key': 'ae8a0daf8b42d12818ccbdec67ca30f5',
    'x-rapidapi-host': 'v3.football.api-sports.io',
  };
  useEffect(() => {
    if (pageReady && !commentUpdate) {
      footballAPI
        .get('/fixtures/events', { params: { fixture: fixtureId } })
        .then((res) => {
          const response: Array<EventResponseType> = res.data.response;
          if (response.length > 0) {
            // 일단 뒤로 미룰것.
            // for (let i = 0; i < response.length - 1; i++) {
            //   // Do Something
            //   setTimeout(() => {
            //     makeComment(
            //       homeId,
            //       awayId,
            //       fixtureHomeLineup,
            //       fixtureAwayLineup,
            //       homeTotalLineup,
            //       awayTotalLineup,
            //       { ...korHomeLineup, ...korAwayLineup },
            //       setFixtureHomeLineup,
            //       setFixtureAwayLineup,
            //       response[i],
            //     );
            //   }, i * 500);
            // }
            // setEventQueue([response[response.length - 1]]);
            // 테스트 코드
            setEventQueue(response);
            index.current = response.length;
          }
          setCommentUpdate(true);
        })
        .catch((err) => console.log(err));
    }
  }, [pageReady]);

  useInterval(() => {
    footballAPI
      .get('/fixtures/events', { params: { fixture: fixtureId } })
      .then((res) => {
        const response: Array<EventResponseType> = res.data.response;
        if (response.length > index.current) {
          setEventQueue([...eventQueue, ...response.slice(index.current)]);
          index.current = response.length;
        }
      })
      .catch((err) => console.log(err));
  }, 10000);

  useInterval(() => {
    // EventQueue Pop
    if (eventQueue.length > 0) {
      // 데이터 수정
      // Do Something
      let commentData: {
        commentTitle: string;
        commentDetail: string;
        commentFlag: string;
      } = makeComment(
        homeId,
        awayId,
        fixtureHomeLineup,
        fixtureAwayLineup,
        homeTotalLineup,
        awayTotalLineup,
        { ...korHomeLineup, ...korAwayLineup },
        setFixtureHomeLineup,
        setFixtureAwayLineup,
        eventQueue[0],
      );
      setTitle(commentData.commentTitle);
      setDetail(commentData.commentDetail);
      switch (commentData.commentFlag) {
        case 'Home':
          setFlagUrl(
            'https://media.api-sports.io/football/teams/' + homeId + '.png',
          );
          break;
        case 'Away':
          setFlagUrl(
            'https://media.api-sports.io/football/teams/' + awayId + '.png',
          );
          break;
        default:
          setFlagUrl(KopImage);
      }
      setChangeCount(changeCount + 1);

      // Pop Message from queue
      setEventQueue(eventQueue.slice(1));
      // 애니메이션 추가
      const CommentComponent = document.getElementById('CommentComponent');
      CommentComponent?.classList.remove('animate__slideOutDown');
      CommentComponent?.classList.add('animate__slideInUp');
      // 애니메이션 삭제
      setTimeout(() => {
        CommentComponent?.classList.remove('animate__slideInUp');
        CommentComponent?.classList.add('animate__slideOutDown');
      }, 3000);
    }
  }, 5000);

  return (
    <div
      id="CommentComponent"
      className="flex flex-col w-2/4 h-full justify-center items-center font-['ONE-Mobile-Title'] animate__animated z-50 animate__slideOutDown overflow-hidden"
    >
      <div className="h-3/4 w-full"></div>
      <div className="h-1/4 w-4/5">
        <div className="relative h-5/6 w-full items-center justify-center">
          <div className="absolute z-10 w-1/5 h-full border-solid border-[#38003C] border-8 rounded-full bg-[#00ff85]">
            <Image
              src={flagUrl}
              alt={''}
              width={120}
              height={120}
              className="relative mx-auto z-10 w-fit h-full rounded-full bg-[#00ff85]"
            ></Image>
          </div>

          <div className="absolute flex flex-col w-11/12 h-full text-3xl border-[#38003C] border-8 rounded-3xl left-16">
            <div className="grid h-1/2 w-full items-center text-center text-white border-[#38003C] border-b-8 pl-24 bg-[#38003C]">
              {title}
            </div>
            <div className="grid h-1/2 w-full items-center text-pretty text-center pl-24 bg-white rounded-br-xl text-2xl font-['MangoDdobak-B']">
              {detail}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;
