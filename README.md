# Spotify Wrapped Collector

A lightweight script for collecting your Spotify playback data to create a personal Spotify Wrapped.
Just a little personal project, feel free to contribute or discuss a feature.

## Features

-   Fetches recently played tracks from Spotify.
-   Stores track details in a SQLite database.

## Installation

### Prerequisites

-   [Bun](https://bun.sh/)
-   [Spotify API credentials](https://developer.spotify.com/) (Client ID, Client Secret, Refresh Token).

### Setup

1. Clone this repository:

    ```bash
    git clone https://github.com/0xrouss/spotify-wrapped-collector.git
    cd spotify-wrapped-collector
    ```

2. Configure environment variables. Create a .env file:

    ```bash
    CLIENT_ID=your_client_id
    CLIENT_SECRET=your_client_secret
    REFRESH_TOKEN=your_refresh_token
    DATABASE_PATH=spotify_tracks.db
    FETCH_INTERVAL=3600
    ```

3. Run the script:
    ```bash
    bun index.js
    ```
