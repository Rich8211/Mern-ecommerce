import React, {useEffect, useState, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { ModalContext } from '../../context/ModalContext';
import Modal from '../Modal/Modal';
import FormInput from '../FormInput/FormInput';
import { login, getInfo } from '../../actions/userActions'


const LoginModal = () => {

    const dispatch = useDispatch();

    const { setModal} = useContext(ModalContext);

    const user = useSelector(state => state.user);

    const { userInfo } = user;

    const userLogin = useSelector(state => state.userLogin)

    const {loading, error, success} = userLogin;

    const [failedLogin, setFailedLogin] = useState(false);
    const [missingFields, setMissingFields] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: "",
        
    });

    const {email, password} = form;

    const [subtitle, setSubtitle] = useState("* Indicates Required Fields");

    const updateField = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    }

    const openRegistration = () => {
        setModal('SignUp')
    }

    const handleLogin = async () => {

        setFailedLogin(false);
        setMissingFields(false);

        if (!email.trim() || !password.trim()) {
            setMissingFields(true);
            return;
        }
        try {
           dispatch(login(email, password))

        }

        catch (err) {
            setFailedLogin(true);
        }
        
    }

    useEffect(() => {
        if (success) {
            dispatch(getInfo())
        }
        if (userInfo) {
            setModal('')
        }
    }, [success, dispatch, userInfo, setModal])

    useEffect(() => {
        
        if (missingFields) setSubtitle("Please fill out all required fields.");
        if (failedLogin) setSubtitle("Incorrect email or password.");

      }, [failedLogin, missingFields]);
    

    const inputs = [
        {
          for: "email",
          upperLabel: "Email",
          name: "email",
          handleChange: updateField,
          type: "text",
          inputType: "input",
        },
        {
          for: "password",
          upperLabel: "Password",
          name: "password",
          handleChange: updateField,
          type: "password",
          inputType: "input",
        }]

    return (
        <Modal
            title={'Login to Your Account'}
            submitText={'Submit'}
            handleSubmit={handleLogin}
            subtitle={subtitle}
        >
            {inputs.map((input, i) => <FormInput key={i} {...input}/>
            )}
            <p>New User? Register&nbsp; <span style={{textDecoration:'underline', cursor:'pointer'}} onClick={openRegistration}>here</span></p>
        </Modal>
    )
}

export default LoginModal;
