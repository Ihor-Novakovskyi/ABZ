const request = async ({ url, method = 'GET', headers, body = null }) => { 
    const response = await fetch(url, { method, headers, body });
    if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}`);
        }
        const usersData = await response.json();
        return usersData;
   
}
export default request;