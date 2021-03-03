import React from 'react';
import classnames from 'classnames';
import { Container, Item, Header, Body } from '../../components/inform';

const ClauseExemption = React.forwardRef((props = {}, ref) => {
  const {
    className,
    children,
    ...others
  } = props;

  const cls = classnames({
    'clause-exemption': true,
    [className]: !!className,
  });

  return (
    <Container ref={ref} className={cls} {...others}>
      <Header>
        我是测试文字
      </Header>
      <Body>#{text}</Body>
    </Container>
  );
});

export default ClauseExemption;
