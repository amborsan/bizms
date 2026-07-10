export const getStatusBadgeClass = (status = "") => {
  const normalizedStatus = status.toLowerCase();

  if (normalizedStatus === "completed") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
  }

  if (normalizedStatus === "pending") {
    return "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
  }

  if (normalizedStatus === "in progress") {
    return "bg-sky-50 text-sky-700 ring-1 ring-sky-200";
  }

  if (normalizedStatus === "canceled") {
    return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
  }

  return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
};

export const getPriorityBadgeClass = (priority = "") => {
  const normalizedPriority = priority.toLowerCase();

  if (normalizedPriority === "high") {
    return "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
  }

  if (normalizedPriority === "medium") {
    return "bg-orange-50 text-orange-700 ring-1 ring-orange-200";
  }

  if (normalizedPriority === "low") {
    return "bg-teal-50 text-teal-700 ring-1 ring-teal-200";
  }

  return "bg-slate-100 text-slate-600 ring-1 ring-slate-200";
};
