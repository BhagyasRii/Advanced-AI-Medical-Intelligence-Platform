export default function Icon({ name, className = "", filled = false, size, style = {} }) {
  return (
    <span
      className={`material-symbols-outlined ${filled ? "filled" : ""} ${className}`}
      style={{ fontSize: size ? `${size}px` : undefined, ...style }}
    >
      {name}
    </span>
  );
}
