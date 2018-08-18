/**
 * Created by guy on 8/18/18.
 */


export default class Helpers{

    //a little bit slow :D
    randomString(length = 16){
        let text = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (let i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}