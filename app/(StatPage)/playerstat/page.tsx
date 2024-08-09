import PlayerDetailComponent from '@/components/PlayerStatComponents/PlayerDetailComponent';
import PlayerMatchComponent from '@/components/PlayerStatComponents/PlayerMatchComponent';
import PlayerSeasonDataComponent from '@/components/PlayerStatComponents/PlayerSeasonDataComponent';
import PlayerTransitionComponent from '@/components/PlayerStatComponents/PlayerTransitionComponent';
import { Input } from '@/components/ui/input';

export default function Home() {
  // TODO
  // 선수 상세 데이터
  // 최근 매치 기록
  // 시즌 스탯

  return (
    <div className="flex h-full w-full gap-4 mt-4">
      <div className="flex flex-col w-2/5 h-full gap-4">
        <PlayerDetailComponent></PlayerDetailComponent>
        <PlayerTransitionComponent></PlayerTransitionComponent>
      </div>
      <div className="flex flex-col w-3/5 h-full gap-4">
        <PlayerSeasonDataComponent></PlayerSeasonDataComponent>
        <PlayerMatchComponent></PlayerMatchComponent>
      </div>
    </div>
  );
}
