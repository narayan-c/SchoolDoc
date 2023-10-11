import React, {useEffect} from 'react';

export default function Home() {
    useEffect(() => {
        window.location.replace('https://incredible-pothos-d55486.netlify.app')
        //window.open('https://incredible-pothos-d55486.netlify.app', '_blank');
    }, []);
    return null;
};
