import { Separator } from '@radix-ui/react-separator';
import Image from 'next/image';

const PlayerDetailComponent = () => {
  return (
    <div className="flex flex-col w-full h-fit gap-4">
      <div className="flex w-full h-fit bg-primary-50 rounded-xl p-4 gap-4 ">
        <div className="w-2/5">
          <Image
            src={'https://media.api-sports.io/football/players/1485.png'}
            alt={''}
            width={150}
            height={150}
            className="rounded-full"
          ></Image>
        </div>
        <div className="flex grow-0 flex-col w-full">
          <span className="text-2xl">브루노 페르난데스</span>
          <span>맨체스터 유나이티드</span>
          <span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            sunt architecto in quae sed nulla? Facere animi, nisi obcaecati
            aliquam
          </span>
        </div>
      </div>
      <div className="flex w-full h-fit bg-primary-50 rounded-xl p-4 gap-4 text-xl">
        <div className="flex w-full">
          <div className="grid grid-cols-1 w-1/2">
            <div className="flex w-full">
              <span className="w-full">키</span>
              <span className="w-full">180</span>
            </div>
            <div className="flex w-full">
              <span className="w-full">나이</span>
              <span className="w-full">27</span>
            </div>
            <div className="flex w-full">
              <span className="w-full">국가</span>
              <span className="w-full">네덜란드</span>
            </div>
          </div>
          <Separator orientation="vertical"></Separator>
          <div className="grid grid-cols-1 w-1/2">
            <div className="flex w-full">
              <span className="w-full">셔츠 넘버</span>
              <span className="w-full">7</span>
            </div>
            <div className="flex w-full">
              <span className="w-full">주로 쓰는 발</span>
              <span className="w-full">오른발</span>
            </div>
            <div className="flex w-full">
              <span className="w-full">이적료</span>
              <span className="w-full">€5500만</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetailComponent;
