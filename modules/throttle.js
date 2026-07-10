// Frame rate execution throttle constraint wrapper
import { THROTTLE_DELAY } from '../config.js';

export function throttle(callbackFunc, duration = THROTTLE_DELAY) {
    let absoluteLockState = false;
    return function(...args) {
        const contextScope = this;
        if (!absoluteLockState) {
            callbackFunc.apply(contextScope, args);
            absoluteLockState = true;
            setTimeout(() => {
                absoluteLockState = false;
            }, duration);
        }
    };
}