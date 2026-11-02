import type { ImgHTMLAttributes } from "react";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  priority?: boolean;
  fill?: boolean;
  loader?: (props: { src: string; width: number; quality?: number }) => string;
};

export default function Image({ loader, priority, fill, style, src, ...props }: ImageProps) {
  const imageSrc = loader ? loader({ src, width: typeof props.width === "number" ? props.width : 1200 }) : src;
  return <img src={imageSrc} style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style} {...props} />;
}
