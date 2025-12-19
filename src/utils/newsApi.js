import { handleServerResponse } from "./api";
import { apiKey } from "./constants";
import fallback from "../assets/images/fallback.jpg";

export const filterNewsData = (data) => {
  const publishedDate = new Date(data.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return {
    title: data.title ?? "No title",
    description: data.description ?? "",
    source: data.source?.name ?? "Unknown source",
    publishedAt: publishedDate,
    url: data.url,
    image: data.urlToImage ?? fallback,
  };
};

export const searchNews = (query) => {
  return fetch(
    `${newsApiBaseUrl}?` +
      new URLSearchParams({
        q: query,
        language: "en",
        sortBy: "publishedAt",
        pageSize: 100,
        apiKey,
      })
  ).then(handleServerResponse);
};

const newsApiBaseUrl =
  process.env.NODE_ENV === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";
