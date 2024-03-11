"use client";

import { useEffect, useState, useRef } from "react";

export default function Home() {
  const videoRef = useRef<HTMLInputElement>(null);
  const nativeRef = useRef<HTMLInputElement>(null);

  const [bannerVolume, setBannerVolume] = useState(0);
  const [videoVolume, setVideoVolume] = useState("");
  const [nativeVolume, setNativeVolume] = useState("");
  const [isVideoCopied, setIsVideoCopied] = useState(false);
  const [isNativeCopied, setIsNativeCopied] = useState(false);

  const handleChange = (e: any) => {
    setBannerVolume(e.target.value);
  };

  useEffect(() => {
    setVideoVolume(`${Math.round(bannerVolume * 0.5)}m`);
    setNativeVolume(`${Math.round(bannerVolume * 0.5 * 0.2)}m`);
  }, [bannerVolume]);

  const copyText = async (inputRef: any, ref: string) => {
    if (inputRef.current) {
      let textToCopy = inputRef.current.value;
      try {
        await navigator.clipboard.writeText(textToCopy);
        if (ref === "video") {
          setIsVideoCopied(true);
          setTimeout(() => {
            setIsVideoCopied(false);
          }, 1000);
        } else {
          setIsNativeCopied(true);
          setTimeout(() => {
            setIsNativeCopied(false);
          }, 1000);
        }
      } catch (error) {
        console.error("Failed to copy: ", error);
      }
    }
  };

  return (
    <main className="main">
      <div className="app bg-stone-100 text-gray-950 rounded-xl flex flex-col justify-center p-4">
        <div className="flex gap-4 items-center">
          <span className="block w-full text text-lg text-bold text-right">
            Banner Volume
          </span>
          <input
            className="h-24 p-4 mb-4 rounded-xl w-full text-5xl text-purple-800"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-4 items-center relative">
          <span className="block w-full text-lg text-bold text-right">
            Video Volume
          </span>
          {isVideoCopied && (
            <span className="block absolute top-2 right-2 text-xl">📋</span>
          )}
          <input
            className="disabled h-24 p-4 mb-4 rounded-xl w-full text-5xl text-purple-800"
            type="text"
            value={videoVolume}
            ref={videoRef}
            onClick={() => copyText(videoRef, "video")}
          />
        </div>
        <div className="flex gap-4 items-center relative">
          {isNativeCopied && (
            <span className="block absolute top-2 right-2 text-xl">📋</span>
          )}
          <span className="block w-full text-lg text-bold text-right">
            Native Volume
          </span>
          <input
            className="disabled h-24 p-4 mb-4 rounded-xl w-full text-5xl text-purple-800"
            type="text"
            value={nativeVolume}
            ref={nativeRef}
            onClick={() => copyText(nativeRef, "native")}
          />
        </div>
      </div>
    </main>
  );
}
