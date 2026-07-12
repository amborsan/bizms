import type { ReactNode } from "react";
import Button from "../../atoms/button/Button";

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
  error: "btn-ghost text-error hover:bg-error/10 hover:text-error",
  ghost:
    "btn-ghost text-base-content/70 hover:bg-base-200 hover:text-base-content",
  primary: "btn-ghost text-primary hover:bg-primary/10 hover:text-primary",
};

function ResourceCard({
  actions = [],
  badges = [],
  description,
  fields = [],
  title,
}: ResourceCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-lg border border-base-300 bg-base-100 text-base-content shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      <div className="absolute inset-x-0 top-0 h-1 bg-primary" />
      <div className="flex h-full flex-col gap-5 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold leading-tight text-base-content">
              {title}
            </h2>
            {description && (
              <p className="mt-2 line-clamp-3 text-sm leading-6 text-base-content/70">
                {description}
              </p>
            )}
          </div>

          {actions.length > 0 && (
            <div className="flex shrink-0 rounded-md border border-base-300 bg-base-200 p-1">
              {actions.map((action) => (
                <Button
                  key={action.label}
                  type="button"
                  aria-label={action.label}
                  title={action.label}
                  variant="ghost"
                  size="sm"
                  className={`btn-square min-h-8 h-8 w-8 border-0 ${actionVariantClasses[action.variant ?? "ghost"]}`}
                  disabled={action.disabled}
                  onClick={action.onClick}
                >
                  {action.icon}
                </Button>
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
          <dl className="mt-auto grid gap-3 border-t border-base-300 pt-4 text-sm sm:grid-cols-2 overflow-hidden list-col-wrap">
            {fields.map((field) => (
              <div key={field.label} className="rounded-md bg-base-200 p-3">
                <dt className="text-xs font-semibold uppercase text-base-content/60">
                  {field.label}
                </dt>
                <dd className="mt-1 font-medium text-base-content break-normal wrap-break-word">
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
