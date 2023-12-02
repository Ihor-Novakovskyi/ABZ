const  getData = async ({ token, url }) => { 
    const headers = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
        const response = await fetch(url, headers);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        const usersData = await response.json();
        return usersData;
   
}
export default getData;