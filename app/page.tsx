"use client";

import { useState } from "react";

export default function Home() {
  const [movie, setMovie] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const searchMovie = async () => {
    if (!movie.trim()) return;

    setLoading(true);

    const res = await fetch(`/api/movie?title=${movie}`);
    const data = await res.json();

    setResult(data);
    setLoading(false);
  };

  const sentimentColor =
    result?.sentiment === "Positive"
      ? "#22c55e"
      : result?.sentiment === "Negative"
      ? "#ef4444"
      : "#f59e0b"; // For Mixed/Neutral

  return (
    <div className="page">
      <div className="container">

        <h1 className="title">
          <span className="icon">🎬</span> Movie Sentiment Analyzer
        </h1>

        <p className="subtitle">
          Analyze movie sentiment using IMDb ratings
        </p>

        <div className="searchBox">

          <input
            type="text"
            placeholder="Search a movie..."
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchMovie();
            }}
          />

          {/* CHANGED BACK TO SEARCH */}
          <button onClick={searchMovie}>Search</button>

        </div>

        {loading && <p className="loading">Generating AI insights...</p>}

        {result && (
          <div className="movieCard">

            {result.poster && result.poster !== "N/A" && (
                <img src={result.poster} alt="poster" />
            )}

            <div className="movieInfo">

              <h2>
                {result.title} {result.year && `(${result.year})`}
              </h2>

              <div className="badges">

                <span className="rating">
                  ⭐ {result.rating}
                </span>

                <span
                  className="sentiment"
                  style={{ background: sentimentColor }}
                >
                  {result.sentiment}
                </span>

              </div>

              {/* AI SUMMARY SECTION */}
              <div className="ai-insight">
                <h3>🤖 AI Audience Insight</h3>
                <p>{result.aiSummary}</p>
              </div>

              <p><b>Genre:</b> {result.genre}</p>
              <p><b>Director:</b> {result.director}</p>
              <p><b>Cast:</b> {result.actors}</p>
              <p><b>Runtime:</b> {result.runtime}</p>
              <p><b>Language:</b> {result.language}</p>

              <p className="plot">
                <b>Plot Summary:</b> {result.overview}
              </p>

            </div>

          </div>
        )}

      </div>

<style jsx>{`
.page{
  min-height:100vh;
  background:
    radial-gradient(circle at 20% 20%,#6366f1 0%,transparent 40%),
    radial-gradient(circle at 80% 80%,#06b6d4 0%,transparent 40%),
    linear-gradient(135deg,#020617,#0f172a,#020617);
  display:flex;
  justify-content:center;
  padding-top:70px;
  padding-bottom:70px;
  font-family:Arial, Helvetica, sans-serif;
  color:white;
}

.container{
  width:1050px;
  max-width:95%;
}

.title{
  text-align:center;
  font-size:50px;
  font-weight:800;
  margin-bottom:12px;
  background:linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
}

.icon{
  margin-right:8px;
  font-size:50px;
  filter:
    drop-shadow(0 0 8px #38bdf8)
    drop-shadow(0 0 18px #06b6d4);
}

.subtitle{
  text-align:center;
  color:#94a3b8;
  margin-bottom:45px;
  font-size:18px;
}

.searchBox{
  display:flex;
  justify-content:center;
  gap:12px;
  margin-bottom:40px;
}

input{
  padding:14px 18px;
  width:350px;
  border-radius:10px;
  border:none;
  outline:none;
  font-size:16px;
  background:#1e293b;
  color:white;
  transition:all .3s ease;
}

input::placeholder{
  color:#94a3b8;
}

input:focus{
  transform:scale(1.03);
  box-shadow:0 0 0 2px #6366f1,0 0 15px rgba(99,102,241,.6);
}

button{
  padding:14px 26px;
  border:none;
  border-radius:10px;
  background:linear-gradient(135deg,#6366f1,#4f46e5);
  color:white;
  font-weight:bold;
  cursor:pointer;
  font-size:16px;
  transition:all .3s ease;
}

button:hover{
  transform:scale(1.05);
  box-shadow:0 12px 30px rgba(99,102,241,.7);
}

.loading{
  text-align:center;
  color:#cbd5f5;
  font-size:18px;
}

.movieCard{
  display:flex;
  flex-wrap: wrap;
  gap:35px;
  background:rgba(30,41,59,0.75);
  backdrop-filter:blur(14px);
  border:1px solid rgba(255,255,255,0.05);
  border-radius:18px;
  padding:35px;
  box-shadow:0 20px 45px rgba(0,0,0,.7);
  transition:all .35s ease;
}

.movieCard:hover{
  transform:translateY(-5px);
  box-shadow:0 30px 60px rgba(0,0,0,.9);
}

img{
  width:320px;
  height:auto;
  object-fit: cover;
  border-radius:14px;
  transition:all .35s ease;
  box-shadow: 0 10px 25px rgba(0,0,0,0.5);
}

.movieInfo{
  flex:1;
  min-width: 300px;
}

.movieInfo h2{
  margin-bottom:14px;
  font-size:36px;
  font-weight:800;
  color:#38bdf8;
  letter-spacing:1px;
}

.badges{
  display:flex;
  gap:12px;
  margin-bottom:20px;
}

.rating{
  background:#334155;
  padding:6px 12px;
  border-radius:6px;
  font-size:15px;
}

.sentiment{
  padding:6px 14px;
  border-radius:6px;
  font-weight:bold;
  font-size:15px;
}

.ai-insight {
  margin: 20px 0;
  padding: 20px;
  background: rgba(99,102,241,0.15);
  border-radius: 12px;
  border-left: 4px solid #6366f1;
}

.ai-insight h3 {
  font-size: 18px;
  color: #a5b4fc;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.ai-insight p {
  line-height: 1.6;
  color: #e2e8f0;
  font-style: italic;
}

.plot{
  margin-top:20px;
  line-height:1.7;
  color:#cbd5f5;
  padding-top: 15px;
  border-top: 1px solid rgba(255,255,255,0.1);
}

`}</style>

    </div>
  );
}