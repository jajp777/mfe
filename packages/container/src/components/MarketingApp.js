import {mount} from 'marketing/MarketingApp';
import React, {useRef, useEffect} from 'react';


export default () => {
    const ref = useRef(null);
    console.log('[ref1] MarketingApp', ref.current);

    useEffect(() => {
        mount(ref.current);
        console.log('[ref] MarketingApp', ref.current);
    })
    return <div ref={ref} />;
};

