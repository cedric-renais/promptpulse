import '@sass/components/Form.scss';
import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="form">
      <h1 className="form__title u-head-text">{type} ton prompt</h1>
      <p className="form__description u-desc-text">
        Et partage-le avec tout le monde pour laisser ta créativité s'éclater
        sur n'importe quelle plateforme d'IA !
      </p>

      <form className="form__content" onSubmit={handleSubmit}>
        <label className="form__label" htmlFor="prompt">
          Ton prompt
          <textarea
            className="form__textarea"
            id="prompt"
            name="prompt"
            value={post.prompt}
            onChange={(event) =>
              setPost({ ...post, prompt: event.target.value })
            }
            placeholder="Pulse ton prompt ici..."
            required
          />
        </label>
        <label className="form__label" htmlFor="tag">
          Tag <span>(#produit, #webdev, #idée...)</span>
          <input
            className="form__input"
            id="tag"
            name="tag"
            value={post.tag}
            onChange={(event) => setPost({ ...post, tag: event.target.value })}
            placeholder="#tag"
            required
          />
          <div className="form__actions">
            <Link href="/" className="form__cancel">
              Annule
            </Link>
            <button
              type="submit"
              className="form__submit"
              disabled={submitting}
            >
              {submitting ? 'En cours...' : `${type}`}
            </button>
          </div>
        </label>
      </form>
    </section>
  );
};
export default Form;
