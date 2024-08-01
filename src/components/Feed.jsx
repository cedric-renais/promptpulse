'use client';

import '@sass/components/Feed.scss';

import { useSearchParams } from 'next/navigation'; // Importer le hook pour obtenir les paramètres de la requête
import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="feed__prompt-card-list">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);

  const searchParams = useSearchParams();
  const refresh = searchParams.get('refresh'); // Obtenir le paramètre de requête

  // States pour la recherche
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();

    setAllPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]); // Dépendre du paramètre de requête pour rafraîchir

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i'); // (case-insensitive)
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (event) => {
    clearTimeout(searchTimeout);
    setSearchText(event.target.value);

    // Méthode de débounce
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(event.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  return (
    <section className="feed">
      <form className="feed__form">
        <label className="feed__label" htmlFor="search">
          <span className="u-sr-only">
            Cherche un tag ou un nom d'utilisateur
          </span>
          <input
            className="feed__input"
            type="text"
            id="search"
            name="search"
            placeholder="Cherche un tag ou un nom d'utilisateur"
            value={searchText}
            onChange={handleSearchChange}
            required
          />
        </label>
      </form>

      {/* Tous les Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
