import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';

const prisma = new PrismaClient();

export default function AddVideoPage() {
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const videoData = {
      name: formData.get('name')?.toString() ?? '',
      url: formData.get('url')?.toString() ?? '',
      votes: parseInt(formData.get('votes')?.toString() ?? '0'),
      length: parseInt(formData.get('length')?.toString() ?? '0'),
    };

    try {
      await prisma.video.create({
        data: videoData,
      });
      router.push('/videos');
    } catch (error) {
      console.error('Error adding video:', error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" required />
      </label>
      <label>
        URL:
        <input type="url" name="url" required />
      </label>
      <label>
        Votes:
        <input type="number" name="votes" required />
      </label>
      <label>
        Length:
        <input type="number" name="length" required />
      </label>
      <button type="submit">Add Video</button>
    </form>
  );
}
