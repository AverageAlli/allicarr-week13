import { PrismaClient, Video } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const prisma = new PrismaClient();

export default function EditVideoPage({ videoId }: { videoId: number }) {
  const [video, setVideo] = useState<Video | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVideo = async () => {
      const fetchedVideo = await prisma.video.findUnique({
        where: { id: videoId },
      });
      setVideo(fetchedVideo);
    };
    fetchVideo();
  }, [videoId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!video) return;

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const updatedData = {
      name: formData.get('name')?.toString() ?? '',
      url: formData.get('url')?.toString() ?? '',
      votes: Number(formData.get('votes')) ?? 0,
      length: Number(formData.get('length')) ?? 0,
    };

    await prisma.video.update({
      where: { id: video.id },
      data: updatedData,
    });

    router.push('/videos');
  };

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" defaultValue={video.name} required />
      </label>
      <label>
        URL:
        <input type="text" name="url" defaultValue={video.url} required />
      </label>
      <label>
        Votes:
        <input type="number" name="votes" defaultValue={video.votes} required />
      </label>
      <label>
        Length (in seconds):
        <input type="number" name="length" defaultValue={video.length} required />
      </label>
      <button type="submit">Update Video</button>
    </form>
  );
}