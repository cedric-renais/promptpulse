'use client';

import Form from '@components/Form';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [post, setPost] = useState({ prompt: '', tag: '' });
  const [submitting, setSubmitting] = useState(false);

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
        router.push('/profile');
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
    <>
      <Form
        type="Change"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </>
  );
};

export default UpdatePrompt;
