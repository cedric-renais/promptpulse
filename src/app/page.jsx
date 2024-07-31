import Feed from '@components/Feed';

const Home = () => {
  return (
    <section className="home">
      <h1 className="home__title u-head-text">
        Découvre & Partage
        <br className="home__title--break" />
        <span className="home__title--highlight"> tes meilleurs Prompts</span>
      </h1>
      <p className="home__description u-desc-text">
        PromptPulse est une plateforme où tu peux découvrir, créer et partager
        des prompts
      </p>
      <Feed />
    </section>
  );
};
export default Home;
