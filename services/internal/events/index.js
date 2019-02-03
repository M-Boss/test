const EventEmitter = require('events');
const fs        = require("fs");
const path      = require("path");

module.exports = class Events {
    constructor(observersDirectory){
        this.emitter = new EventEmitter();
        this.loadObservers(observersDirectory);
    }

    loadObservers(dir){
        console.log("loadObservers()", dir);
        const emitter = this.emitter;
        fs.readdirSync(dir)
            .filter(function(file) {
                return (file.indexOf(".") !== 0) && (file !== "index.js") /*&& (file.endsWith(".js"))*/;
            })
            .forEach((file) => {
                let observer = require(path.join(dir, file));
                console.log("Observer: ", file, observer.event);
                this.on(observer.event, observer.callback);
            });
    };

    emit(event, data) {
        this.emitter.emit(event, data);
    }

    // not an event, more like a command that should be carried out once.
    handleOnce(event, data) {
        this.emitter.emit(event, data);
    }

    on(event, callback) {
        this.emitter.on(event, callback);
    }
}
