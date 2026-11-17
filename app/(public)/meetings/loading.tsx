
export default function MeetingsLoading() {
  return (
    <div
      className="flex min-h-64 flex-col items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-900" />

      <p className="mt-4 text-lg font-semibold text-blue-900">
        Loading meetings...
      </p>

      <span className="sr-only">Please wait while meetings load.</span>
    </div>
  );
}
