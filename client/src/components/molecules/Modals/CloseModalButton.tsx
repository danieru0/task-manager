import styled from 'styled-components';

import { IconTypes } from '../../atoms/Icon';
import IconButton from '../../atoms/IconButton';

interface ICloseModalButton {
    icon: IconTypes;
    onClick: () => void;
}

const StyledIconButton = styled(IconButton)`
    position: absolute;
    right: 5px;
    top: 5px;
`

const CloseModalButton = ({ icon, onClick, }: ICloseModalButton) => {
    return (
        <StyledIconButton icon={icon} onClick={onClick} />
    );
};

export default CloseModalButton;