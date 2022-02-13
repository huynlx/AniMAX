import classNames from 'classnames';
import React, { PropsWithChildren } from 'react';
import { BiChevronDown } from 'react-icons/bi';

interface selectProps extends React.HTMLProps<HTMLSelectElement> {
    className?: string;
}
const Select = (props: PropsWithChildren<selectProps>) => {
    const { className, children, ...selectProps } = props;

    return (
        <div className="relative inline-flex self-center">
            <select
                className={classNames(
                    "text-lg font-medium rounded border border-gray-500 text-white pl-5 pr-9 focus:outline-none appearance-none",
                    className
                )}
                {...selectProps}
            >
                {children}
            </select>
            <BiChevronDown
                size={20}
                className="absolute right-2 z-10 pointer-events-none text-white transition transform -translate-y-1/2 top-1/2"
            />
        </div>
    );
};

export default Select;