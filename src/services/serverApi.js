export default function setOptions({ token, data = {}, action, pages, update = false }) { 
    const getUsers = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=${pages}&count=5`;
    const postUsers = "https://frontend-test-assignment-api.abz.agency/api/v1/users";
    const getUpdateUsers = `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${5 * pages}`;
    const getPositions = "https://frontend-test-assignment-api.abz.agency/api/v1/positions";
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
        switch (action) { 
            case 'GET/users':
                return {
                    url: update ? getUpdateUsers : getUsers,
                    options: {
                        method: 'GET',
                        headers
                    }
                }
            
            case 'POST/users':
                const formData = new FormData();
                for (let key in data) {
                    formData.append(key, data[key])
                }
                return {
                    url: postUsers,
                   options: {
                        method: 'POST',
                       headers: {
                        'Token': token
                       },
                        body: formData
                    
                }
                }
            case 'GET/positions':
                return {
                    url:getPositions,
                    options: {
                        method: 'GET',
                        headers
                    }
                }
        }

}