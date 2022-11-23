import { Component, ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <>
          <h1>Что-то пошло не так.</h1>
          <button type="button" onClick={() => window.location.reload()}>
            Обновить страницу
          </button>
        </>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
