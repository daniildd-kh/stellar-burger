import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { Outlet } from 'react-router-dom';

export const AppHeader: FC = () => {
  return (
    <>
      <AppHeaderUI userName='' />
      <Outlet />
    </>
  );
};
