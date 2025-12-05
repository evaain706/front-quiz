import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  fallback: (reset: () => void) => ReactNode;
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('에러발생:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return this.props.fallback(this.resetError);
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
