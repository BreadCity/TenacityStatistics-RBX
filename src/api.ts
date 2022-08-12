import ui from 'ui';
import Util from 'util';
export class APIClass {
  _ui = ui;
  _counter = this._ui.Container.Time.Counter;
  _lastRanAt = 0;
  _slots: Record<string, 1|2|3> = {};
  _slottext: Record<string, string> = {};
  _stattemplate = '<b><font face="SourceSansSemibold">%s:</font></b> %s';
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
      return error(`slot does not exist: ${name}`);
    const slotLabel = this._getslot(slot);
    slotLabel.Text = this._stattemplate.format(name, value);
    slotLabel.RichText = true;
  }
  /** Binds {@link name} to statistics slot {@link slot} so it can be used in {@link SetStat} */
  SetStatSlot(slot:1|2|3, name:string, value = 'No Value') {
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
  /** Updates the {@link Time Playtime} Timer */
  UpdateTimer(force = false) {
    if (!force && this.Time - this._lastRanAt < 0.5)
      return;
    const dt = DateTime.fromUnixTimestamp(this.Time);
    const Hour = dt.FormatUniversalTime('HH', 'en-GB');
    const Minute = dt.FormatUniversalTime('mm', 'en-GB');
    const Second = dt.FormatUniversalTime('ss', 'en-GB');
    let Final = '';
    if (Hour !== '00')
      Final = `${Hour}:`;
    if (Final || Minute !== '00')
      Final = `${Final}${Minute}:`;
    Final = `${Final}${Second}`;
    this._counter.Text = Final;
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
  }
}
const api = new APIClass;
api.SetStatSlot(1, '---', '---');
api.SetStatSlot(2, '---', '---');
api.SetStatSlot(3, '---', '---');
export default api;
