import React, { useState } from "react";

import { Page } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Button } from "@/components/ui/button";

export const PDFPage = ({
  pageNumber,
  width,
}: {
  pageNumber: number;
  width: number;
}) => {
  const [rotate, setRotate] = useState(0);

  return (
    <Page
      pageNumber={pageNumber}
      width={width ?? 1}
      rotate={rotate}
      scale={1}
      className={"relative"}
    >
      <Button
        onClick={() => setRotate(rotate + 90)}
        className="absolute translate-x-1/2 translate-y-1/2 z-[999999]"
      >
        Rotate
      </Button>
    </Page>
  );
};
