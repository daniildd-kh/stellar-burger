import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { OnlyAuthRoute, OnlyUnAuthRoute } from '../../hoc/protected-route';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { checkUserAuth, getIngredients } from '../../services/actions';
const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const background = location.state?.background;

  return (
    <div className={styles.app}>
      <Routes location={background || location}>
        <Route path='/' element={<AppHeader />}>
          <Route index element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderInfo />} />

          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route
            path='/login'
            element={<OnlyUnAuthRoute component={<Login />} />}
          />
          <Route
            path='/register'
            element={<OnlyUnAuthRoute component={<Register />} />}
          />
          <Route
            path='/forgot-password'
            element={<OnlyUnAuthRoute component={<ForgotPassword />} />}
          />
          <Route
            path='/reset-password'
            element={<OnlyUnAuthRoute component={<ResetPassword />} />}
          />
          <Route
            path='/profile'
            element={<OnlyAuthRoute component={<Profile />} />}
          />
          <Route
            path='/profile/orders/:number'
            element={<OnlyAuthRoute component={<OrderInfo />} />}
          />
          <Route
            path='/profile/orders'
            element={<OnlyAuthRoute component={<ProfileOrders />} />}
          />
          <Route path='*' element={<NotFound404 />} />
        </Route>
      </Routes>
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Описание ингредиента'}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={'Информация по заказу'}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title={'Информация по заказу'}
                onClose={() => {
                  navigate(-1);
                }}
              >
                <OnlyAuthRoute component={<OrderInfo />} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
