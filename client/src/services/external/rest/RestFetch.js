import _ from 'lodash'

export default class RestFetch {

    constructor(apiRoot){
        this.root = apiRoot;
    }

    get(url){
        console.log("Get: " + this.root + url);
        return fetch(this.root + url).then(r => r.json()).then(r => {
            console.log('Success', r);
            if(r.status === 'error'){
                console.log("EEEEEE");
                throw new Error(r.message);
            }
            return r;
        })
        .catch(e => {
            console.log("Error: ", JSON.stringify(e));
            throw e;
        });
    }

    post(url, body){
        return fetch(this.root + url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(body), // body data type must match "Content-Type" header
        }).then(response => response.json()); // parses response to JSON
    }
}


