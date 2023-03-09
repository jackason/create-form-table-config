import { render } from "solid-js/web";
import { HopeProvider } from "@hope-ui/solid";
import { QueryClient, QueryClientProvider } from "@tanstack/solid-query";
import App from "./app";
import "./index.css";

let queryClient = new QueryClient();

render(
  () =>
    (
      <HopeProvider enableCssReset={false}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </HopeProvider>
    ) as any,
  (() => {
    // 给 body 添加一个 div
    let app = document.createElement("div");
    app.id = "my-solid-root";
    document.body.appendChild(app);
    return app;
  })()
);
