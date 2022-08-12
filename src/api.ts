import ui from 'ui';
import Util from 'util';
export class APIClass {
  _ui = ui;
  _counter = this._ui.Container.Time.Counter;
  _lastRanAt = 0;
  _slots: Record<string, 1|2|3> = {};
  _slottext: Record<string, string> = {};
  _stattemplate = '<b><font face="SourceSansSemibold">%s:</font></b> %s';
  _playtimeChangedEvent: BindableEvent<(Playtime:number)=>any> = new Instance('BindableEvent');
  _getslot(slot:1|2|3){
    return this._ui.Container.Stats[`Stat${slot}`];
  }
  _initdrag(){
    // Setup Dragging
    const InputService = game.GetService('UserInputService'),
      TweenService = game.GetService('TweenService');
    const Container = this._ui.Container;
    const Hijacker = Container.ClickHijacker;
    let BeginDragUIPosition = Container.Position;

    const _TweenInfo = new TweenInfo(0.1, Enum.EasingStyle.Sine, Enum.EasingDirection.Out);

    let IsDragging = false;
    let BeginDragPosition: Vector3;

    // Setup Drag InputChanged Connection (the thing that moves stuff)
    InputService.InputChanged.Connect((inputObject) => {
      if (inputObject.UserInputType === Enum.UserInputType.MouseMovement || inputObject.UserInputType === Enum.UserInputType.Touch)  // why am i supporting touch here? idk but why not
        if (IsDragging) {
          const delta = inputObject.Position.sub(BeginDragPosition);
          const currentPos = BeginDragUIPosition.add(UDim2.fromOffset(delta.X, delta.Y));
          const tween = TweenService.Create(Container, _TweenInfo, { 'Position': currentPos });
          tween.Play();
        }
    });
    // Setup Click Handler
    Hijacker.InputBegan.Connect((inputObj)=>{
      if (inputObj.UserInputType === Enum.UserInputType.MouseButton1 || inputObj.UserInputType === Enum.UserInputType.Touch) {
        IsDragging = true;
        BeginDragPosition = inputObj.Position;
        BeginDragUIPosition = Container.Position;
        const Changed = inputObj.Changed as RBXScriptSignal;
        Changed.Connect(()=>{
          if (inputObj.UserInputState === Enum.UserInputState.End)
            IsDragging = false;
        });
      }
    });
  }
  _ConnectToDisconnectScreen(){
    const uiService = game.GetService('GuiService');
    let run: (object: TextLabel) => void = ()=>undefined;
    const Connection2: RBXScriptConnection[] = [];
    const Connection = game.GetService('CoreGui').DescendantAdded.Connect((desc)=>{
      if (desc.IsA('TextLabel') && desc.FindFirstAncestor('MessageArea') && !desc.FindFirstAncestor('DevConsoleMaster')) {
        run(desc);
        const ScriptSignal = desc.Changed as RBXScriptSignal;
        Connection2.push(ScriptSignal.Connect(()=>{
          run(desc);
        }));
      }
    });
    let caught = false;
    run = (object: TextLabel)=>{
      const find = ()=>string.find(object.Text, 'You were kicked');
      if ((object.Name === 'ErrorMessage' || find()[0]) && this.ShouldShowTimeOnDisconnectScreen && !caught){
        if (!find()[0])
          while (object && !find()[0])
            task.wait(1);
        caught = true;
        Connection.Disconnect();
        Connection2.forEach(v=>v.Disconnect());
        const DisconnectedText = object.Text;
        if (this.ShouldReplaceDisconnectScreen) {
          // TODO: Replace this with UI Creration Function & whatnot
          print('got kicked\nreason:', DisconnectedText);
          task.wait(5);
          uiService.ClearError();
        } else {
          // object.RichText = true;
          // object.Text = `${DisconnectedText}<br/>-----------------<br/>Playtime: ${this.FormatTime()}`;
          const ErrorPrompt = object.FindFirstAncestor('ErrorPrompt');
          if (ErrorPrompt && ErrorPrompt.IsA('Frame')){
          // @ts-ignore
            for (const iterator of ErrorPrompt.GetDescendants())
              if (iterator.Name === 'ErrorTitle' && iterator.IsA('TextLabel'))
                iterator.Text = `${iterator.Text} | Playtime: ${this.FormatTime(true)}`;
            // Customize Error Message
            ErrorPrompt.BackgroundColor3 = new Color3(1, 1, 1);
            const Gradient = new Instance('UIGradient');
            Gradient.Color = new ColorSequence([
              new ColorSequenceKeypoint(0.00, Color3.fromRGB(155, 130, 187)),
              new ColorSequenceKeypoint(1.00, Color3.fromRGB(97, 153, 212))
            ]);
            Gradient.Parent = ErrorPrompt;
            Gradient.Rotation = 45;
            const UICorner = new Instance('UICorner');
            UICorner.Parent = ErrorPrompt;
            const Background = new Instance('ImageLabel');
            Background.ZIndex = ErrorPrompt.ZIndex - 1;
            Background.AnchorPoint = new Vector2(0.5, 0.5);
            Background.Position = new UDim2(0.5, 0, 0.5, 0);
            Background.BackgroundTransparency = 1;
            Background.Parent = ErrorPrompt;
            object.TextColor3 = Color3.fromRGB(224, 224, 224);
          }
        }
      }
    };
  }
  /** Sets the position of the ui */
  SetPosition(Pos: UDim2) {
    this._ui.Container.Position = Pos;
  }
  /** Gets the position of the ui */
  GetPosition() {
    return this._ui.Container.Position;
  }
  /** Sets Statistic {@link name} to {@link value} */
  SetStat(name:string, value:string) {
    const slot = this._slots[name];
    if (!slot)
      return error(`stat not bound to slow: ${name}`);
    const slotLabel = this._getslot(slot);
    slotLabel.Text = this._stattemplate.format(name, value);
    slotLabel.RichText = true;
  }
  /** Binds {@link name} to statistics slot {@link slot} so it can be used in {@link SetStat} */
  SetStatSlot(slot:1|2|3, name:string, value = 'No Value') {
    if (slot < 1 || slot > 3)
      error(`expected slot to be in range 1-3, got ${slot}`);
    this._slots[name] = slot;
    this.SetStat(name, value);
  }
  /** Playtime Timer, in seconds */
  Time = 0;
  /** Adds {@link delta} to the {@link Time Playtime} */
  TickTimer(delta:number) {
    this.Time = this.Time + delta;
    this.UpdateTimer();
  }
  /** Formats {@link Time Playtime} */
  FormatTime(ForceIncludeMinutes = false){
    const dt = DateTime.fromUnixTimestamp(this.Time);
    const Hour = dt.FormatUniversalTime('HH', 'en-GB');
    const Minute = dt.FormatUniversalTime('mm', 'en-GB');
    const Second = dt.FormatUniversalTime('ss', 'en-GB');
    let Final = '';
    if (Hour !== '00')
      Final = `${Hour}:`;
    if (Final || Minute !== '00' || ForceIncludeMinutes)
      Final = `${Final}${Minute}:`;
    Final = `${Final}${Second}`;
    return Final;
  }
  /** Updates the {@link Time Playtime} Timer */
  UpdateTimer(force = false) {
    if (!force && this.Time - this._lastRanAt < 0.5)
      return;
    const Final = this.FormatTime();
    this._counter.Text = Final;
    this._playtimeChangedEvent.Fire(this.Time);
  }
  /** Resets {@link Time Playtime} */
  ResetTimer(){
    this.Time = 0;
    this.UpdateTimer(true);
  }
  /** Sets {@link Time Playtime} to {@link value} (seconds) */
  SetTimer(value = 0){
    this.Time = value;
    this.UpdateTimer(true);
  }
  /** Gets {@link Time Playtime} in seconds */
  GetTimer(){
    return this.Time;
  }
  /** Defines if we should show the playtime on the disconnected screen */
  ShouldShowTimeOnDisconnectScreen = true;
  /** Defines if we should use a custom UI to replace the disconnect screen | Requires {@link ShouldShowTimeOnDisconnectScreen}=true | TODO: Implement this */
  ShouldReplaceDisconnectScreen = false;
  /** Fires when the playtime text updates | Fires with the amount of seconds (number) */
  TimeChanged = this._playtimeChangedEvent.Event;
  /** Fires when the playtime text updates | Fires with the amount of seconds (number) */
  PlaytimeChanged = this.TimeChanged;
  /** Utility Class */
  Utility: Util;
  /** Constructor */
  constructor(){
    // Set ZIndex
    this._ui.ZIndexBehavior = Enum.ZIndexBehavior.Global;
    this._ui.Container.ZIndex = 6969;
    // Setup Timer
    game.GetService('RunService').RenderStepped.Connect((delta:number)=>this.TickTimer(delta));
    this.ResetTimer();
    // Setup Drag Behaviour
    this._initdrag();
    // Define Utility
    this.Utility = new Util(this);
    // Connect to Disconnect Screen
    this._ConnectToDisconnectScreen();
  }
}
const api = new APIClass;
api.SetStatSlot(1, '---', '---');
api.SetStatSlot(2, '---', '---');
api.SetStatSlot(3, '---', '---');
export default api;
