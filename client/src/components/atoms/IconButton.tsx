import styled from 'styled-components';

import Icon, { IconTypes } from './Icon';

interface IIconButton {
    icon: IconTypes;
    onClick: () => void;
    [key: string]: any;
}

const Container = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    font-size: 20px;    
`

const IconButton = ({ icon, onClick, ...props }: IIconButton) => {
    return (
        <Container onClick={onClick} {...props}>
            <Icon icon={icon} />
        </Container>
    );
};

export default IconButton;