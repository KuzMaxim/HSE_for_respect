const HotelCardSkeleton = () => {
  return (
    <div className="bg-card rounded-2xl p-6 animate-pulse">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-muted rounded w-48" />
          <div className="h-4 bg-muted rounded w-32" />
          <div className="h-4 bg-muted rounded w-24" />
          <div className="flex gap-2">
            <div className="h-6 bg-muted rounded-full w-20" />
            <div className="h-6 bg-muted rounded-full w-24" />
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="h-8 bg-muted rounded w-20" />
          <div className="h-10 bg-muted rounded-full w-28" />
        </div>
      </div>
    </div>
  );
};

export default HotelCardSkeleton;
