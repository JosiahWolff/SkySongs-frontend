const clientId = "5c74068f906443e09e84fe80d8f60827";
const clientSecret = "ef47f6bb92a947a7afe6c37d81ecf00c";
const accessTokenUrl = "https://accounts.spotify.com/api/token";
const searchUrl = "https://api.spotify.com/v1/search";

// Authenticate Token
export async function getAccessToken() {
  const response = await fetch(accessTokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: "Basic " + btoa(clientId + ":" + clientSecret),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}

//seearch function
export async function searchTracks(accessToken, query) {
  const searchParams = new URLSearchParams({
    q: query,
    type: "track",
    limit: 12,
  });
  const url = `${searchUrl}?${searchParams}`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error(
        `Failed to search tracks: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data.tracks.items;
  } catch (error) {
    console.error("Error searching for tracks:", error.message);
    return [];
  }
}

//Fetch Valence from song
export async function fetchAudioFeaturesForTrack(trackId, accessToken) {
  const response = await fetch(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  );

  const audioFeaturesData = await response.json();
  return audioFeaturesData;
}
