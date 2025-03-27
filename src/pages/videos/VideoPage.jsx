import ReactPlayer from 'react-player'
import {useState} from "react";

const VideoPage = () => {
  const [activePlayer, setActivePlayer] = useState(0);

  const videos = [
    "https://www.youtube.com/watch?v=kJjLkWILR6Q"
  ];

  const handlePlay = (index) => {
    setActivePlayer(index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {videos.map((url, index) => (
          <div
            key={url}
            className={`
              w-full 
              rounded-lg 
              overflow-hidden 
              shadow-lg 
              transform 
              transition-all 
              duration-300 
              ${activePlayer === index
              ? 'lg:col-span-2 lg:row-span-2 lg:h-[500px]'
              : 'lg:h-[250px]'}
              ${activePlayer !== null && activePlayer !== index
              ? 'opacity-50 hover:opacity-75'
              : ''}
            `}
          >
            <ReactPlayer
              width="100%"
              height="100%"
              url={url}
              controls={true}
              playing={activePlayer === index}
              muted={index === 0}
              onPlay={() => handlePlay(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPage;