'use client';

import '../sass/components/PromptCard.scss';

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState('');

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push('/profile');

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="prompt-card">
      <div className="prompt-card__content">
        <div className="prompt-card__user" onClick={handleProfileClick}>
          <Image
            className="prompt-card__user-image"
            src={post.creator.image}
            alt={`Image de profil de ${post.creator.username}`}
            width={40}
            height={40}
          />

          <div className="prompt-card__user-info">
            <h2 className="prompt-card__user-name">{post.creator.username}</h2>
            <p className="prompt-card__user-email">{post.creator.email}</p>
          </div>
        </div>

        <div
          className="prompt-card__copy"
          role="button"
          tabIndex="0"
          onClick={handleCopy}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              handleCopy();
            }
          }}
        >
          <Image
            src={
              copied === post.prompt
                ? '/assets/icons/check.svg'
                : '/assets/icons/copy.svg'
            }
            alt={
              copied === post.prompt
                ? 'Icône indiquant que le prompt est copié.'
                : 'Icône indiquant que le prompt peut être copié.'
            }
            width={30}
            height={30}
          />
        </div>
      </div>

      <p className="prompt-card__prompt">{post.prompt}</p>
      <p
        className="prompt-card__tag"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        tabIndex="0"
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleTagClick && handleTagClick(post.tag);
          }
        }}
      >
        {post.tag}
      </p>

      {session?.user.id === post.creator._id && pathName === '/profile' && (
        <div className="prompt-card__buttons">
          <button className="prompt-card__edit" onClick={handleEdit}>
            <Image
              src={'/assets/icons/edit.svg'}
              alt="Icône d'un crayon pour éditer le prompt."
              width={30}
              height={30}
            />
          </button>
          <button className="prompt-card__delete" onClick={handleDelete}>
            <Image
              src={'/assets/icons/trash.svg'}
              width={30}
              height={30}
              alt="Icône d'une poubelle pour supprimer le prompt."
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
