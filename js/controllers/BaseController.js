import pubSub from '../services/PubSub.js'

export default class BaseController {

    constructor(element) {
        this.element = element;
        this.pubSub = pubSub;
        this.events = {
            START_LAODING: 'startLoading',
            FINISH_LOADING: 'finishLoading',
            ERROR: 'error',
            SEARCH: 'search',
        }
    }

    subscribe(eventName, eventHandler) {
        this.pubSub.subscribe(eventName, eventHandler);
    }

    publish(eventName, eventData) {
        this.pubSub.publish(eventName, eventData);
    }
}