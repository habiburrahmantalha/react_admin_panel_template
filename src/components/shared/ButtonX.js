import React from 'react';
import {Button, Row} from 'antd';

export class ButtonX extends React.Component {

  render() {
    const {
      text,
      onClick,
      name,
      className,
      htmlType,
        iconRight
    } = this.props;

    var center = !iconRight;
    return (
      <Button
        className={className}
        key={name}
        onClick={onClick ? () => onClick(name) : null}
        htmlType={htmlType ? htmlType : null}
      >
        <Row type="flex" align="middle" justify={center ? "center": "space-between"}>
          {/*{iconLeft ? this.prepareIcon(antd, iconLeft, iconSize) : null}*/}
          {/*<Space width={iconLeft ? '10' : '0'} />*/}
          <div>{text}</div>
          {/*{icon ? this.prepareIcon(antd, icon, iconSize) : null}*/}
          {/*<Space width={iconRight ? '10' : '0'} />*/}
          {iconRight ?? null}
        </Row>
      </Button>
    );
  }
}
