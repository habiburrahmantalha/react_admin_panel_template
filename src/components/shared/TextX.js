import React from 'react';
import {Typography} from 'antd';

const { Text } = Typography;

export class TextX extends React.Component {
  render() {
    const {
      text,
      font,
      size,
      color,
      weight,
      align,
    } = this.props;


    const styleText = {
      color: color,
      fontSize: `${size}px`,
      fontFamily: getFont(font),
      fontWeight: weight,
      lineHeight: 1,
      textAlign: align,
      transitionDuration: '0.5s, 0s',
    };

    return (
        <Text style={styleText}>{text}</Text>
    );
  }
}

function getFont(font) {
  switch (font) {
  case 'Roboto':
    return 'Roboto-Regular';
  case 'Roboto-Medium':
    return 'Roboto-Medium';
  case 'Eina-Regular':
    return 'Eina-Regular';
  case 'Eina-Bold':
    return 'Eina-Bold';
  case 'SFProDisplay-Regular':
    return 'SFProDisplay-Regular';
  case 'SFProDisplay-Medium':
    return 'SFProDisplay-Medium';
  case 'SFProDisplay-Semibold':
    return 'SFProDisplay-Semibold';
  case 'SFProDisplay-Bold':
    return 'SFProDisplay-Bold';
  default:
    return 'SFProDisplay-Regular';
  }
}
