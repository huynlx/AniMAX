import React, { lazy, Suspense } from "react";
import ProgressBarLoading from './ProgressBar';
import Loader from '../components/Loader/Loader';

type ImportFunc = () => Promise<{
    default: React.ComponentType<any>;
}>;

const lazyLoading = (importFunc: ImportFunc) => {
    const LazyComponent = lazy(importFunc);

    return (props: React.ComponentProps<typeof LazyComponent>) => (
        <Suspense fallback={<Loader />}>
            <LazyComponent {...props} />
        </Suspense>
    );
};

export default lazyLoading;