import ReactPlayer from 'react-player'
import {useState} from "react";

const VideoPage = () => {
  const [activePlayer, setActivePlayer] = useState(0);

  const videos = [
    "https://www.youtube.com/watch?v=KSVaYplTDhs",
    "https://www.youtube.com/watch?v=i8VhTjy7e58",
    "https://www.youtube.com/watch?v=XyTxj7DFy_0",
    "https://www.youtube.com/watch?v=0qgocuzJ4tk",
    "https://www.youtube.com/watch?v=Da5DAfLThzc",
    "https://www.youtube.com/watch?v=Dr6QXCtTMH0",
    "https://www.youtube.com/watch?v=-ImqhGe9G0s",
    "https://www.youtube.com/watch?v=XcnelTTAAhw",
    "https://www.youtube.com/watch?v=f5sG-Qtu5Tk",
    "https://www.youtube.com/watch?v=NwV6KoP80Kc",
    "https://www.youtube.com/watch?v=E3FHnvL1Rgg",
    "https://www.youtube.com/watch?v=7PNMiuBZUkA"
  ];

  const handlePlay = (index) => {
    setActivePlayer(index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              col-span-1 row-span-1 h-[250px]
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