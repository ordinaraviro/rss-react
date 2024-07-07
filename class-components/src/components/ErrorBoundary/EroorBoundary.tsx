import React, { ReactNode } from "react";
import "./ErrorBoundary.scss";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErorrBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <p className="error-message">Something broke</p>;
    }
    return this.props.children;
  }
}

export default ErorrBoundary;
