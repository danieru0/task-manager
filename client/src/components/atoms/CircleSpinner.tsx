import styled, { css, keyframes } from 'styled-components';

const BounceAnimation = keyframes`
    0%, 100% { 
        transform: scale(0.0);
        -webkit-transform: scale(0.0);
    } 50% { 
        transform: scale(1.0);
        -webkit-transform: scale(1.0);
    }
`

const bounceStyles = css`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #fff;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
    animation: ${BounceAnimation} 2.0s infinite ease-in-out;
`

const Container = styled.div`
    width: 20px;
    height: 20px;
    position: relative;
`

const Bounce1 = styled.div`
    ${bounceStyles}
`

const Bounce2 = styled.div`
    ${bounceStyles}
    animation-delay: -1.0s;
`

const CircleSpinner = () => {
    return (
        <Container>
            <Bounce1 />
            <Bounce2 />
        </Container>
    );
};

export default CircleSpinner;