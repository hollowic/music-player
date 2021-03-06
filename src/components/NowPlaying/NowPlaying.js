import React from "react";
import styles from "./NowPlaying.module.scss";
import PlayerControls from "./PlayerControls";
import PlayingBarLeft from "./PlayingBarLeft";
import PlayingBarRight from "./PlayingBarRight";
export default function NowPlaying({
  currentPlayback,
  setCurrentPlayback,
  skipToNext,
  skipToPrevious,
  play,
  pause,
  toggleShuffle,
  toggleRepeat,
  liked,
  setLiked,
  volume,
  toggleVolume,
  updateVolume,
  expandedView,
  setExpandedView,
}) {
  return (
    <div className={styles.playingContainer}>
      {currentPlayback.track_window?.current_track ? (
        <PlayingBarLeft
          currentPlayback={currentPlayback}
          liked={liked}
          setLiked={setLiked}
          expandedView={expandedView}
          setExpandedView={setExpandedView}
        />
      ) : (
        <div className={styles.placeholder}></div>
      )}
      <PlayerControls
        skipToNext={skipToNext}
        skipToPrevious={skipToPrevious}
        play={play}
        currentPlayback={currentPlayback}
        setCurrentPlayback={setCurrentPlayback}
        pause={pause}
        toggleShuffle={toggleShuffle}
        toggleRepeat={toggleRepeat}
      />
      <PlayingBarRight
        // loadMoreTracks={loadMoreTracks}
        // refreshToken={refreshToken}
        volume={volume}
        toggleVolume={toggleVolume}
        updateVolume={updateVolume}
      />
    </div>
  );
}
