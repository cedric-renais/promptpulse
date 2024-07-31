'use client';

import Feed from '@components/Feed';
import { getProviders, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const Home = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const SetUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    SetUpProviders();
  }, []);

  return (
    <section className="home">
      <h1 className="home__title u-head-text">
        Découvre & Partage
        <br className="home_title--break" />
        <span className="home__title--highlight">Les meilleurs Prompts</span>
      </h1>
      <p className="home__description u-desc-text">
        PromptPulse, c'est une plateforme où tu peux découvrir, créer et
        partager des prompts
      </p>
      {session?.user ? (
        <Feed />
      ) : (
        <p className="home__login">
          <span>Connecte-toi</span> pour découvrir les prompts !
        </p>
      )}
    </section>
  );
};

export default Home;
