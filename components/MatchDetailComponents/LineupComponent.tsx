import { Separator } from '../ui/separator';

type playerType = {
  player: {
    id: number;
    name: string;
    number: number;
    pos: string;
    grid: string;
  };
};

type korLineupType = {
  [key: string]: string;
};

type LineupComponentProps = {
  HomeId: number | undefined;
  AwayId: number | undefined;
  homeLineUp: playerType[] | undefined;
  awayLineUp: playerType[] | undefined;
  homeName: string | undefined;
  awayName: string | undefined;
  korLineUp: {
    homeLineUp: korLineupType | undefined;
    awayLineUp: korLineupType | undefined;
  };
  status: string | undefined;
};

const LineupComponent = ({
  HomeId,
  AwayId,
  homeLineUp,
  awayLineUp,
  korLineUp,
  homeName,
  awayName,
  status,
}: LineupComponentProps) => {
  return (
    <>
      {status === 'Match Finished' ? (
        <div className="flex flex-col w-full h-full bg-primary-50 text-2xl rounded-xl font-['ONE-Mobile-POP'] p-4 gap-2">
          <div className="flex w-full justify-evenly">
            <div>
              <span>{homeName}</span>
            </div>
            <Separator orientation="vertical" />
            <div>
              <span>{awayName}</span>
            </div>
          </div>
          <Separator />
          <div className="flex w-full h-full justify-evenly text-xl">
            <div className="flex flex-col w-full justify-center items-center p-4">
              {homeLineUp?.map((player) => (
                <span
                  className="grid grid-cols-2 w-full h-full"
                  key={player.player.id}
                >
                  <span className="flex w-1/3 justify-center">
                    {player.player.number}
                  </span>
                  <span className="flex w-full justify-center">
                    {!!!korLineUp.homeLineUp?.[player.player.id]
                      ? player.player.name
                      : korLineUp.homeLineUp?.[player.player.id]}
                  </span>
                </span>
              ))}
            </div>
            <div className="flex flex-col w-full justify-center items-center p-4">
              {awayLineUp?.map((player) => (
                <span
                  className="grid grid-cols-2 w-full h-full"
                  key={player.player.id}
                >
                  <span className="flex w-1/3 justify-center">
                    {player.player.number}
                  </span>
                  <span className="flex w-full justify-center">
                    {!!!korLineUp.awayLineUp?.[player.player.id]
                      ? player.player.name
                      : korLineUp.awayLineUp?.[player.player.id]}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full h-full bg-primary-50 text-2xl rounded-xl font-['ONE-Mobile-POP'] p-4 gap-2">
          <div className="flex w-full justify-evenly">
            <div className="flex w-full justify-center">
              <span>{homeName}</span>
            </div>
            <Separator orientation="vertical" />
            <div className="flex w-full justify-center">
              <span>{awayName}</span>
            </div>
          </div>
          <Separator />
          <div className="flex w-full h-full justify-evenly">
            <div className="flex flex-col w-full justify-center items-center">
              <span>대기중</span>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
              <span>대기중</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LineupComponent;
