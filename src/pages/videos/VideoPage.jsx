import CountUp from 'react-countup'
import ReactPlayer from 'react-player'

const VideoPage = () => {
  return (
    <div className="flex justify-center items-center">
            <span className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                About
                <CountUp start={0} end={1000} delay={0}>
                    {({ countUpRef }) => (
                      <div>
                        <span ref={countUpRef} />
                      </div>
                    )}
                </CountUp>
                <ReactPlayer
                  url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
                  controls={true}
                  playing={true}
                  muted={true}
                />
            </span>
    </div>
  );
};

export default VideoPage;