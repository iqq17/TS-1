import React, { useState, useEffect, useRef } from 'react';
import { CallClient, CallAgent, VideoStreamRenderer, LocalVideoStream } from '@azure/communication-calling';
import { AzureCommunicationTokenCredential } from '@azure/communication-common';
import { Mic, MicOff, Video, VideoOff, PhoneOff, ScreenShare, StopScreenShare } from 'lucide-react';

interface VideoCallProps {
  token: string;
  groupId: string;
}

export const VideoCall: React.FC<VideoCallProps> = ({ token, groupId }) => {
  const [callAgent, setCallAgent] = useState<CallAgent | null>(null);
  const [call, setCall] = useState<Call | null>(null);
  const [localVideoStream, setLocalVideoStream] = useState<LocalVideoStream | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = async () => {
      const callClient = new CallClient();
      const tokenCredential = new AzureCommunicationTokenCredential(token);
      const agent = await callClient.createCallAgent(tokenCredential);
      setCallAgent(agent);

      const stream = new LocalVideoStream();
      setLocalVideoStream(stream);
    };

    init();
  }, [token]);

  useEffect(() => {
    if (localVideoStream && videoRef.current) {
      const renderer = new VideoStreamRenderer(localVideoStream);
      const view = renderer.createView();
      videoRef.current.appendChild(view.target);

      return () => {
        renderer.dispose();
      };
    }
  }, [localVideoStream]);

  const startCall = async () => {
    if (callAgent && localVideoStream) {
      const newCall = callAgent.join({ groupId }, { videoOptions: { localVideoStreams: [localVideoStream] } });
      setCall(newCall);

      newCall.on('remoteParticipantsUpdated', () => {
        // Handle remote participants joining/leaving
      });
    }
  };

  const endCall = () => {
    call?.hangUp();
    setCall(null);
  };

  const toggleMute = () => {
    if (call) {
      if (isMuted) {
        call.unmute();
      } else {
        call.mute();
      }
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (call && localVideoStream) {
      if (isVideoOn) {
        call.stopVideo(localVideoStream);
      } else {
        call.startVideo(localVideoStream);
      }
      setIsVideoOn(!isVideoOn);
    }
  };

  const toggleScreenShare = async () => {
    if (call) {
      if (isScreenSharing) {
        await call.stopScreenSharing();
      } else {
        await call.startScreenSharing();
      }
      setIsScreenSharing(!isScreenSharing);
    }
  };

  return (
    <div className="video-call-container bg-gray-900 rounded-lg overflow-hidden">
      <div className="grid grid-cols-2 gap-4 p-4">
        <div className="local-video-stream bg-gray-800 rounded-lg overflow-hidden aspect-video" ref={videoRef}></div>
        <div className="remote-participants bg-gray-800 rounded-lg overflow-hidden aspect-video">
          {/* Render remote participants here */}
        </div>
      </div>
      <div className="controls bg-gray-800 p-4 flex justify-center space-x-4">
        <button
          onClick={toggleMute}
          className={`p-3 rounded-full ${isMuted ? 'bg-red-500' : 'bg-gray-600'} text-white`}
        >
          {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
        </button>
        <button
          onClick={toggleVideo}
          className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-600' : 'bg-red-500'} text-white`}
        >
          {isVideoOn ? <Video size={24} /> : <VideoOff size={24} />}
        </button>
        <button
          onClick={toggleScreenShare}
          className={`p-3 rounded-full ${isScreenSharing ? 'bg-green-500' : 'bg-gray-600'} text-white`}
        >
          {isScreenSharing ? <StopScreenShare size={24} /> : <ScreenShare size={24} />}
        </button>
        {!call ? (
          <button
            onClick={startCall}
            className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold"
            disabled={!callAgent}
          >
            Join Call
          </button>
        ) : (
          <button
            onClick={endCall}
            className="p-3 rounded-full bg-red-500 text-white"
          >
            <PhoneOff size={24} />
          </button>
        )}
      </div>
    </div>
  );
};