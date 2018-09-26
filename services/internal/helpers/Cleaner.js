/**
 * Created by guy on 8/18/18.
 */


module.exports = class Cleaner{

    //a little bit slow :D
    clean(text){
        if(text && text.replace){
            return text.replace(/<\/?[^>]+(>|$)/g, "");
        }
        return text;
    }
};