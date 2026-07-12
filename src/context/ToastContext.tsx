import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Button from "../components/atoms/Button/Button";

type ToastType = "success" | "error" | "info";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastOptions = {
  type?: ToastType;
  duration?: number;
};

type ToastContextValue = {
  showToast: (message: string, options?: ToastOptions) => void;
};
type ToastProviderProps = {
  children: ReactNode;
  defaultDuration?: number;
};
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

function getToastClassName(type: ToastType) {
  if (type === "success") return "alert alert-success shadow-lg";
  if (type === "error") return "alert alert-error shadow-lg";

  return "alert alert-info shadow-lg";
}

export function ToastProvider({
  children,
  defaultDuration = 3000,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<string, ReturnType<typeof window.setTimeout>>>(
    new Map(),
  );

  const removeToast = useCallback((toastId: string) => {
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== toastId),
    );

    const timeoutId = timeoutsRef.current.get(toastId);

    if (timeoutId) {
      window.clearTimeout(timeoutId);
      timeoutsRef.current.delete(toastId);
    }
  }, []);

  const showToast = useCallback(
    (message: string, options?: ToastOptions) => {
      const toastId =
        globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
      const toast: Toast = {
        id: toastId,
        message,
        type: options?.type ?? "success",
      };

      setToasts((currentToasts) => [toast, ...currentToasts].slice(0, 4));

      const timeoutId = window.setTimeout(() => {
        removeToast(toastId);
      }, options?.duration ?? defaultDuration);

      timeoutsRef.current.set(toastId, timeoutId);
    },
    [removeToast],
  );

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeoutId) =>
        window.clearTimeout(timeoutId),
      );
      timeoutsRef.current.clear();
    };
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="toast toast-top toast-end z-50 p-4">
        {toasts.map((toast) => (
          <div key={toast.id} className={getToastClassName(toast.type)}>
            <span className="text-sm font-medium">{toast.message}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="btn-xs"
              onClick={() => removeToast(toast.id)}
            >
              Dismiss
            </Button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    return {
      showToast: () => undefined,
    };
  }

  return context;
}
