import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Error = () => {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "404 - AniMAX"
        window.scroll(0, 0);
    })

    return (
        <div className="text-center inset-0 flex flex-col items-center justify-center pt-2"><div style={{ opacity: 1 }}><span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: 'hidden', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: 0, margin: 0, padding: 0, position: 'relative', maxWidth: '100%' }}><span style={{ boxSizing: 'border-box', display: 'block', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: 0, margin: 0, padding: 0, maxWidth: '100%' }}><img style={{ display: 'block', maxWidth: '100%', width: 'initial', height: 'initial', background: 'none', opacity: 1, border: 0, margin: 0, padding: 0 }} alt="" aria-hidden="true" src="/404.png" /></span><img alt={'404'} src="/404.png" decoding="async" data-nimg="intrinsic" style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, boxSizing: 'border-box', padding: 0, border: 'none', margin: 'auto', display: 'block', width: 0, height: 0, minWidth: '50%', maxWidth: '100%', minHeight: '50%', maxHeight: '100%', objectFit: 'contain' }} srcSet="/404.png" /></span></div><p className="text-4xl font-semibold">Ôi bạn ơi.</p><p className="text-2xl mt-2">Không tìm thấy trang này rồi bạn ơi.</p><button className="transition duration-300 flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-opacity-80 mt-8 hover:bg-primary border-2 border-primary" type="button" onClick={() => navigate(-1)}><p>Come Back</p></button></div>
    );
};

export default Error;