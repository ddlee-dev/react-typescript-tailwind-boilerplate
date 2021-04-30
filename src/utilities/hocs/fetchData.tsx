import { ComponentType, useState, useEffect } from 'react';
import { useMachine } from '@xstate/react';
import { themeMachine } from 'state/machines/themeToggle';
import { publicPath, loadData } from 'utilities/data';
import { Button } from 'components/Button/Button';

// eslint-disable-next-line
type WrappComponentType = ComponentType<any>;

export const fetchData = (WrappedComponent: WrappComponentType, filePath = '') => {
  return (props: Record<string, unknown>): JSX.Element => {
    const [current, send] = useMachine(themeMachine);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<boolean | Record<string, unknown>>(false);
    const dataFilePath = publicPath(filePath);

    useEffect(() => {
      const fetchFileData = async () => {
        try {
          const data = await loadData(dataFilePath);
          if (data) {
            setLoading(false);
            setData(data);
          }
        } catch (err) {
          setLoading(false);
          setData(false);
          console.error(`There was an issue with fetching the data from ${dataFilePath}`);
        }
      };
      fetchFileData();
    }, [dataFilePath]);

    return (
      <>
        <WrappedComponent {...props} loading={loading} data={data} />
        <Button onClick={() => send('TOGGLE_THEME')}>{current.value}</Button>
      </>
    );
  };
};
