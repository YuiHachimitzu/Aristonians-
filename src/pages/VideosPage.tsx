import { motion } from 'framer-motion';
import { Video, Play, Film, Youtube, ExternalLink, Plus } from 'lucide-react';
import { videos } from '@/data/classData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut' as const
    }
  }
};

interface VideoCardProps {
  video: typeof videos[0];
}

function VideoCard({ video }: VideoCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
        {/* Thumbnail */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer group-hover:bg-violet-500 transition-colors"
            >
              <Play className="w-7 h-7 text-violet-600 group-hover:text-white transition-colors ml-1" />
            </motion.div>
          </div>

          {/* Duration Badge (Placeholder) */}
          <div className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-xs font-medium">
            --:--
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center flex-shrink-0">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-violet-600 transition-colors">
                {video.title}
              </h3>
              <p className="text-gray-600 text-sm line-clamp-2">
                {video.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function VideosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium mb-4">
            <Video className="w-4 h-4" />
            Multimedia
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Videos
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch our class videos and relive the moments
          </p>
        </motion.div>

        {/* Placeholder Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <Plus className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">
                Add Your Videos
              </h3>
              <p className="text-amber-700 mb-4">
                This section is ready for your class videos! You can add YouTube links, 
                Google Drive videos, or any video URL by editing the <code className="px-2 py-1 rounded bg-amber-100 text-amber-800 text-sm">src/data/classData.ts</code> file.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                  Upload to YouTube
                </a>
                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Google Drive
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Video Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </motion.div>

        {/* How to Add Videos */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            How to Add Your Videos
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: '1',
                title: 'Upload Your Video',
                description: 'Upload your class video to YouTube, Google Drive, or any video hosting platform.',
                icon: Video
              },
              {
                step: '2',
                title: 'Get the Link',
                description: 'Copy the video URL or embed link from your chosen platform.',
                icon: ExternalLink
              },
              {
                step: '3',
                title: 'Update the Code',
                description: 'Edit the videos array in src/data/classData.ts with your video details.',
                icon: Film
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-sm text-violet-600 font-medium mb-2">
                  Step {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 rounded-2xl bg-gray-900"
        >
          <h3 className="text-white font-mono text-sm mb-4">
            // Example: Adding a video to classData.ts
          </h3>
          <pre className="text-green-400 font-mono text-sm overflow-x-auto">
{`{
  id: 'vid-4',
  title: 'My Class Video',
  thumbnail: '/images/my-thumbnail.jpg',
  url: 'https://youtube.com/watch?v=YOUR_VIDEO_ID',
  description: 'Description of your video'
}`}
          </pre>
        </motion.div>
      </div>
    </div>
  );
}
