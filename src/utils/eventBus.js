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
    $off(event, callback) {
        if (this.callbacks[event]) {
            if (callback) {
                const index = this.callbacks[event].indexOf(callback);
                if (index !== -1) {
                    this.callbacks[event].splice(index, 1);
                }
            } else {
                delete this.callbacks[event];
            }
        }
    },
};

app.config.globalProperties.$eventBus = eventBus;

export default app;
