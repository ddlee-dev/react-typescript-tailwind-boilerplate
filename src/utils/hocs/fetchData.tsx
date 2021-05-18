import { ComponentType, useState, useEffect } from 'react';
import { publicPath, loadData } from '@/utils/data';

// eslint-disable-next-line
type WrappComponentType = ComponentType<any>;

export const fetchData = (WrappedComponent: WrappComponentType, filePath = '') => {
  return (props: Record<string, unknown>): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<boolean | Record<string, unknown>>(false);
    const dataFilePath = publicPath(filePath);

    useEffect(() => {
      const fetchFileData = async () => {
        try {
          const fetchedData = await loadData(dataFilePath);
          if (fetchedData) {
            setLoading(false);
            setData(fetchedData);
          }
        } catch (err) {
          setLoading(false);
          setData(false);
          console.error(`There was an issue with fetching the data from ${dataFilePath}`);
        }
      };
      fetchFileData();
    }, [dataFilePath]);

    // if (loading) return <></>;
    // if (!loading && !data) return <></>;
    return <WrappedComponent {...props} loading={loading} data={data} />;
  };
};
