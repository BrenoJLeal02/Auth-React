

export const removeFormatting = (value: string) => {
    return value.replace(/\D/g, '');
};
export const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z\sÀ-ÖØ-öø-ÿÇç]+$/;
    return nameRegex.test(name);
};

export const validateUsername = (username: string) => {
    return !/\s/.test(username);
};

export const validatePassword = (password: string) => {
    const MIN_PASSWORD_LENGTH = 8;
    const MAX_PASSWORD_LENGTH = 12;
    if (password.length < MIN_PASSWORD_LENGTH) return 'A senha deve ter pelo menos 8 caracteres.';
    if (password.length > MAX_PASSWORD_LENGTH) return 'A senha deve ter no máximo 12 caracteres.';
    return null;
};

export const validatePasswordsMatch = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return 'As senhas devem ser iguais!';
    return null;
};

export const validateCpf = (cpf: string): boolean => {

    const cleanedCpf = cpf.replace(/\D/g, '');

    return cleanedCpf.length === 11;
};

