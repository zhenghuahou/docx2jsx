import React from 'react';
import classnames from 'classnames';
import { Container, Item, Body } from '../../components/inform';

const ClauseHint = React.forwardRef((props = {}, ref) => {
  const {
    className,
    children,
    ...others
  } = props;

  const cls = classnames({
    'clause-hint': true,
    [className]: !!className,
  });

  return (
    <Container ref={ref} className={cls} {...others}>
      <Body>#{text}</Body>
    </Container>
  );
});

export default ClauseHint;
