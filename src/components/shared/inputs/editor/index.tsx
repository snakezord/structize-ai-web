"use client";

import ReactQuill from "react-quill";
import React, { ReactNode } from "react";
import { Theme, FormHelperText, SxProps } from "@mui/material";
import { RootStyle } from "./quill-styles";

export interface Props {
  id?: string;
  value: string;
  handleChange: (newValue: string) => void;
  error?: boolean;
  helperText?: ReactNode;
  sx?: SxProps<Theme>;
  placeholder?: string;
}

export const Editor: React.FC<Props> = ({
  value,
  handleChange,
  placeholder = "Write something awesome...",
  error,
  helperText,
  sx,
}) => {
  return (
    <RootStyle
      sx={{
        "& .quill": {
          ...(error && {
            "& > :first-of-type, & > :last-child": {
              border: (theme) => `solid 1px ${theme.palette.error.main}`,
            },
          }),
          ...(!error && {
            "&:hover > :first-of-type, &:hover > :last-child": {
              border: (theme) => `solid 1px ${theme.palette.text.primary}`,
            },
          }),
        },
        ...sx,
      }}
    >
      <ReactQuill
        id="minimal-quill"
        defaultValue={value}
        onChange={(value) => handleChange(value)}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      <FormHelperText error={error} sx={{ px: 2 }}>
        {helperText && helperText}
      </FormHelperText>
    </RootStyle>
  );
};

const modules = {
  toolbar: [
    [{ header: "1" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "blockquote",
  "list",
  "bullet",
  "link",
];
