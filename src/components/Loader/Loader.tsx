import { ImSpinner2 } from "react-icons/im";
import React, { useEffect, useState } from 'react';

const Loader = () => {
    useEffect(() => {
        window.scroll(0, 0);
    }, [])

    return (
        <div className="absolute left-2/4 -translate-y-2/4 -translate-x-2/4 top-2/4">
            <ImSpinner2 size={20} className="text-white animate-spin" />
        </div>
    );
};

export default Loader;