
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("The application root element is missing.");
}

const hasSupabaseConfiguration =
  Boolean(import.meta.env.VITE_SUPABASE_URL) &&
  Boolean(import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);

if (!hasSupabaseConfiguration) {
  ReactDOM.createRoot(rootElement).render(
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-900">
      <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <img
          src="/uploads/etmlogo.png"
          alt="Eagle's Nest Tabernacle logo"
          className="mx-auto mb-6 h-24 w-24 object-contain"
        />
        <h1 className="text-2xl font-bold">Site configuration required</h1>
        <p className="mt-3 text-slate-600">
          The site is deployed, but its Supabase environment variables have not
          been added to Vercel yet.
        </p>
        <p className="mt-4 rounded-lg bg-slate-100 p-3 text-left font-mono text-xs text-slate-700">
          VITE_SUPABASE_URL
          <br />
          VITE_SUPABASE_PUBLISHABLE_KEY
        </p>
      </section>
    </main>,
  );
} else {
  import("./App.tsx").then(({ default: App }) => {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  });
}
