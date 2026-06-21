'use client';

import { Component } from 'react';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
          <div className="max-w-md mx-auto text-center">
            <FaExclamationTriangle className="text-6xl text-red-400 mx-auto mb-6" />
            
            <h1 className="text-3xl font-bold text-white mb-4">
              Something Went Wrong
            </h1>
            
            <p className="text-gray-400 mb-8">
              We're sorry for the inconvenience. Please try reloading the page.
            </p>
            
            <button
              onClick={this.handleReload}
              className="px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-lg font-medium hover:from-violet-700 hover:to-blue-700 transition-all flex items-center gap-2 mx-auto"
            >
              <FaRedo />
              Reload Page
            </button>
            
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mt-8 p-4 bg-gray-800 rounded-lg text-left">
                <p className="text-red-400 text-sm font-mono">
                  {this.state.error.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}