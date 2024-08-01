'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Profile from '@components/Profile';
import '@sass/components/Profile.scss';

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get('name');

  const [userPrompts, setUserPrompts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setUserPrompts(data);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={`Le profil de ${userName}`}
      description={`Jettes un oeil à ses prompts, tu y trouveras peut-être de l'inspiration.`}
      data={userPrompts}
    />
  );
};

export default UserProfile;
