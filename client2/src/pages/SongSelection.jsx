import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Recorder from "../components/Recorder";

export default function SongSelection() {
  const [songs, setSongs] = useState([]);
  const [songSelected, setSongSelected] = useState("");
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const user = useSelector((state) => state.user.user.user.user);

  const getSongs = async () => {
    // only get music of song like karaoke
    try {
      const response = await fetch(
        `https://api.spotify.com/v1/albums/4Q6vPI3bZK7guOKUzr9ijk`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data);

      setSongs(data.tracks.items);
    } catch (error) {
      setError("Error fetching data");
    }
  };

  const getToken = async () => {
    try {
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
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Thanks for choosing a character
      </h1>
      <div className="flex items-center mb-4">
        <h2 className="text-xl mr-2">{user.username}</h2>
        <img
          src={user?.profilePicture}
          className="w-12 h-12 rounded-full"
          alt="profile pic"
        />
      </div>
      <div className="mb-4">
        {user?.character === "Professor" ? (
          <h1>Professor</h1>
        ) : (
          <h1>Student</h1>
        )}
      </div>

      <h3>Choose your music</h3>

      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-4 mb-4">
          <div>
            <h4 className="text-lg font-semibold">{song.name}</h4>
            <audio controls className="mt-1">
              <source src={song.preview_url} type="audio/mpeg" />
            </audio>
          </div>
        </div>
      ))}

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Sing a song</h3>
        {/*  or text */}
        <Recorder selectedUrl={songSelected} />
      </div>
    </div>
  );
}
