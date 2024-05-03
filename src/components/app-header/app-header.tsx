import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUserName } from '@selectors';

export const AppHeader: FC = () => {
  const userName = useSelector(getUserName);

  return (
    <>
      <AppHeaderUI userName={userName} />
      <Outlet />
    </>
  );
};
