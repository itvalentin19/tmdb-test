"use client";
import { useEffect, useState } from "react";
import MovieItem from "./components/MovieItem";
import Pagination from "./components/Pagination";
import Spinner from "./components/icons/Spinner";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [order, setOrder] = useState("desc");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchMovies = async (orderArg, pageArg) => {
    setLoading(true);
    const apiUrl = new URL("https://api.themoviedb.org/3/discover/movie");
    apiUrl.searchParams.append("include_adult", "false");
    apiUrl.searchParams.append("include_video", "false");
    apiUrl.searchParams.append("language", "en-US");
    apiUrl.searchParams.append("page", pageArg || 1);
    apiUrl.searchParams.append(
      "sort_by",
      orderArg ? `popularity.${orderArg}` : "popularity.desc"
    );
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_TOKEN,
          accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setLoading(false)
      setMovies(data.results);
      console.log(data);
    } catch (error) {
      setLoading(false)
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleOrder = (e) => {
    const val = e.target.value;
    setOrder(val);
    fetchMovies(val, page);
  };

  const handlePage = (e) => {
    let modifiedValue;
    if (e === "prev") {
      modifiedValue = page - 1 < 0 ? 1 : page - 1;
      fetchMovies(order, modifiedValue);
    } else {
      modifiedValue = page + 1;
      fetchMovies(order, modifiedValue);
    }
    setPage(modifiedValue);
  };

  return (
    <section class="bg-white dark:bg-gray-900">
      <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
          <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            TMDB movies
          </h2>
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            <div className="flex justify-end items-center my-2">
              <select className="border p-2" value={order} onChange={handleOrder}>
                <option value="desc">DESC</option>
                <option value="asc">ASC</option>
              </select>
            </div>
            <div class="grid gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
              {movies.length > 0 &&
                movies.map((movie) => (
                  <MovieItem details={movie} key={movie.id} />
                ))}
            </div>
            <Pagination handlePage={handlePage} />
          </>
        )}
      </div>
    </section>
  );
}
