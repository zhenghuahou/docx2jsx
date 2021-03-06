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
      <Body><Item className="" title="名词解释">
<span>
高风险运动：指潜水、滑水、冲浪、赛艇、漂流、滑 翔翼、热气球、跳伞或其他高空运动、蹦极、乘坐或驾驶商业民航班机以外的飞行器、攀岩、攀登海拔 3500 米以上的独立山峰、攀爬建筑物、滑雪、滑冰、武术、摔跤、柔道、空手道、跆拳道、拳击、马术、赛马、赛车、特技表演（含训练）、替身表演（含训练）、探险或考察活动（洞穴、极地、沙漠、火山、冰川等等）。
潜水：指以辅助呼吸器材在江、河、湖、海、水库、运河等水域进行的水下运动。
攀岩：指攀登悬崖、楼宇外墙、人造悬崖、冰崖、冰山等运动。
武术：指两人或者两人以上对抗性柔道、空手道、跆拳道、散打、拳击等各种拳术及各种使用 器械的对抗性比赛。
特技表演：指进行马术、杂技、驯兽等表演。
探险：指明知在某种特定的自然条件下有失去生命或使身体受到伤害的危险，而故意使自己置身其中的行为。如江河漂流、徒步穿越沙漠或人迹罕至的原始森林等活动。
酒后驾驶：指经检测或者鉴定，发生事故时车辆驾驶人员每百毫升血液中的酒精含量达到或者超过一定的标准，公安机关交通管理部门依据《道路交通安全法》的规定认定为饮酒后驾驶或者醉酒后驾驶。
</span>
</Item></Body>
    </Container>
  );
});

export default ClauseExemption;
