'use client';
import { Separator } from '@/components/ui/separator';
import Field from '@/public/assets/FieldBoard.png';
import KopImage from '@/public/assets/eaglekop.png';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col h-full w-full">
      {/* 상단 */}
      <div className="flex h-1/4 w-full">
        <div className="flex h-full w-full">
          {/* 팝업 컴포넌트 */}
          <div className="flex w-1/4 h-full items-center p-4">
            <div className="flex w-full h-full bg-white border-8 rounded-3xl border-black"></div>
          </div>
          {/* 스코어보드 컴포넌트 */}
          <div className="flex w-2/4 h-full justify-center">
            <div className="flex flex-col h-2/3 w-4/5">
              <div className="flex h-1/2 w-full bg-yellow-400 text-3xl text-center border-8 rounded-2xl">
                <div className="flex h-full w-full">
                  <div className="grid h-full w-1/3 bg-slate-200 text-3xl text-center items-center">
                    국기
                  </div>
                  <div className="grid items-center h-full w-full">
                    스코틀랜드
                  </div>
                  <div className="grid h-full w-1/4 bg-slate-200 text-3xl text-center items-center">
                    0
                  </div>
                </div>
                <Separator
                  orientation="vertical"
                  decorative
                  className="w-1 h-full p-1"
                ></Separator>
                <div className="flex h-full w-full">
                  <div className="grid h-full w-1/4 bg-slate-200 text-3xl text-center items-center">
                    0
                  </div>
                  <div className="grid items-center  h-full w-full">
                    스코틀랜드
                  </div>
                  <div className="grid h-full w-1/4 bg-slate-200 text-3xl text-center items-center">
                    국기
                  </div>
                </div>
              </div>
              <div className="flex h-1/2 w-full justify-center">
                <div className="grid items-center h-2/3 w-1/6 bg-amber-300 text-center text-3xl border-r-8 border-l-8 border-b-8 rounded-b-xl">
                  00:00
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-1/4 h-full"></div>
        </div>
      </div>
      {/* 하단 */}
      <div className="flex h-full w-full">
        {/* 포메이션 컴포넌트 */}
        <div className="flex w-1/4 h-full items-center justify-center p-4">
          <Image src={Field} alt={''} className="flex w-full h-fit "></Image>
        </div>
        {/* 코멘트 컴포넌트 */}
        <div className="flex flex-col w-2/4 h-full justify-center items-center">
          <div className="h-3/4 w-full"></div>
          <div className="h-1/4 w-4/5">
            <div className="relative h-5/6 w-full items-center justify-center">
              <Image
                src={KopImage}
                alt={''}
                className="absolute z-10 w-1/5 h-full border-solid border-8 rounded-full bg-white"
              ></Image>
              <div className="absolute flex flex-col w-11/12 h-full text-3xl border-8 rounded-3xl left-20">
                <div className="grid h-1/2 w-full items-center text-center border-b-8 pl-24 bg-blue-500">
                  코멘트 제목
                </div>
                <div className="grid h-1/2 w-full items-center text-center pl-24 bg-green-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 경기정보 컴포넌트 */}
        <div className="flex flex-col w-1/4 h-full justify-end">
          <div className="flex w-full h-3/5 p-8 items-center">
            <div className="flex flex-col w-full h-full bg-white rounded-3xl border-8 border-black">
              <div className="flex w-full h-fit border-b-8">
                <div className="flex w-full h-[10rem] border-r-8"></div>
                <div className="flex w-full h-[10rem]"></div>
              </div>
              <div className="flex w-full h-fit text-3xl text-center border-b-8">
                <div className="grid w-full h-fit border-r-8">홈팀</div>
                <div className="grid w-full h-fit">어웨이팀</div>
              </div>
              <div className="flex flex-col w-full h-full text-3xl text-center">
                <div className="flex w-full h-full">
                  <div className="grid w-full h-full">80%</div>
                  <div className="grid w-full h-full">점유율</div>
                  <div className="grid w-full h-full">20%</div>
                </div>
                <div className="flex w-full h-full">
                  <div className="grid w-full h-full">80%</div>
                  <div className="grid w-full h-full">점유율</div>
                  <div className="grid w-full h-full">20%</div>
                </div>
                <div className="flex w-full h-full">
                  <div className="grid w-full h-full">80%</div>
                  <div className="grid w-full h-full">점유율</div>
                  <div className="grid w-full h-full">20%</div>
                </div>
                <div className="flex w-full h-full">
                  <div className="grid w-full h-full">80%</div>
                  <div className="grid w-full h-full">점유율</div>
                  <div className="grid w-full h-full">20%</div>
                </div>
                <div className="flex w-full h-full">
                  <div className="grid w-full h-full">80%</div>
                  <div className="grid w-full h-full">점유율</div>
                  <div className="grid w-full h-full">20%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
