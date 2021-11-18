import styled from "styled-components";

interface IInput {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    [key: string]: any;
}

const Container = styled.input`
    border: 2px solid ${({theme}) => theme.secondary};
    outline: none;
    width: 250px;
    height: 40px;
    font-family: ${({theme}) => theme.font};
    font-size: 18px;
    padding: 0px 5px;
`

const Input = ({ placeholder, value, onChange, onKeyDown, ...props }: IInput) => {
    return (
        <Container value={value} placeholder={placeholder} onKeyDown={onKeyDown} onChange={onChange} {...props} />
    );
};

export default Input;