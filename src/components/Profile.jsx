import PromptCard from '@components/PromptCard';
import '@sass/components/Profile.scss';

const Profile = ({ name, description, data, handleEdit, handleDelete }) => {
  return (
    <section className="profile">
      <h1 className="profile__title u-head-text">{name}</h1>
      <p className="profile__description u-desc-text">{description}</p>

      <div className="profile__prompt-card-list">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={() => handleEdit && handleEdit(post)}
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

export default Profile;
