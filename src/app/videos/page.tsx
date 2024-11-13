import { PrismaClient, Video } from '@prisma/client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const prisma = new PrismaClient();

export default function VideoListPage() {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const videoList = await prisma.video.findMany();
      setVideos(videoList);
    };
    fetchVideos();
  }, []);

  const handleDelete = async (id: number) => {
    await prisma.video.delete({
      where: { id },
    });
    
    setVideos(videos.filter((video) => video.id !== id));
  };

  return (
    <div>
      <h1>All Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id}>
            <Link href={`/videos/video/edit/${video.id}`}>{video.name}</Link>
            {' - '}
            <button onClick={() => handleDelete(video.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Link href="/videos/video/add">Add New Video</Link>
    </div>
  );
}