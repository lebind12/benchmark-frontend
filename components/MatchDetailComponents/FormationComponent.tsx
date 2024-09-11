import Field from '@/public/footballfield.jpeg';
import Image from 'next/image';

type FormationComponentProps = {
  HomeId: number | undefined;
  AwayId: number | undefined;
};

const FormationComponent = ({}: FormationComponentProps) => {
  return (
    <div className="flex flex-col w-full h-full rounded-lg bg-primary-50 gap-2 p-4">
      <div className="w-full text-xl font-['ONE-Mobile-POP']">
        <span>포메이션</span>
      </div>
      <Image
        src={Field}
        width={0}
        height={0}
        className="w-full rounded-lg"
        alt={''}
      ></Image>
    </div>
  );
};

export default FormationComponent;
