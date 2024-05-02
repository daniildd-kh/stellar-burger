import { ConstructorPage, Feed, ForgotPassword, Login, NotFound404, Profile, ProfileOrders, Register, ResetPassword } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route } from 'react-router-dom';
import { OnlyAuthRoute, OnlyUnAuthRoute } from '../../hoc/protected-route';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { checkUserAuth, getIngredients } from '../../services/reducers/actions';
import { getUser } from '@selectors';
const App = () => {

  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.ingredientsSlice.ingredients);
  const user = useSelector(getUser);
  
  useEffect(()=>{
    dispatch(getIngredients());

  },[dispatch])
  useEffect(() =>{
    dispatch(checkUserAuth());
  }, [dispatch])

  useEffect(() =>{
    console.log(user)
  },[user])

  
  return(
  <div className={styles.app}>
    <Routes>
      <Route path='/' element={<AppHeader />}>
        <Route index element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal title={''} onClose={() => { }}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title={''} onClose={() => { }}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='/login' element={<OnlyUnAuthRoute component={<Login />}/>} />
        <Route path='/register' element={<OnlyUnAuthRoute component={<Register />}/>} />
        <Route path='/forgot-password' element={<OnlyUnAuthRoute component={<ForgotPassword />}/>} />
        <Route path='/reset-password' element={<OnlyUnAuthRoute component={<ResetPassword />}/>} />
        <Route path='/profile' element={<OnlyAuthRoute component={<Profile />}/>} />
        <Route
          path='/profile/orders/:number'
          element={
            <Modal title={''} onClose={() => { }}>
              <OnlyAuthRoute component={<OrderInfo />}/>
            </Modal>
          }
        />
        <Route path='/profile/orders' element={<OnlyAuthRoute component={<ProfileOrders />}/>} />
        <Route path='*' element={<NotFound404 />} />
      </Route>
    </Routes>

  </div>
)};

export default App;
