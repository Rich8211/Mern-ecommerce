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

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { loading: true, success: false }
        
        case USER_REGISTER_SUCCESS:
            return { loading: false, success: true }
        
        case USER_REGISTER_FAIL:
            return { loading: false, error: action.payload }

        default: 
            return state
    }
}
export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { loading: true, success: false }
        
        case USER_LOGIN_SUCCESS:
            return { loading: false, success: action.payload }
        
        case USER_LOGIN_FAIL:
            return { loading: false, error: action.payload }

        default: 
            return state
    }
}

export const userInfoReducer = (state = {userInfo:''}, action) => {
    switch (action.type) {
        case USER_INFO_REQUEST:
            return { loading: true }
        
        case USER_INFO_SUCCESS:
            return { loading: false, userInfo: action.payload }

        case USER_INFO_FAIL:     
            return { loading: false, error: action.payload }

        default:
            return state
    }
}