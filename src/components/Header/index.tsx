import { Disclosure } from '@headlessui/react';
import { Link, RouteMatch } from "react-router-dom";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import DesktopMenu from './DesktopMenu';
import Search from './Search';

interface HeaderProps {
    matchedRoute?: RouteMatch | undefined;
}
const Header = ({ matchedRoute }: HeaderProps) => {
    return (
        <Disclosure as="div" className="fixed z-30 px-4 lg:px-20 flex justify-center items-center w-screen h-16 bg-background-lighter bg-opacity-75" style={{ 'backdropFilter': 'blur(35px)' }}>
            {({ open }) => (
                <>
                    <div className='absolute left-0 p-in'>
                        <Link to='/' className='flex'>
                            <img src="/logo.png" alt="logo" className='rounded-full' width={40} />
                            <h1 className='place-self-center ml-1 text-2xl font-semibold text-secondary'>AniMAX</h1>
                        </Link>
                    </div>

                    <div className='md:hidden absolute right-0 p-in flex justify-center items-center'>
                        <Disclosure.Button>
                            <span className="sr-only">Open main menu</span>
                            {
                                open ? (
                                    <AiOutlineClose size={20} className="text-white" />
                                ) : (
                                    <AiOutlineMenu size={20} className="text-white" />
                                )
                            }
                        </Disclosure.Button>
                    </div>

                    <DesktopMenu matchedRoute={matchedRoute} />

                    <div className="hidden md:block absolute right-0 p-in">
                        <Search />
                    </div>
                </>
            )}
        </Disclosure>
    );
};

export default Header;