import React from 'react';

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

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className='flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-900 px-4 text-center text-white'>
          <h1 className='text-3xl font-bold md:text-4xl'>
            알 수 없는 오류가 발생했어요
          </h1>
          <p className='max-w-md text-lg text-gray-300'>
            잠시 후 다시 시도해주세요. 문제가 계속되면 새로고침 후 이용
            부탁드립니다.
          </p>
          <button
            type='button'
            onClick={this.handleReload}
            className='rounded bg-blue-500 px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-blue-600'
          >
            새로고침
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
