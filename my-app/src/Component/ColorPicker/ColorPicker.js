import React, { Component } from "react";
import "./ColorPicker.css";

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    const { colors } = this.props;

    //khai báo được biến active mặc định
    this.state = {
      activeColor: colors[0],
    };
  }

  handleActiveColor = (newColor) => {
    this.setState({ activeColor: newColor });
  };

  render() {
    const { colors, activeColor, handleActiveColor } = this.props;

    return (
      <div className="ColoPicker">
        {colors.map((color) => {
          const style = { backgroundColor: color };
          const cls =
            color === activeColor ? "color-item active" : "color-item";
          return (
            <span
              key={color}
              className={cls}
              style={style}
              onClick={() => handleActiveColor(color)}
            ></span>
          );
        })}
      </div>
    );
  }
}

//khi dùng list rendering => mảng JS.map => mảng JSX cần config key duy nhất
export default ColorPicker;
