import { getLastTimestamp, saveTracks } from "./src/db";
import { FETCH_INTERVAL } from "./src/config";
import { getAccessToken, getRecentlyPlayed } from "./src/api";

async function processRecentlyPlayed() {
    try {
        const accessToken = await getAccessToken();
        const lastTimestamp = getLastTimestamp();
        console.log(`Last recorded timestamp: ${lastTimestamp}`);

        const recentlyPlayed = await getRecentlyPlayed(
            accessToken,
            lastTimestamp
        );
        if (recentlyPlayed.length === 0) {
            console.log("No new tracks found.");
            return;
        }

        console.log("New tracks found:");
        recentlyPlayed.forEach((item) => {
            console.log(
                `- ${item.track.name} by ${item.track.artists
                    .map((a) => a.name)
                    .join(", ")} played at ${item.played_at}`
            );
        });

        saveTracks(recentlyPlayed);
    } catch (error) {
        console.error("Error processing recently played tracks:", error);
    }
}

(async () => {
    console.log("Starting script...");

    // Run the task immediately
    await processRecentlyPlayed();

    // Schedule the task at regular intervals
    setInterval(() => {
        processRecentlyPlayed().catch((error) => {
            console.error("Error in scheduled execution:", error);
        });
    }, FETCH_INTERVAL * 1000);
})();
