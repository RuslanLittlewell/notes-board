import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

export const withRouter = (component: () => React.ReactNode) => () =>
  (
    <BrowserRouter basename="/">
      <Suspense
        fallback={<span className="loader"/>}
      >
        {component()}
      </Suspense>
    </BrowserRouter>
  );
