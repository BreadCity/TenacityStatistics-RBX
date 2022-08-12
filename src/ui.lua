return (function(gethui)
  -- Gui to Lua
  -- Version: 3.2

  -- Instances:

  local StatisticsGUI = Instance.new('ScreenGui')
  local Container = Instance.new('Frame')
  local bg = Instance.new('Frame')
  local UICorner = Instance.new('UICorner')
  local UIGradient = Instance.new('UIGradient')
  local Blur = Instance.new('ImageLabel')
  local StatText = Instance.new('TextLabel')
  local Frame = Instance.new('Frame')
  local UICorner_2 = Instance.new('UICorner')
  local TimeText = Instance.new('TextLabel')
  local Frame_2 = Instance.new('Frame')
  local UICorner_3 = Instance.new('UICorner')
  local Stats = Instance.new('Frame')
  local Stat1 = Instance.new('TextLabel')
  local UIListLayout = Instance.new('UIListLayout')
  local Stat2 = Instance.new('TextLabel')
  local Stat3 = Instance.new('TextLabel')
  local Time = Instance.new('ImageLabel')
  local UICorner_4 = Instance.new('UICorner')
  local Counter = Instance.new('TextLabel')
  local UIAspectRatioConstraint = Instance.new('UIAspectRatioConstraint')
  local ClickHijacker = Instance.new('Frame')

  -- Properties:

  StatisticsGUI.Name = 'StatisticsGUI'
  StatisticsGUI.Parent = gethui and gethui() or pcall(game.GetService, game, 'CoreGui') and game:GetService('CoreGui') or nil

  Container.Name = 'Container'
  Container.Parent = StatisticsGUI
  Container.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  Container.BackgroundTransparency = 0.999
  Container.BorderSizePixel = 0
  Container.Position = UDim2.new(0.0326906964, 0, 0.145654827, 0)
  Container.Size = UDim2.new(0, 342, 0, 149)
  Container.ZIndex = 5000

  bg.Name = 'bg'
  bg.Parent = Container
  bg.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  bg.Size = UDim2.new(1, 0, 1, 0)
  bg.ZIndex = 4999

  UICorner.Parent = bg

  UIGradient.Color = ColorSequence.new {
    ColorSequenceKeypoint.new(0.00, Color3.fromRGB(155, 130, 187));
    ColorSequenceKeypoint.new(1.00, Color3.fromRGB(97, 153, 212));
  }
  UIGradient.Rotation = 43
  UIGradient.Parent = bg

  Blur.Name = 'Blur'
  Blur.Parent = bg
  Blur.AnchorPoint = Vector2.new(0.5, 0.5)
  Blur.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  Blur.BackgroundTransparency = 1.000
  Blur.Position = UDim2.new(0.5, 0, 0.5, 0)
  Blur.Size = UDim2.new(0, 988, 0, 904)
  Blur.ZIndex = -3
  Blur.Image = 'rbxassetid://10568620742'

  StatText.Name = 'StatText'
  StatText.Parent = Container
  StatText.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  StatText.BackgroundTransparency = 1.000
  StatText.Position = UDim2.new(0.0326632671, 0, 0.0414201356, 0)
  StatText.Size = UDim2.new(0, 105, 0, 33)
  StatText.ZIndex = 5001
  StatText.Font = Enum.Font.SourceSansBold
  StatText.Text = 'Statistics'
  StatText.TextColor3 = Color3.fromRGB(255, 255, 255)
  StatText.TextScaled = true
  StatText.TextSize = 14.000
  StatText.TextWrapped = true
  StatText.TextXAlignment = Enum.TextXAlignment.Left

  Frame.Parent = StatText
  Frame.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  Frame.Position = UDim2.new(0, 0, 1, -4)
  Frame.Size = UDim2.new(1, 0, 0, 4)

  UICorner_2.CornerRadius = UDim.new(1, 0)
  UICorner_2.Parent = Frame

  TimeText.Name = 'TimeText'
  TimeText.Parent = Container
  TimeText.AnchorPoint = Vector2.new(1, 0)
  TimeText.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  TimeText.BackgroundTransparency = 1.000
  TimeText.Position = UDim2.new(0.959563851, 0, 0.0414201356, 0)
  TimeText.Size = UDim2.new(0, 102, 0, 33)
  TimeText.ZIndex = 5001
  TimeText.Font = Enum.Font.SourceSansBold
  TimeText.Text = 'Playtime'
  TimeText.TextColor3 = Color3.fromRGB(255, 255, 255)
  TimeText.TextScaled = true
  TimeText.TextSize = 14.000
  TimeText.TextWrapped = true
  TimeText.TextXAlignment = Enum.TextXAlignment.Right

  Frame_2.Parent = TimeText
  Frame_2.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  Frame_2.Position = UDim2.new(0, 0, 1, -4)
  Frame_2.Size = UDim2.new(1, 0, 0, 4)

  UICorner_3.CornerRadius = UDim.new(1, 0)
  UICorner_3.Parent = Frame_2

  Stats.Name = 'Stats'
  Stats.Parent = Container
  Stats.AnchorPoint = Vector2.new(0, 1)
  Stats.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  Stats.BackgroundTransparency = 0.999
  Stats.Position = UDim2.new(0.0326632671, 0, 0.946275294, 0)
  Stats.Size = UDim2.new(0, 209, 0, 93)
  Stats.ZIndex = 5001

  Stat1.Name = 'Stat1'
  Stat1.Parent = Stats
  Stat1.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  Stat1.BackgroundTransparency = 1.000
  Stat1.Size = UDim2.new(1, 0, 0, 25)
  Stat1.ZIndex = 5001
  Stat1.Font = Enum.Font.SourceSansLight
  Stat1.Text = ''
  Stat1.TextColor3 = Color3.fromRGB(255, 255, 255)
  Stat1.TextScaled = true
  Stat1.TextSize = 14.000
  Stat1.TextWrapped = true
  Stat1.TextXAlignment = Enum.TextXAlignment.Left

  UIListLayout.Parent = Stats
  UIListLayout.Padding = UDim.new(0, 4)

  Stat2.Name = 'Stat2'
  Stat2.Parent = Stats
  Stat2.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  Stat2.BackgroundTransparency = 1.000
  Stat2.Position = UDim2.new(-1.05741632, 0, -2.26881719, 0)
  Stat2.Size = UDim2.new(1, 0, 0, 25)
  Stat2.ZIndex = 5001
  Stat2.Font = Enum.Font.SourceSansLight
  Stat2.Text = ''
  Stat2.TextColor3 = Color3.fromRGB(255, 255, 255)
  Stat2.TextScaled = true
  Stat2.TextSize = 14.000
  Stat2.TextWrapped = true
  Stat2.TextXAlignment = Enum.TextXAlignment.Left

  Stat3.Name = 'Stat3'
  Stat3.Parent = Stats
  Stat3.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  Stat3.BackgroundTransparency = 1.000
  Stat3.Size = UDim2.new(1, 0, 0, 25)
  Stat3.ZIndex = 5001
  Stat3.Font = Enum.Font.SourceSansLight
  Stat3.Text = ''
  Stat3.TextColor3 = Color3.fromRGB(255, 255, 255)
  Stat3.TextScaled = true
  Stat3.TextSize = 14.000
  Stat3.TextWrapped = true
  Stat3.TextXAlignment = Enum.TextXAlignment.Left

  Time.Name = 'Time'
  Time.Parent = Container
  Time.AnchorPoint = Vector2.new(1, 1)
  Time.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  Time.BackgroundTransparency = 1.000
  Time.Position = UDim2.new(0.955417633, 0, 0.946275294, 0)
  Time.Size = UDim2.new(0, 93, 0, 95)
  Time.ZIndex = 5001
  Time.Image = 'rbxassetid://10567135619'

  UICorner_4.CornerRadius = UDim.new(1, 0)
  UICorner_4.Parent = Time

  Counter.Name = 'Counter'
  Counter.Parent = Time
  Counter.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  Counter.BackgroundTransparency = 1.000
  Counter.BorderSizePixel = 0
  Counter.Position = UDim2.new(-0.00882816315, 0, -0.0199304521, 0)
  Counter.Size = UDim2.new(1, 0, 1, 0)
  Counter.ZIndex = 5001
  Counter.Font = Enum.Font.SourceSansLight
  Counter.Text = '0:00'
  Counter.TextColor3 = Color3.fromRGB(255, 255, 255)
  Counter.TextSize = 24.000

  UIAspectRatioConstraint.Parent = Time
  UIAspectRatioConstraint.DominantAxis = Enum.DominantAxis.Height

  ClickHijacker.Name = 'ClickHijacker'
  ClickHijacker.Parent = Container
  ClickHijacker.BackgroundColor3 = Color3.fromRGB(255, 255, 255)
  ClickHijacker.BackgroundTransparency = 0.990
  ClickHijacker.Size = UDim2.new(1, 0, 1, 0)
  ClickHijacker.ZIndex = 5003
  -- Return
  return StatisticsGUI
end)(gethui)
