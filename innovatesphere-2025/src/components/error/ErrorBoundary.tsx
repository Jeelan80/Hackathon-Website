import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { GlassmorphismCard, AnimatedButton } from '../ui';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-gradient-to-b from-black via-gray-900 to-black">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto"
          >
            <GlassmorphismCard className="p-8 text-center" glow>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <FaExclamationTriangle className="text-6xl text-orange-400 mx-auto" />
              </motion.div>
              
              <h1 className="text-3xl font-bold text-white mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                We encountered an unexpected error. Don't worry, our team has been notified 
                and we're working to fix this issue.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <AnimatedButton
                  variant="primary"
                  size="md"
                  onClick={this.handleReset}
                  glow
                >
                  <div className="flex items-center gap-2">
                    <FaRedo />
                    Try Again
                  </div>
                </AnimatedButton>
                
                <AnimatedButton
                  variant="ghost"
                  size="md"
                  onClick={() => window.location.href = '/'}
                >
                  Go Home
                </AnimatedButton>
              </div>

              {/* Error Details (only in development) */}
              {import.meta.env.DEV && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="text-gray-400 cursor-pointer hover:text-white transition-colors">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-4 p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                    <pre className="text-red-300 text-sm overflow-auto">
                      {this.state.error.toString()}
                      {this.state.errorInfo?.componentStack}
                    </pre>
                  </div>
                </details>
              )}
            </GlassmorphismCard>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;