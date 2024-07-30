'use client';

import '@sass/components/Nav.scss';
import { getProviders, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Nav = () => {
  // Indique si l'utilisateur est connecté ou non (à remplacer par la vraie valeur)
  const isUserLoggedIn = true;

  // Liste des fournisseurs d'authentification
  const [providers, setProviders] = useState(null);

  // Récupère la liste des fournisseurs d'authentification
  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();

      // Met à jour la liste des fournisseurs d'authentification
      setProviders(response);
    };

    // Appelle la fonction pour récupérer les fournisseurs d'authentification
    fetchProviders();
  }, []);

  return (
    <nav className="nav">
      <Link className="nav__link" href="/">
        <Image
          className="nav__logo"
          src="/assets/images/logo.svg"
          alt="Logo de PromptPulse"
          width={30}
          height={30}
        />
        <p className="nav__logo-text">PromptPulse</p>
      </Link>

      {/* Nav - Desktop */}
      <div className="nav__desktop">
        {isUserLoggedIn ? (
          <div className="nav__user-actions">
            <Link className="nav__create-post" href="/create-post">
              Pulse un prompt
            </Link>
            <button className="nav__sign-out" type="button" onClick={signOut}>
              Déconnecte-toi
            </button>
            <Link className="nav__profile" href="/profile">
              <Image
                className="nav__profile-image"
                src="/assets/images/user.svg"
                alt="Image de profil"
                width={35}
                height={35}
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  className="nav__sign-in"
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Connecte-toi avec Google
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};
export default Nav;
