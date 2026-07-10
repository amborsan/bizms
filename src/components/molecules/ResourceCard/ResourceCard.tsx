import type { ReactNode } from "react";

type ResourceCardField = {
  label: string;
  value: ReactNode;
};

type ResourceCardBadge = {
  label: string;
  className?: string;
};

type ResourceCardAction = {
  disabled?: boolean;
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  variant?: "ghost" | "primary" | "error";
};

type ResourceCardProps = {
  actions?: ResourceCardAction[];
  badges?: ResourceCardBadge[];
  description?: string;
  fields?: ResourceCardField[];
  title: string;
};

const actionVariantClasses = {
  error: "btn-ghost text-rose-600 hover:bg-rose-50 hover:text-rose-700",
  ghost: "btn-ghost text-slate-500 hover:bg-slate-100 hover:text-slate-900",
  primary: "btn-ghost text-blue-600 hover:bg-blue-50 hover:text-blue-700",
};

function ResourceCard({
  actions = [],
  badges = [],
  description,
  fields = [],
  title,
}: ResourceCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400" />
      <div className="flex h-full flex-col gap-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold leading-tight text-slate-950">
              {title}
            </h2>
            {description && (
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-600">
                {description}
              </p>
            )}
          </div>

          {actions.length > 0 && (
            <div className="flex shrink-0 rounded-md border border-slate-200 bg-slate-50 p-1">
              {actions.map((action) => (
                <button
                  key={action.label}
                  type="button"
                  aria-label={action.label}
                  title={action.label}
                  className={`btn btn-square btn-sm min-h-8 h-8 w-8 border-0 ${actionVariantClasses[action.variant ?? "ghost"]}`}
                  disabled={action.disabled}
                  onClick={action.onClick}
                >
                  {action.icon}
                </button>
              ))}
            </div>
          )}
        </div>

        {badges.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={`${badge.label}-${badge.className ?? "default"}`}
                className={`inline-flex min-h-7 items-center rounded-full px-3 text-xs font-semibold ${badge.className ?? ""}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        )}

        {fields.length > 0 && (
          <dl className="mt-auto grid gap-3 border-t border-slate-100 pt-4 text-sm sm:grid-cols-2">
            {fields.map((field) => (
              <div key={field.label} className="rounded-md bg-slate-50 p-3">
                <dt className="text-xs font-semibold uppercase text-slate-500">
                  {field.label}
                </dt>
                <dd className="mt-1 font-medium text-slate-900">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </article>
  );
}

export default ResourceCard;
