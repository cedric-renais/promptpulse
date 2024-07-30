import Nav from '@components/Nav';
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
        <div className="main" />
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
