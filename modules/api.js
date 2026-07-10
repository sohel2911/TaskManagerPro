// Native Fetch Request Management Async Modules
export async function fetchSampleData() {
    try {
        const response = await fetch('js/data/sample.json');
        if(!response.ok) {
            throw new Error(`HTTP network error state context: ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        console.warn("API Hook Failure, falling back to empty standard dataset context.", err);
        return [];
    }
}