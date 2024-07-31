import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@sass/globals.scss';

export const metadata = {
  title: 'PromptPulse',
  description:
    'PromptPulse est une plateforme permettant de découvrir, créer et partager des prompts.',
};

export const RootLayout = ({ children }) => {
  return (
    <html lang="fr">
      <body>
        <Provider>
          <div className="main" />
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
