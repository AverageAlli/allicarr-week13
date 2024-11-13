import { PrismaClient, Video } from '@prisma/client';
import { useRouter } from 'next/navigation';

const prisma = new PrismaClient();

export default async function VideoListPage() {
  const router = useRouter();
  const videos: Video[] = await prisma.video.findMany();

  const handleEdit = (id: number) => {
    router.push(`/videos/video/edit/${id}`);
  };

  const handleDelete = (id: number) => {
    router.push(`/videos/video/delete/${id}`);
  };

  return (
    <div>
      <h1>All Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <span>{video.name}</span>
            <div style={{ display: 'inline-block', marginLeft: '10px' }}>

              {/* Edit button */}
              <button onClick={() => handleEdit(video.id)}>Edit</button>

              {/* Delete button */}
              <button onClick={() => handleDelete(video.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Add New Video Button */}
      <button onClick={() => router.push('/videos/video/add')}>Add New Video</button>
    </div>
  );
}