import styled from "styled-components";

interface IFormSectionTitle {
    text: string;
    [key: string]: any;
}

const Container = styled.span`
    font-size: 32px;
    font-weight: bold;
    position: relative;
    color: ${({theme}) => theme.secondary};

    &::after {
        content: '';
        display: block;
        background: ${({theme}) => theme.secondary};
        width: 100%;
        height: 2px;
    }
`

const FormSectionTitle = ({ text, ...props }: IFormSectionTitle) => {
    return (
        <Container {...props}>
           { text } 
        </Container>
    );
};

export default FormSectionTitle;