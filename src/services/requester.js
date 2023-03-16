export const request = async (url, method = 'GET' , data) => {
    let response = '';
    let result = '';
    let auth = '';
console.log("data sent: ",url, method, data)
    try {
        const user = localStorage.getItem('auth')
        if ((user !== null || undefined)  && (user !== "[object Object]") ) {
             auth = JSON.parse(user)
        } else {
            auth = {}
            localStorage.setItem("auth", auth)
        }

        let headers = {};

        if (auth.accessToken != undefined) {
            headers['X-Authorization'] = auth.accessToken
        }

        if (method === 'GET') {
            response = await fetch(url);
            result = await response.json()
            
        } else {

            response = await fetch(url, {
                method: method,
                headers: {
                    ...headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({...data})
            })
            result = await response.json()
        }
        console.log("data received: ", result);
        return result
    } catch (error) {
        console.error(error)
    }
}