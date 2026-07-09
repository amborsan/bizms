export default function Spinner({ isFullScreen }: { isFullScreen?: boolean }) {
  return (
    <div
      className={isFullScreen ? "h-dvh flex items-center justify-center" : ""}
    >
      <span className="loading loading-ring loading-xl"></span>
    </div>
  );
}
