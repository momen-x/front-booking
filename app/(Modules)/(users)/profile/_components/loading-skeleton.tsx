
const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md px-4 space-y-4 animate-pulse">
        <div className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 rounded-full bg-muted" />
          <div className="h-4 w-32 rounded-full bg-muted" />
          <div className="h-3 w-16 rounded-full bg-muted" />
        </div>
        <div className="h-40 rounded-2xl bg-muted" />
        <div className="h-10 rounded-xl bg-muted" />
      </div>
    </div>
  );
};

export default LoadingSkeleton;
