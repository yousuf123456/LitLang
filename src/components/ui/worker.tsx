"use client";
import React from "react";
import { render } from "@react-three/offscreen";
import { sampleArcs } from "@/data/globe/arcs";
import { globeConfig } from "@/data/globe/config";
import dynamic from "next/dynamic";

const WorldScene = dynamic(() => import("@/components/ui/WorldScene"), {
  ssr: false,
});

render(<WorldScene data={sampleArcs} globeConfig={globeConfig} />);
