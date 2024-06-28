"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import SkeletonLoader from "./loadingState";
import Pagination from "@/components/pagination";

interface Movie {
  id: number;
  tmdbId: number;
  title: string;
  releaseDate: string;
  posterPath: string;
}

interface WatchlistResponse {
  movies: Movie[];
  totalPages: number;
}

const WatchListPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [totalPages, setTotalPages] = useState<number>(1);

  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;

  const fetchWatchList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/watchlist/get?page=${page}&pageSize=${pageSize}`
      );
      const data: WatchlistResponse =
        (await response.json()) as WatchlistResponse;
      setMovies(data.movies);
      setTotalPages(data.totalPages);
    } catch (error) {
      alert("Error fetching watchList");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    void fetchWatchList();
  }, [fetchWatchList]);

  const handleRemoveFromWatchlist = async (tmdbId: number) => {
    try {
      const response = await fetch("/api/watchlist/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tmdbId }),
      });

      if (response.ok) {
        setMovies((prevMovies) =>
          prevMovies.filter((movie) => movie.tmdbId !== tmdbId)
        );

        if (page > 1 && movies.length === 1) {
          handlePageChange(page - 1);
        } else {
          await fetchWatchList();
        }
      } else {
        alert("Error removing movie from watchlist");
      }
    } catch (error) {
      alert("Error removing movie from watchlist");
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/watchlist?page=${newPage}&pageSize=${pageSize}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">My Watchlist</h1>
      <div className="grid relative grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 12 }).map((_, index) => (
            <SkeletonLoader key={index} />
          ))
        ) : movies.length === 0 ? (
          <p>Your watchlist is empty</p>
        ) : (
          movies.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md"
            >
              <div className="relative w-24 h-36 mb-2">
                <Link href={`/movie/${movie.tmdbId}`} passHref>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.title}
                    fill
                    sizes="25vw"
                    className="rounded-lg object-cover"
                  />
                </Link>
              </div>
              <Link href={`/movie/${movie.tmdbId}`} passHref>
                <h2 className="text-lg font-bold">{movie.title}</h2>
              </Link>
              <p className="text-sm text-gray-500">{movie.releaseDate}</p>
              <button
                onClick={() => void handleRemoveFromWatchlist(movie.tmdbId)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded"
              >
                Remove from Watchlist
              </button>
            </div>
          ))
        )}
      </div>
      {!loading && movies.length > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default WatchListPage;
