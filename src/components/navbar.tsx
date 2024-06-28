"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <header className="bg-tmdbDarkBlue p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          passHref
          className="text-xl font-bold bg-gradient-to-r from-tmdbLightGreen to-tmdbLightBlue bg-clip-text text-transparent"
        >
          TMDB
        </Link>
        <nav className="flex space-x-4 text-white">
          <Link
            href="/watchlist?page=1&pageSize=10"
            passHref
            className="text-xl font-bold bg-gradient-to-r from-tmdbLightGreen to-tmdbLightBlue bg-clip-text text-transparent"
          >
            watchlist
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
