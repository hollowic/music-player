import React, { useRef } from "react";
import { debounce } from "lodash";
import RecentlyPlayed from "./Home/RecentlyPlayed";
import PopularNewReleases from "./Home/PopularNewReleases";
import FeaturedPlaylists from "./Home/FeaturedPlaylists";
import PodCasts from "./Home/PodCasts";
import LikedSongs from "./LikedSongs/LikedSongs";
import Playlist from "./Playlists/Playlist";
import Library from "./Library/Library";
import Browse from "./Browse/Browse";
import SearchResult from "./Browse/SearchResult";
import styles from "./MainView.module.scss";

export default function MainView({
  currentPage,
  currentTab,
  name,
  profile,
  recentTracks,
  newReleases,
  featuredPlaylists,
  podcasts,
  play,
  pause,
  currentPlayback,
  savedTracks,
  currentPlaylistContext,
  playlists,
  topArtists,
  savedAlbums,
  categories,
  loadMoreSavedTracks,
  scrollPast,
  setScrollPast,
  queryResults,
  query,
}) {
  const likeRef = useRef(null);
  const playlistRef = useRef(null);
  const viewRef = useRef(null);

  const debouncedLoadMoreSavedTracks = debounce(loadMoreSavedTracks, 2000);

  const checkScrollPosition = (e) => {
    if (likeRef.current) {
      if (e.nativeEvent.target.scrollTop / likeRef.current.offsetHeight > 0.8) {
        debouncedLoadMoreSavedTracks();
      }
    }
    if (viewRef.current.scrollTop >= 380) {
      if (!scrollPast) setScrollPast(true);
    }

    if (viewRef.current.scrollTop < 380) {
      if (scrollPast) setScrollPast(false);
    }
  };

  return (
    <div className={styles.container} onScroll={(e) => checkScrollPosition(e)}>
      <div className={styles.viewNode} ref={viewRef}>
        <div className={styles.space}></div>

        {currentPage === "Home" && (
          <section className={styles.wrapper}>
            <RecentlyPlayed recentTracks={recentTracks} />
            <PodCasts podcasts={podcasts} />
            <PopularNewReleases newReleases={newReleases} />
            <FeaturedPlaylists
              message={featuredPlaylists.message}
              featuredPlaylists={featuredPlaylists.playlists}
            />
          </section>
        )}

        {currentPage === "Browse" && (
          <section className={styles.wrapper}>
            {!query && <Browse categories={categories} />}
            {query && (
              <SearchResult
                queryResults={queryResults}
                query={query}
                play={play}
                pause={pause}
                currentPlayback={currentPlayback}
              />
            )}
          </section>
        )}

        {currentPage === "Collection" && (
          <section className={styles.wrapper}>
            <Library
              currentTab={currentTab}
              playlists={playlists}
              podcasts={podcasts}
              topArtists={topArtists}
              savedAlbums={savedAlbums}
            />
          </section>
        )}

        {currentPage === "Liked" && (
          <LikedSongs
            ref={likeRef}
            name={name}
            profile={profile}
            play={play}
            pause={pause}
            currentPlayback={currentPlayback}
            savedTracks={savedTracks}
            loadMoreSavedTracks={loadMoreSavedTracks}
          />
        )}

        {currentPage === "Playlist" && (
          <Playlist
            ref={playlistRef}
            currentPlaylistContext={currentPlaylistContext}
            currentPlayback={currentPlayback}
          />
        )}
      </div>
    </div>
  );
}
