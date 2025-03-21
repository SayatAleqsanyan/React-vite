import CountUp from 'react-countup'
import ReactPlayer from 'react-player'

const VideoPage = () => {
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-5">
        <ReactPlayer
          url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
          controls={true}
          playing={true}
          muted={true}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=vvqVdZPnYtA"
          controls={true}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=cVSCSGB8Z2E"
          controls={true}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=ijuUGfIDGo0"
          controls={true}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=BNNaKMky1x4"
          controls={true}
        />
        <ReactPlayer
          url="https://www.youtube.com/watch?v=I-S9n1Bhc1M"
          controls={true}
        />
      </div>
    </div>
  );
};

export default VideoPage;