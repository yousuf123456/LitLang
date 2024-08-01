"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Fullscreen,
  Loader2,
  Minimize,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

import React, { useEffect, useMemo, useState } from "react";

import { toast } from "sonner";

import { useResizeDetector } from "react-resize-detector";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/utils/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

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
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   // absoluteUrl("/_next/static/media/pdf.worker.min.1eb065b4.mjs", true)
//   "pdfjs-dist/legacy/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

//@ts-ignore
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export const PDFViewer = ({
  backUrl,
  pdfUrl,
  name,
}: {
  backUrl: string;
  pdfUrl: string;
  name: string;
}) => {
  const options = useMemo(() => {
    return { disableAutoFetch: true, disableStream: true };
  }, []);

  const { ref, width } = useResizeDetector();

  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [numPages, setNumPages] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

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
    setInputPageNumber((prev) => {
      if (prev + 1 > numPages) return prev;
      return prev + 1;
    });

  const goToPrevPage = () =>
    setInputPageNumber((prev) => {
      if (prev - 1 < 1) return prev;
      return prev - 1;
    });

  const onZoomIn = () => {
    if (scale >= 2) return;

    setScale((prev) => prev + 0.25);
  };

  const onZoomOut = () => {
    if (scale <= 0.25) return;

    setScale((prev) => prev - 0.25);
  };

  const toggleFullscreen = () => setIsFullscreen((prev) => !prev);

  const onRotate = () => {
    setRotation((prev) => prev + 90);
  };

  useEffect(() => {
    console.log(pageNumber);
  }, [pageNumber]);

  const onLoadError = (e: any) => {
    console.log(e);
    toast.error("Error loading PDF file", {
      description: "There was some error loading your pdf file.",
    });
  };

  return (
    <article
      aria-labelledby="pdf-viewer-heading"
      className={cn(
        "flex-1 flex flex-col gap-0 overflow-x-hidden bg-[#DDD8C2] print:hidden",
        isFullscreen ? "fixed inset-0 z-[9999]" : "relative",
        scale < 1 && "items-center"
      )}
    >
      <h2 id="pdf-viewer-heading" className="sr-only">
        PDF Viewer
      </h2>

      <div
        ref={ref}
        role="toolbar"
        aria-label="PDF controls"
        className="flex items-center px-0 justify-between w-full h-14 flex-shrink-0"
      >
        <div className="flex items-center gap-3 ml-2 sm:ml-4 max-sm:absolute bottom-4 max-sm:-translate-x-1/2 left-1/2 z-50 max-sm:bg-[#DDD8C2] max-sm:drop-shadow-lg max-sm:p-0.5 max-sm:rounded-lg">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={goToPrevPage}
            aria-label="Previous page"
            disabled={pageNumber === 1 || numPages === 0}
          >
            <ChevronLeft className="w-5 h-5 text-black sm:text-black/70" />
          </Button>

          <div className="flex items-center gap-1.5">
            <Input
              type="number"
              value={inputPageNumber}
              disabled={numPages === 0}
              onBlur={() => {
                if (Number.isNaN(inputPageNumber))
                  setInputPageNumber(pageNumber);
              }}
              onChange={(e) => setInputPageNumber(parseInt(e.target.value))}
              className="w-8 h-6 p-0 text-center font-medium text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-transparent border-black/70"
            />
            <p className="text-xs sm:text-sm text-black font-medium">
              \ {numPages}
            </p>
          </div>

          <Button
            size={"icon"}
            variant={"ghost"}
            aria-label="Next page"
            onClick={goToNextPage}
            disabled={numPages === 0 || pageNumber === numPages}
          >
            <ChevronRight className="w-5 h-5 text-black sm:text-black/70" />
          </Button>
        </div>

        <div className="flex items-center max-sm:justify-around max-sm:w-full gap-1 sm:gap-4 mr-2 sm:mr-4">
          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={onZoomIn}
            aria-label="Zoom in"
            disabled={scale === 2 || numPages === 0}
          >
            <ZoomIn className="sm:w-5 sm:h-5 w-[18px] h-[18px] text-black/70" />
          </Button>

          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={onZoomOut}
            aria-label="Zoom out"
            disabled={scale === 0.25 || numPages === 0}
          >
            <ZoomOut className="sm:w-5 sm:h-5 w-[18px] h-[18px] text-black/70" />
          </Button>

          <Button
            size={"icon"}
            variant={"ghost"}
            onClick={onRotate}
            aria-label="rotate"
            disabled={numPages === 0}
          >
            <RotateCcw className="sm:w-5 sm:h-5 w-[18px] h-[18px] text-black/70" />
          </Button>

          <Button
            size={"icon"}
            variant={"ghost"}
            aria-label="Fullscreen"
            disabled={numPages === 0}
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Minimize className="sm:w-5 sm:h-5 w-[18px] h-[18px] text-black/70" />
            ) : (
              <Fullscreen className="sm:w-5 sm:h-5 w-[18px] h-[18px] text-black/70" />
            )}
          </Button>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button
                size={"icon"}
                variant={"ghost"}
                aria-label="Go back options"
              >
                <EllipsisVertical className="sm:w-5 sm:h-5 w-[18px] h-[18px] text-black/70" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              sideOffset={5}
              className="max-w-xl w-72 rounded-xl z-[99999]"
            >
              <DropdownMenuLabel className="py-3" asChild>
                <p className=" line-clamp-2 text-sm text-zinc-700">{name}</p>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <Link href={backUrl}>
                <DropdownMenuItem>
                  <ChevronLeft className="mr-4 h-4 w-4 text-zinc-700" />
                  <span>Go Back</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <ScrollArea role="document" aria-label={`PDF document: ${name}`}>
        <Document
          file={pdfUrl}
          options={options}
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
    </article>
  );
};

const PDFLoadingState = () => {
  return (
    <div className="w-full h-full flex justify-center items-center mt-28">
      <Loader2 className=" animate-spin w-6 h-6 text-brown-600" />
    </div>
  );
};
