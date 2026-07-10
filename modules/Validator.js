// Structural payload input sanitizer validations module
export const validator = {
    validateString(inputPayload) {
        if (!inputPayload || typeof inputPayload !== 'string') return false;
        return inputPayload.trim().length > 0;
    }
};