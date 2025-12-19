export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

let savedArticles = JSON.parse(localStorage.getItem("savedArticles")) || [];

export function getItems() {
  return Promise.resolve(savedArticles);
}

export function saveArticle(article) {
  const publishedDate = new Date(article.publishedAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return new Promise((resolve) => {
    const savedArticle = {
      _id: Math.random().toString(36),
      title: article.title,
      description: article.description,
      source: article.source,
      publishedAt: publishedDate,
      url: article.url,
      image: article.image,
      keyword: article.keyword,
    };

    savedArticles = [savedArticle, ...savedArticles];
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
    resolve(savedArticle);
  });
}

export function removeItem(itemId) {
  return new Promise((resolve) => {
    savedArticles = savedArticles.filter((item) => item._id !== itemId);
    localStorage.setItem("savedArticles", JSON.stringify(savedArticles));
    resolve();
  });
}
