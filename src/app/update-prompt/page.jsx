'use client';

import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';

const UpdatePrompt = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (status === 'loading') return; // Attendre que le statut de la session soit déterminé
    if (!session) {
      router.push('/');
    }
  }, [session, status, router]);
  useEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    if (!promptId) {
      log.error('Aucun ID de prompt fourni');
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push('/?refresh=' + new Date().getTime()); // Ajouter un paramètre de requête pour forcer le rafraîchissement
      }
    } catch (error) {
      console.log(error);
      setModalContent({
        title: 'Erreur',
        message: 'Une erreur est survenue. Veuillez réessayer.',
      });
      setModalOpen(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form
        type="Change"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </Suspense>
  );
};

const UpdatePromptPageWrapper = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt />
    </Suspense>
  );
};

export default UpdatePromptPageWrapper;
