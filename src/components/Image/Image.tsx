import { FC, ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
}

export const Image: FC<ImageProps> = ({ src, alt, className = '', ...props }) => {
  return <img className={`w-auto h-auto ${className}`} src={src} alt={alt} {...props} />;
};
