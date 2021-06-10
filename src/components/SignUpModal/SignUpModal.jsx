import React, {useEffect, useState, useContext} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Modal from '../Modal/Modal';
import { ModalContext } from '../../context/ModalContext';
import FormInput from '../FormInput/FormInput';
import { register } from '../../actions/userActions'

const SignUpModal = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.user);

    const { userInfo } = user;

    const userRegister = useSelector(state => state.userRegister);

    const userLogin = useSelector(state => state.userLogin)

    const { setModal } = useContext(ModalContext);
    const [missingFields, setMissingFields] = useState(false);
    const [passWordNotMatch, setPasswordNotMatch] = useState(false);

    const [form, setForm] = useState({
        username: "",
        password: "",
        passwordCheck: "",
        email: "",
    });
    
    const [subtitle,setSubtitle] = useState("* Indicates Required Fields");
    const {username, password, passwordCheck, email} = form;

    const updateField = (e) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value,
        });
    }
    
    const handleSignUp = async (e) => {
        try {
        e.preventDefault();
        if (missingFields) setMissingFields(false);
        if (passWordNotMatch) setPasswordNotMatch(false);
        if (!username.trim() || !password.trim() || !passwordCheck.trim() || !email.trim()) {
          setMissingFields(true);
        } else setMissingFields(false);


        if (password !== passwordCheck ) {
          setPasswordNotMatch(true);
        } else setPasswordNotMatch(false);

        dispatch(register);
        
      } catch (err) {
          console.log(err);
        }
        
    }

    useEffect(() => {
        if (userInfo) {
            setModal('')
        }
    }, [userInfo, setModal])

    useEffect(() => {
      if (passWordNotMatch) setSubtitle("Password does not match the confirmation.");
      if (missingFields) setSubtitle("Please fill out all required fields.");
    }, [passWordNotMatch, missingFields]);

    const Inputs = [
        
        {
          for: "username",
          upperLabel: "Username*",
          name: "username",
          handleChange: updateField,
          type: "text",
          inputType: "input",
        },
        {
          for: "password",
          upperLabel: "Password*",
          bottomLabel: "Password must be atleast six characters long",
          name: "password",
          handleChange: updateField,
          type: "password",
          inputType: "input",
        },
        {
          for: "passwordCheck",
          upperLabel: "Confirm Password*",
          name: "passwordCheck",
          handleChange: updateField,
          type: "password",
          inputType: "input",
        },
        {
          for: "email",
          upperLabel: "Email*",
          bottomLabel: "Please enter a valid email address",
          name: "email",
          handleChange: updateField,
          type: "email",
          inputType: "input",
        }]

    return (
        <Modal 
            title={'Create Your Account'}
            submitText={'Sign Up'}
            handleSubmit={handleSignUp}
            subtitle={subtitle}
            >
            {Inputs.map((input, i) => <FormInput key={i} {...input} />) }            
        </Modal>
    )
}

export default SignUpModal;
