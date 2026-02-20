import React from 'react';
import GlobalErrorFallback from './GlobalErrorFallback';

interface GlobalErrorBoundaryState {
  hasError: boolean;
}

interface GlobalErrorBoundaryProps {
  children: React.ReactNode;
}

class GlobalErrorBoundary extends React.Component<
  GlobalErrorBoundaryProps,
  GlobalErrorBoundaryState
> {
  constructor(props: GlobalErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, errorInfo: unknown) {
    console.error('Global error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <GlobalErrorFallback />;
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
