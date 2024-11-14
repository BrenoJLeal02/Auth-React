export type ErrorMessages = {
    PASSWORD_MUST_ONLY_CONTAIN_ALPHANUMERIC_CHARS: string;
    PASSWORD_TOO_SHORT: string;
    PASSWORD_TOO_LONG: string;
    USERNAME_MUST_ONLY_CONTAIN_ALPHANUMERIC_CHARS: string;
    USERNAME_TOO_SHORT: string;
    USERNAME_TOO_LONG: string;
    USERNAME_CANT_BE_NULL: string;
    USERNAME_ALREADY_BEING_USED: string;
    NAME_MUST_ONLY_CONTAIN_ALPHABETIC_CHARS : string;
    NAME_TOO_LONG: string;
    NAME_CANT_BE_NULL : string;
    INVALID_DATE_FORMAT: string;
    USER_MUST_HAVE_LEGAL_AGE: string;
    EMAIL_ALREADY_BEING_USED: string;
    CPF_ALREADY_BEING_USED: string;
    CPF_MUST_HAVE_11_DIGITS: string;
    CPF_NOT_VALID: string;
    CPF_CANT_BE_NULL: string;
};

export const errorMessages: { [key: string]: string } = {
    //Password
    PASSWORD_MUST_ONLY_CONTAIN_ALPHANUMERIC_CHARS: "A senha deve conter apenas caracteres alfanuméricos.",
    PASSWORD_TOO_SHORT: "A senha deve ter pelo menos 8 caracteres.",
    PASSWORD_TOO_LONG: "A senha deve ter no máximo 12 caracteres.",

    //Username
    USERNAME_ALREADY_BEING_USED: "Este username já está em uso",
    USERNAME_MUST_ONLY_CONTAIN_ALPHANUMERIC_CHARS : "Não pode existir espaço entre caracteres",
    USERNAME_TOO_SHORT: "O username deve ter pelo menos 4 caracteres.",
    USERNAME_TOO_LONG: "O username deve ter no máximo 50 caracteres.",
    USERNAME_CANT_BE_NULL: "Digite seu nome de usuário.",

    //Name
    NAME_MUST_ONLY_CONTAIN_ALPHABETIC_CHARS :"O nome deve conter apenas caracteres alfanuméricos.",
    NAME_TOO_LONG: "O nome deve ter no máximo 150 caracteres.",
    NAME_CANT_BE_NULL : "Digite seu nome.",

    //Data de nascimento
    INVALID_DATE_FORMAT :"Formato inválido para a data",
    USER_MUST_HAVE_LEGAL_AGE: "Usuário deve ser maior de 18 anos.",

    //Email
    EMAIL_ALREADY_BEING_USED: "Este email já está em uso",

    //Cpf
    CPF_ALREADY_BEING_USED: "Este CPF já está em uso",
    CPF_MUST_HAVE_11_DIGITS: "O CPF deve ter 11 dígitos",
    CPF_NOT_VALID: "CPF inválido",
    CPF_CANT_BE_NULL: "Digite seu CPF."
    
};