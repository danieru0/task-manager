import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export type IconTypes = 'th-large' | 'project-diagram' | 'caret-right' | 'file-code'| 'sign-out-alt' | 'comment-dots' | 'cog';

interface IIcon {
    icon: IconTypes;
    [key: string]: any;
}

const Icon = ({icon, ...props}: IIcon) => {
    return <FontAwesomeIcon icon={icon} {...props} />
};

export default Icon;