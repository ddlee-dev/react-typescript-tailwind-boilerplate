import { FC } from 'react';
import { Image } from 'components/Image/Image';
import { Toggle } from 'components/Toggle/Toggle';
import { fetchData } from 'utilities/hocs/fetchData';
import { ButtonData, ImageData } from 'utilities/types/global';

type MainPageProps = {
  loading: boolean;
  data: {
    title: string;
    button: ButtonData;
    image: ImageData;
  };
};

const MainPage: FC<MainPageProps> = ({ loading, data }) => {
  if (loading || !data) return null;
  const { title, image } = data;

  return (
    <>
      <div className="flex flex-nowrap items-center justify-center">
        <h3 className="w-max mr-2">{title}</h3>
        <Image className="w-10 h-10" src={image.$.src} alt={image.alt_text} />
        <Toggle label="Toggle 1" />
        <Toggle label="Toggle 2" />
      </div>
    </>
  );
};

export default fetchData(MainPage, 'data/main.json');
