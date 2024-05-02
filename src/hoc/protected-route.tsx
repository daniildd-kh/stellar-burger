import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from '../services/store';
import { Preloader } from '@ui';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean, 
  component : React.ReactElement;
}

const ProtectedRoute = ({onlyUnAuth = false, component}:TProtectedRouteProps):React.ReactElement => {
  const location = useLocation();
  const user = useSelector(state => state.authSlice.user)
  const isAuthChecked = useSelector(state => state.authSlice.isAuthChecked)

  if (!isAuthChecked) {
    return <Preloader/>
  }
  if (!onlyUnAuth && !user){
    return <Navigate to='/login' state={{from: location}}/>
  }
  if(onlyUnAuth && user){
    const {from} = location.state  || {from: {pathname: '/'}}
    return <Navigate to={from}/>
  }

  return component
};

export const OnlyAuthRoute = ProtectedRoute;

export const OnlyUnAuthRoute = ({component}: {component: React.ReactElement}) =>(
  <ProtectedRoute onlyUnAuth={true} component={component}/>
);
