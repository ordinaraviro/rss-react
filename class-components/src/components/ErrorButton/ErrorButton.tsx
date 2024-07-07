import React from "react";
import "./ErrorButton.scss";

interface Props {
  text: string;
}

interface State {
  generateError: boolean;
}

class ErrorButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      generateError: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState({ generateError: true });
  }

  render() {
    if (this.state.generateError) {
      throw new Error("I crashed!");
    }

    return (
      <button className="error-btn" onClick={this.handleClick}>
        {this.props.text}
      </button>
    );
  }
}

export default ErrorButton;
