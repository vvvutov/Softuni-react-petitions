export const request = async (url, method = 'GET' , data) => {
    let response = '';
    let result = '';
    let auth = '';

    try {
        const user = localStorage.getItem('auth')
        if (user !== "undefined") {
             auth = JSON.parse(user)
        } else {
            auth = {}
        }

        let headers = {};

        if (auth.accessToken) {
            headers['X-Authorization'] = auth.accessToken
        }

        if (method === 'GET') {
            response = await fetch(url);
            result = await response.json()
            
        } else {

            // console.log(JSON.stringify({...data}))
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
        return result
    } catch (error) {
        console.error(error)
    }
}