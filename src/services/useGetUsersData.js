import { useEffect, useState } from 'react';
import fetchData from './fetchData.js';
import setOptions from './serverApi.js';

export default function useGetUsers({ token, update}) {
    const [load, setLoad] = useState(true);
    const [pages, setPages] = useState(1);
    const [content, setContent] = useState({ users: [] });
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');
    const { url, options } = setOptions({ token, update, action: 'GET/users', pages });
        useEffect(() => {
            if (token && pages !== 1) {
                setLoad(true)
                fetchData({ url, ...options })
                    .then((data => { 
                        setContent((prevData) => {
                            return { ...data, users: [...prevData.users, ...data.users] }
                        });
                        setLoad(false);
                    }))
                    .catch((dataError) => { 
                        setError(dataError)
                        setLoad(false);
                    })
            } 
        }, [pages])
        useEffect(() => {
            if (token) { 
                fetchData({ url, ...options })
                    .then(data => { 
                        setTotalPages(data.total_pages);
                        setContent(data);
                        setLoad(false);
                    })
                .catch((dataError) => setError(dataError))
            }
        }, [token]);
        useEffect(() => {
            if (update) { 
                fetchData({ url, ...options })
                .then((data => setContent(data)))
                .catch((dataError) => setError(dataError))
            }
           
        }, [update])
    return {
        users: content.users,
        error,
        load,
        setPages,
        setLoad,
        totalPages,
        pages
    }
}
