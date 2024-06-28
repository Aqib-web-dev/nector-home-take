"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";

import MovieCard from "@/app/search/movieCard";
import SkeletonLoader from "@/app/search/loadingState";

import Pagination from "@/components/pagination";
import Navbar from "@/components/navbar";
import SearchForm from "@/components/searchForm";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
}

interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const [searchQuery, setSearchQuery] = useState<string>(query || "");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [initialFetch, setInitialFetch] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      if (query) {
        try {
          const apiKey = process.env.NEXT_PUBLIC_API_KEY;
          const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;
          const response = await fetch(url);
          const data = (await response.json()) as MovieResponse;
          setMovies(data.results);
          setTotalPages(data.total_pages);
        } catch (error) {
          alert("Error fetching movies. Please try again later.");
        }
      }
      setLoading(false);
      setInitialFetch(false);
    };

    void fetchMovies();
  }, [query, page]);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/search?query=${searchQuery}&page=1`);
    }
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/search?query=${query}&page=${newPage}`);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full bg-white shadow z-50">
        <Navbar />
        <div className="container mx-auto py-4">
          <SearchForm
            placeholder="Search for a movie, tv show, person..."
            query={searchQuery}
            onQueryChange={handleQueryChange}
            onSubmit={handleSearch}
            onClear={handleClear}
          />
        </div>
      </div>
      <div className="container mx-auto mt-20 pt-8">
        {loading || initialFetch ? (
          <div className="flex flex-col gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))}
          </div>
        ) : movies.length === 0 && !initialFetch ? (
          <p className="text-center text-lg text-gray-500">No results found.</p>
        ) : (
          <div>
            <div className="flex flex-col gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            {movies.length > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
