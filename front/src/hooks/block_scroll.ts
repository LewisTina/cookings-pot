import * as React from 'react';

export function useBlockPageScroll(value?: boolean): void {
    React.useEffect(() => {
        if(value != undefined) {
            document.body.style.overflow = value ? 'hidden':'unset';
        }
    }, [value])
};
