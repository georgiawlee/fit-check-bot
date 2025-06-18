import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="win98-error-screen">
          <div className="win98-error-window">
            <div className="win98-error-titlebar">
              <div className="win98-error-title">
                <span className="win98-error-text">Error</span>
              </div>
              <div className="win98-error-close">×</div>
            </div>
            <div className="win98-error-content">
              <div className="win98-error-icon">❌</div>
              <div className="win98-error-message">
                <h3>Something went wrong</h3>
                <p>The application has encountered an unexpected error.</p>
                <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
                  <summary>Error Details</summary>
                  {this.state.error && this.state.error.toString()}
                  <br />
                  {this.state.errorInfo && this.state.errorInfo.componentStack}
                </details>
                <div className="win98-error-actions">
                  <button 
                    className="win98-error-button"
                    onClick={() => window.location.reload()}
                  >
                    Reload Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;