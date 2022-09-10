import { Button } from 'antd';
import { useAppDispatch } from '@/store';
import { setToken } from '@/store/slice/app';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigate();

  const onClick = () => {
    dispatch(setToken('token: 11111'));
    // 跳转
    setTimeout(() => {
      nav('/', { replace: true });
    });
  };
  return (
    <>
      <h3>我是登录</h3>
      <Button onClick={onClick}>点我登录</Button>
    </>
  );
};

export default Login;
