import PlayerPickNavBarComponent from '@/components/TeamStatComponents/PlayerPickNavBarComponent';

const TeamStatPage = () => {
  return (
    <>
      <PlayerPickNavBarComponent selectedLeague={''} />
      <div className="flex w-full h-full items-center justify-center">
        팀 정보실입니다.
      </div>
    </>
  );
};

export default TeamStatPage;
