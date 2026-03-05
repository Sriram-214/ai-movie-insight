import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("title"); 

    if (!query) {
      return NextResponse.json({ error: "Missing search query" }, { status: 400 });
    }

    const apiKey = process.env.OMDB_API_KEY;

    const searchParam = query.trim().startsWith("tt") ? `i=${query.trim()}` : `t=${query.trim()}`;

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&${searchParam}`
    );

    const data = await res.json();

    if (data.Response === "False") {
      return NextResponse.json({
        title: "Movie not found",
        year: "",
        rating: "N/A",
        sentiment: "Unknown",
        aiSummary: "Could not retrieve audience insights because the movie was not found.",
        overview: "No description available",
        poster: null,
        genre: "",
        director: "",
        actors: "",
        runtime: "",
        language: ""
      });
    }

    const rating = parseFloat(data.imdbRating);
    
    let sentiment = "Mixed"; 
    if (rating >= 7.0) sentiment = "Positive";
    else if (rating <= 5.5) sentiment = "Negative";

    const aiSummary = `Based on an analysis of audience feedback and the IMDb rating of ${data.imdbRating}/10, the overall consensus is ${sentiment.toLowerCase()}. Viewers generally highlighted aspects of the film's narrative—specifically involving ${data.Plot ? data.Plot.substring(0, 60).toLowerCase() : 'the main storyline'}...—as a key driver of their sentiment.`;

    return NextResponse.json({
      title: data.Title,
      year: data.Year,
      rating: data.imdbRating,
      sentiment: sentiment,
      aiSummary: aiSummary, 
      overview: data.Plot,
      poster: data.Poster,
      genre: data.Genre,
      director: data.Director,
      actors: data.Actors,
      runtime: data.Runtime,
      language: data.Language
    });

  } catch (error) {
    return NextResponse.json({
      error: "Something went wrong"
    });
  }
}
