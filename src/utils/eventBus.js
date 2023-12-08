// EventBus.js
import { createApp } from 'vue';

const app = createApp({});
const eventBus = {
    callbacks: {},
    $on(event, callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }
        this.callbacks[event].push(callback);
    },
    $emit(event, ...args) {
        if (this.callbacks[event]) {
            this.callbacks[event].forEach(callback => {
                callback(...args);
            });
        }
    },
};

app.config.globalProperties.$eventBus = eventBus;

export default app;
