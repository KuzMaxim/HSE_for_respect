const TripCardSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl p-6 animate-pulse flex flex-col h-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 bg-muted rounded" />
        <div className="h-3 bg-muted rounded w-16" />
      </div>
      <div className="flex-1 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-8 bg-muted rounded w-20" />
        <div className="h-3 bg-muted rounded w-24" />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <div className="h-10 bg-muted rounded-full" />
        <div className="h-4 bg-muted rounded w-20 mx-auto" />
      </div>
    </div>
  );
};

export default TripCardSkeleton;
