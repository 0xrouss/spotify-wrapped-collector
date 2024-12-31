import { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, TOKEN_URL } from "./config";

export async function getAccessToken() {
    const params = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
    });

    const response = await fetch(TOKEN_URL, {
        method: "POST",
        body: params,
    });

    if (!response.ok) {
        throw new Error(`Error fetching access token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
}

export async function getRecentlyPlayed(accessToken, afterTimestamp) {
    const url = `https://api.spotify.com/v1/me/player/recently-played?limit=50&after=${afterTimestamp}`;
    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
        throw new Error(
            `Error fetching recently played tracks: ${response.statusText}`
        );
    }

    return (await response.json()).items;
}
