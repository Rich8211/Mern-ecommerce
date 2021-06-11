import axios from 'axios'
import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_INFO_REQUEST,
    USER_INFO_SUCCESS,
    USER_INFO_FAIL
} from '../constants/userConstants';

export const register = (username, email, password, passwordCheck) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        await axios.post('http://localhost:5000/api/users', {username, email, password, passwordCheck}, config)

        dispatch({
            type: USER_REGISTER_SUCCESS
        })

        await axios.post('http://localhost:5000/api/users/login', {email, password}, config)

        const { data } = await axios.get('http://localhost:5000/api/users/user', config )

        dispatch({
            type: USER_LOGIN_SUCCESS,
        })

        dispatch({
            type: USER_INFO_SUCCESS,
            payload: data
        })


    }
    catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: err.message
        })
    }
}

export const login = (email, password) => async (dispatch) =>  {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
                
            },
            withCredentials: true
        }

        const {data: successLogin} = await axios.post('http://localhost:5000/api/users/login', {email, password}, config)

        
        if (successLogin) {
            const { data: userData } = await axios.get('http://localhost:5000/api/users/user', config )
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: successLogin
            })
    
            dispatch({
                type: USER_INFO_SUCCESS,
                payload: userData
            })
        }
    }

    catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: err.message
        })
    }
}

export const getInfo = () => async (dispatch) => {
    try {
        dispatch({
            type: USER_INFO_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }

        const { data } = await axios.get('http://localhost:5000/api/users/user', config )

        if (data) {
            dispatch({
                type: USER_INFO_SUCCESS,
                payload: data
            })
        }

    }
    catch (err) {
        dispatch({
            type: USER_INFO_FAIL,
            payload: err.message
        })
    }
}