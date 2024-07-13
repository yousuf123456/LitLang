"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import React, { useEffect, useMemo, useState } from "react";

import { toast } from "sonner";

import { useResizeDetector } from "react-resize-detector";

import { Page, Document, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

if (typeof Promise.withResolvers === "undefined") {
  if (typeof window !== undefined) {
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    window.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  } else {
    // @ts-expect-error This does not exist outside of polyfill which this is doing
    global.Promise.withResolvers = function () {
      let resolve, reject;
      const promise = new Promise((res, rej) => {
        resolve = res;
        reject = rej;
      });
      return { promise, resolve, reject };
    };
  }
}

// there is your `/legacy/build/pdf.worker.min.mjs` url
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export const PDFViewer = ({
  uint8ArrayData,
}: {
  uint8ArrayData: Uint8Array;
}) => {
  const file = useMemo(() => {
    return { data: uint8ArrayData };
  }, [uint8ArrayData]);

  const { ref, width } = useResizeDetector();

  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [numPages, setNumPages] = useState(0);

  const [pageNumber, setPageNumber] = useState(1);
  const [inputPageNumber, setInputPageNumber] = useState(1);

  useEffect(() => {
    if (Number.isNaN(inputPageNumber)) return;
    if (!numPages) return;
    if (inputPageNumber === pageNumber) return;
    if (inputPageNumber < 1 || inputPageNumber > numPages) return;

    setPageNumber(inputPageNumber);
  }, [inputPageNumber]);

  const goToNextPage = () =>
    setPageNumber((prev) => {
      if (prev + 1 > numPages) return prev;
      return prev + 1;
    });

  const goToPrevPage = () =>
    setPageNumber((prev) => {
      if (prev - 1 < 1) return prev;
      return prev - 1;
    });

  const onZoomIn = () => {
    const availScales = [1, 1.5, 2, 2.5];

    const oldScaleIndex = availScales.indexOf(scale);
    if (oldScaleIndex === availScales.length - 1) return;
    else setScale(availScales[oldScaleIndex + 1]);
  };

  const onZoomOut = () => {
    const availScales = [1, 1.5, 2, 2.5];

    const oldScaleIndex = availScales.indexOf(scale);
    if (oldScaleIndex === 0) return;
    else setScale(availScales[oldScaleIndex - 1]);
  };

  const onRotate = () => {
    setRotation((prev) => prev + 90);
  };

  const onLoadError = (e: any) => {
    console.log(e);
    toast.error("Error loading PDF file", {
      description: "There was some error loading your pdf file.",
    });
  };

  return (
    <div className="flex-1 flex flex-col gap-0 overflow-x-hidden bg-[#DDD8C2] print:hidden">
      <div
        ref={ref}
        className="flex items-center px-0 justify-between w-full h-14 flex-shrink-0"
      >
        <div className="flex items-center gap-1 sm:gap-3 ml-2 sm:ml-6">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={goToPrevPage}
            disabled={pageNumber === 1}
          >
            <ChevronLeft className="w-5 h-5 text-black/70" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              type="number"
              onBlur={() => {
                if (Number.isNaN(inputPageNumber))
                  setInputPageNumber(pageNumber);
              }}
              value={inputPageNumber}
              onChange={(e) => setInputPageNumber(parseInt(e.target.value))}
              className="w-8 h-6 p-0 text-center text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent border-black/70"
            />
            <p className="text-sm text-black">\ {numPages}</p>
          </div>

          <Button
            variant={"ghost"}
            size={"icon"}
            onClick={goToNextPage}
            disabled={!numPages || pageNumber === numPages}
          >
            <ChevronRight className="w-5 h-5 text-black/70" />
          </Button>
        </div>

        <div className="flex items-center gap-2 sm:gap-10 mr-2 sm:mr-6">
          <div className="flex gap-2 sm:gap-4">
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={onZoomIn}
              disabled={scale === 2.5}
            >
              <ZoomIn className="sm:w-5 sm:h-5 w-[18px] h-[18px] text-black/70" />
            </Button>

            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={onZoomOut}
              disabled={scale === 1}
            >
              <ZoomOut className="sm:w-5 sm:h-5 w-[18px] h-[18px] text-black/70" />
            </Button>
          </div>

          <Button variant={"ghost"} size={"icon"} onClick={onRotate}>
            <RotateCcw className="sm:w-5 sm:h-5 w-[18px] h-[18px] text-black/70" />
          </Button>
        </div>
      </div>

      <ScrollArea>
        <Document
          file={file}
          onLoadError={onLoadError}
          loading={PDFLoadingState}
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        >
          <Page
            pageNumber={pageNumber}
            width={width ?? 1}
            rotate={rotation}
            scale={scale}
          />
        </Document>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

const PDFLoadingState = () => {
  return (
    <div className="w-full h-full flex justify-center items-center mt-28">
      <Loader2 className=" animate-spin w-6 h-6 text-brown-600" />
    </div>
  );
};
