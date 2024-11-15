import { UserSignIn, UserSignUp, UserForgot } from "../interface/UserInterface";
import { apiAuth } from "./api";

const baseURL = '/user';

const signUp = async (data: UserSignUp) => {
    const user = await apiAuth.post(`${baseURL}`, data);
    return user;
};

const signIn = async (data: UserSignIn) => {
    const response = await apiAuth.post(`${baseURL}/login`, data);
    
    return response.data;
};

const forgot = async (data: UserForgot) => {
    const response = await apiAuth.post(`${baseURL}/forgot-password`, data);
    
    return response.data;
};
export {
    signUp,
    signIn,
    forgot
}