"use client";

import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";

import { MdPauseCircleFilled, MdPlayCircleFilled } from "react-icons/md";

import { Progress } from "@/components/ui/progress";
import {
  BsFillSkipStartFill,
  BsSkipEndFill,
  BsSoundwave,
} from "react-icons/bs";

import { AnimatePresence, LazyMotion, m } from "framer-motion";
import { ChevronLeft, Mic, Mic2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
const loadFeatures = () =>
  import("@/app/utils/features").then((res) => res.default);

export const AudioPlayer = ({
  bufferArray,
  subjectId,
  name,
}: {
  bufferArray: number[];
  subjectId: string;
  name: string;
}) => {
  //   const getAudioPlayer()f<HTMLAudioElement>(null);
  const getAudioPlayer = useCallback((): HTMLAudioElement | null => {
    return document.getElementById("audioPlayer") as any;
  }, [document.getElementById]);

  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const togglePlayPause = () => {
    const audioPlayer = getAudioPlayer();
    if (!audioPlayer) return;

    if (isPlaying) {
      audioPlayer.pause();
    } else {
      audioPlayer.play();
    }

    setIsPlaying((prev) => !prev);
  };

  const skipForward = () => {
    const audioPlayer = getAudioPlayer();
    if (!audioPlayer) return;

    audioPlayer.currentTime += 10;
  };

  const skipBackward = () => {
    const audioPlayer = getAudioPlayer();
    if (!audioPlayer) return;

    audioPlayer.currentTime -= 10;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audioPlayer = getAudioPlayer();
    if (!audioPlayer) return;

    let seekTime = (parseInt(e.target.value) / 100) * duration;
    if (seekTime >= duration) seekTime = duration - 1;

    audioPlayer.currentTime = seekTime;
  };

  const onMouseUp = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const audioPlayer = getAudioPlayer();
    if (!audioPlayer) return;

    if (isPlaying) audioPlayer.play();
  };

  const onMouseDown = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    const audioPlayer = getAudioPlayer();
    if (!audioPlayer) return;

    if (isPlaying) audioPlayer.pause();
  };

  const onAudioEnded = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const url = useMemo(() => {
    return URL.createObjectURL(new Blob([Buffer.from(bufferArray)]));
  }, [bufferArray]);

  return (
    <div className="flex-1 flex flex-col gap-12 justify-center items-center overflow-x-hidden px-3 md:px-6">
      <div className="bg-gray-50 p-2 sm:p-4 rounded-lg shadow-md flex flex-col items-center gap-6 w-full max-w-lg">
        <audio
          id="audioPlayer"
          onEnded={onAudioEnded}
          onLoadedMetadata={(e: any) => setDuration(e.target.duration)}
          onTimeUpdate={(e: any) => setCurrentTime(e.target.currentTime)}
        >
          <source src={url} />
        </audio>

        <div className="w-full flex gap-4 items-center">
          <div className="p-[10px] rounded-md bg-gray-800 flex-shrink-0">
            <Mic aria-hidden className="text-gray-200 w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-gray-700 sm:text-base text-sm font-medium">
            {name}
          </h2>
        </div>

        <div className="flex items-center gap-0 sm:gap-1 w-full relative ">
          <p
            aria-atomic
            aria-live="polite"
            className="text-xs sm:text-sm text-gray-700 w-9 sm:w-10"
          >
            {formatTime(currentTime)}
          </p>

          <input
            min="0"
            max="100"
            type="range"
            onChange={handleSeek}
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            aria-label="Seek audio position"
            value={(currentTime / duration) * 100 || 0}
            className="flex-1 w-full h-2 bg-transparent rounded-lg appearance-none cursor-pointer accent-gray-800 z-30"
          />

          <Progress
            value={(currentTime / duration) * 100 || 0}
            indicatorColor="bg-gray-800 transition-none"
            className="absolute sm:w-[calc(100%-108px)] w-[calc(100%-96px)] z-20 bg-gray-300 h-2 left-1/2 -translate-x-1/2"
          />

          <p
            aria-atomic
            aria-live="polite"
            className="text-xs sm:text-sm text-gray-700 w-9 sm:w-10 text-end"
          >
            {formatTime(duration)}
          </p>
        </div>

        <LazyMotion features={loadFeatures} strict>
          <div
            className="flex items-center gap-8 sm:gap-12"
            role="group"
            aria-label="Audio controls"
          >
            <BsFillSkipStartFill
              className="sm:w-7 sm:h-7 w-6 h-6 text-gray-800 cursor-pointer"
              aria-label="Skip backward 10 seconds"
              onClick={skipBackward}
            />

            <AnimatePresence mode="wait">
              {isPlaying ? (
                <m.div
                  transition={{ duration: 0.1 }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  key={"pause"}
                >
                  <MdPauseCircleFilled
                    className="sm:w-10 w-9 h-9 sm:h-10 text-gray-800 cursor-pointer"
                    onClick={togglePlayPause}
                    aria-label="Pause"
                  />
                </m.div>
              ) : (
                <m.div
                  transition={{ duration: 0.1 }}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  key={"play"}
                >
                  <MdPlayCircleFilled
                    className="sm:w-10 w-9 h-9 sm:h-10 text-gray-800 cursor-pointer"
                    onClick={togglePlayPause}
                    aria-label="play"
                  />
                </m.div>
              )}
            </AnimatePresence>

            <BsSkipEndFill
              className="sm:w-7 sm:h-7 w-6 h-6 text-gray-800 cursor-pointer"
              aria-label="Skip forward 10 seconds"
              onClick={skipForward}
            />
          </div>
        </LazyMotion>
      </div>

      <Link
        aria-label="Go back to previous page"
        href={`/subjects/${subjectId}`}
        className={buttonVariants({
          size: "sm",
          variant: "secondary",
          className: "flex gap-2 items-center md:hidden",
        })}
      >
        <ChevronLeft className="w-4 h-4" /> Go Back
      </Link>
    </div>
  );
};
