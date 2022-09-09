import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
  const Icon = <LoadingOutlined style={{ fontSize: 36 }} />;
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Spin indicator={Icon} />
    </div>
  );
};

export default Loading;
