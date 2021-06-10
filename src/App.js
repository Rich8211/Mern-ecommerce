import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { ModalContext } from './context/ModalContext';
import { getInfo } from './actions/userActions';
import LoginModal from './components/LoginModal/LoginModal';
import SignUpModal from './components/SignUpModal/SignUpModal';
import './App.css';

function App() {
  
  const [modal, setModal] = useState('');

  const dispatch = useDispatch();

  const user = useSelector(state => state.user);
  const { loading, userInfo, error } = user;
  
  useEffect(() => {
    console.log(modal)
  },[modal])

  useEffect(() => {
    dispatch(getInfo())
  }, [dispatch])

  return (
    <BrowserRouter>
      <ModalContext.Provider value={{modal, setModal}}>   
      <div className='App'>
        {modal && 
        {
          'Login': <LoginModal />,
          'SignUp': <SignUpModal />
        }[modal]}
        <Navbar />
        
      </div> 
        
      </ModalContext.Provider>
    </BrowserRouter>
      
    
  );
}

export default App;
