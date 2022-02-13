import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ImStack } from "react-icons/im";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";

interface EpisodeButtonProps {
    episodes: string[];
    onClick?: (
        episode: EpisodeButtonProps["episodes"][number],
        index: number
    ) => void;
    activeIndex?: number;
}
const EpisodeButton = (props: EpisodeButtonProps) => {
    const { slug } = useParams();

    return (
        <Menu>
            <Menu.Button>
                <ImStack />
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="rounded-md text-white overflow-y-scroll absolute right-0 bottom-full py-6 max-h-96 w-106 my-2 origin-top-right bg-background shadow-lg focus:outline-none">
                    <h1 className="text-white font-medium mb-3">Tập phim</h1>
                    <div className="w-full flex flex-wrap justify-center">
                        {props.episodes.map((episode, index) => (
                            <Menu.Item
                                key={index}
                                as="button"
                                className={classNames(
                                    "py-3 px-4 block rounded-md m-1 w-full hover:bg-opacity-80",
                                    index === props.activeIndex
                                        ? "bg-primary text-white"
                                        : "bg-background-lighter"
                                )}
                                onClick={() => {
                                    props?.onClick?.(episode, index);
                                }}
                            >
                                {episode}
                            </Menu.Item>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
};

export default EpisodeButton;