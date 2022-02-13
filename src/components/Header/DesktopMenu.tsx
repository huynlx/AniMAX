import React from 'react';
import { RouteMatch } from 'react-router-dom';
import routes from '../../routes/Routes';
import NavButton from './NavButton';
import Tooltip from './Tooltip';

const headerRoutes = routes.filter(route => route.header);

interface DesktopMenuProps { matchedRoute: RouteMatch | undefined }

const DesktopMenu = ({ matchedRoute }: DesktopMenuProps) => {

    return (
        <div className='flex-1 items-center justify-center px-4 hidden md:flex'>
            {
                headerRoutes.map(route =>
                    !route.dropdown ? (
                        <NavButton
                            className='flex items-center p-2 mx-2'
                            to={route.path}
                            text={route.name}
                            active={matchedRoute?.route.path === route.path}
                            key={route.path} //mỗi vòng lặp phải có 1 key khác nhau
                        />
                    ) : (
                        <Tooltip key={route.path}>
                            <NavButton
                                className='flex items-center p-2 mx-2'
                                text={route.name}
                                redirect={false}
                                active={matchedRoute?.route.path === route.path}
                            ></NavButton>
                            <Tooltip.Panel className='flex w-96 max-h-52 flex-wrap justify-start items-center bg-background-darker text-secondary border-t-2 border-secondary rounded-md rounded-t-none'>
                                {
                                    route.dropdownData?.map(item => (
                                        <NavButton
                                            text={item.name}
                                            to={route.dropdownPath?.(item)}
                                            key={route.listKey?.(item)}
                                            className="flex items-center p-2 mx-2 w-24 overflow-ellipsis"
                                            dropDown={true}
                                        ></NavButton>
                                    ))
                                }
                            </Tooltip.Panel>
                        </Tooltip>
                    ))
            }
        </div>
    );
};

export default DesktopMenu;