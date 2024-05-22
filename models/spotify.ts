import { URLSearchParams } from "node:url";
import { Artist } from "@/types/artists";

export class Spotify {
  private get accessToken(): string {
    return this._accessToken;
  }

  private _accessToken: string = "";

  constructor(
    private clientId: string,
    private clientSecret: string,
  ) {
    if (!clientId || !clientSecret)
      throw new Error("clientId and secretId is required.");
  }

  private async getToken() {
    const base64 = Buffer.from(
      `${this.clientId}:${this.clientSecret}`,
    ).toString("base64");
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
      headers: {
        Authorization: `Basic ${base64}`,
      },
    });
    const data = await response.json();
    this._accessToken = data.access_token as string;
    return data;
  }

  async getArtist(id: string): Promise<Artist> {
    if (!this.accessToken) await this.getToken();
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      headers: {
        Authorization: "Bearer " + this.accessToken,
      },
    });
    return await response.json();
  }

  async search(q: string) {
    if (!this.accessToken) await this.getToken();
    const searchParams = new URLSearchParams({
      type: ["artist", "playlist", "track", "album"],
      q,
    });
    const response = await fetch(
      `https://api.spotify.com/v1/search?${searchParams.toString()}`,
      {
        headers: {
          Authorization: "Bearer " + this.accessToken,
        },
      },
    );
    return await response.json();
  }
  async test() {
    if (!this.accessToken) await this.getToken();
    const response = await fetch(`https://api.spotify.com/v1/me/top/artists`, {
      headers: {
        Authorization: "Bearer " + this.accessToken,
      },
    });
    return await response.json();
  }
}

export const spotifyClient = new Spotify(
  process.env.SPOTIFY_CLIENT_ID as string,
  process.env.SPOTIFY_CLIENT_SECRET as string,
);
