import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const prisma = new PrismaClient();

export default function DeleteVideoPage({ videoId }: { videoId: number }) {
  const [video, setVideo] = useState<{ id: number; name: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVideo = async () => {
      const result = await prisma.video.findUnique({
        where: { id: videoId },
      });
      setVideo(result);
    };
    fetchVideo();
  }, [videoId]);

  const handleDelete = async () => {
    if (video) {
      await prisma.video.delete({
        where: { id: video.id },
      });
      router.push('/videos');
    }
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Are you sure you want to delete "{video.name}"?</h1>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}