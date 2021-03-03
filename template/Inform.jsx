import React from 'react';
import classnames from 'classnames';

import { Container, Item, Dot, Header, Body } from '../../components/inform';

const Inform = React.forwardRef((props = {}, ref) => {
  const {
    className,
    children,
    ...others
  } = props;

  const cls = classnames({
    'build-in-components-inform-render': true,
    [className]: !!className,
  });

  return (
    <Container ref={ref} className={cls} {...others}>
      <Header>
        我是标题
      </Header>
      <Body className="inform-body" title="投保人需确认被保险人是否符合以下投保条件？">
      #{text}
      </Body>
      <Body className="inform-body" title="以下情况可作为例外事项，仍符合投保条件：">
      #{text2}
      </Body>
    </Container>
  );
});

export default Inform;
