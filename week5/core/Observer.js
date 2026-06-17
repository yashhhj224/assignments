class Observer {
    constructor() {
        this.subscribers = []
    }

    subscribe(handler) {
        this.subscribers.push(handler)
    }

    notify(data) {
        this.subscribers.forEach(fn => fn(data))
    }
}

export default Observer
