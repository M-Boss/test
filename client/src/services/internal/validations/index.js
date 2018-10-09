/**
 * Created by guy on 9/14/18.
 */

class Validator {
    constructor(){
        this.validations = {
            general: ["bride_first", "groom_first", "bride_last", "groom_last"],
            template: ["template", "template_main"],
            details: ["title", "date", "country", "city"],
            events: ["events_page_title", "events_description"],
            photos: ["photos_page_title", "photos_description"],
            faqs: ["faqs_page_title", "faqs_description"],
        }
    }

    getKeys(){
        const result = [];
        for(const k in this.validations){
            if(this.validations.hasOwnProperty(k)){
                result.push(k);
            }
        }
        return result;
    }

    labelOf(k){
        return {
            'general': 'Informasi Umum',
            'template': 'Pilih Templat',
            'details': 'Detail Pernikahan',
            'events': 'Acara',
            'photos': 'Foto',
            'faqs': 'Pengaturan Website',
        }[k];
    }

    getPercentage(state){
        let completed = 0, total = 0;
        for(let k in this.validations){
            if(this.validations.hasOwnProperty(k)){
                total++;
                if(this.isValid(k, state)){
                    completed++;
                }
            }
        }

        return completed / total;
    }

    isValid(key, state){
        if(!key) return false;
        for(let field of this.validations[key] || []){
            if(!state[field]) return false;
        }
        return true;
    }
}

module.exports = new Validator();