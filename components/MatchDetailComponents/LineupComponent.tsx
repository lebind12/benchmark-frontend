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
  korLineUp: {
    homeLineUp: korLineupType | undefined;
    awayLineUp: korLineupType | undefined;
  };
};

const LineupComponent = ({
  HomeId,
  AwayId,
  homeLineUp,
  awayLineUp,
  korLineUp,
}: LineupComponentProps) => {
  return (
    <div className="flex flex-col w-full h-full bg-primary-50 text-2xl rounded-xl font-['ONE-Mobile-POP'] p-4 gap-2">
      <div className="flex w-full justify-evenly">
        <div>
          <span>맨유</span>
        </div>
        <Separator orientation="vertical" />
        <div>
          <span>맨시티</span>
        </div>
      </div>
      <Separator />
      <div className="flex w-full h-full justify-evenly">
        <div className="flex flex-col w-full justify-center items-center">
          {homeLineUp?.map((player) => (
            <span className="grid grid-cols-2 w-full" key={player.player.id}>
              <span className="flex justify-center">
                {player.player.number}
              </span>
              <span className="flex justify-center">
                {!!!korLineUp.homeLineUp?.[player.player.id]
                  ? player.player.name
                  : korLineUp.homeLineUp?.[player.player.id]}
              </span>
            </span>
          ))}
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          {awayLineUp?.map((player) => (
            <span className="grid grid-cols-2 w-full" key={player.player.id}>
              <span className="flex justify-center">
                {player.player.number}
              </span>
              <span className="flex justify-center">
                {!!!korLineUp.awayLineUp?.[player.player.id]
                  ? player.player.name
                  : korLineUp.awayLineUp?.[player.player.id]}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LineupComponent;
