import styled from 'styled-components';
import { lighten } from 'polished';

type size = 'small' | 'normal' | 'large';

interface IButton {
    text: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    size?: size;
    [key: string]: any;
}

interface ContainerProps {
    size: size;
}

const handleSizeType = (size: size) => {
    switch(size) {
        case 'small':
            return '10px 20px';
        case 'large':
            return '40px 40px';
        default:
            return '20px 35px';
    }
}

const Container = styled.button<ContainerProps>`
    font-family: ${({theme}) => theme.font};
    color: ${({theme}) => theme.primary};
    background: ${({theme}) => theme.secondary};
    border: none;
    padding: ${({size}) => handleSizeType(size)};
    cursor: pointer;

    &:hover {
        background: ${({theme}) => lighten(0.05, theme.secondary)};
    }
    
`

const Button = ({ text, onClick, size = 'normal', ...props }: IButton) => {
    return (
        <Container size={size} onClick={onClick} {...props}>
            {text}
        </Container>
    );
};

export default Button;