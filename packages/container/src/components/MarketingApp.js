import {mount} from 'marketing/MarketingApp';
import React, {useRef, useEffect} from 'react';
import {useHistory} from 'react-router-dom';

export default () => {
    const ref = useRef(null);
    // console.log('[ref1] MarketingApp', ref.current);
    const history = useHistory();
    useEffect(() => {
        const {onParentNavigate} = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({pathname: nextPathname}) => {
                const {pathname} = history.location;
                if(pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            },
        });
        // console.log('[ref] MarketingApp', ref.current);
        history.listen(onParentNavigate);
    },[]); 
    return <div ref={ref} />;
};

