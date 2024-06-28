"use client";

import Image from "next/image";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="flex p-4 relative bg-white rounded-lg shadow-md border border-gray-200 mb-4">
      <div className="relative w-24 h-36 mr-4 flex-shrink-0">
        <Link href={`/movie/${movie.id}`} passHref>
          <div className="relative w-full h-full">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="25vw"
              className="rounded cursor-pointer"
            />
          </div>
        </Link>
      </div>
      <div className="flex flex-col flex-grow">
        <div>
          <Link href={`/movie/${movie.id}`} passHref>
            <h3 className="text-lg font-bold cursor-pointer">{movie.title}</h3>
          </Link>
          <p className="text-sm text-gray-500">{movie.release_date}</p>
        </div>
        <p className="text-sm mt-2 text-gray-700">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieCard;
