export interface UserSignUp {
    birth_date: string;
    company: string;
    cpf: string;
    email: string;
    name: string;
    password: string;
    username: string;
    confirm_password: string;
}

export interface UserSignIn {
    username: string;
    password: string;
    company: string;
}
export interface UserForgot{
    username?: string;
    email: string;
    company: string;
}