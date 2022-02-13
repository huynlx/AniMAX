import classNames from 'classnames';
import React from 'react';
import { Img, ImgProps } from "react-image";

const allowedTexts = ["w-", "h-", "mr-", "ml", "my", "mx", "px", "py"];

const isAllowedText = (text: string) => allowedTexts.find((allowedText) => text.includes(allowedText));

const Image = (props: ImgProps) => {
    const classes = props.className?.split(" ").filter(isAllowedText);

    return (
        <Img
            loader={ //loading
                <div className={classNames("bg-gray-600", classes)}></div>
            }
            unloader={//error
                <img className={classNames("bg-gray-600", classes)} src='/default.png' alt='Error'></img>
            }
            {...props}
        />
    );
};

export default Image;