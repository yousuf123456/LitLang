"use client";

import React from "react";
import { Canvas } from "@react-three/offscreen";
// import { PerspectiveCamera } from "three";

// This is the worker thread that will render the scene
const worker = new Worker(
  new URL("@/components/ui/worker.tsx", import.meta.url),
  {
    type: "module",
  }
);

export function OffscreenWorld() {
  return <Canvas camera={{ position: [0, 0, 10], fov: 25 }} worker={worker} />;
}
