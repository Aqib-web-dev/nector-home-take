import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MovieRequestBody {
  tmdbId: number;
  title: string;
  releaseDate: string;
  posterPath: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as MovieRequestBody;

    if (
      typeof body.tmdbId !== "number" ||
      typeof body.title !== "string" ||
      typeof body.releaseDate !== "string" ||
      typeof body.posterPath !== "string"
    ) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { tmdbId, title, releaseDate, posterPath } = body;

    const movie = await prisma.movie.create({
      data: {
        tmdbId,
        title,
        releaseDate,
        posterPath,
      },
    });

    return NextResponse.json(movie);
  } catch (error) {
    alert("Error adding movie to watchlist:");
    return NextResponse.json(
      { error: "Error adding movie to watchlist" },
      { status: 500 }
    );
  }
}
