"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import SearchForm from "@/components/searchForm";
import PopularMovies from "@/components/poularMovies";

export default function Home() {
  const [query, setQuery] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?query=${query}&page=1`);
    }
  };

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="mx-auto">
      <div className="relative bg-cover bg-center h-[29rem] pt-10">
        <Image
          src="/searchBackground.jpg"
          alt="Search Background"
          fill
          className="z-0"
        />
        <div className="absolute inset-0 bg-blue-900 opacity-50"></div>
        <div className="relative z-20 flex flex-col justify-center h-full mx-6">
          <h1 className="text-4xl font-bold text-white">Welcome.</h1>
          <p className="text-2xl text-white mt-2 mb-4">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          <SearchForm
            placeholder="Search for a movie, tv show, person..."
            query={query}
            onQueryChange={handleQueryChange}
            onSubmit={handleSearch}
            onClear={handleClear}
          />
        </div>
      </div>
      <PopularMovies />
    </div>
  );
}
