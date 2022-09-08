import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';

import AppRouter from '@/router';
import store from '@/store';

import { useAntdLocales } from './config/antd';

// style
import '@/App.less';

const App = () => {
  const localeAntd = useAntdLocales();

  return (
    <Provider store={store}>
      <ConfigProvider locale={localeAntd}>
        <AppRouter />
      </ConfigProvider>
    </Provider>
  );
};

export default App;
