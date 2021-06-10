import React, {useContext} from 'react'
import { ModalContext } from '../context/ModalContext'
import './Navbar.css'

const Navbar = () => {

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
                <p onClick={handleLoginModal}>Sign In</p>
                <p onClick={handleRegistrationModal}>Register</p>
                <p>Cart</p>
            </div>
            
        </div>
    )
}

export default Navbar
