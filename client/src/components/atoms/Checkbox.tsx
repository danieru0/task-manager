import styled from 'styled-components';

interface ICheckbox {
    text: string;
    checked: boolean;
    onClick: (value: boolean) => void;
}

const Container = styled.label`
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: flex-start;
`

const Input = styled.input`
    margin-right: 10px;
    margin-top: 0;
    margin-bottom: 0;
`

const Checkbox = ({ text, checked, onClick }: ICheckbox) => {
    return (
        <Container onClick={() => onClick(!checked)}>
            <Input type="checkbox" checked={checked}/>
            {text}
        </Container>
    );
};

export default Checkbox;