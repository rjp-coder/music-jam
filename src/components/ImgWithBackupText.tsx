import { useState } from "react";

export function ImgWithBackupText({
  src,
  backupText,
  textClassName,
  imgClassName,
  ...props
}) {
  const [errorSrc, setErrorSrc] = useState<string | null>(null);

  const hasError = errorSrc === src; // automatically resets when src changes

  if (hasError) {
    return <p>{backupText}</p>;
  }
  if (hasError) {
    return <p className={textClassName}>{backupText}</p>;
  }

  return (
    <img
      src={src}
      alt={backupText}
      className={imgClassName}
      onError={() => setErrorSrc(src)}
      onChange={() => {
        setErrorSrc(src);
      }}
      {...props}
    />
  );
}
