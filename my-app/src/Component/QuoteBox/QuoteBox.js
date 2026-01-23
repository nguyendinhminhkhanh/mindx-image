import React, { Component } from "react";
import { RefreshCcw } from "react-feather";
import axios from "axios";
import "./QuoteBox.css";

import "spoilerjs/spoiler-span";

//onLoad script => gọi Api
// click button => gọi API
class QuoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "idle",
      quote: null,
    };
  }

  //chạy 1 lần sai khi render lần đàu tiên
  async componentDidMount() {
    this.fetchRandomQuote();
  }

  fetchRandomQuote = async () => {
    try {
      this.setState({ status: "loading" });
      const res = await axios.get("https://api.quotable.io/random");
      const quote = res.data;

      this.setState({ status: "done", quote });
    } catch (error) {
      this.setState({ status: "error" });
    }
  };

  handleRefreshQuote = () => {
    this.fetchRandomQuote();
  };

  renderQuote = () => {
    const { status, quote } = this.state;
    if (status === "idle" || status === "loading") {
      return <div>Loading...</div>;
    }
    if (status === "error") {
      return <div>Something wenr wrong</div>;
    }
    return (
      <>
        <div className="content">"{quote.content}"</div>
        <div className="author">- {quote.author}</div>

        <div>
          <h1>dateModified</h1>
          <p>
            <spoiler-span>{quote.dateModified}</spoiler-span>
          </p>
        </div>
      </>
    );
  };

  render() {
    console.log("QuoteBox ");
    const { activeColor } = this.props;
    return (
      <div className="QuoteBox" style={{ color: activeColor }}>
        {this.renderQuote()}
        <div className="newAction">
          <button
            className="refresh"
            style={{ backgroundColor: activeColor }}
            onClick={this.handleRefreshQuote}
          >
            <RefreshCcw size={20} style={{ marginRight: 4 }} />
            New Quote
          </button>
        </div>
      </div>
    );
  }
}

export default QuoteBox;
