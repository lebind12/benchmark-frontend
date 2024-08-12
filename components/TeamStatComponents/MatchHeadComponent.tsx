import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';

const MatchHeadComponent = () => {
  return (
    <div className="flex w-full h-fit bg-primary-50 rounded-xl p-4">
      <div className="w-2/5">
        <Image
          src={'https://media.api-sports.io/football/teams/33.png'}
          alt={''}
          width={150}
          height={150}
          className="rounded-full"
        ></Image>
      </div>
      <div className="flex grow-0 flex-col w-full">
        <span className="text-2xl">맨체스터 유나이티드</span>
        <span>프리미어리그</span>
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam sunt
          architecto in quae sed nulla? Facere animi, nisi obcaecati aliquam
        </span>
      </div>
    </div>
  );
};

export default MatchHeadComponent;
