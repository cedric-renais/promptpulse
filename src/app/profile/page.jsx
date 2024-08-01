'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Modal from '@components/Modal';
import Profile from '@components/Profile';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [prompts, setPrompts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setPrompts(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des posts:', error);
      }
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = (prompt) => {
    router.push(`/update-prompt?id=${prompt._id}`);
  };

  const handleDelete = async (prompt) => {
    setSelectedPrompt(prompt);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(
        `/api/prompt/${selectedPrompt._id.toString()}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        const filteredPrompts = prompts.filter(
          (item) => item._id !== selectedPrompt._id
        );
        setPrompts(filteredPrompts);
        await fetchPosts();
      } else {
        console.error(
          'Erreur lors de la suppression du prompt:',
          response.statusText
        );
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du prompt:', error);
    } finally {
      setIsModalOpen(false);
      setSelectedPrompt(null);
    }
  };

  return (
    <>
      <Profile
        name="Ton profil"
        description="Bienvenue sur ton profil personnalisé. Partage tes superbes prompts et inspires la communauté avec ta créativité."
        data={prompts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default ProfilePage;
