import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const page = url.searchParams.get("page");
  const pageSize = url.searchParams.get("pageSize");

  try {
    let movies;
    let totalMovies;

    if (page && pageSize) {
      const pageInt = parseInt(page, 10);
      const pageSizeInt = parseInt(pageSize, 10);
      const skip = (pageInt - 1) * pageSizeInt;

      [movies, totalMovies] = await prisma.$transaction([
        prisma.movie.findMany({
          skip,
          take: pageSizeInt,
        }),
        prisma.movie.count(),
      ]);

      return NextResponse.json({
        movies,
        totalMovies,
        currentPage: pageInt,
        totalPages: Math.ceil(totalMovies / pageSizeInt),
      });
    } else {
      movies = await prisma.movie.findMany();
      totalMovies = await prisma.movie.count();

      return NextResponse.json({
        movies,
        totalMovies,
      });
    }
  } catch (error) {
    alert("Error fetching watchlist");
    return NextResponse.json(
      { error: "Error fetching watchlist" },
      { status: 500 }
    );
  }
}
