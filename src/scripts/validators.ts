interface DateValidateProps {
    value: string,
    setDate: (date: string) => void;
}

export function dateValidade({value, setDate} : DateValidateProps) {
    const dateToValidate = new Date(value);
    if (dateToValidate.getFullYear() <= 9999) {
        setDate(value);
    } else {
        setDate(`${dateToValidate.getFullYear().toString().substring(0, 4)}-${dateToValidate.getMonth()+1}-${dateToValidate.getDate()}`);
    }
}