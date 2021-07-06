import { FC } from 'react';
import Layout from '@/components/Layout/Layout';
import Image from '@/components/Image/Image';
import Button from '@/components/Button/Button';
import ThemeToggle from '@/containers/ThemeToggle/ThemeToggle';
import { fetchData } from '@/utils/hocs/fetchData';
import { ButtonData, ImageData } from '@/utils/types/global';

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
  const { title, button, image } = data;

  return (
    <Layout>
      <div tw="flex flex-nowrap items-center justify-center">
        <h3 tw="w-max mr-2">{title}</h3>
        <Image tw="w-10 h-10" src={image.$.src} alt={image.alt_text} />
        <Button>{button.value}</Button>
        <ThemeToggle />
      </div>
    </Layout>
  );
};

export default fetchData(MainPage, 'data/main/main.xml');
