import { Separator } from '../ui/separator';

type LineupComponentProps = {
  HomeId: number;
  AwayId: number;
};

const LineupComponent = ({}: LineupComponentProps) => {
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
          <span>맨유 선수</span>
          <span>맨유 선수</span>
          <span>맨유 선수</span>
          <span>맨유 선수</span>
          <span>맨유 선수</span>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <span>맨시티 선수</span>
          <span>맨시티 선수</span>
          <span>맨시티 선수</span>
          <span>맨시티 선수</span>
          <span>맨시티 선수</span>
          <span>맨시티 선수</span>
        </div>
      </div>
    </div>
  );
};

export default LineupComponent;
