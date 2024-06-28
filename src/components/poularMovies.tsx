import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

type ApiResponse = {
  results: Movie[];
};

const PopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        );
        const data: ApiResponse = (await response.json()) as ApiResponse;
        if (Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        alert("Error fetching popular movies");
      } finally {
        setLoading(false);
      }
    }

    void fetchMovies();
  }, []);

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Popular Movies</h1>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col relative items-center bg-gray-200 p-4 rounded-lg shadow-md animate-pulse"
              >
                <div className="relative w-52 h-72 mb-2 bg-gray-300"></div>
                <div className="w-32 h-4 bg-gray-300 mt-2"></div>
                <div className="w-24 h-4 bg-gray-300 mt-2"></div>
              </div>
            ))
          : movies.slice(0, 12).map((movie) => (
              <div
                key={movie.id}
                className="flex flex-col relative items-center bg-white p-4 rounded-lg shadow-md"
              >
                <div className="relative w-52 h-72 mb-2">
                  <Link href={`/movie/${movie.id}`} passHref>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      fill
                      sizes="60vw"
                      className="object-cover"
                    />
                  </Link>
                </div>

                <Link href={`/movie/${movie.id}`} passHref>
                  <p className="text-md">{movie.title}</p>
                </Link>
                <p className="text-sm text-gray-500">{movie.release_date}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default PopularMovies;
