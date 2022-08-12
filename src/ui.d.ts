interface StatsFrame extends Frame {
  UIListLayout: UIListLayout,
  Stat1: TextLabel,
  Stat2: TextLabel,
  Stat3: TextLabel,
}
interface Container extends Frame {
  Stats: StatsFrame,
  bg: (Frame & {
    UICorner: UICorner,
    UIGradient: UIGradient,
  }),
  Time: (ImageLabel & {
    UIAspectRatioConstraint: UIAspectRatioConstraint,
    UICorner: UICorner,
    Counter: TextLabel,
  }),
  StatText: TextLabel,
  TimeText: TextLabel,
  ClickHijacker: Frame,
}
interface StatisticsGUI extends ScreenGui {
  Container: Container
}

declare const StatisticsGUI: StatisticsGUI;

export = StatisticsGUI;
