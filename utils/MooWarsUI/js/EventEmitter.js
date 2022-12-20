// Implements a basic event emitter for listening to and emitting events
export class EventEmitter {

    constructor() {
        this.callbacks = {};
    }

    on(event, callback) {
        if(typeof callback != 'function') {
            throw('cannot add non-function event listenr');
        }

        if(!this.callbacks[event]) {
            this.callbacks[event] = [];
        }

        this.callbacks[event].push(callback);

        return this;
    }

    emit(event, data) {
        let callbacks = this.callbacks[event];
        if(callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }

}
