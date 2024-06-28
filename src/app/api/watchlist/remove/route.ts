import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RequestBody {
  tmdbId: number;
}

export async function POST(request: Request) {
  const { tmdbId }: RequestBody = (await request.json()) as RequestBody;

  try {
    const movie = await prisma.movie.delete({
      where: {
        tmdbId,
      },
    });
    return NextResponse.json(movie);
  } catch (error) {
    return NextResponse.json(
      { error: "Error removing movie from watchlist" },
      { status: 500 }
    );
  }
}
