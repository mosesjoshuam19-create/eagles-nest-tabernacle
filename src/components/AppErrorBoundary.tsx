import { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Unhandled application error:", error, errorInfo);
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 text-slate-900">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <img
            src="/uploads/etmlogo.png"
            alt="Eagle's Nest Tabernacle logo"
            className="mx-auto mb-6 h-24 w-24 object-contain"
          />
          <h1 className="text-2xl font-bold">We need to reload this page</h1>
          <p className="mt-3 text-slate-600">
            The site encountered an unexpected problem. Your account and content
            are safe. Please reload the page or return to the homepage.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="rounded-md bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800"
            >
              Reload page
            </button>
            <Link
              to="/"
              className="rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:bg-slate-50"
            >
              Go home
            </Link>
          </div>
        </section>
      </main>
    );
  }
}

export default AppErrorBoundary;
