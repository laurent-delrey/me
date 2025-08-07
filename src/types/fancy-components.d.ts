import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "fc-arrow-btn": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "fc-typing-input": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { placeholder?: string; value?: string };
      "fc-bubbles": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { click?: true | ""; active?: "true" | "false" };
      "fc-3d-btn": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "fc-parentheses-btn": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "fc-dbl-warp-btn": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "fc-pixel-btn": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "fc-round-btn": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "fc-underline-btn": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "fc-warp-btn": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { "text-align"?: "left" | "center" | "right" };
      "fc-china": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "fc-wave-filter": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        color?: string;
        delay?: string | number;
        dur?: string | number;
        interval?: string | number;
        amplitude?: string | number;
        mode?: "alpha" | "luminance" | "img" | "slideshow" | "slide show" | "slide-show";
      };
    }
  }
}

export {};
