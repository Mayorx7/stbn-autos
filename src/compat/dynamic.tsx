import { lazy, Suspense, type ComponentType } from "react";

export default function dynamic<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T } | T>,
  options?: { loading?: ComponentType },
) {
  const LazyComponent = lazy(async () => {
    const loaded = await loader();
    return "default" in loaded ? loaded : { default: loaded };
  });
  const Loading = options?.loading;
  return (props: React.ComponentProps<T>) => <Suspense fallback={Loading ? <Loading /> : null}><LazyComponent {...props} /></Suspense>;
}
