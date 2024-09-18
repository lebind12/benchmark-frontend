import PlayerDetailComponent from '@/components/PlayerStatComponents/PlayerDetailComponent';
import PlayerPickNavBarComponent from '@/components/PlayerStatComponents/PlayerPickNavBarComponent';

const PlayerStatPage = () => {
  return (
    <>
      <PlayerPickNavBarComponent selectedLeague={''} />
      <div className="flex w-full h-full items-center justify-center">
        선수 정보실입니다.
      </div>
    </>
  );
};

export default PlayerStatPage;
