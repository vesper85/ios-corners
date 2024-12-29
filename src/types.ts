import React from "react";

export interface Size {
  width: number;
  height: number;
}

export interface SquircleProps extends React.HTMLAttributes<HTMLDivElement> {
  radius?: number | string;
  ratio?: number;
}

export interface MaskStyleInput {
  width: number;
  height: number;
  radius?: number | string;
  ratio?: number;
}
