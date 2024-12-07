import React, { useState, useEffect } from 'react';

const ITEMS_PER_PAGE = 30;
const CATEGORIES = ['All', 'Tech', 'Business', 'Science', 'AI'];

const RetroNewsAggregator = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const fetchNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&apiKey=deb3d649e5dc428ab1506e682fdf6453`
      );
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setArticles(data.articles || []);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const filteredArticles = selectedCategory === 'all'
    ? articles
    : articles.filter(article => article.title.toLowerCase().includes(selectedCategory.toLowerCase()));

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#f6f6ef]">
      {/* Header */}
      <div className="bg-[#000] h-7 text-white">
        <div className="max-w-5xl mx-auto px-2 py-1 flex items-center gap-2">
          <span className="font-bold text-sm">Newsflash</span>
          <nav className="flex gap-2 text-xs">
            {['new', 'past', 'comments', 'ask', 'show', 'jobs', 'submit'].map(item => (
              <a key={item} href="#" className="hover:underline">{item}</a>
            ))}
          </nav>
          <div className="flex-1" />
          <a href="#" className="text-xs hover:underline">login</a>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-5xl mx-auto px-2 py-2 flex gap-2 text-xs border-b border-[#000]">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
            className={`hover:underline ${selectedCategory === category ? 'text-[#ff6600] font-bold' : 'text-gray-500'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-2">
        {loading ? (
          <p className="p-2 text-sm">Loading...</p>
        ) : (
          <div className="pt-2">
            {paginatedArticles.map((article, index) => (
              <div key={index} className="flex gap-1 text-xs leading-5">
                <span className="text-gray-500 w-4 flex-shrink-0 text-right">
                  {startIndex + index + 1}.
                </span>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline text-[#000000]"
                    >
                      {article.title}
                    </a>
                    <span className="text-gray-500">
                      ({new URL(article.url).hostname})
                    </span>
                  </div>
                  <div className="text-gray-500">
                    {article.author && `by ${article.author} `}
                    {new Date(article.publishedAt).toLocaleDateString()} |
                    <a href="#" className="hover:underline ml-1">
                      {Math.floor(Math.random() * 50)} comments
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="py-4 text-xs">
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage(p => p + 1)}
              className="text-[#000000] hover:underline"
            >
              More
            </button>
          )}
          <span className="text-gray-500 ml-2">
            Page {currentPage} of {totalPages}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-5xl mx-auto px-2 py-4 mt-4 border-t text-xs text-gray-500 flex gap-2 justify-center">
        <a href="#" className="hover:underline">Guidelines</a> |
        <a href="#" className="hover:underline">FAQ</a> |
        <a href="#" className="hover:underline">Lists</a> |
        <a href="#" className="hover:underline">API</a> |
        <a href="#" className="hover:underline">Security</a> |
        <a href="#" className="hover:underline">Legal</a> |
        <a href="#" className="hover:underline">Contact</a>
      </div>
    </div>
  );
};

export default RetroNewsAggregator;