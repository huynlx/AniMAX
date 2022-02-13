import classNames from 'classnames';
import React from 'react';

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
    return (
        <input
            className={classNames(
                "bg-transparent placeholder-gray-500 text-gray-300 focus:outline-none focus:border-none",
                className
            )}
            id='myInput'
            {...props}
        />
    );
};

export default Input;