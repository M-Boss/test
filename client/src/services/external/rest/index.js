import _ from 'lodash'

class RestFetch {

    constructor() {
        this.root = "http://localhost:8080/api/";
    }

    get(url) {
        console.log("Get: " + this.root + url);
        return fetch(this.root + url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "AUTHORIZATION": global.AUTHORIZATION || ""
            }
        }).then(r => r.json()).then(r => {

            if (r.status === 'error') {
                throw new Error(r.message);
            }
            return r;
        })
            .catch(e => {
                console.log("Error: ", JSON.stringify(e));
                throw e;
            });
    }

    post(url, body) {
        return fetch(this.root + url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                "AUTHORIZATION": global.AUTHORIZATION || ""
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(body), // body data type must match "Content-Type" header
        }).then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json()
        });
    }

    upload(url, file) {
        console.log("uploading...", file);
        const data = new FormData();
        data.append('file', file);
        console.log("Data: ", data);
        return fetch(this.root + url, {
            method: 'POST',
            body: data,
            headers: {
                "AUTHORIZATION": global.AUTHORIZATION || ""
            }
        }).then(response => response.json()); // parses response to JSON
    }
}

const rest = new RestFetch();
export default rest;