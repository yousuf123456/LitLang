import React, { useContext } from "react";

import "../../prosemirror.css";
import Editor from "@/components/editor/advanced-editor";
import { BlogContext } from "./BlogEditorContext";

export const ContentEditor = () => {
  const { content, setContent } = useContext(BlogContext);

  return (
    <Editor
      initialValue={JSON.parse(content || "{}")}
      onChange={(value) => {
        const stringValue = JSON.stringify(value);
        if (stringValue === "{}") {
          setContent(undefined);
        } else {
          setContent(stringValue);
        }
      }}
    />
  );
};
