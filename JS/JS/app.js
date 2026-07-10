// js/app.js

document.addEventListener('DOMContentLoaded', async () => {
    // 1. Apne HTML ke mutabiq sahi ID ko select karo
    const userProfileEl = document.getElementById('user-profile'); 

    try {
        // Fake delay simulate kar rahe hain
        const userData = await new Promise((resolve) => {
            setTimeout(() => {
                resolve({ name: "Sohail" });
            }, 1500);
        });

        // 2. MAIN BUG FIX: Text ko badal kar user ka naam dikhao
        if (userProfileEl) {
            userProfileEl.textContent = `User: ${userData.name}`; 
        }

    } catch (error) {
        console.error("User profile load nahi ho paya:", error);
        if (userProfileEl) {
            userProfileEl.textContent = "Error loading user";
        }
    }
}); // Ye bracket sahi se close hona chahiye