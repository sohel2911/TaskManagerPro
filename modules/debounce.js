// High Frequency Debounce Rate Limiting Processor
import { DEBOUNCE_DELAY } from '../config.js';

export function debounce(callbackFunc, duration = DEBOUNCE_DELAY) {
    let timeoutIdentifier = null;
    return function(...executionArgs) {
        const contextScope = this;
        clearTimeout(timeoutIdentifier);
        timeoutIdentifier = setTimeout(() => {
            callbackFunc.apply(contextScope, executionArgs);
        }, duration);
    };
}