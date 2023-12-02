import { useEffect, useState } from 'react';
import getData from './getData.js';


export default function useGetUsers({ token, update}) {
    const [load, setLoad] = useState(true);
    const [pages, setPages] = useState(1);
    const [content, setContent] = useState({ users: [] });
    const [totalPages, setTotalPages] = useState(1);
    const [error, setError] = useState('');
    const url = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pages}&count=5`;
    useEffect(() => {
        if (token && pages !== 1) {
            setLoad(true)
            getData({ token, pages, url })
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
            getData({ token, pages, url })
                .then(data => { 
                    setTotalPages(data['total_pages']);
                    setContent(data);
                    setLoad(false);
                })
            .catch((dataError) => setError(dataError))
        }
    }, [token]);
    useEffect(() => {
        if (update) { 
            const url = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${5 * pages}`
            getData({ token, pages, url })
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
