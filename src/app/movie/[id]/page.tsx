"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import SkeletonLoader from "./loadingState";

interface MovieDetails {
  id: number;
  title: string;
  release_date: string;
  genres: { id: number; name: string }[];
  runtime: number;
  overview: string;
  poster_path: string;
  vote_average: number;
  credits: {
    cast: { name: string; character: string; profile_path: string }[];
  };
}

interface WatchlistItem {
  tmdbId: number;
}

const MovieDetailsPage = () => {
  const { id } = useParams();
  const movieId = Array.isArray(id) ? id[0] : id;
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [viewMore, setViewMore] = useState<boolean>(false);
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=credits`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch movie details");
        }

        const data = (await response.json()) as MovieDetails;
        setMovie(data);

        const watchlistResponse = await fetch("/api/watchlist/get");

        if (!watchlistResponse.ok) {
          throw new Error("Failed to fetch watchlist");
        }

        const watchlist = (await watchlistResponse.json()) as {
          movies: WatchlistItem[];
        };

        const isMovieInWatchlist = watchlist.movies.some(
          (item: WatchlistItem) => item.tmdbId === data.id
        );
        setIsInWatchlist(isMovieInWatchlist);
      } catch (error) {
        alert("Error fetching movie details or watchlist");
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      void fetchMovieDetails();
    }
  }, [movieId]);

  const handleAddToWatchlist = async () => {
    if (movie) {
      try {
        const response = await fetch("/api/watchlist/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tmdbId: movie.id,
            title: movie.title,
            releaseDate: movie.release_date,
            posterPath: movie.poster_path,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to add movie to watchlist");
        }

        setIsInWatchlist(true);
      } catch (error) {
        alert("Error adding movie to watchlist");
      }
    }
  };

  const handleRemoveFromWatchlist = async () => {
    if (movie) {
      try {
        const response = await fetch("/api/watchlist/remove", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            tmdbId: movie.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to remove movie from watchlist");
        }

        setIsInWatchlist(false);
      } catch (error) {
        alert("Error removing movie from watchlist");
      }
    }
  };

  if (loading) {
    return <SkeletonLoader />;
  }

  if (!movie) {
    return <p>Movie not found</p>;
  }

  return (
    <>
      <div className="relative bg-cover bg-center h-[29rem] pt-10 flex items-center justify-center">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`}
          alt={movie?.title}
          fill
          sizes="100vw"
          className="absolute inset-0 z-0 object-cover object-center blur-lg"
        />
        <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
        <div className="relative z-20 flex flex-col md:flex-row items-center w-full px-8 py-6">
          <div className="relative w-48 h-72 mb-4 md:mb-0 md:mr-8">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie?.title}
              fill
              sizes="50vw"
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col text-white w-full">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold mb-2">
                {movie?.title} ({new Date(movie?.release_date).getFullYear()})
              </h1>
              <p className="text-lg mb-2">
                {movie?.genres?.map((genre) => genre?.name).join(", ")}
              </p>
              <p className="text-lg mb-2">Runtime: {movie.runtime} minutes</p>
              <div className="flex items-center mb-4">
                <div className="relative flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mr-2">
                  <p className="text-white font-bold text-center">
                    {Math.floor(movie.vote_average * 10)}%
                  </p>
                </div>
                <p className="text-lg">User Score</p>
              </div>
              <div className="flex space-x-4 mb-4">
                {isInWatchlist ? (
                  <button
                    onClick={() => void handleRemoveFromWatchlist()}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Remove from Watchlist
                  </button>
                ) : (
                  <button
                    onClick={() => void handleAddToWatchlist()}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add to Watchlist
                  </button>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-lg">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-4">Series Cast</h2>
          {!viewMore ? (
            <div className="flex overflow-x-auto space-x-4 pb-4">
              {movie?.credits?.cast?.slice(0, 9).map((actor, index) => (
                <div
                  key={index}
                  className="flex flex-col relative items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="relative w-24 h-24 mb-2">
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                          : "/placeholder.png"
                      }
                      alt={actor.name}
                      fill
                      sizes="50vw"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="text-lg font-bold">{actor.name}</p>
                  <p className="text-sm text-gray-500">as {actor.character}</p>
                </div>
              ))}
              {movie.credits.cast.length > 9 && (
                <div
                  onClick={() => setViewMore(true)}
                  className="flex flex-col items-center justify-center bg-white p-4 rounded-lg shadow-md cursor-pointer"
                >
                  <p className="text-lg font-bold text-blue-500">View More</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {movie.credits.cast.map((actor, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="relative w-24 h-24 mb-2">
                    <Image
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                          : "/placeholder.png"
                      }
                      alt={actor.name}
                      fill
                      sizes="50vw"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="text-lg font-bold">{actor.name}</p>
                  <p className="text-sm text-gray-500">as {actor.character}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieDetailsPage;
