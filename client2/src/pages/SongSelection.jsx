import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SongSelection() {
  const [songs, setSongs] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const user = useSelector((state) => state.user.user.user.user);

  const getSongs = async () => {
    try {
      const response = await fetch(
        "https://api.spotify.com/v1/search?q=genre:all&type=track&limit=10",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      setSongs(data.tracks.items);
    } catch (error) {
      setError("Error fetching data");
    }
  };
  const getToken = async () => {
    try {
      //   curl -X POST "https://accounts.spotify.com/api/token" \
      //  -H "Content-Type: application/x-www-form-urlencoded" \
      //  -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"

      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: "grant_type=client_credentials&client_id=cf007d9ab46e400b818407c1b547a9f4&client_secret=740909e5f5464ffbb2454accaa00f132",
      });

      const data = await response.json();

      setToken(data.access_token);
      getSongs();
    } catch (error) {
      setError("Error fetching data");
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <div>
      <h1>Thanks for choosing character</h1>
      <h2>{user.username}</h2>
      <img
        src={user?.profilePicture}
        className=" h-20 w-20 rounded-full"
        alt="profile pic"
      />

      {user?.character === "Professor" ? <h1>Professor</h1> : <h1>Student</h1>}

      <h3>Choose a Song</h3>

      {songs.map((song) => (
        <div key={song.id} className="flex gap-10">
          <div className="flex items-center justify-center">
            <h4>{song.name}</h4>
            <img
              className="w-20 h-20 rounded-full"
              src={song.album.images[0].url}
              alt="song"
            />
            <audio controls>
              <source src={song.preview_url} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      ))}
    </div>
  );
}
