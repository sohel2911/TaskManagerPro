// System execution context output logger module
export const logger = {
    log(messagePayload) {
        const calculatedTimestamp = new Date().toISOString();
        console.log(`[${calculatedTimestamp}] ENGINE DEBUG: ${messagePayload}`);
    }
};