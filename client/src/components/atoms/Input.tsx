import styled from "styled-components";

interface IInput {
    placeholder: string;
    value: string;
    label?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    [key: string]: any;
}

const Container = styled.label`
    display: flex;
    flex-direction: column;
    font-size: 20px;
    font-weight: bold;
`

const InputElement = styled.input`
    border: 2px solid ${({theme}) => theme.secondary};
    outline: none;
    width: 250px;
    height: 40px;
    font-family: ${({theme}) => theme.font};
    font-size: 18px;
    padding: 0px 5px;
`

const Input = ({ placeholder, value, label, onChange, onKeyDown, ...props }: IInput) => {
    if (!label) return <InputElement value={value} placeholder={placeholder} onKeyDown={onKeyDown} onChange={onChange} {...props} />

    return (
        <Container>
            {label}
            <InputElement value={value} placeholder={placeholder} onKeyDown={onKeyDown} onChange={onChange} {...props} />
        </Container>
    );
};

export default Input;