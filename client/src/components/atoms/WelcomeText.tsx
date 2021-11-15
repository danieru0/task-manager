import styled from 'styled-components';

interface IWelcomeText {
    children: string;
    [key: string]: any;
}

const Container = styled.span`
    font-size: 54px;
    color: ${({theme}) => theme.secondary};
`

const WelcomeText = ({ children, ...props }: IWelcomeText) => {
    return (
        <Container {...props}>
            {children}
        </Container>
    );
};

export default WelcomeText;