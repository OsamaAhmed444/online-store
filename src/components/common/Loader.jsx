import { LoaderCircle } from "lucide-react";

export default function Loader({
  size = 24,
  className = "",
}) {
  return (
    <LoaderCircle
      size={size}
      className={`animate-spin text-primary ${className}`}
      aria-label="Loading"
    />
  );
}