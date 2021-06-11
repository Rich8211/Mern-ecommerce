import React, {useContext} from 'react'
import { useSelector } from 'react-redux'
import { ModalContext } from '../context/ModalContext'
import './Navbar.css'

const Navbar = () => {

    const user = useSelector(state => state.user);

    const {userInfo} = user;


    const { setModal } = useContext(ModalContext);

    const handleLoginModal = () => {
        setModal('Login')
    }

    const handleRegistrationModal = () => {
        setModal('SignUp')
    }

    
    return (
        <div className='navbar'>
            <div className='navbar-account-items'>
                <i className='far fa-user'></i>
                {userInfo ? <p>Sign Out</p> : 
                <>
                    <p onClick={handleLoginModal}>Sign In</p>
                    <p onClick={handleRegistrationModal}>Register</p>
                </>
                }
                
                <p>Cart</p>
            </div>
            
        </div>
    )
}

export default Navbar
