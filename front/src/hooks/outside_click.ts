import * as React from 'react';

export function useOutsideClick<T>(ref: React.RefObject<any> | undefined, callback: ()=>void): void {
    React.useEffect(() => {
        const handleClick = (event: MouseEvent) => { 
            if (ref === undefined || (ref.current && !ref.current.contains(event.target))) {
                callback();
            } 
        };
        document.addEventListener('click', handleClick, true);
        return () => { document.removeEventListener('click', handleClick, true); };
    }, [ref, callback]);
};
