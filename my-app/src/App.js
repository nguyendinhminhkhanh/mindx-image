import React, { Component } from "react";
import Header from "./Component/Header";
import ColorPicker from "./Component/ColorPicker";
import QuoteBox from "./Component/QuoteBox";
import "./App.css";
const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF", "#33FFF5"];

//để đổi được màu backdround color của app cần có quản lý
//props, state, lifecycle
//nằm cứ cấp App
//tuy nhiên color lại nằm ở colorPicker là con của APp
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeColor: colors[0],
    };
  }

  handleActiveColor = (newColor) => {
    //modify directly
    //this.state.colors = newColor; // sai
    this.setState({
      activeColor: newColor,
    });
  };

  render() {
    const { activeColor } = this.state;
    return (
      <div className="App" style={{ backgroundColor: activeColor }}>
        <div className="Header-box">
          <Header title="Random quote machine title" />
        </div>
        <div className="Quote-wrapper">
          <QuoteBox activeColor={activeColor}/>
        </div>
        <div className="ColorPicker-box">
          <ColorPicker
            colors={colors}
            activeColor={activeColor}
            handleActiveColor={this.handleActiveColor}
          />
        </div>
      </div>
    );
  }
}

//để con có thể thay đổi đượic state của cha
//state => cha mới có quyền gọi hàn thí.setState
//khia báo ở cha một hàn có this.setState
//để con có thể sử dụng được hàm này -> truyền hàm này xuóng thằng con qua props
// LIFE STATE up

export default App;
