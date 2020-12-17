import React, { useEffect, useRef } from 'react';

const useEffectUpdate = (func:any, deps: any): void => {
    const isFirstRun = useRef<boolean>(false);

    useEffect(() => {
        if (isFirstRun.current) func();
        else isFirstRun.current = true;
    }, deps);
}

export default useEffectUpdate;