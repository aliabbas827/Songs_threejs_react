import React, { useState } from "react";
import { AudioRecorder } from "react-audio-voice-recorder";

const Recorder = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    console.log(url);
    setAudioUrl(url);
  };
  return (
    <div className="flex">
      <AudioRecorder
        record={true}
        title={"New recording"}
        audioURL={(audioUrl) => {
          addAudioElement(audioUrl);
        }}
        onRecordingComplete={(blob) => {
          addAudioElement(blob);
        }}
        showUIAudio
      />

      {audioUrl && (
        <audio
          controls
          src={audioUrl}
          style={{ width: "100%", marginTop: "20px" }}
        />
      )}
    </div>
  );
};

export default Recorder;
