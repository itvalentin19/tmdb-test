import React, { useEffect, useState } from "react";
import StarIcon from "./icons/StarIcon";
import Link from "next/link";

const MovieItem = ({ details }) => {
  const [isHighlighted, setIsHighlighted] = useState(
    localStorage.getItem(`movie_${details.id}_highlighted`) === "true"
  );

  const toggleHighlight = () => {
    const newValue = !isHighlighted;
    setIsHighlighted(newValue);
    localStorage.setItem(
      `movie_${details.id}_highlighted`,
      newValue.toString()
    );
  };

  return (
    <div>
      <article
        class={`p-6 rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ${
          isHighlighted ? "bg-gray-100" : "bg-white"
        }`}
        id={`movie_${details.id}`}
      >
        <div class="flex justify-between items-center mb-5 text-gray-500">
          <span class="bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800 ">
            <svg
              class="mr-1 w-3 h-3"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
            </svg>
            {details.original_language}
          </span>

          <div
            onClick={toggleHighlight}
            className={`cursor-pointer ${
              isHighlighted ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            <StarIcon />
          </div>
        </div>
        <div>
          {details.poster_path && (
            <img
              src={`https://image.tmdb.org/t/p/w500${details.poster_path}`}
              className="w-full"
              alt={details.title}
            />
          )}
        </div>
        <Link
          href={`https://www.themoviedb.org/movie/${details.id}-${details.title
            .toLowerCase()
            .split(" ")
            .join("-")}`}
        >
          <h2 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-2">
            {details.title}
          </h2>
          <p class="mb-5 font-light text-gray-500 dark:text-gray-400">
            {details.overview.slice(0, 80)}.....
          </p>
          <div class="flex justify-between items-center">
            <span class="text-sm">{details.vote_average}</span>
            <div class="flex items-center space-x-4">
              <span class="text-sm">{details.release_date}</span>
            </div>
          </div>
        </Link>
      </article>
    </div>
  );
};

export default MovieItem;
