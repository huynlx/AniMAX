import { Icon } from '../../types';
import { To } from "history";
import { Link, useLocation } from 'react-router-dom';
import classNames from "classnames";

interface ButtonProps {
    active?: boolean;
    text: string;
    startIcon?: React.ComponentType<Icon>; // <Icon> => nghĩa là component có tham số truyền vào được định nghĩa bởi interface Icon
    endIcon?: React.ComponentType<Icon>;
    className?: string;
    to?: string;
    dropDown?: boolean;
}
const Button = (props: ButtonProps) => {
    const { active, text, startIcon: StartIcon, endIcon: EndIcon, className, dropDown } = props;

    return (
        <div className={classNames(className, active && !dropDown && "border-secondary border-b-3")}>
            {
                StartIcon && <StartIcon size={14} className='text-while' />
            }
            <p className={classNames("tracking-wide font-bold duration-300 transition",
                StartIcon && 'ml-2',
                EndIcon && 'mr-2',
                active ? (dropDown ? "text-five text-sm" : "text-secondary text-sm") : ("text-sm text-gray-300"),
                dropDown ? "hover:text-five":"hover:text-secondary"
            )}>
                {text}
            </p>
            {
                EndIcon && <EndIcon size={14} className='text-white' />
            }
        </div>
    );
};


type NavButtonProps = {
    redirect?: boolean;
    to?: To | undefined;
} & ButtonProps;
const NavButton = (props: NavButtonProps) => {
    const { active, text, startIcon, endIcon, className, redirect = true, to, dropDown } = props;
    const { pathname } = useLocation();

    return redirect ? (
        <Link to={to!}>
            <Button
                dropDown={dropDown}
                to={to}
                active={to === pathname}
                text={text}
                startIcon={startIcon}
                endIcon={endIcon}
                className={className}
            />
        </Link>
    ) : (
        <Button
            active={active}
            text={text}
            startIcon={startIcon}
            endIcon={endIcon}
            className={classNames("cursor-pointer", className)}
        />
    )
}

export default NavButton;