import React from 'react';
import './TextBlock.css';

const TextBlock = ({className, isContentEditable, content}) => {
    return <p className={` ${className} card--block-style`} contentEditable={isContentEditable} suppressContentEditableWarning="true">{content}</p>
}

export default TextBlock;