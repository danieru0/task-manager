import { ChangeEvent } from "react";
import styled from "styled-components";

interface ITextArea {
    placeholder: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    [key: string]: any;
}

const TextAreaElement = styled.textarea`
    border: 2px solid ${({theme}) => theme.secondary};
    outline: none;
    width: 250px;
    height: 200px;
    font-family: ${({theme}) => theme.font};
    font-size: 18px;
    padding: 0px 5px;
    resize: none;
`

const TextArea = ({ placeholder, value, onChange, ...props }: ITextArea) => {
    return (
        <TextAreaElement placeholder={placeholder} value={value} onChange={onChange} {...props} />
    );
};

export default TextArea;