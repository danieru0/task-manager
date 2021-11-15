import styled from "styled-components";

interface IExplanationText {
    children: string;
    [key: string]: any;
}

const Container = styled.span`
    font-size: 32px;
    color: ${({theme}) => theme.primaryDarker};
    margin-bottom: 40px;
`

const ExplanationText = ({ children, ...props }: IExplanationText) => {
    return (
        <Container>
            {children}
        </Container>
    );
};

export default ExplanationText;