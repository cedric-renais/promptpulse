'use client';

import '@sass/components/Nav.scss';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    fetchProviders();
  }, []);

  const handleSignOut = () => {
    signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <nav className="nav">
      <Link className="nav__link" href="/">
        <Image
          className="nav__logo"
          src="/assets/images/logo.svg"
          alt="Logo de PromptPulse"
          width={35}
          height={35}
          priority={true}
        />
        <p className="nav__logo-text">PromptPulse</p>
      </Link>

      {/* Nav - Desktop */}
      <div className="nav__desktop">
        {session?.user ? (
          <div className="nav__user-actions">
            <Link className="nav__create-post" href="/create-prompt">
              Pulse un prompt
            </Link>
            <button
              className="nav__sign-out"
              type="button"
              onClick={handleSignOut}
            >
              Déconnecte-toi
            </button>
            <Link className="nav__profile" href="/profile">
              <Image
                className="nav__profile-image"
                src={session.user.image}
                alt={`Image de profil de ${session.user.name}`}
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

      {/* Nav - Mobile */}
      <div className="nav__mobile">
        {session?.user ? (
          <div
            className="nav__profile-mobile"
            tabIndex="0"
            role="button"
            aria-haspopup="true"
            aria-expanded={toggleDropdown}
            onClick={() => setToggleDropdown((prevState) => !prevState)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                setToggleDropdown((prevState) => !prevState);
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setToggleDropdown(false);
              }
            }}
          >
            <Image
              className="nav__profile-image"
              src={session.user.image}
              alt={`Image de profil de ${session.user.name}`}
              width={35}
              height={35}
            />
            {toggleDropdown && (
              <div className="nav__dropdown">
                <Link
                  className="nav__dropdown-link"
                  href="/profile"
                  onClick={() => setToggleDropdown(false)}
                >
                  Ton profil
                </Link>
                <Link
                  className="nav__dropdown-link"
                  href="/create-prompt"
                  onClick={() => setToggleDropdown(false)}
                >
                  Pulse un prompt
                </Link>
                <button
                  className="nav__dropdown-sign-out"
                  type="button"
                  onClick={() => {
                    setToggleDropdown(false);
                    handleSignOut();
                  }}
                >
                  Déconnecte-toi
                </button>
              </div>
            )}
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
