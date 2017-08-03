/*!
 * debug.js
 * Copyright 2017 Takashi Harano
 * Released under the MIT license
 * https://debugjs.net/
 */
var DebugJS = DebugJS || function() {
  this.v = '201708040108';

  this.DEFAULT_OPTIONS = {
    visible: false,
    keyAssign: {
      key: 113,
      shift: false,
      ctrl: false,
      alt: false,
      meta: false
    },
    popupOnError: {
      scriptError: true,
      loadError: true,
      errorLog: true
    },
    lines: 18,
    bufsize: 300,
    width: 520,
    zoom: 1,
    position: 'se',
    adjPosX: 20,
    adjPosY: 20,
    fontSize: 12,
    fontFamily: 'Consolas, monospace',
    fontColor: '#fff',
    logColorV: '#aaa',
    logColorD: '#ccc',
    logColorI: '#9ef',
    logColorW: '#fe0',
    logColorE: '#f88',
    logColorS: '#fff',
    clockColor: '#8f0',
    timerColor: '#9ef',
    sysInfoColor: '#ddd',
    btnColor: '#6cf',
    btnHoverColor: '#8ef',
    promptColor: '#0cf',
    promptColorE: '#f45',
    background: 'rgba(0,0,0,0.65)',
    border: 'solid 1px #888',
    borderRadius: '0',
    opacity: '1',
    showLineNums: true,
    showTimeStamp: true,
    resizable: true,
    togglableShowHide: true,
    useClock: true,
    useClearButton: true,
    useSuspendLogButton: true,
    usePinButton: true,
    useWindowControlButton: true,
    useStopWatch: true,
    useWindowSizeInfo: true,
    useMouseStatusInfo: true,
    useKeyStatusInfo: true,
    useLed: true,
    useMsgDisplay: true,
    msgDisplayPos: 'right',
    msgDisplayBackground: 'rgba(0,0,0,0.2)',
    useScreenMeasure: true,
    useSystemInfo: true,
    useHtmlSrc: true,
    useElementInfo: true,
    useTools: true,
    useScriptEditor: true,
    useLogFilter: true,
    useCommandLine: true,
    cmdHistoryMax: 100,
    timerLineColor: '#0cf',
    timerDefaultVal: {
      hh: '00',
      mi: '03',
      ss: '00',
      sss: '000'
    },
    disableAllCommands: false,
    disableAllFeatures: false,
    onFileLoaded: null,
    mode: '',
    target: null
  };
  this.DEFAULT_ELM_ID = '_debug_';
  this.id = null;
  this.bodyEl = null;
  this.styleEl = null;
  this.dbgWin = null;
  this.winBody = null;
  this.headPanel = null;
  this.infoPanel = null;
  this.clockPanel = null;
  this.clockUpdIntHCnt = 0;
  this.clockUpdInt = DebugJS.UPDATE_INTERVAL_L;
  this.measureBtn = null;
  this.measureBox = null;
  this.sysInfoBtn = null;
  this.sysInfoPanel = null;
  this.htmlSrcBtn = null;
  this.htmlSrcPanel = null;
  this.htmlSrcHeaderPanel = null;
  this.htmlSrcUpdateInputLabel = null;
  this.htmlSrcUpdateInputLabel2 = null;
  this.htmlSrcUpdateInput = null;
  this.htmlSrcBodyPanel = null;
  this.htmlSrcUpdateInterval = 0;
  this.htmlSrcUpdateTimerId = 0;
  this.elmInfoBtn = null;
  this.elmInfoPanel = null;
  this.elmInfoHeaderPanel = null;
  this.elmPrevBtn = null;
  this.elmTitle = null;
  this.elmNextBtn = null;
  this.elmSelectBtn = null;
  this.elmHighlightBtn = null;
  this.elmUpdateBtn = null;
  this.elmCapBtn = null;
  this.elmUpdateInputLabel = null;
  this.elmUpdateInputLabel2 = null;
  this.elmUpdateInput = null;
  this.elmNumPanel = null;
  this.elmInfoBodyPanel = null;
  this.elmInfoStatus = DebugJS.ELMINFO_STATE_SELECT | DebugJS.ELMINFO_STATE_HIGHLIGHT;
  this.elmUpdateInterval = 0;
  this.elmUpdateTimerId = 0;
  this.elmInfoShowHideStatus = {text: false, allStyles: false, elBorder: false, htmlSrc: false};
  this.targetElm = null;
  this.toolsBtn = null;
  this.toolsPanel = null;
  this.toolsHeaderPanel = null;
  this.toolsBodyPanel = null;
  this.timerBtn = null;
  this.timerBasePanel = null;
  this.timerClockSubPanel = null;
  this.timerClockLabel = null;
  this.timerStopWatchCuSubPanel = null;
  this.timerStopWatchCuLabel = null;
  this.timerStopWatchCdSubPanel = null;
  this.timerStopWatchCdLabel = null;
  this.timerStopWatchCdInpSubPanel = null;
  this.timerStopWatchCdInput = null;
  this.timerSwStartTime = 0;
  this.timerTimeUpTime = 0;
  this.timerSwTimeCu = 0;
  this.timerSwTimeCd = 0;
  this.timerStartStopBtnCu = null;
  this.timerStartStopBtnCd = null;
  this.timerStartStopBtnCdInp = null;
  this.txtChkBtn = null;
  this.txtChkPanel = null;
  this.txtChk = null;
  this.txtChkFontSizeRange = null;
  this.txtChkFontSizeInput = null;
  this.txtChkFontWeightRange = null;
  this.txtChkFontWeightLabel = null;
  this.txtChkInputFgRGB = null;
  this.txtChkRangeFgR = null;
  this.txtChkRangeFgG = null;
  this.txtChkRangeFgB = null;
  this.txtChkLabelFgR = null;
  this.txtChkLabelFgG = null;
  this.txtChkLabelFgB = null;
  this.txtChkInputBgRGB = null;
  this.txtChkRangeBgR = null;
  this.txtChkRangeBgG = null;
  this.txtChkRangeBgB = null;
  this.txtChkLabelBgR = null;
  this.txtChkLabelBgG = null;
  this.txtChkLabelBgB = null;
  this.fileLoaderBtn = null;
  this.fileLoaderPanel = null;
  this.fileInput = null;
  this.fileLoaderLabelB64 = null;
  this.fileLoaderRadioB64 = null;
  this.fileLoaderLabelBin = null;
  this.fileLoaderRadioBin = null;
  this.filePreviewWrapper = null;
  this.filePreview = null;
  this.fileLoaderFooter = null;
  this.fileLoadProgressBar = null;
  this.fileLoadProgress = null;
  this.fileLoadCancelBtn = null;
  this.fileLoadFormat = DebugJS.FILE_LOAD_FORMAT_B64;
  this.fileLoaderFile = null;
  this.fileReader = null;
  this.scriptBtn = null;
  this.scriptPanel = null;
  this.scriptEditor = null;
  this.scriptBuf = '';
  this.htmlPrevBtn = null;
  this.htmlPrevBasePanel = null;
  this.htmlPrevPrevPanel = null;
  this.htmlPrevEditorPanel = null;
  this.htmlPrevEditor = null;
  this.htmlPrevBuf = '';
  this.memoBtn = null;
  this.memoBasePanel = null;
  this.memoEditorPanel = null;
  this.memoEditor = null;
  this.swBtnPanel = null;
  this.swPanel = null;
  this.swStartTime = 0;
  this.swElapsedTime = 0;
  this.swElapsedTimeDisp = '00:00:00.000';
  this.clearBtn = null;
  this.suspendLogBtn = null;
  this.preserveLogBtn = null;
  this.pinBtn = null;
  this.winCtrlBtnPanel = null;
  this.closeBtn = null;
  this.mousePositionPanel = null;
  this.mousePos = 'x=-,y=-';
  this.mouseClickPanel = null;
  this.mouseClick0 = DebugJS.COLOR_INACTIVE;
  this.mouseClick1 = DebugJS.COLOR_INACTIVE;
  this.mouseClick2 = DebugJS.COLOR_INACTIVE;
  this.windowSizePanel = null;
  this.clientSizePanel = null;
  this.bodySizePanel = null;
  this.scrollPosPanel = null;
  this.scrollPosX = 0;
  this.scrollPosY = 0;
  this.keyDownPanel = null;
  this.keyPressPanel = null;
  this.keyUpPanel = null;
  this.keyDownCode = DebugJS.KEY_STATUS_DEFAULT;
  this.keyPressCode = DebugJS.KEY_STATUS_DEFAULT;
  this.keyUpCode = DebugJS.KEY_STATUS_DEFAULT;
  this.ledPanel = null;
  this.led = 0;
  this.msgPanel = null;
  this.msgString = '';
  this.mainPanel = null;
  this.overlayBasePanel = null;
  this.overlayPanels = [];
  this.logHeaderPanel = null;
  this.filterBtnAll = null;
  this.filterBtnStd = null;
  this.filterBtnVrb = null;
  this.filterBtnDbg = null;
  this.filterBtnInf = null;
  this.filterBtnWrn = null;
  this.filterBtnErr = null;
  this.filterInputLabel = null;
  this.filterInput = null;
  this.filterText = '';
  this.logPanel = null;
  this.logPanelHeightAdjust = '';
  this.cmdPanel = null;
  this.cmdLine = null;
  this.cmdHistoryBuf = null;
  this.CMD_HISTORY_MAX = this.DEFAULT_OPTIONS.cmdHistoryMax;
  this.cmdHistoryIdx = this.CMD_HISTORY_MAX;
  this.cmdTmp = '';
  this.timers = {};
  this.initWidth = 0;
  this.initHeight = 0;
  this.orgSizePos = {w: 0, h: 0, t: 0, l: 0};
  this.expandModeOrg = {w: 0, h: 0, t: 0, l: 0};
  this.windowExpandHeight = DebugJS.DBGWIN_EXPAND_H * this.DEFAULT_OPTIONS.zoom;
  this.windowExpandCnt = 0;
  this.clickedPosX = 0;
  this.clickedPosY = 0;
  this.prevOffsetTop = 0;
  this.prevOffsetLeft = 0;
  this.savedFunc = null;
  this.computedFontSize = this.DEFAULT_OPTIONS.fontSize;
  this.computedWidth = this.DEFAULT_OPTIONS.width;
  this.computedMinW = DebugJS.DBGWIN_MIN_W;
  this.computedMinH = DebugJS.DBGWIN_MIN_H;
  this.status = 0;
  this.toolStatus = 0;
  this.toolTimerMode = DebugJS.TOOL_TIMER_MODE_CLOCK;
  this.sizeStatus = 0;
  this.logFilter = DebugJS.LOG_FILTER_ALL;
  this.toolsActiveFunction = DebugJS.TOOLS_ACTIVE_FNC_NONE;
  this.msgBuf = new DebugJS.RingBuffer(this.DEFAULT_OPTIONS.bufsize);
  this.INT_CMD_TBL = [
    {cmd: 'base64', fnc: this.cmdBase64, desc: 'Encodes/Decodes Base64 string', usage: 'base64 [-e|-d] string'},
    {cmd: 'bin', fnc: this.cmdBin, desc: 'Convert a number to binary', usage: 'bin num digit'},
    {cmd: 'cls', fnc: this.cmdCls, desc: 'Clear log message', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'date', fnc: this.cmdDate, desc: 'Convert ms <--> Date-Time'},
    {cmd: 'dumplog', fnc: this.cmdDumpLog, desc: 'Dump the log buffer'},
    {cmd: 'elements', fnc: this.cmdElements, desc: 'Count elements by #id / .className / tagName', usage: 'elements [#id|.className|tagName]'},
    {cmd: 'execute', fnc: this.cmdExecute, desc: 'Execute the edited JavaScript code'},
    {cmd: 'exit', fnc: this.cmdExit, desc: 'Close the debug window and clear all status', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'help', fnc: this.cmdHelp, desc: 'Displays available command list', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'hex', fnc: this.cmdHex, desc: 'Convert a number to hexadecimal', usage: 'hex num digit'},
    {cmd: 'history', fnc: this.cmdHistory, desc: 'Displays command history', usage: 'history [-c] [-d offset] [n]', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'http', fnc: this.cmdHttp, desc: 'Send an HTTP request', usage: 'http [method] url [--user user:pass] [data]'},
    {cmd: 'json', fnc: this.cmdJson, desc: 'Parse one-line JSON', usage: 'json [-l<n>] [-p] one-line-json'},
    {cmd: 'jquery', fnc: this.cmdJquery, desc: 'Displays what version of jQuery is loaded'},
    {cmd: 'keys', fnc: this.cmdKeys, desc: 'Displays all enumerable property keys of an object', usage: 'keys object'},
    {cmd: 'laptime', fnc: this.cmdLaptime, desc: 'Lap time test'},
    {cmd: 'launch', fnc: this.cmdLaunch, desc: 'Launch a function', usage: 'launch [sys|html|dom|js|tool] [text|file|html|memo] [b64|bin]'},
    {cmd: 'led', fnc: this.cmdLed, desc: 'Set a bit pattern to the indicator', usage: 'led bit-pattern'},
    {cmd: 'load', fnc: this.cmdLoad, desc: 'Load the log buffer', usage: 'load json-data'},
    {cmd: 'msg', fnc: this.cmdMsg, desc: 'Set a string to the message display', usage: 'msg message'},
    {cmd: 'p', fnc: this.cmdP, desc: 'Print JavaScript Objects', usage: 'p [-l<n>] object'},
    {cmd: 'pos', fnc: this.cmdPos, desc: 'Set the debugger window position', usage: 'pos n|ne|e|se|s|sw|w|nw|c', attr: DebugJS.CMD_ATTR_DYNAMIC | DebugJS.CMD_ATTR_NO_KIOSK},
    {cmd: 'prop', fnc: this.cmdProp, desc: 'Displays a property value', usage: 'prop property-name'},
    {cmd: 'props', fnc: this.cmdProps, desc: 'Displays property list'},
    {cmd: 'random', fnc: this.cmdRandom, desc: 'Generate a rondom number/string', usage: 'random [-d|-s] [min] [max]'},
    {cmd: 'rgb', fnc: this.cmdRGB, desc: 'Convert RGB color values between HEX and DEC', usage: 'rgb values (#<span style="color:' + DebugJS.COLOR_R + '">R</span><span style="color:' + DebugJS.COLOR_G + '">G</span><span style="color:' + DebugJS.COLOR_B + '">B</span> | <span style="color:' + DebugJS.COLOR_R + '">R</span> <span style="color:' + DebugJS.COLOR_G + '">G</span> <span style="color:' + DebugJS.COLOR_B + '">B</span>)'},
    {cmd: 'self', fnc: this.cmdSelf, attr: DebugJS.CMD_ATTR_HIDDEN},
    {cmd: 'set', fnc: this.cmdSet, desc: 'Set a property value', usage: 'set property-name value'},
    {cmd: 'stopwatch', fnc: this.cmdStopwatch, desc: 'Manipulate the stopwatch', usage: 'stopwatch start|stop|reset'},
    {cmd: 'timer', fnc: this.cmdTimer, desc: 'Manipulate the timer', usage: 'time start|split|stop|list [timer-name]'},
    {cmd: 'unicode', fnc: this.cmdUnicode, desc: 'Displays unicode code point / Decodes unicode string', usage: 'unicode [-e|-d] string|codePoint(s)'},
    {cmd: 'uri', fnc: this.cmdUri, desc: 'Encodes/Decodes a URI component', usage: 'uri [-e|-d] string'},
    {cmd: 'v', fnc: this.cmdV, desc: 'Displays version info', attr: DebugJS.CMD_ATTR_SYSTEM},
    {cmd: 'win', fnc: this.cmdWin, desc: 'Set the debugger window size', usage: 'win min|normal|max|full|expand|restore|reset', attr: DebugJS.CMD_ATTR_DYNAMIC | DebugJS.CMD_ATTR_NO_KIOSK},
    {cmd: 'zoom', fnc: this.cmdZoom, desc: 'Zoom the debugger window', usage: 'zoom ratio', attr: DebugJS.CMD_ATTR_DYNAMIC}
  ];
  this.intCmdTblLen = this.INT_CMD_TBL.length;
  this.CMD_TBL = [];
  this.options = null;
  this.errStatus = DebugJS.ERR_STATE_NONE;
  this.properties = {
    esc: {value: 'enable', restriction: /^enable$|^disable$/},
    dumplimit: {value: 1000, restriction: /^[0-9]+$/},
    dumpvallen: {value: 256, restriction: /^[0-9]+$/},
    prevlimit: {value: 5 * 1024 * 1024, restriction: /^[0-9]+$/},
    hexdumplimit: {value: 102400, restriction: /^[0-9]+$/}
  };
  this.setupDefaultOptions();
};
DebugJS.ENABLE = true;
DebugJS.MERGE_CONSOLE = true;
DebugJS.MAX_SAFE_INT = 0x1FFFFFFFFFFFFF;
DebugJS.DEFAULT_UNIT = 32;
DebugJS.INIT_CAUSE_ZOOM = 1;
DebugJS.STATE_INITIALIZED = 1;
DebugJS.STATE_VISIBLE = 1 << 1;
DebugJS.STATE_DYNAMIC = 1 << 2;
DebugJS.STATE_SHOW_CLOCK = 1 << 3;
DebugJS.STATE_STOPWATCH_RUNNING = 1 << 4;
DebugJS.STATE_DRAGGABLE = 1 << 5;
DebugJS.STATE_DRAGGING = 1 << 6;
DebugJS.STATE_RESIZABLE = 1 << 7;
DebugJS.STATE_RESIZING = 1 << 8;
DebugJS.STATE_RESIZING_N = 1 << 9;
DebugJS.STATE_RESIZING_E = 1 << 10;
DebugJS.STATE_RESIZING_S = 1 << 11;
DebugJS.STATE_RESIZING_W = 1 << 12;
DebugJS.STATE_RESIZING_ALL = DebugJS.STATE_RESIZING | DebugJS.STATE_RESIZING_N | DebugJS.STATE_RESIZING_E | DebugJS.STATE_RESIZING_S | DebugJS.STATE_RESIZING_W;
DebugJS.STATE_MEASURE = 1 << 13;
DebugJS.STATE_MEASURING = 1 << 14;
DebugJS.STATE_SYSTEM_INFO = 1 << 15;
DebugJS.STATE_ELEMENT_INSPECTING = 1 << 16;
DebugJS.STATE_TOOLS = 1 << 17;
DebugJS.STATE_SCRIPT = 1 << 18;
DebugJS.STATE_HTML_SRC = 1 << 19;
DebugJS.STATE_LOG_SUSPENDING = 1 << 20;
DebugJS.STATE_LOG_PRESERVED = 1 << 21;
DebugJS.STATE_POS_AUTO_ADJUST = 1 << 22;
DebugJS.STATE_NEED_TO_SCROLL = 1 << 23;
DebugJS.STATE_STOPWATCH_LAPTIME = 1 << 24;
DebugJS.TOOL_ST_SW_RUNNING_CU = 1;
DebugJS.TOOL_ST_SW_RUNNING_CD = 1 << 1;
DebugJS.TOOL_ST_SW_CD_RST = 1 << 2;
DebugJS.TOOL_ST_SW_TIMEUP = 1 << 3;
DebugJS.TOOL_TIMER_MODE_CLOCK = 0;
DebugJS.TOOL_TIMER_MODE_SW_CU = 1;
DebugJS.TOOL_TIMER_MODE_SW_CD = 2;
DebugJS.TOOL_TIMER_BTN_COLOR = '#eee';
DebugJS.LOG_FILTER_LOG = 0x1;
DebugJS.LOG_FILTER_VRB = 0x2;
DebugJS.LOG_FILTER_DBG = 0x4;
DebugJS.LOG_FILTER_INF = 0x8;
DebugJS.LOG_FILTER_WRN = 0x10;
DebugJS.LOG_FILTER_ERR = 0x20;
DebugJS.LOG_FILTER_ALL = DebugJS.LOG_FILTER_LOG | DebugJS.LOG_FILTER_DBG | DebugJS.LOG_FILTER_INF | DebugJS.LOG_FILTER_WRN | DebugJS.LOG_FILTER_ERR;
DebugJS.LOG_TYPE_LOG = 0x1;
DebugJS.LOG_TYPE_VRB = 0x2;
DebugJS.LOG_TYPE_DBG = 0x4;
DebugJS.LOG_TYPE_INF = 0x8;
DebugJS.LOG_TYPE_WRN = 0x10;
DebugJS.LOG_TYPE_ERR = 0x20;
DebugJS.LOG_TYPE_SYS = 0x40;
DebugJS.LOG_TYPE_MLT = 0x80;
DebugJS.ELMINFO_STATE_SELECT = 0x1;
DebugJS.ELMINFO_STATE_HIGHLIGHT = 0x2;
DebugJS.ERR_STATE_NONE = 0;
DebugJS.ERR_STATE_SCRIPT = 0x1;
DebugJS.ERR_STATE_LOAD = 0x2;
DebugJS.ERR_STATE_LOG = 0x4;
DebugJS.TOOLS_ACTIVE_FNC_NONE = 0x0;
DebugJS.TOOLS_ACTIVE_FNC_TIMER = 0x1;
DebugJS.TOOLS_ACTIVE_FNC_TEXT = 0x2;
DebugJS.TOOLS_ACTIVE_FNC_HTML = 0x4;
DebugJS.TOOLS_ACTIVE_FNC_FILE = 0x8;
DebugJS.TOOLS_ACTIVE_FNC_MEMO = 0x10;
DebugJS.FILE_LOAD_FORMAT_BIN = 0;
DebugJS.FILE_LOAD_FORMAT_B64 = 1;
DebugJS.CMD_ATTR_SYSTEM = 0x1;
DebugJS.CMD_ATTR_HIDDEN = 0x2;
DebugJS.CMD_ATTR_DYNAMIC = 0x4;
DebugJS.CMD_ATTR_NO_KIOSK = 0x8;
DebugJS.CMD_ATTR_DISABLED = 0x10;
DebugJS.CMD_ECHO_MAX_LEN = 256;
DebugJS.DBGWIN_MIN_W = 292;
DebugJS.DBGWIN_MIN_H = 155;
DebugJS.DBGWIN_EXPAND_W = 960;
DebugJS.DBGWIN_EXPAND_H = 640;
DebugJS.DBGWIN_EXPAND_W2 = 800;
DebugJS.DBGWIN_EXPAND_H2 = 580;
DebugJS.SIZE_ST_MIN = -1;
DebugJS.SIZE_ST_NORMAL = 0;
DebugJS.SIZE_ST_EXPANDED = 1;
DebugJS.SIZE_ST_EXPANDED2 = 2;
DebugJS.SIZE_ST_FULL_W = 4;
DebugJS.SIZE_ST_FULL_H = 5;
DebugJS.SIZE_ST_FULL_WH = 6;
DebugJS.DBGWIN_POS_NONE = -9999;
DebugJS.WIN_SHADOW = 10;
DebugJS.WIN_BORDER = 1;
DebugJS.WIN_PADDING = 1;
DebugJS.WIN_ADJUST = ((DebugJS.WIN_BORDER * 2) + (DebugJS.WIN_PADDING * 2));
DebugJS.OVERLAY_PANEL_HEIGHT = 77; //%
DebugJS.CMD_LINE_PADDING = 3;
DebugJS.COLOR_ACTIVE = '#fff';
DebugJS.TOOLS_COLOR_ACTIVE = '#6cf';
DebugJS.TOOLS_COLOR_INACTIVE = '#ccc';
DebugJS.COLOR_INACTIVE = '#999';
DebugJS.MEASURE_BTN_COLOR = '#6cf';
DebugJS.SYS_BTN_COLOR = '#3af';
DebugJS.HTML_BTN_COLOR = '#8f8';
DebugJS.DOM_BTN_COLOR = '#f63';
DebugJS.TOOLS_BTN_COLOR = '#ff0';
DebugJS.JS_BTN_COLOR = '#6df';
DebugJS.PIN_BTN_COLOR = '#fa0';
DebugJS.LOG_SUSPEND_BTN_COLOR = '#f00';
DebugJS.LOG_PRESERVE_BTN_COLOR = '#0f0';
DebugJS.COLOR_R = '#f66';
DebugJS.COLOR_G = '#6f6';
DebugJS.COLOR_B = '#6bf';
DebugJS.KEY_STATUS_DEFAULT = '- <span style="color:' + DebugJS.COLOR_INACTIVE + '">SCAM</span>';
DebugJS.WDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
DebugJS.WDAYS_COLOR = ['f74', 'fff', 'fff', 'fff', 'fff', 'fff', '8fd'];
DebugJS.UPDATE_INTERVAL_H = 21;
DebugJS.UPDATE_INTERVAL_L = 500;
DebugJS.DEFAULT_TIMER_NAME = 'timer0';
DebugJS.LED_BIT = [0x1, 0x2, 0x4, 0x8, 0x10, 0x20, 0x40, 0x80];
DebugJS.LED_COLOR = ['#4cf', '#0ff', '#6f6', '#ee0', '#f80', '#f66', '#f0f', '#ddd'];
DebugJS.LED_COLOR_INACTIVE = '#777';
DebugJS.ITEM_NAME_COLOR = '#8f0';
DebugJS.KEYWORD_COLOR = '#2f6';
DebugJS.RANDOM_TYPE_NUM = '-d';
DebugJS.RANDOM_TYPE_STR = '-s';
DebugJS.OMIT_LAST = 0;
DebugJS.OMIT_MID = 1;
DebugJS.OMIT_FIRST = 2;
DebugJS.DISP_BIN_DIGITS_THRESHOLD = 5;
DebugJS.SYS_INFO_FULL_OVERLAY = true;
DebugJS.HTML_SRC_FULL_OVERLAY = false;
DebugJS.ELM_INFO_FULL_OVERLAY = false;
DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX = '-elhl';
DebugJS.EXPANDBTN = '&gt;';
DebugJS.CLOSEBTN = 'v';
DebugJS.LS_AVAILABLE = false;
DebugJS.SS_AVAILABLE = false;
DebugJS._AVAILABLE = false;
DebugJS.SNIPPET = [
'time.start();\nfor (var i = 0; i < 1000000; i++) {\n\n}\ntime.end();\n\'done\';\n',
'',
'// LED DEMO\nvar speed = 500;  // ms\nvar i = 0;\nledTest();\nfunction ledTest() {\n  // Turn on the LED\n  dbg.led(i);\n\n  var i16 = DebugJS.convRadixDECtoHEX(i);\n  i16 = DebugJS.formatHex(i16, true, true);\n  dbg.msg(\'LED = \' + i + \' (\' + i16 + \')\');\n  if (i <= 255) {\n    dbg.call(ledTest, speed);\n  } else {\n    dbg.led.all(false);\n    dbg.msg.clear();\n  }\n  i++;\n}\n\'LED DEMO\';\n',
'// ASCII characters\nvar str = \'\';\nfor (var i = 0x20; i <= 0x7e; i++) {\n  if ((i % 0x10) == 0) {\n    str += \'\\n\';\n  }\n  str += String.fromCharCode(i);\n}\nstr;\n',
'// logging performance check\nvar i = 0;\nvar loop = 1000;\ndbg.msg(\'loop = \' + loop);\ntime.start(\'total\');\ntest();\nfunction test() {\n  time.start();\n  time.end();\n  i++;\n  if (i == loop ) {\n    dbg.msg.clear();\n    time.end(\'total\');\n  } else {\n    if (i % 100 == 0) {\n      dbg.msg(\'i = \' + i + \' / \' + time.check(\'total\'));\n    }\n    dbg.call(test);\n  }\n}\n'
];
DebugJS.HTML_SNIPPET = [
'<div style="width:100%; height:100%; background:#fff; color:#000">\n\n</div>\n',
'<div style="width:100%; height:100%; background:#000; color:#fff">\n\n</div>\n',
'<video src="" controls autoplay>',
'',
'<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8">\n<title></title>\n<link rel="stylesheet" href="style.css" />\n<script src="script.js"></script>\n<style>\n</style>\n<script>\n</script>\n</head>\n<body>\nhello\n</body>\n</html>\n'
];
DebugJS.FEATURES = [
  'togglableShowHide',
  'useClock',
  'useClearButton',
  'useSuspendLogButton',
  'usePinButton',
  'useWindowControlButton',
  'useStopWatch',
  'useWindowSizeInfo',
  'useMouseStatusInfo',
  'useKeyStatusInfo',
  'useLed',
  'useMsgDisplay',
  'useScreenMeasure',
  'useSystemInfo',
  'useElementInfo',
  'useHtmlSrc',
  'useTools',
  'useScriptEditor',
  'useLogFilter',
  'useCommandLine'
];

DebugJS.prototype = {
  init: function(options, restoreOption) {
    if (!DebugJS.ENABLE) {return false;}
    var ctx = DebugJS.ctx;
    var keepStatus = ((restoreOption && (restoreOption.cause == DebugJS.INIT_CAUSE_ZOOM)) ? true : false);
    ctx.bodyEl = document.body;

    if (ctx.status & DebugJS.STATE_DYNAMIC) {
      if (ctx.dbgWin != null) {
        for (var i = ctx.dbgWin.childNodes.length - 1; i >= 0; i--) {
          ctx.dbgWin.removeChild(ctx.dbgWin.childNodes[i]);
        }
        ctx.bodyEl.removeChild(ctx.dbgWin);
        ctx.timerBasePanel = null;
        ctx.dbgWin = null;
      }
    }

    if (!keepStatus) {
      if (ctx.status & DebugJS.STATE_LOG_PRESERVED) {
        ctx.status = DebugJS.STATE_LOG_PRESERVED;
      } else {
        ctx.status = 0;
      }
    }

    if ((ctx.options == null) || ((options != null) && (!keepStatus)) || (options === undefined)) {
      ctx.setupDefaultOptions();
    }
    if (options) {
      for (var key1 in options) {
        for (var key2 in ctx.options) {
          if (key1 == key2) {
            ctx.options[key1] = options[key1];
            if ((key1 == 'disableAllFeatures') && (options[key1])) {
              ctx.disableAllFeatures();
            }
            break;
          }
        }
      }
    }

    ctx.computedMinW = DebugJS.DBGWIN_MIN_W * ctx.options.zoom;
    ctx.computedMinH = DebugJS.DBGWIN_MIN_H * ctx.options.zoom;
    ctx.computedFontSize = Math.round(ctx.options.fontSize * ctx.options.zoom);
    ctx.computedWidth = Math.round(ctx.options.width * ctx.options.zoom);

    if (!ctx.bodyEl) {
      return false;
    }

    ctx.initStatus(ctx.options);
    ctx.initCommandTable();

    // Debug Window
    if (ctx.options.mode == 'noui') {
      ctx.removeEventHandler();
      // balse
      ctx.init = function(x, xx) {};
      DebugJS.init = function(x) {};
      return false;
    } else if (ctx.options.target == null) {
      ctx.id = ctx.DEFAULT_ELM_ID;
      ctx.dbgWin = document.createElement('div');
      ctx.dbgWin.id = ctx.id;
      ctx.dbgWin.style.position = 'fixed';
      ctx.dbgWin.style.zIndex = 0x7fffffff;
      ctx.dbgWin.style.width = ctx.computedWidth + 'px';
      ctx.dbgWin.style.boxShadow = DebugJS.WIN_SHADOW + 'px ' + DebugJS.WIN_SHADOW + 'px 10px rgba(0,0,0,.3)';
      ctx.bodyEl.appendChild(ctx.dbgWin);
      if (ctx.options.mode == 'kiosk') {
        ctx.setupKioskMode();
      }
    } else {
      ctx.id = ctx.options.target;
      ctx.dbgWin = document.getElementById(ctx.id);
      ctx.dbgWin.style.position = 'relative';
    }
    ctx.dbgWin.style.display = 'block';
    ctx.dbgWin.style.padding = DebugJS.WIN_BORDER + 'px';
    ctx.dbgWin.style.lineHeight = '1em';
    ctx.dbgWin.style.boxSizing = 'content-box';
    ctx.dbgWin.style.border = ctx.options.border;
    ctx.dbgWin.style.borderRadius = ctx.options.borderRadius;
    ctx.dbgWin.style.background = ctx.options.background;
    ctx.dbgWin.style.color = ctx.options.fontColor;
    ctx.dbgWin.style.fontSize = ctx.computedFontSize + 'px',
    ctx.dbgWin.style.fontFamily = ctx.options.fontFamily;
    ctx.dbgWin.style.opacity = ctx.options.opacity;

    // Buffer
    if ((!ctx.msgBuf) || ((ctx.msgBuf) && (ctx.msgBuf.getSize() != ctx.options.bufsize))) {
      ctx.msgBuf = new DebugJS.RingBuffer(ctx.options.bufsize);
    }

    ctx.createPanels();

    // Resize
    if (ctx.status & DebugJS.STATE_RESIZABLE) {
      if (ctx.status & DebugJS.STATE_DYNAMIC) {
        var resizeN = ctx.createResizeSideArea('ns-resize', DebugJS.STATE_RESIZING_N, '100%', '6px');
        resizeN.style.top = '-3px';
        resizeN.style.left = '0';
        ctx.dbgWin.appendChild(resizeN);
      }

      var resizeE = ctx.createResizeSideArea('ew-resize', DebugJS.STATE_RESIZING_E, '6px', '100%');
      resizeE.style.top = '0';
      resizeE.style.right = '-3px';
      ctx.dbgWin.appendChild(resizeE);

      var resizeS = ctx.createResizeSideArea('ns-resize', DebugJS.STATE_RESIZING_S, '100%', '6px');
      resizeS.style.bottom = '-3px';
      resizeS.style.left = '0';
      ctx.dbgWin.appendChild(resizeS);

      var resizeSE = ctx.createResizeCornerArea('nwse-resize', DebugJS.STATE_RESIZING_S | DebugJS.STATE_RESIZING_E);
      resizeSE.style.bottom = '-3px';
      resizeSE.style.right = '-3px';
      ctx.dbgWin.appendChild(resizeSE);

      if (ctx.status & DebugJS.STATE_DYNAMIC) {
        var resizeW = ctx.createResizeSideArea('ew-resize', DebugJS.STATE_RESIZING_W, '6px', '100%');
        resizeW.style.top = '0';
        resizeW.style.left = '-3px';
        ctx.dbgWin.appendChild(resizeW);

        var resizeNW = ctx.createResizeCornerArea('nwse-resize', DebugJS.STATE_RESIZING_N | DebugJS.STATE_RESIZING_W);
        resizeNW.style.top = '-3px';
        resizeNW.style.left = '-3px';
        ctx.dbgWin.appendChild(resizeNW);

        var resizeNE = ctx.createResizeCornerArea('nesw-resize', DebugJS.STATE_RESIZING_N | DebugJS.STATE_RESIZING_E);
        resizeNE.style.top = '-3px';
        resizeNE.style.right = '-3px';
        ctx.dbgWin.appendChild(resizeNE);

        var resizeSW = ctx.createResizeCornerArea('nesw-resize', DebugJS.STATE_RESIZING_S | DebugJS.STATE_RESIZING_W);
        resizeSW.style.bottom = '-3px';
        resizeSW.style.left = '-3px';
        ctx.dbgWin.appendChild(resizeSW);

        ctx.winBody.ondblclick = ctx.onDbgWinDblClick;
      }
    }

    // style settings
    var styles = {};
    if (DebugJS.getBrowserType().name == 'Firefox') {
      styles['#' + ctx.id] = {
        'letter-spacing': '-0.35px !important'
      };
    } else {
      styles['#' + ctx.id] = {
        'letter-spacing': '0 !important'
      };
    }

    styles['#' + ctx.id + ' td'] = {
      'width': 'initial',
      'padding': '0 3px',
      'border': 'initial',
      'background': 'initial',
      'color': ctx.options.fontColor,
      'font-size': ctx.computedFontSize + 'px',
      'font-family': ctx.options.fontFamily
    };

    styles['#' + ctx.id + ' pre'] = {
      'margin': '0 !important',
      'color': ctx.options.fontColor + ' !important',
      'font-size': ctx.computedFontSize + 'px !important',
      'font-family': ctx.options.fontFamily + ' !important',
      'white-space': 'pre-wrap !important',
      'word-break': 'break-all !important',
      'overflow': 'visible !important',
    };

    styles['.' + ctx.id + '-btn'] = {
      'color': ctx.options.btnColor,
      'text-decoration': 'none'
    };

    styles['.' + ctx.id + '-btn:hover'] = {
      'color': ctx.options.btnHoverColor,
      'text-decoration': 'none',
      'text-shadow': '0 0 3px',
      'cursor': 'pointer'
    };

    styles['.' + ctx.id + '-btn-disabled'] = {
      'opacity': 0.5
    };

    styles['.' + ctx.id + '-btn-disabled:hover'] = {
      'color': ctx.options.btnColor,
      'text-shadow': 'none',
      'cursor': 'auto'
    };

    styles['.' + ctx.id + '-sys-info'] = {
      'display': 'inline-block',
      'margin-right': '10px',
      'color': ctx.options.sysInfoColor
    };

    styles['.' + ctx.id + '-resize-corner'] = {
      'position': 'absolute',
      'width': '6px',
      'height': '6px',
      'background': 'rgba(0,0,0,0)'
    };

    styles['.' + ctx.id + '-resize-side'] = {
      'position': 'absolute',
      'background': 'rgba(0,0,0,0)'
    };

    styles['.' + ctx.id + '-overlay-base-panel'] = {
      'position': 'relative',
      'top': '0',
      'left': '0',
      'width': 'calc(100% - 2px)',
      'height': DebugJS.OVERLAY_PANEL_HEIGHT + '%'
    };

    var overlayPanelBorder = 1;
    var overlayPanelPadding = 2;
    styles['.' + ctx.id + '-overlay-panel'] = {
      'position': 'absolute',
      'top': '0',
      'left': '0',
      'width': 'calc(100% - ' + ((overlayPanelPadding) * 2) + 'px)',
      'height': 'calc(100% - ' + ((overlayPanelPadding) * 2) + 'px)',
      'padding': overlayPanelPadding + 'px',
      'border': 'solid ' + overlayPanelBorder + 'px #333',
      'background': 'rgba(0,0,0,0.5)',
      'overflow': 'auto'
    };

    styles['.' + ctx.id + '-overlay-panel pre'] = {
      'padding': '0 1px',
      'color': ctx.options.fontColor + ' !important',
      'font-size': ctx.computedFontSize + 'px !important',
      'font-family': ctx.options.fontFamily + ' !important'
    };

    styles['.' + ctx.id + '-overlay-panel-full'] = {
      'position': 'absolute',
      'top': (ctx.computedFontSize + DebugJS.WIN_ADJUST) + 'px',
      'left': '1px',
      'width': 'calc(100% - ' + (DebugJS.WIN_SHADOW + DebugJS.WIN_ADJUST - ((overlayPanelPadding * 2) + (overlayPanelBorder * 2))) + 'px)',
      'height': 'calc(100% - ' + ((ctx.computedFontSize + DebugJS.WIN_ADJUST) + DebugJS.WIN_SHADOW + ctx.computedFontSize + 10 - (overlayPanelPadding * 2)) + 'px)',
      'padding': overlayPanelPadding + 'px',
      'border': 'solid ' + overlayPanelBorder + 'px #333',
      'background': 'rgba(0,0,0,0.5)',
      'overflow': 'auto'
    };

    styles['.' + ctx.id + '-tools'] = {
      'position': 'absolute',
      'top': 0,
      'left': 0,
      'width': '100%',
      'height': '100%'
    };

    styles['.' + ctx.id + '-separator'] = {
      'height': (ctx.computedFontSize * 0.5) + 'px'
    };

    styles['.' + ctx.id + '-na'] = {
      'color': '#ccc'
    };

    styles['.' + ctx.id + '-showhide-btn'] = {
      'color': '#0a0',
      'font-size': ctx.computedFontSize + 'px',
      'font-weight': 'bold'
    };

    styles['.' + ctx.id + '-showhide-btn:hover'] = {
      'cursor': 'pointer'
    };

    styles['.' + ctx.id + '-txt-text'] = {
      'border': 'none !important',
      'border-bottom': 'solid 1px #888 !important',
      'border-radius': '0 !important',
      'outline': 'none !important',
      'box-shadow': 'none !important',
      'background': 'transparent !important',
      'color': ctx.options.fontColor + ' !important',
      'font-size': ctx.computedFontSize + 'px !important',
      'font-family': ctx.options.fontFamily + ' !important'
    };

    styles['.' + ctx.id + '-txt-range'] = {
      'width': (256 * ctx.options.zoom) + 'px',
      'height': (15 * ctx.options.zoom) + 'px',
      'padding': '0 !important',
      'border': 'none !important',
      'outline': 'none !important',
      'box-shadow': 'none !important'
    };

    styles['.' + ctx.id + '-txt-tbl td'] = {
      'font-size': ctx.computedFontSize + 'px !important',
      'line-height': '1em !important',
    };

    styles['.' + ctx.id + '-loading'] = {
      'opacity': '1.0 !important'
    };

    styles['#' + ctx.id + ' label'] = {
      'display': 'inline',
      'margin': '0',
      'line-height': '1em',
      'color': ctx.options.fontColor,
      'font-size': ctx.computedFontSize + 'px',
      'font-weight': 'normal',
      'font-family': ctx.options.fontFamily
    };

    styles['#' + ctx.id + ' input[type="radio"]'] = {
      'margin': '0 3px'
    };

    styles['.' + ctx.id + '-editor'] = {
      'width': 'calc(100% - 6px) !important',
      'height': 'calc(100% - ' + (ctx.computedFontSize + 10) + 'px) !important',
      'margin': '2px 0 0 0 !important',
      'box-sizing': 'content-box !important',
      'padding': '2px !important',
      'border': 'solid 1px #1883d7 !important',
      'border-radius': '0 !important',
      'outline': 'none !important',
      'background': 'transparent !important',
      'color': '#fff !important',
      'font-size': ctx.computedFontSize + 'px !important',
      'font-family': ctx.options.fontFamily + ' !important',
      'overflow': 'auto !important',
      'resize': 'none !important'
    };

    styles['.' + ctx.id + '-txt-hl'] = {
      'background': 'rgba(192,192,192,0.5) !important'
    };

    styles['.' + ctx.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX] = {
      'outline': 'solid 1px #f00 !important',
      'opacity': '0.7 !important'
    };

    styles['.' + ctx.id + '-timer-input'] = {
      'width': '1.1em !important',
      'height': '1em !important',
      'border': 'none !important',
      'outline': 'none !important',
      'margin': '0 !important',
      'padding': '0 !important',
      'text-align': 'center !important',
      'vartical-align': 'middle !important',
      'background': 'transparent !important',
      'color': '#fff !important',
      'font-family': ctx.options.fontFamily + ' !important'
    };

    ctx.applyStyles(styles);
    ctx.initDebugWindow();
    ctx.setupEventHandler();

    if (ctx.status & DebugJS.STATE_DYNAMIC) {
      if (ctx.options.mode == 'kiosk') {
        ctx.focusCmdLine();
      } else {
        ctx.setupMove();

        // move to initial window position
        ctx.initWidth = ctx.dbgWin.offsetWidth;
        ctx.initHeight = ctx.dbgWin.offsetHeight;
        ctx.resetDebugWindowSizePos();
        ctx.updateWinCtrlBtnPanel();

        if ((restoreOption != null) && (restoreOption.cause == DebugJS.INIT_CAUSE_ZOOM)) {
          ctx.focusCmdLine();
        }

        if (!(ctx.status & DebugJS.STATE_VISIBLE)) {
          ctx.dbgWin.style.display = 'none';
        }
      }
    } else {
      ctx.initWidth = ctx.dbgWin.offsetWidth - DebugJS.WIN_ADJUST;
      ctx.initHeight = ctx.dbgWin.offsetHeight - DebugJS.WIN_ADJUST;
    }
    ctx.windowExpandHeight = DebugJS.DBGWIN_EXPAND_H * ctx.options.zoom;
    ctx.initExtension();
    if ((restoreOption != null) && (restoreOption.cause == DebugJS.INIT_CAUSE_ZOOM)) {
      ctx.resetStylesOnZoom();
      ctx.reopenFeatures(restoreOption.status);
      ctx.restoreDbgWinSize(restoreOption.sizeStatus);
    }
    ctx.status |= DebugJS.STATE_INITIALIZED;
    ctx.printLogMsg();
    return true;
  },

  createResizeSideArea: function(cursor, state, width, height) {
    var ctx = DebugJS.ctx;
    var area = document.createElement('div');
    area.className = ctx.id + '-resize-side';
    area.style.width = width;
    area.style.height = height;
    area.style.cursor = cursor;
    area.onmousedown = function(e) {
      if (!(ctx.status & DebugJS.STATE_RESIZABLE)) return;
      ctx.startResize(e);
      ctx.status |= state;
      ctx.bodyEl.style.cursor = cursor;
    };
    return area;
  },

  createResizeCornerArea: function(cursor, state) {
    var ctx = DebugJS.ctx;
    var area = document.createElement('div');
    area.className = ctx.id + '-resize-corner';
    area.style.cursor = cursor;
    area.onmousedown = function(e) {
      var ctx = DebugJS.ctx;
      if (!(ctx.status & DebugJS.STATE_RESIZABLE)) return;
      ctx.startResize(e);
      ctx.status |= state;
      ctx.bodyEl.style.cursor = cursor;
    };
    return area;
  },

  setupDefaultOptions: function() {
    this.options = {};
    DebugJS.deepCopy(this.DEFAULT_OPTIONS, this.options);
  },

  setupEventHandler: function() {
    var ctx = DebugJS.ctx;

    if (!ctx.isAllFeaturesDisabled()) {
      window.addEventListener('keydown', ctx.keyHandler, true);
    }

    if ((ctx.status & DebugJS.STATE_DRAGGABLE) ||
        (ctx.status & DebugJS.STATE_RESIZABLE) ||
        (ctx.options.useMouseStatusInfo) ||
        (ctx.options.useScreenMeasure)) {
      window.addEventListener('mousedown', ctx.onMouseDown, true);
      window.addEventListener('mousemove', ctx.onMouseMove, true);
      window.addEventListener('mouseup', ctx.onMouseUp, true);
    }

    if (ctx.options.useWindowSizeInfo) {
      window.addEventListener('resize', ctx.onResize, true);
      ctx.onResize();

      window.addEventListener('scroll', ctx.onScroll, true);
      ctx.onScroll();
    }

    if (ctx.options.useKeyStatusInfo) {
      window.addEventListener('keydown', ctx.onKeyDown, true);
      ctx.updateKeyDownPanel();
      window.addEventListener('keypress', ctx.onKeyPress, true);
      ctx.updateKeyPressPanel();
      window.addEventListener('keyup', ctx.onKeyUp, true);
      ctx.updateKeyUpPanel();
    }
  },

  removeEventHandler: function() {
    var ctx = DebugJS.ctx;
    window.removeEventListener('keydown', ctx.keyHandler, true);
    window.removeEventListener('mousedown', ctx.onMouseDown, true);
    window.removeEventListener('mousemove', ctx.onMouseMove, true);
    window.removeEventListener('mouseup', ctx.onMouseUp, true);
    window.removeEventListener('resize', ctx.onResize, true);
    window.removeEventListener('scroll', ctx.onScroll, true);
    window.removeEventListener('keydown', ctx.onKeyDown, true);
    window.removeEventListener('keypress', ctx.onKeyPress, true);
    window.removeEventListener('keyup', ctx.onKeyUp, true);
  },

  initStatus: function(options) {
    var ctx = DebugJS.ctx;
    if (ctx.options.target == null) {
      ctx.status |= DebugJS.STATE_DYNAMIC;
      ctx.status |= DebugJS.STATE_DRAGGABLE;
    }
    if ((ctx.options.visible) || (ctx.options.target != null)) {
      ctx.status |= DebugJS.STATE_VISIBLE;
    } else if (ctx.errStatus) {
      if (((ctx.options.popupOnError.scriptError) && (ctx.errStatus & DebugJS.ERR_STATE_SCRIPT)) ||
          ((ctx.options.popupOnError.loadError) && (ctx.errStatus & DebugJS.ERR_STATE_LOAD)) ||
          ((ctx.options.popupOnError.errorLog) && (ctx.errStatus & DebugJS.ERR_STATE_LOG))) {
        ctx.status |= DebugJS.STATE_VISIBLE;
        ctx.errStatus = DebugJS.ERR_STATE_NONE;
      }
    }
    if (ctx.options.resizable) ctx.status |= DebugJS.STATE_RESIZABLE;
    if (ctx.options.useClock) ctx.status |= DebugJS.STATE_SHOW_CLOCK;
  },

  setupKioskMode: function() {
    var ctx = DebugJS.ctx;
    ctx.dbgWin.style.top = 0;
    ctx.dbgWin.style.left = 0;
    ctx.sizeStatus = DebugJS.SIZE_ST_FULL_WH;
    ctx.dbgWin.style.width = document.documentElement.clientWidth + 'px';
    ctx.dbgWin.style.height = document.documentElement.clientHeight + 'px';

    ctx.options.togglableShowHide = false;
    ctx.options.usePinButton = false;
    ctx.options.useWindowControlButton = false;
    ctx.options.useScreenMeasure = false;
    ctx.options.useHtmlSrc = false;
    ctx.options.useElementInfo = false;

    ctx.status |= DebugJS.STATE_VISIBLE;
    ctx.status &= ~DebugJS.STATE_RESIZABLE;
  },

  disableAllFeatures: function() {
    var ctx = DebugJS.ctx;
    var len = DebugJS.FEATURES.length;
    for (var i = 0; i < len; i++) {
      ctx.options[DebugJS.FEATURES[i]] = false;
    }
  },

  isAllFeaturesDisabled: function() {
    var ctx = DebugJS.ctx;
    var len = DebugJS.FEATURES.length;
    for (var i = 0; i < len; i++) {
      if (ctx.options[DebugJS.FEATURES[i]]) return false;
    }
    return true;
  },

  createPanels: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize + 'px';
    // WindowBody
    ctx.winBody = document.createElement('div');
    ctx.dbgWin.appendChild(ctx.winBody);
    if (ctx.status & DebugJS.STATE_DRAGGABLE) {
      ctx.winBody.style.cursor = 'default';
    }

    if (!ctx.isAllFeaturesDisabled()) {
      // HeadPanel
      ctx.headPanel = document.createElement('div');
      ctx.headPanel.style.padding = '2px';
      ctx.winBody.appendChild(ctx.headPanel);

      // InfoPanel
      ctx.infoPanel = document.createElement('div');
      ctx.infoPanel.style.padding = '0 2px 1px 2px';
      ctx.winBody.appendChild(ctx.infoPanel);
    }

    // Main
    ctx.mainPanel = document.createElement('div');
    if (ctx.options.useLogFilter) {
      ctx.mainPanel.style.height = (ctx.options.lines + 1) + '.1em';
    } else {
      ctx.mainPanel.style.height = ctx.options.lines + '.1em';
    }
    ctx.mainPanel.style.clear = 'both';
    ctx.winBody.appendChild(ctx.mainPanel);

    // LogHeaderPanel
    if (ctx.options.useLogFilter) {
      ctx.logHeaderPanel = document.createElement('div');
      ctx.logHeaderPanel.style.position = 'relative';
      ctx.logHeaderPanel.style.height = fontSize;
      ctx.logHeaderPanel.style.marginBottom = '2px';
      ctx.mainPanel.appendChild(ctx.logHeaderPanel);
    }

    if (ctx.options.useClearButton) {
      ctx.clearBtn = document.createElement('span');
      ctx.clearBtn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
      ctx.clearBtn.onclick = DebugJS.ctx.onClr;
      ctx.clearBtn.innerText = '[CLR]';
      ctx.headPanel.appendChild(ctx.clearBtn);
    }

    // LogFilter
    if (ctx.options.useLogFilter) {
      ctx.createLogFilter();
    }

    // Log
    if (ctx.options.useLogFilter) {
      ctx.logPanelHeightAdjust = ' - 1em';
    } else {
      ctx.logPanelHeightAdjust = '';
    }
    ctx.logPanel = document.createElement('div');
    ctx.logPanel.style.width = '100%';
    ctx.logPanel.style.height = 'calc(100%' + ctx.logPanelHeightAdjust + ')';
    ctx.logPanel.style.padding = '0';
    ctx.logPanel.style.overflow = 'auto';
    ctx.mainPanel.appendChild(ctx.logPanel);

    if (ctx.isAllFeaturesDisabled()) {
      return;
    }

    // Clock
    if (ctx.options.useClock) {
      ctx.clockPanel = document.createElement('span');
      ctx.clockPanel.style.marginLeft = '2px';
      ctx.clockPanel.style.color = ctx.options.clockColor;
      ctx.clockPanel.style.fontSize = fontSize;
      ctx.headPanel.appendChild(ctx.clockPanel);
      ctx.setIntervalL();
    }

    // -- R to L
    // X Button
    if (ctx.options.togglableShowHide) {
      ctx.closeBtn = document.createElement('span');
      ctx.closeBtn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
      ctx.closeBtn.style.float = 'right';
      ctx.closeBtn.style.position = 'relative';
      ctx.closeBtn.style.top = '-1px';
      ctx.closeBtn.style.marginRight = '2px';
      ctx.closeBtn.style.color = '#888';
      ctx.closeBtn.style.fontSize = (18 * ctx.options.zoom) + 'px';
      ctx.closeBtn.onmouseover = new Function('this.style.color=\'#d88\';');
      ctx.closeBtn.onmouseout = new Function('this.style.color=\'#888\';');
      ctx.closeBtn.onclick = new Function('DebugJS.ctx.closeDebugWindow();');
      ctx.closeBtn.innerText = 'x';
      ctx.headPanel.appendChild(ctx.closeBtn);
    }

    // WindowControlButton
    if ((ctx.status & DebugJS.STATE_DYNAMIC) &&
        (ctx.status & DebugJS.STATE_RESIZABLE) &&
        (ctx.options.useWindowControlButton)) {
      ctx.winCtrlBtnPanel = document.createElement('span');
      ctx.headPanel.appendChild(ctx.winCtrlBtnPanel);
    }

    if ((ctx.status & DebugJS.STATE_DYNAMIC) && (ctx.options.usePinButton)) {
      ctx.pinBtn = ctx.createHeaderButton('pinBtn', 'P', 3, fontSize, DebugJS.ctx.toggleDraggable, 'STATE_DRAGGABLE', 'PIN_BTN_COLOR', true, 'Fix the window in its position');
    }

    if (ctx.options.useSuspendLogButton) {
      ctx.suspendLogBtn = ctx.createHeaderButton('suspendLogBtn', '/', 3, fontSize, DebugJS.ctx.toggleLogSuspend, 'STATE_LOG_SUSPENDING', 'LOG_SUSPEND_BTN_COLOR', false, 'Suspend log');
    }

    if (DebugJS.LS_AVAILABLE) {
      ctx.preserveLogBtn = ctx.createHeaderButton('preserveLogBtn', '*', 5, fontSize, DebugJS.ctx.toggleLogPreserve, 'STATE_LOG_PRESERVED', 'LOG_PRESERVE_BTN_COLOR', false, 'Preserve log');
    }

    // Stopwatch
    if (ctx.options.useStopWatch) {
      ctx.swPanel = document.createElement('span');
      ctx.swPanel.style.float = 'right';
      ctx.swPanel.style.marginLeft = '3px';
      ctx.headPanel.appendChild(ctx.swPanel);

      ctx.swBtnPanel = document.createElement('span');
      ctx.swBtnPanel.style.float = 'right';
      ctx.swBtnPanel.style.marginLeft = '4px';
      ctx.headPanel.appendChild(ctx.swBtnPanel);
    }

    if (ctx.options.useTools) {
      ctx.toolsBtn = ctx.createHeaderButton('toolsBtn', 'TOOL', 2, null, DebugJS.ctx.toggleToolsMode, 'STATE_TOOLS', 'TOOLS_BTN_COLOR', false);
    }

    if (ctx.options.useScriptEditor) {
      ctx.scriptBtn = ctx.createHeaderButton('scriptBtn', 'JS', 2, null, DebugJS.ctx.toggleScriptMode, 'STATE_SCRIPT', 'JS_BTN_COLOR', false);
    }

    if (ctx.options.useElementInfo) {
      ctx.elmInfoBtn = ctx.createHeaderButton('elmInfoBtn', 'DOM', 3, null, DebugJS.ctx.toggleElmInfoMode, 'STATE_ELEMENT_INSPECTING', 'DOM_BTN_COLOR', false);
    }

    if (ctx.options.useHtmlSrc) {
      ctx.htmlSrcBtn = ctx.createHeaderButton('htmlSrcBtn', 'HTM', 3, null, DebugJS.ctx.toggleHtmlSrcMode, 'STATE_HTML_SRC', 'HTML_BTN_COLOR', false);
    }

    if (ctx.options.useSystemInfo) {
      ctx.sysInfoBtn = ctx.createHeaderButton('sysInfoBtn', 'SYS', 3, null, DebugJS.ctx.toggleSystemInfoMode, 'STATE_SYSTEM_INFO', 'SYS_BTN_COLOR', false);
    }

    // ScreenMeasureButton
    if (ctx.options.useScreenMeasure) {
      var measureBtn = document.createElement('span');
      measureBtn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
      measureBtn.style.display = 'inline-block';
      measureBtn.style.float = 'right';
      measureBtn.style.marginTop = ((ctx.options.zoom <= 1) ? 1 : (2 * ctx.options.zoom)) + 'px';
      measureBtn.style.marginLeft = '3px';
      measureBtn.style.width = (10 * ctx.options.zoom) + 'px';
      measureBtn.style.height = (7 * ctx.options.zoom) + 'px';
      measureBtn.innerText = ' ';
      measureBtn.onclick = DebugJS.ctx.toggleMeasureMode;
      measureBtn.onmouseover = new Function('DebugJS.ctx.measureBtn.style.borderColor=\'' + DebugJS.MEASURE_BTN_COLOR + '\';');
      measureBtn.onmouseout = new Function('DebugJS.ctx.measureBtn.style.borderColor=(DebugJS.ctx.status & DebugJS.STATE_MEASURE) ? DebugJS.MEASURE_BTN_COLOR : DebugJS.COLOR_INACTIVE;');
      ctx.headPanel.appendChild(measureBtn);
      ctx.measureBtn = measureBtn;
    }
    // -- R to L

    // LED
    if (ctx.options.useLed) {
      ctx.ledPanel = document.createElement('span');
      ctx.ledPanel.className = ctx.id + '-sys-info';
      ctx.ledPanel.style.float = 'right';
      ctx.ledPanel.style.marginRight = '4px';
      ctx.infoPanel.appendChild(ctx.ledPanel);
    }

    // WindowSize
    if (ctx.options.useWindowSizeInfo) {
      ctx.windowSizePanel = ctx.createSysInfoPanel();
      ctx.clientSizePanel = ctx.createSysInfoPanel();
      ctx.bodySizePanel = ctx.createSysInfoPanel();
      ctx.scrollPosPanel = ctx.createSysInfoPanel();
    }

    // MouseStatus
    if (ctx.options.useMouseStatusInfo) {
      ctx.mousePositionPanel = ctx.createSysInfoPanel();
      ctx.mouseClickPanel = ctx.createSysInfoPanel();
    }

    if ((ctx.options.useWindowSizeInfo) || (ctx.options.useMouseStatusInfo)) {
      ctx.infoPanel.appendChild(document.createElement('br'));
    }

    // KeyStatus
    if (ctx.options.useKeyStatusInfo) {
      ctx.keyDownPanel = ctx.createSysInfoPanel();
      ctx.keyPressPanel = ctx.createSysInfoPanel();
      ctx.keyUpPanel = ctx.createSysInfoPanel();
    }

    // MessageDisplay
    if (ctx.options.useMsgDisplay) {
      var msgPanel = ctx.createSysInfoPanel();
      msgPanel.style.float = ctx.options.msgDisplayPos;
      msgPanel.style.marginRight = '3px';
      msgPanel.style.border = '0';
      msgPanel.style.padding = '0 1px';
      msgPanel.style.background = ctx.options.msgDisplayBackground;
      msgPanel.style.color = ctx.options.fontColor;
      msgPanel.style.whiteSpace = 'pre-wrap';
      msgPanel.style.wordBreak = 'break-all';
      msgPanel.style.overflow = 'hidden';
      msgPanel.style.textOverflow = 'ellipsis';
      ctx.msgPanel = msgPanel;
    }

    // CommandLine
    if (ctx.options.useCommandLine) {
      ctx.cmdPanel = document.createElement('div');
      ctx.cmdPanel.style.padding = DebugJS.CMD_LINE_PADDING + 'px';
      ctx.winBody.appendChild(ctx.cmdPanel);
      ctx.cmdPanel.innerHTML = '<span style="color:' + ctx.options.promptColor + '">$</span>';
      var cmdLine = document.createElement('input');
      cmdLine.style.setProperty('min-height', fontSize, 'important');
      cmdLine.style.setProperty('width', 'calc(100% - ' + ctx.computedFontSize + 'px)', 'important');
      cmdLine.style.setProperty('margin', '0 0 0 2px', 'important');
      cmdLine.style.setProperty('padding', '1px', 'important');
      cmdLine.style.setProperty('border', '0', 'important');
      cmdLine.style.setProperty('border-bottom', 'solid 1px #888', 'important');
      cmdLine.style.setProperty('border-radius', '0', 'important');
      cmdLine.style.setProperty('outline', 'none', 'important');
      cmdLine.style.setProperty('box-shadow', 'none', 'important');
      cmdLine.style.setProperty('background', 'transparent', 'important');
      cmdLine.style.setProperty('color', ctx.options.fontColor, 'important');
      cmdLine.style.setProperty('font-size', fontSize, 'important');
      cmdLine.style.setProperty('font-family', ctx.options.fontFamily, 'important');
      ctx.cmdPanel.appendChild(cmdLine);
      ctx.cmdLine = cmdLine;
      ctx.initHistory();
    }
  },

  initDebugWindow: function() {
    var ctx = DebugJS.ctx;
    if (ctx.isAllFeaturesDisabled()) return;
    if (ctx.options.useLogFilter) ctx.updateLogFilterButtons();
    if (ctx.status & DebugJS.STATE_SHOW_CLOCK) ctx.updateClockPanel();
    if (ctx.options.useScreenMeasure) ctx.updateMeasureBtn();
    if (ctx.options.useSystemInfo) ctx.updateSysInfoBtn();
    if (ctx.options.useElementInfo) ctx.updateElmInfoBtn();
    if (ctx.options.useHtmlSrc) ctx.updateHtmlSrcBtn();
    if (ctx.options.useTools) ctx.updateToolsBtn();
    if (ctx.options.useScriptEditor) ctx.updateScriptBtn();
    if (ctx.options.useStopWatch) {
      ctx.updateSwBtnPanel();
      ctx.updateSwPanel();
    }
    if ((ctx.status & DebugJS.STATE_DYNAMIC) && (ctx.options.usePinButton)) {
      ctx.updatePinBtn();
    }
    if (ctx.preserveLogBtn) ctx.updatePreserveLogBtn();
    if (ctx.options.useSuspendLogButton) ctx.updateSuspendLogBtn();
    if ((ctx.status & DebugJS.STATE_RESIZABLE) && (ctx.options.useWindowControlButton)) {
      ctx.updateWinCtrlBtnPanel();
    }
    if (ctx.options.useMouseStatusInfo) {
      ctx.updateMousePositionPanel();
      ctx.updateMouseClickPanel();
    }
    if (ctx.options.useWindowSizeInfo) {
      ctx.updateWindowSizePanel();
      ctx.updateClientSizePanel();
      ctx.updateBodySizePanel();
      ctx.updateScrollPosPanel();
    }
    if (ctx.options.useLed) ctx.updateLedPanel();
    if (ctx.options.useMsgDisplay) ctx.updateMsgPanel();
  },

  createHeaderButton: function(btnobj, label, marginLeft, fontSize, handler, status, activeColor, reverse, title) {
    var ctx = DebugJS.ctx;
    var btn = document.createElement('span');
    btn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
    btn.style.float = 'right';
    btn.style.marginLeft = (marginLeft * ctx.options.zoom) + 'px';
    if (fontSize) btn.style.fontSize = fontSize;
    btn.innerHTML = label;
    btn.onclick = handler;
    btn.onmouseover = new Function('DebugJS.ctx.' + btnobj + '.style.color=DebugJS.' + activeColor + ';');
    if (reverse) {
      btn.onmouseout = new Function('DebugJS.ctx.' + btnobj + '.style.color=(DebugJS.ctx.status & DebugJS.' + status + ') ? DebugJS.COLOR_INACTIVE : DebugJS.' + activeColor + ';');
    } else {
      btn.onmouseout = new Function('DebugJS.ctx.' + btnobj + '.style.color=(DebugJS.ctx.status & DebugJS.' + status + ') ? DebugJS.' + activeColor + ' : DebugJS.COLOR_INACTIVE;');
    }
    if (title) btn.title = title;
    ctx.headPanel.appendChild(btn);
    return btn;
  },

  createSysInfoPanel: function() {
    var ctx = DebugJS.ctx;
    var el = document.createElement('span');
    el.className = ctx.id + '-sys-info';
    ctx.infoPanel.appendChild(el);
    return el;
  },

  createTextInput: function(width, textAlign, color, value, inputHandler) {
    var ctx = DebugJS.ctx;
    var textInput = document.createElement('input');
    textInput.className = ctx.id + '-txt-text';
    textInput.style.setProperty('width', width, 'important');
    textInput.style.setProperty('min-height', ctx.computedFontSize + 'px', 'important');
    textInput.style.setProperty('margin', '0', 'important');
    textInput.style.setProperty('padding', '0', 'important');
    if (textAlign) textInput.style.setProperty('text-align', textAlign, 'important');
    textInput.style.setProperty('color', color, 'important');
    textInput.value = value;
    textInput.oninput = inputHandler;
    return textInput;
  },

  createLogFilter: function() {
    var ctx = DebugJS.ctx;
    ctx.filterBtnAll = ctx.createLogFilterButton('ALL', 'filterBtnAll', 'btnColor');
    ctx.filterBtnStd = ctx.createLogFilterButton('LOG', 'filterBtnStd', 'fontColor');
    ctx.filterBtnErr = ctx.createLogFilterButton('ERR', 'filterBtnErr', 'logColorE');
    ctx.filterBtnWrn = ctx.createLogFilterButton('WRN', 'filterBtnWrn', 'logColorW');
    ctx.filterBtnInf = ctx.createLogFilterButton('INF', 'filterBtnInf', 'logColorI');
    ctx.filterBtnDbg = ctx.createLogFilterButton('DBG', 'filterBtnDbg', 'logColorD');
    ctx.filterBtnVrb = ctx.createLogFilterButton('VRB', 'filterBtnVrb', 'logColorV');

    ctx.filterInputLabel = document.createElement('span');
    ctx.filterInputLabel.style.marginLeft = '4px';
    ctx.filterInputLabel.style.color = ctx.options.sysInfoColor;
    ctx.filterInputLabel.innerText = 'Filter:';
    ctx.logHeaderPanel.appendChild(ctx.filterInputLabel);

    var filterWidth = 'calc(100% - 26.5em)';
    ctx.filterInput = ctx.createTextInput(filterWidth, null, ctx.options.sysInfoColor, ctx.filterText, DebugJS.ctx.onchangeLogFilter);
    ctx.filterInput.style.setProperty('position', 'relative', 'important');
    ctx.filterInput.style.setProperty('top', '-2px', 'important');
    ctx.filterInput.style.setProperty('margin-left', '2px', 'important');
    ctx.logHeaderPanel.appendChild(ctx.filterInput);
  },

  createLogFilterButton: function(type, btnobj, color) {
    var ctx = DebugJS.ctx;
    var btn = document.createElement('span');
    btn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
    btn.style.marginLeft = '2px';
    btn.innerText = '[' + type + ']';
    btn.onclick = new Function('DebugJS.ctx.toggleLogFilter(DebugJS.LOG_FILTER_' + type + ');');
    btn.onmouseover = new Function('DebugJS.ctx.' + btnobj + '.style.color=DebugJS.ctx.options.' + color + ';');
    btn.onmouseout = DebugJS.ctx.updateLogFilterButtons;
    ctx.logHeaderPanel.appendChild(btn);
    return btn;
  },

  resetStylesOnZoom: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize + 'px';
    if (ctx.toolsPanel != null) {
      ctx.toolsHeaderPanel.style.height = fontSize;
      ctx.toolsBodyPanel.style.height = 'calc(100% - ' + ctx.computedFontSize + 'px)';
    }
    if (ctx.fileLoaderPanel != null) {
      ctx.fileInput.style.setProperty('width', 'calc(100% - ' + (ctx.computedFontSize * 12) + 'px)', 'important');
      ctx.fileInput.style.setProperty('min-height', (20 * ctx.options.zoom) + 'px', 'important');
      ctx.fileInput.style.setProperty('font-size', fontSize, 'important');
      ctx.filePreviewWrapper.style.setProperty('height', 'calc(100% - ' + ((ctx.computedFontSize * 4) + 10) + 'px)', 'important');
      ctx.filePreviewWrapper.style.setProperty('font-size', fontSize, 'important');
      ctx.filePreview.style.setProperty('font-size', fontSize, 'important');
      ctx.fileLoaderFooter.style.height = (ctx.computedFontSize + 3) + 'px';
      ctx.fileLoadProgressBar.style.width = 'calc(100% - ' + (ctx.computedFontSize * 5) + 'px)';
      ctx.fileLoadProgress.style.fontSize = (ctx.computedFontSize * 0.8) + 'px';
    }
  },

  reopenFeatures: function(status) {
    var ctx = DebugJS.ctx;
    if (status & DebugJS.STATE_MEASURE) {
      ctx.enableMeasureMode(true);
    }
    if (status & DebugJS.STATE_SYSTEM_INFO) {
      ctx.enableSystemInfo();
    }
    if (status & DebugJS.STATE_HTML_SRC) {
      ctx.enableHtmlSrc();
    }
    if (status & DebugJS.STATE_ELEMENT_INSPECTING) {
      ctx.enableElmInfo();
    }
    if (status & DebugJS.STATE_SCRIPT) {
      ctx.enableScriptEditor();
    }
    if (status & DebugJS.STATE_TOOLS) {
      ctx.enableTools();
    }
  },

  restoreDbgWinSize: function(sizeStatus) {
    var ctx = DebugJS.ctx;
    if (sizeStatus == DebugJS.SIZE_ST_FULL_WH) {
      ctx.setWindowSize('full');
    } else if (sizeStatus == DebugJS.SIZE_ST_EXPANDED) {
      ctx.setWindowSize('max');
    } else if (sizeStatus == DebugJS.SIZE_ST_EXPANDED2) {
      ctx.expandDebugWindow2();
    }
  },

  initCommandTable: function() {
    var ctx = DebugJS.ctx;
    ctx.CMD_TBL = [];
    for (var i = 0; i < ctx.INT_CMD_TBL.length; i++) {
      if (ctx.options.disableAllCommands) {
        if (ctx.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_SYSTEM) {
          ctx.CMD_TBL.push(ctx.INT_CMD_TBL[i]);
        }
      } else {
        if (!(!(ctx.status & DebugJS.STATE_DYNAMIC) &&
               (ctx.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_DYNAMIC)) &&
            (!((ctx.status & DebugJS.STATE_DYNAMIC) &&
             (ctx.options.mode == 'kiosk') &&
             (ctx.INT_CMD_TBL[i].attr & DebugJS.CMD_ATTR_NO_KIOSK)))) {
          ctx.CMD_TBL.push(ctx.INT_CMD_TBL[i]);
        }
      }
    }
    ctx.intCmdTblLen = ctx.CMD_TBL.length;
  },

  setWindowPosition: function(pos, dbgWinWidth, dbgWinHeight) {
    var ctx = DebugJS.ctx;
    switch (pos) {
      case 'se':
        ctx.dbgWin.style.top = (document.documentElement.clientHeight - dbgWinHeight - ctx.options.adjPosY) + 'px';
        ctx.dbgWin.style.left = (document.documentElement.clientWidth - dbgWinWidth - ctx.options.adjPosX) + 'px';
        break;
      case 'ne':
        ctx.dbgWin.style.top = ctx.options.adjPosY + 'px';
        ctx.dbgWin.style.left = (document.documentElement.clientWidth - dbgWinWidth - ctx.options.adjPosX) + 'px';
        break;
      case 'c':
        ctx.dbgWin.style.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
        ctx.dbgWin.style.left = ((document.documentElement.clientWidth / 2) - (dbgWinWidth / 2)) + 'px';
        break;
      case 'sw':
        ctx.dbgWin.style.top = (document.documentElement.clientHeight - dbgWinHeight - ctx.options.adjPosY) + 'px';
        ctx.dbgWin.style.left = ctx.options.adjPosX + 'px';
        break;
      case 'n':
        ctx.dbgWin.style.top = ctx.options.adjPosY + 'px';
        ctx.dbgWin.style.left = ((document.documentElement.clientWidth / 2) - (dbgWinWidth / 2)) + 'px';
        break;
      case 'e':
        ctx.dbgWin.style.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
        ctx.dbgWin.style.left = (document.documentElement.clientWidth - dbgWinWidth - ctx.options.adjPosX) + 'px';
        break;
      case 's':
        ctx.dbgWin.style.top = (document.documentElement.clientHeight - dbgWinHeight - ctx.options.adjPosY) + 'px';
        ctx.dbgWin.style.left = ((document.documentElement.clientWidth / 2) - (dbgWinWidth / 2)) + 'px';
        break;
      case 'w':
        ctx.dbgWin.style.top = ((document.documentElement.clientHeight / 2) - (dbgWinHeight / 2)) + 'px';
        ctx.dbgWin.style.left = ctx.options.adjPosX + 'px';
        break;
      default:
        ctx.dbgWin.style.top = ctx.options.adjPosY + 'px';
        ctx.dbgWin.style.left = ctx.options.adjPosX + 'px';
    }
  },

  updateClockPanel: function() {
    var ctx = DebugJS.ctx;
    var dt = DebugJS.getDateTime();
    var t = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss;
    //t += (dt.sss < 500) ? ' ' : '.';
    ctx.clockPanel.innerText = t;
    if (ctx.status & DebugJS.STATE_SHOW_CLOCK) {
      setTimeout(ctx.updateClockPanel, ctx.clockUpdInt);
    }
  },

  updateWindowSizePanel: function() {
    this.windowSizePanel.innerText = 'WIN:w=' + window.outerWidth + ',h=' + window.outerHeight;
  },

  updateClientSizePanel: function() {
    this.clientSizePanel.innerText = 'CLI:w=' + document.documentElement.clientWidth + ',h=' + document.documentElement.clientHeight;
  },

  updateBodySizePanel: function() {
    this.bodySizePanel.innerText = 'BODY:w=' + this.bodyEl.clientWidth + ',h=' + document.body.clientHeight;
  },

  updateScrollPosPanel: function() {
    this.scrollPosPanel.innerText = 'SCROLL:x=' + this.scrollPosX + ',y=' + this.scrollPosY;
  },

  updateMousePositionPanel: function() {
    this.mousePositionPanel.innerText = 'POS:' + this.mousePos;
  },

  updateMouseClickPanel: function() {
    var mouseClick = '<span style="color:' + this.mouseClick0 + ';margin-right:2px;">0</span><span style="color:' + this.mouseClick1 + ';margin-right:2px;">1</span><span style="color:' + this.mouseClick2 + '">2</span>';
    this.mouseClickPanel.innerHTML = 'CLICK:' + mouseClick;
  },

  updateKeyDownPanel: function() {
    this.keyDownPanel.innerHTML = 'Key Down:' + this.keyDownCode;
  },

  updateKeyPressPanel: function() {
    this.keyPressPanel.innerHTML = 'Press:' + this.keyPressCode;
  },

  updateKeyUpPanel: function() {
    this.keyUpPanel.innerHTML = 'Up:' + this.keyUpCode;
  },

  updateLedPanel: function() {
    var ctx = DebugJS.ctx;
    if (ctx.ledPanel) {
      var LED = '&#x25CF;';
      var SHADOW = 'text-shadow:0 0 5px;';
      var led = '';
      for (var i = 7; i >= 0; i--) {
        var bitColor = (ctx.led & DebugJS.LED_BIT[i]) ? 'color:' + DebugJS.LED_COLOR[i] + ';' + SHADOW : 'color:' + DebugJS.LED_COLOR_INACTIVE + ';';
        var margin = (i == 0 ? '' : 'margin-right:2px');
        led += '<span style="' + bitColor + margin + '">' + LED + '</span>';
      }
      ctx.ledPanel.innerHTML = led;
    }
  },

  updateMsgPanel: function() {
    var ctx = DebugJS.ctx;
    var message = ctx.msgString;
    if (ctx.msgPanel) {
      var html = '<pre>' + message + '</pre>';
      ctx.msgPanel.innerHTML = html;
      if (message == '') {
        ctx.msgPanel.style.opacity = 0;
      } else {
        ctx.msgPanel.style.opacity = 1;
      }
    }
  },

  updateMeasureBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.measureBtn.style.border = 'solid 1px ' + ((ctx.status & DebugJS.STATE_MEASURE) ? DebugJS.MEASURE_BTN_COLOR : DebugJS.COLOR_INACTIVE);
  },

  updateSysInfoBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.updateBtnActive(ctx.sysInfoBtn, DebugJS.STATE_SYSTEM_INFO, DebugJS.SYS_BTN_COLOR);
  },

  updateElmInfoBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.updateBtnActive(ctx.elmInfoBtn, DebugJS.STATE_ELEMENT_INSPECTING, DebugJS.DOM_BTN_COLOR);
  },

  updateHtmlSrcBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.updateBtnActive(ctx.htmlSrcBtn, DebugJS.STATE_HTML_SRC, DebugJS.HTML_BTN_COLOR);
  },

  updateToolsBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.updateBtnActive(ctx.toolsBtn, DebugJS.STATE_TOOLS, DebugJS.TOOLS_BTN_COLOR);
  },

  updateScriptBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.updateBtnActive(ctx.scriptBtn, DebugJS.STATE_SCRIPT, DebugJS.JS_BTN_COLOR);
  },

  updateSwBtnPanel: function() {
    var ctx = DebugJS.ctx;
    var btn = (ctx.status & DebugJS.STATE_STOPWATCH_RUNNING) ? '||' : '>>';
    var margin = (2 * ctx.options.zoom) + 'px';
    var btns = '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-right:' + margin + '" onclick="DebugJS.ctx.resetStopWatch();">0</span>' +
    '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" onclick="DebugJS.ctx.startStopStopWatch();">' + btn + '</span>';
    ctx.swBtnPanel.innerHTML = btns;
  },

  updateSwPanel: function() {
    var ctx = DebugJS.ctx;
    ctx.updateStopWatch();
    if (ctx.status & DebugJS.STATE_STOPWATCH_LAPTIME) {
      ctx.swPanel.innerHTML = '<span style="color:' + ctx.options.timerColor + '">' + ctx.swElapsedTimeDisp + '</span>';
    } else {
      ctx.swPanel.innerHTML = ctx.swElapsedTimeDisp;
    }
    if (ctx.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      setTimeout(ctx.updateSwPanel, DebugJS.UPDATE_INTERVAL_H);
    }
  },

  updateSuspendLogBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.updateBtnActive(ctx.suspendLogBtn, DebugJS.STATE_LOG_SUSPENDING, DebugJS.LOG_SUSPEND_BTN_COLOR);
  },

  updatePreserveLogBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.updateBtnActive(ctx.preserveLogBtn, DebugJS.STATE_LOG_PRESERVED, DebugJS.LOG_PRESERVE_BTN_COLOR);
  },

  updatePinBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.pinBtn.style.color = (ctx.status & DebugJS.STATE_DRAGGABLE) ? DebugJS.COLOR_INACTIVE : DebugJS.PIN_BTN_COLOR;
  },

  updateBtnActive: function(btn, status, activeColor) {
    btn.style.color = (DebugJS.ctx.status & status) ? activeColor : DebugJS.COLOR_INACTIVE;
  },

  updateWinCtrlBtnPanel: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.winCtrlBtnPanel) return;
    var fn = 'DebugJS.ctx.expandDebugWindow(true);';
    var btn = '&#x25A1;';
    if (ctx.sizeStatus != DebugJS.SIZE_ST_NORMAL) {
      fn = 'DebugJS.ctx.restoreDebugWindow();';
      btn = '&#x2750;';
    }
    fn += 'DebugJS.ctx.updateWinCtrlBtnPanel();DebugJS.ctx.focusCmdLine();';
    var b = '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="float:right;position:relative;top:-1px;margin-right:' + (3 * ctx.options.zoom) + 'px;font-size:' + (16 * ctx.options.zoom) + 'px;color:#888" onclick="' + fn + '" onmouseover="this.style.color=\'#ddd\'" onmouseout="this.style.color=\'#888\'">' + btn + '</span>' +
    '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="float:right;position:relative;top:-2px;margin-left:' + 2 * ctx.options.zoom + 'px;margin-right:' + ctx.options.zoom + 'px;font-size:' + (30 * ctx.options.zoom) + 'px;color:#888" onclick="DebugJS.ctx.resetDebugWindowSizePos();DebugJS.ctx.updateWinCtrlBtnPanel();DebugJS.ctx.focusCmdLine();" onmouseover="this.style.color=\'#ddd\'" onmouseout="this.style.color=\'#888\'">-</span>';
    ctx.winCtrlBtnPanel.innerHTML = b;
  },

  printLogMsg: function() {
    var ctx = DebugJS.ctx;
    var msg = ctx.getLogMsgs();
    var html = '<pre style="padding:0 3px">' + msg + '</pre>';
    ctx.logPanel.innerHTML = html;
    ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
    if (!(ctx.status & DebugJS.STATE_VISIBLE)) {
      ctx.status |= DebugJS.STATE_NEED_TO_SCROLL;
    }
  },

  onClr: function() {
    DebugJS.ctx.clearMessage();
    DebugJS.ctx.focusCmdLine();
  },

  clearMessage: function() {
    var ctx = DebugJS.ctx;
    ctx.msgBuf.clear();
    ctx.printLogMsg();
  },

  toggleLogFilter: function(filter) {
    var ctx = DebugJS.ctx;
    if (filter == DebugJS.LOG_FILTER_ALL) {
      if ((ctx.logFilter & ~DebugJS.LOG_FILTER_VRB) == DebugJS.LOG_FILTER_ALL) {
        ctx.logFilter = 0;
      } else {
        ctx.logFilter |= filter;
      }
    } else if (filter == DebugJS.LOG_FILTER_VRB) {
      if (ctx.logFilter & DebugJS.LOG_FILTER_VRB) {
        ctx.logFilter &= ~filter;
      } else {
        ctx.logFilter |= filter;
      }
    } else {
      if ((ctx.logFilter & ~DebugJS.LOG_FILTER_VRB) == DebugJS.LOG_FILTER_ALL) {
        ctx.logFilter = filter;
      } else {
        if (ctx.logFilter & filter) {
          ctx.logFilter &= ~filter;
        } else {
          ctx.logFilter |= filter;
        }
      }
    }
    ctx.updateLogFilterButtons();
    ctx.printLogMsg();
  },

  updateLogFilterButtons: function() {
    var ctx = DebugJS.ctx;
    ctx.filterBtnAll.style.color = ((ctx.logFilter & ~DebugJS.LOG_FILTER_VRB) == DebugJS.LOG_FILTER_ALL) ? DebugJS.ctx.options.btnColor : DebugJS.COLOR_INACTIVE;
    ctx.filterBtnStd.style.color = (ctx.logFilter & DebugJS.LOG_FILTER_LOG) ? DebugJS.ctx.options.fontColor : DebugJS.COLOR_INACTIVE;
    ctx.filterBtnVrb.style.color = (ctx.logFilter & DebugJS.LOG_FILTER_VRB) ? DebugJS.ctx.options.logColorV : DebugJS.COLOR_INACTIVE;
    ctx.filterBtnDbg.style.color = (ctx.logFilter & DebugJS.LOG_FILTER_DBG) ? DebugJS.ctx.options.logColorD : DebugJS.COLOR_INACTIVE;
    ctx.filterBtnInf.style.color = (ctx.logFilter & DebugJS.LOG_FILTER_INF) ? DebugJS.ctx.options.logColorI : DebugJS.COLOR_INACTIVE;
    ctx.filterBtnWrn.style.color = (ctx.logFilter & DebugJS.LOG_FILTER_WRN) ? DebugJS.ctx.options.logColorW : DebugJS.COLOR_INACTIVE;
    ctx.filterBtnErr.style.color = (ctx.logFilter & DebugJS.LOG_FILTER_ERR) ? DebugJS.ctx.options.logColorE : DebugJS.COLOR_INACTIVE;
  },

  onchangeLogFilter: function() {
    var ctx = DebugJS.ctx;
    ctx.filterText = ctx.filterInput.value;
    ctx.printLogMsg();
  },

  applyStyles: function(styles) {
    var ctx = DebugJS.ctx;
    if (ctx.styleEl != null) {
      document.head.removeChild(ctx.styleEl);
    }
    ctx.styleEl = document.createElement('style');
    document.head.appendChild(ctx.styleEl);
    ctx.styleEl.appendChild(document.createTextNode(''));
    var s = ctx.styleEl.sheet;
    for (var selector in styles) {
      var props = styles[selector];
      var propStr = '';
      for (var propName in props) {
        var propVal = props[propName];
        var propImportant = '';
        if (propVal[1] === true) {
          propVal = propVal[0];
          propImportant = ' !important';
        }
        propStr += propName + ':' + propVal + propImportant + ';\n';
      }
      s.insertRule(selector + '{' + propStr + '}', s.cssRules.length);
    }
  },

  setIntervalL: function() {
    var ctx = DebugJS.ctx;
    if (ctx.clockUpdIntHCnt > 0) {
      ctx.clockUpdIntHCnt--;
    }
    if (ctx.clockUpdIntHCnt == 0) {
      ctx.clockUpdInt = DebugJS.UPDATE_INTERVAL_L;
    }
  },

  setIntervalH: function() {
    var ctx = DebugJS.ctx;
    ctx.clockUpdIntHCnt++;
    ctx.clockUpdInt = DebugJS.UPDATE_INTERVAL_H;
  },

  setupMove: function() {
    var ctx = DebugJS.ctx;
    ctx.winBody.onmousedown = ctx.startMove;
  },

  startMove: function(e) {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.STATE_DRAGGABLE)) ||
        (e.button != 0) || !ctx.isMovable(e)) {
      return;
    }
    ctx.status |= DebugJS.STATE_DRAGGING;
    ctx.winBody.style.cursor = 'move';
    ctx.prevOffsetTop = e.clientY - ctx.dbgWin.offsetTop;
    ctx.prevOffsetLeft = e.clientX - ctx.dbgWin.offsetLeft;
    if (!document.all) {
       window.getSelection().removeAllRanges();
    }
  },

  isMovable: function(e) {
    var ctx = DebugJS.ctx;
    var el = e.target;
    if (el.nodeName == 'INPUT') return false;
    if (el.nodeName == 'TEXTAREA') return false;
    if (DebugJS.hasClass(el, ctx.id + '-nomove')) return false;
    var browser = DebugJS.getBrowserType();
    if ((browser.family == 'IE') || (browser.name == 'Firefox')) {
      if ((el == ctx.logPanel) ||
          (el == ctx.sysInfoPanel) ||
          (el == ctx.elmInfoBodyPanel) ||
          (el == ctx.htmlSrcBodyPanel) ||
          (el == ctx.filePreviewWrapper) ||
          (el == ctx.toolsPanel)) {
        var scrollW = 17;
        var rect = el.getBoundingClientRect();
        var scrollL = rect.left + rect.width - scrollW;
        var scrollR = rect.left + rect.width;
        if ((e.clientX >= scrollL) && (e.clientX <= scrollR)) {
          return false;
        }
      }
    }
    return true;
  },

  doMove: function(e) {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.STATE_DRAGGING)) return;
    ctx.status &= ~DebugJS.STATE_POS_AUTO_ADJUST;
    ctx.dbgWin.style.top = e.clientY - ctx.prevOffsetTop + 'px';
    ctx.dbgWin.style.left = e.clientX - ctx.prevOffsetLeft + 'px';
  },

  endMove: function() {
    var ctx = DebugJS.ctx;
    ctx.status &= ~DebugJS.STATE_DRAGGING;
    ctx.winBody.style.cursor = 'default';
  },

  startResize: function(e) {
    if (e.button != 0) return;
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.STATE_RESIZING;
    ctx.clickedPosX = e.clientX;
    ctx.clickedPosY = e.clientY;
    ctx.saveSizeAndPos();
    ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
    ctx.updateWinCtrlBtnPanel();
  },

  doResize: function(e) {
    var ctx = DebugJS.ctx;
    var currentX = e.clientX;
    var currentY = e.clientY;
    var moveX, moveY, t, l, w, h;

    if (!(ctx.status & DebugJS.STATE_DYNAMIC)) {
      if (currentX > document.documentElement.clientWidth) {
        currentX = document.documentElement.clientWidth;
      }
    }

    if (ctx.status & DebugJS.STATE_RESIZING_N) {
      moveY = ctx.clickedPosY - currentY;
      h = ctx.orgSizePos.h + moveY;
      if (h < ctx.computedMinH) {
        h = ctx.computedMinH;
      } else {
        t = ctx.orgSizePos.t - moveY;
        ctx.dbgWin.style.top = t + 'px';
      }
      ctx.dbgWin.style.height = h + 'px';
      if (ctx.logPanel.scrollTop != 0) {
        ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
      }
    }

    if (ctx.status & DebugJS.STATE_RESIZING_W) {
      moveX = ctx.clickedPosX - currentX;
      w = ctx.orgSizePos.w + moveX;
      if (w < ctx.computedMinW) {
        w = ctx.computedMinW;
      } else {
        l = ctx.orgSizePos.l - moveX;
        ctx.dbgWin.style.left = l + 'px';
      }
      ctx.dbgWin.style.width = w + 'px';
    }

    if (ctx.status & DebugJS.STATE_RESIZING_E) {
      moveX = currentX - ctx.clickedPosX;
      w = ctx.orgSizePos.w + moveX;
      if (w < ctx.computedMinW) w = ctx.computedMinW;
      ctx.dbgWin.style.width = w + 'px';
    }

    if (ctx.status & DebugJS.STATE_RESIZING_S) {
      moveY = currentY - ctx.clickedPosY;
      h = ctx.orgSizePos.h + moveY;
      if (ctx.initHeight < ctx.computedMinH) {
        if (h < ctx.initHeight) {
          h = ctx.initHeight;
        }
      } else if (h < ctx.computedMinH) {
        h = ctx.computedMinH;
      }
      ctx.dbgWin.style.height = h + 'px';
      if (ctx.logPanel.scrollTop != 0) {
        ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
      }
    }

    ctx.resizeMainHeight();
    ctx.resizeImgPreview();
  },

  endResize: function() {
    var ctx = DebugJS.ctx;
    ctx.status &= ~DebugJS.STATE_RESIZING_ALL;
    ctx.bodyEl.style.cursor = 'auto';
  },

  resizeMainHeight: function() {
    var ctx = DebugJS.ctx;
    var headPanelH = (ctx.headPanel) ? ctx.headPanel.offsetHeight : 0;
    var infoPanelH = (ctx.infoPanel) ? ctx.infoPanel.offsetHeight : 0;
    var cmdPanelH = (ctx.cmdPanel) ? ctx.cmdPanel.offsetHeight : 0;
    var mainPanelHeight = ctx.dbgWin.offsetHeight - headPanelH - infoPanelH - cmdPanelH - DebugJS.WIN_ADJUST;
    ctx.mainPanel.style.height = mainPanelHeight + 'px';
  },

  toggleLogSuspend: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_LOG_SUSPENDING) {
      ctx.status &= ~DebugJS.STATE_LOG_SUSPENDING;
    } else {
      ctx.status |= DebugJS.STATE_LOG_SUSPENDING;
    }
    ctx.updateSuspendLogBtn();
  },

  toggleLogPreserve: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_LOG_PRESERVED) {
      ctx.status &= ~DebugJS.STATE_LOG_PRESERVED;
    } else {
      ctx.status |= DebugJS.STATE_LOG_PRESERVED;
    }
    ctx.updatePreserveLogBtn();
  },

  toggleMeasureMode: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_MEASURE) {
      ctx.disableMeasureMode();
    } else {
      ctx.enableMeasureMode();
    }
  },

  enableMeasureMode: function(silent) {
    var ctx = DebugJS.ctx;
    if (!silent) DebugJS.log.s('Screen Measure ON.');
    ctx.status |= DebugJS.STATE_MEASURE;
    ctx.updateMeasureBtn();
  },

  disableMeasureMode: function(silent) {
    var ctx = DebugJS.ctx;
    ctx.stopMeasure();
    ctx.status &= ~DebugJS.STATE_MEASURE;
    if (!silent) DebugJS.log.s('Screen Measure OFF.');
    ctx.updateMeasureBtn();
  },

  toggleDraggable: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_DRAGGABLE) {
      ctx.disableDraggable();
    } else {
      ctx.enableDraggable();
    }
  },

  enableDraggable: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.STATE_DRAGGABLE;
    ctx.winBody.style.cursor = 'default';
    ctx.updatePinBtn();
  },

  disableDraggable: function() {
    var ctx = DebugJS.ctx;
    ctx.status &= ~DebugJS.STATE_DRAGGABLE;
    ctx.winBody.style.cursor = 'auto';
    ctx.updatePinBtn();
  },

  startStopStopWatch: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      ctx.stopStopWatch();
    } else {
      ctx.startStopWatch();
    }
  },

  startStopWatch: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.STATE_STOPWATCH_RUNNING;
    ctx.swStartTime = (new Date()).getTime() - ctx.swElapsedTime;
    ctx.updateStopWatch();
    ctx.updateSwPanel();
    ctx.updateSwBtnPanel();
  },

  stopStopWatch: function() {
    var ctx = DebugJS.ctx;
    ctx.status &= ~DebugJS.STATE_STOPWATCH_RUNNING;
    if (ctx.status & DebugJS.STATE_STOPWATCH_LAPTIME) {
      ctx.status &= ~DebugJS.STATE_STOPWATCH_LAPTIME;
      ctx.resetStopWatch();
    }
    ctx.updateSwBtnPanel();
  },

  resetStopWatch: function() {
    var ctx = DebugJS.ctx;
    ctx.swStartTime = (new Date()).getTime();
    ctx.swElapsedTime = 0;
    ctx.swElapsedTimeDisp = DebugJS.getTimerStr(ctx.swElapsedTime);
    ctx.updateSwPanel();
  },

  updateStopWatch: function() {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.STATE_STOPWATCH_RUNNING)) return;
    var swCurrentTime = (new Date()).getTime();
    ctx.swElapsedTime = swCurrentTime - ctx.swStartTime;
    ctx.swElapsedTimeDisp = DebugJS.getTimerStr(ctx.swElapsedTime);
  },

  getLogMsgs: function() {
    var ctx = DebugJS.ctx;
    var buf = ctx.msgBuf.getAll();
    var cnt = ctx.msgBuf.count();
    var len = buf.length;
    var lineCnt = cnt - len;
    var logs = '';
    for (var i = 0; i < len; i++) {
      lineCnt++;
      var data = buf[i];
      if (data == undefined) break;
      var msg = data.msg;
      var filter = ctx.filterText;
      if (filter != '') {
        try {
          var pos = msg.indexOf(filter);
          if (pos != -1) {
            var key = msg.substr(pos, filter.length);
            var hl = '<span class="' + ctx.id + '-txt-hl">' + key + '</span>';
            msg = msg.replace(key, hl, 'ig');
          } else {
            continue;
          }
        } catch (e) {}
      }
      var line = '';
      var lineNum = '';
      if ((ctx.options.showLineNums) && (data.type != DebugJS.LOG_TYPE_MLT)) {
        var diffDigits = DebugJS.digits(cnt) - DebugJS.digits(lineCnt);
        var lineNumPadding = '';
        for (var j = 0; j < diffDigits; j++) {
          lineNumPadding = lineNumPadding + '0';
        }
        lineNum = lineNumPadding + lineCnt + ': ';
      }
      var m = (((ctx.options.showTimeStamp) && (data.type != DebugJS.LOG_TYPE_MLT)) ? (data.time + ' ' + msg) : msg);
      switch (data.type) {
        case DebugJS.LOG_TYPE_ERR:
          if (ctx.logFilter & DebugJS.LOG_FILTER_ERR) line += lineNum + '<span style="color:' + ctx.options.logColorE + '">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_WRN:
          if (ctx.logFilter & DebugJS.LOG_FILTER_WRN) line += lineNum + '<span style="color:' + ctx.options.logColorW + '">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_INF:
          if (ctx.logFilter & DebugJS.LOG_FILTER_INF) line += lineNum + '<span style="color:' + ctx.options.logColorI + '">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_DBG:
          if (ctx.logFilter & DebugJS.LOG_FILTER_DBG) line += lineNum + '<span style="color:' + ctx.options.logColorD + '">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_VRB:
          if (ctx.logFilter & DebugJS.LOG_FILTER_VRB) line += lineNum + '<span style="color:' + ctx.options.logColorV + '">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_SYS:
          if (ctx.logFilter & DebugJS.LOG_FILTER_LOG) line += lineNum + '<span style="color:' + ctx.options.logColorS + ';text-shadow:0 0 3px">' + m + '</span>\n';
          break;
        case DebugJS.LOG_TYPE_MLT:
          if (ctx.logFilter & DebugJS.LOG_FILTER_LOG) line += lineNum + '<span style="display:inline-block;margin:' + Math.round(ctx.computedFontSize * 0.5) + 'px 0">' + m + '</span>\n';
          break;
        default:
          if (ctx.logFilter & DebugJS.LOG_FILTER_LOG) line += lineNum + m + '\n';
      }
      logs += line;
    }
    return logs;
  },

  collapseLogPanel: function() {
    var ctx = DebugJS.ctx;
    ctx.logPanel.style.height = 'calc(' + (100 - DebugJS.OVERLAY_PANEL_HEIGHT) + '%' + ctx.logPanelHeightAdjust + ')';
    ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
  },

  expandLogPanel: function() {
    var ctx = DebugJS.ctx;
    ctx.logPanel.style.height = 'calc(100%' + ctx.logPanelHeightAdjust + ')';
  },

  closeFeatures: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.status & DebugJS.STATE_DRAGGING) || (ctx.status & DebugJS.STATE_RESIZING)) {
      ctx.status &= ~DebugJS.STATE_DRAGGING;
      ctx.endResize();
    }
    if (ctx.status & DebugJS.STATE_MEASURE) {
      ctx.disableMeasureMode(true);
    }
    if (ctx.status & DebugJS.STATE_ELEMENT_INSPECTING) {
      ctx.disableElmInfo();
    }
    if (ctx.status & DebugJS.STATE_TOOLS) {
      ctx.disableTools();
    }
    if (ctx.status & DebugJS.STATE_SCRIPT) {
      ctx.disableScriptEditor();
    }
    if (ctx.status & DebugJS.STATE_HTML_SRC) {
      ctx.disableHtmlSrc();
    }
    if (ctx.status & DebugJS.STATE_SYSTEM_INFO) {
      ctx.disableSystemInfo();
    }
  },

  keyHandler: function(e) {
    var ctx = DebugJS.ctx;
    switch (e.keyCode) {
      case 9: // Tab
        if ((ctx.status & DebugJS.STATE_TOOLS) && (DebugJS.ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_FILE)) {
          ctx.switchFileScreen();
        }
        break;

      case 13: // Enter
        if (document.activeElement == ctx.cmdLine) {
          ctx.execCmd();
          e.preventDefault();
        }
        break;

      case 27: // ESC
        if (ctx.properties.esc.value == 'disable') {
          break;
        }
        if ((ctx.status & DebugJS.STATE_DRAGGING) || (ctx.status & DebugJS.STATE_RESIZING)) {
          ctx.status &= ~DebugJS.STATE_DRAGGING;
          ctx.endResize();
          break;
        }
        if (ctx.status & DebugJS.STATE_MEASURE) {
          ctx.disableMeasureMode();
          break;
        }
        if (ctx.status & DebugJS.STATE_HTML_SRC) {
          ctx.disableHtmlSrc();
          break;
        }
        if (ctx.status & DebugJS.STATE_ELEMENT_INSPECTING) {
          ctx.disableElmInfo();
          break;
        }
        if (ctx.status & DebugJS.STATE_TOOLS) {
          ctx.disableTools();
          break;
        }
        if (ctx.status & DebugJS.STATE_SCRIPT) {
          ctx.disableScriptEditor();
          break;
        }
        if (ctx.status & DebugJS.STATE_SYSTEM_INFO) {
          ctx.disableSystemInfo();
          break;
        }
        ctx.hideDebugWindow();
        break;

      case 38: // Up
        if (document.activeElement == ctx.cmdLine) {
          var cmds = ctx.cmdHistoryBuf.getAll();
          if (cmds.length == 0) return;
          if (cmds.length < ctx.cmdHistoryIdx) {
            ctx.cmdHistoryIdx = cmds.length;
          }
          if (ctx.cmdHistoryIdx == cmds.length) {
            ctx.cmdTmp = ctx.cmdLine.value;
          }
          if (ctx.cmdHistoryIdx > 0) {
            ctx.cmdHistoryIdx--;
          }
          ctx.cmdLine.value = cmds[ctx.cmdHistoryIdx];
          e.preventDefault();
        }
        break;

      case 40: // Down
        if (document.activeElement == ctx.cmdLine) {
          var cmds = ctx.cmdHistoryBuf.getAll();
          if (cmds.length == 0) return;
          if (ctx.cmdHistoryIdx < cmds.length) {
            ctx.cmdHistoryIdx++;
          }
          if (ctx.cmdHistoryIdx == cmds.length) {
            ctx.cmdLine.value = ctx.cmdTmp;
          } else {
            ctx.cmdLine.value = cmds[ctx.cmdHistoryIdx];
          }
        }
        break;

      case 67: // C
        if ((e.ctrlKey) && (document.activeElement == ctx.cmdLine)) {
          DebugJS.log.s(ctx.cmdLine.value + '^C');
          ctx.cmdLine.value = '';
        }
        break;

      case 112: // F1
        if (ctx.status & DebugJS.STATE_DYNAMIC) {
          ctx.dbgWin.style.top = 0;
          ctx.dbgWin.style.left = 0;
          ctx.status &= ~DebugJS.STATE_DRAGGING;
        }
        break;

      case ctx.options.keyAssign.key:
        if ((e.shiftKey == ctx.options.keyAssign.shift) &&
            (e.ctrlKey == ctx.options.keyAssign.ctrl) &&
            (e.altKey == ctx.options.keyAssign.alt) &&
            (e.metaKey == ctx.options.keyAssign.meta)) {
          if ((ctx.status & DebugJS.STATE_DYNAMIC) && (ctx.isOutOfWindow())) {
            ctx.resetToOriginalPosition();
          } else if (ctx.status & DebugJS.STATE_VISIBLE) {
            ctx.closeDebugWindow();
          } else {
            ctx.showDebugWindow();
          }
        }
        break;
    }
  },

  onKeyDown: function(e) {
    var ctx = DebugJS.ctx;
    var modKey = DebugJS.checkModKey(e);
    ctx.keyDownCode = e.keyCode + ' ' + modKey;
    ctx.updateKeyDownPanel();

    ctx.keyPressCode = DebugJS.KEY_STATUS_DEFAULT;
    ctx.updateKeyPressPanel();

    ctx.keyUpCode = DebugJS.KEY_STATUS_DEFAULT;
    ctx.updateKeyUpPanel();
  },

  onKeyPress: function(e) {
    var ctx = DebugJS.ctx;
    var modKey = DebugJS.checkModKey(e);
    ctx.keyPressCode = e.keyCode + '(' + String.fromCharCode(e.keyCode) + ') ' + modKey;
    ctx.updateKeyPressPanel();
  },

  onKeyUp: function(e) {
    var ctx = DebugJS.ctx;
    var modKey = DebugJS.checkModKey(e);
    ctx.keyUpCode = e.keyCode + ' ' + modKey;
    ctx.updateKeyUpPanel();
  },

  onResize: function() {
    var ctx = DebugJS.ctx;
    ctx.updateWindowSizePanel();
    ctx.updateClientSizePanel();
    ctx.updateBodySizePanel();
    if (ctx.status & DebugJS.STATE_VISIBLE) {
      if (ctx.status & DebugJS.STATE_POS_AUTO_ADJUST) {
        ctx.adjustDebugWindowPos();
      } else {
        ctx.adjustWindowMax();
      }
      ctx.resizeMainHeight();
    }
  },

  onScroll: function() {
    var ctx = DebugJS.ctx;
    if (window.scrollX === undefined) {
      ctx.scrollPosX = document.documentElement.scrollLeft;
      ctx.scrollPosY = document.documentElement.scrollTop;
    } else {
      ctx.scrollPosX = window.scrollX;
      ctx.scrollPosY = window.scrollY;
    }
    ctx.updateScrollPosPanel();
    ctx.resizeMainHeight();
  },

  onMouseDown: function(e) {
    var ctx = DebugJS.ctx;
    var posX = e.clientX;
    var posY = e.clientY;
    switch (e.button) {
      case 0:
        ctx.mouseClick0 = DebugJS.COLOR_ACTIVE;
        if (ctx.status & DebugJS.STATE_MEASURE) {
          ctx.startMeasure(e);
        }
        if (ctx.status & DebugJS.STATE_STOPWATCH_LAPTIME) {
          DebugJS.log('<span style="color:' + ctx.options.timerColor + '">' + ctx.swElapsedTimeDisp + '</span>');
          ctx.resetStopWatch();
        }
        break;
      case 1:
        ctx.mouseClick1 = DebugJS.COLOR_ACTIVE;
        break;
      case 2:
        ctx.mouseClick2 = DebugJS.COLOR_ACTIVE;
        if (ctx.status & DebugJS.STATE_ELEMENT_INSPECTING) {
          if (ctx.isOnDebugWindow(posX, posY)) {
            if ((DebugJS.el) && (DebugJS.el != ctx.targetElm)) {
              ctx.showElementInfo(DebugJS.el);
              ctx.updateTargetElm(DebugJS.el);
            }
          } else {
            var pointedElm = document.elementFromPoint(posX, posY);
            ctx.captureElm(pointedElm);
          }
        }
        break;
    }
    if (ctx.options.useMouseStatusInfo) {
      ctx.updateMouseClickPanel();
    }
  },

  onMouseMove: function(e) {
    var ctx = DebugJS.ctx;
    if (ctx.options.useMouseStatusInfo) {
      ctx.mousePos = 'x=' + e.clientX + ',y=' + e.clientY;
      ctx.updateMousePositionPanel();
    }
    if (ctx.status & DebugJS.STATE_DRAGGING) ctx.doMove(e);
    if (ctx.status & DebugJS.STATE_RESIZING) ctx.doResize(e);
    if (ctx.status & DebugJS.STATE_MEASURING) ctx.doMeasure(e);
    if (ctx.status & DebugJS.STATE_ELEMENT_INSPECTING) ctx.inspectElement(e);
    ctx.resizeMainHeight();
  },

  onMouseUp: function(e) {
    var ctx = DebugJS.ctx;
    switch (e.button) {
      case 0:
        ctx.mouseClick0 = DebugJS.COLOR_INACTIVE;
        if (ctx.status & DebugJS.STATE_MEASURING) {
          ctx.stopMeasure();
        }
        if (ctx.status & DebugJS.STATE_DRAGGABLE) {
          ctx.endMove();
        }
        if (ctx.status & DebugJS.STATE_RESIZING) {
          ctx.endResize();
        }
        break;
      case 1:
        ctx.mouseClick1 = DebugJS.COLOR_INACTIVE;
        break;
      case 2:
        ctx.mouseClick2 = DebugJS.COLOR_INACTIVE;
        break;
    }
    if (ctx.options.useMouseStatusInfo) {
      ctx.updateMouseClickPanel();
    }
  },

  onDbgWinDblClick: function(e) {
    var ctx = DebugJS.ctx;
    if ((!ctx.isMovable(e)) ||
        (!(ctx.status & DebugJS.STATE_DRAGGABLE))) {
      return;
    }
    if (ctx.sizeStatus != DebugJS.SIZE_ST_NORMAL) {
      ctx.setWindowSize('restore');
    } else {
      var sizePos = ctx.getSelfSizePos();
      if ((sizePos.w > DebugJS.DBGWIN_EXPAND_W2) ||
          (sizePos.h > DebugJS.DBGWIN_EXPAND_H2)) {
        ctx.setWindowSize('expand');
      } else {
        ctx.expandDebugWindow2();
      }
    }
    ctx.focusCmdLine();
  },

  expandDebugWindow2: function() {
    var ctx = DebugJS.ctx;
    var sizePos = ctx.getSelfSizePos();
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    var l = sizePos.x1 + 3;
    var t = sizePos.y1 + 3;
    var w = DebugJS.DBGWIN_EXPAND_W2;
    var h = DebugJS.DBGWIN_EXPAND_H2;
    if (sizePos.x1 > (clientWidth - sizePos.x2)) {
      l = (sizePos.x1 - (DebugJS.DBGWIN_EXPAND_W2 - sizePos.w)) + 1;
    }
    if (sizePos.y1 > (clientHeight - sizePos.y2)) {
      t = (sizePos.y1 - (DebugJS.DBGWIN_EXPAND_H2 - sizePos.h)) + 1;
    }
    if (l < 0) l = 0;
    if (clientHeight < DebugJS.DBGWIN_EXPAND_H2) {
      t = clientHeight - DebugJS.DBGWIN_EXPAND_H2;
    }
    ctx.saveSizeAndPos();
    ctx.setDebugWindowPos(t, l);
    ctx.setDebugWindowSize(w, h);
    ctx.sizeStatus = DebugJS.SIZE_ST_EXPANDED2;
    ctx.updateWinCtrlBtnPanel();
  },

  expandDebugWindow: function(auto) {
    var ctx = DebugJS.ctx;
    var sizePos = ctx.getSelfSizePos();
    ctx.saveSizeAndPos();
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    var expandThresholdW = document.documentElement.clientWidth * 0.6;
    var expandThresholdH = document.documentElement.clientHeight * 0.6;
    var w = 0, h = 0, t = 0, l = 0;

    if (auto) {
      if ((DebugJS.DBGWIN_EXPAND_W > clientWidth) || (sizePos.w > expandThresholdW)) {
        w = clientWidth;
        ctx.sizeStatus |= DebugJS.SIZE_ST_FULL_W;
        if ((DebugJS.DBGWIN_EXPAND_H > clientHeight) || (sizePos.h > expandThresholdH)) {
          h = clientHeight;
        } else {
          t = DebugJS.DBGWIN_POS_NONE;
        }
      } else {
        if ((DebugJS.DBGWIN_EXPAND_H > clientHeight) || (sizePos.h > expandThresholdH)) {
          h = clientHeight;
          if ((DebugJS.DBGWIN_EXPAND_W < clientWidth) && (sizePos.w < expandThresholdW)) {
            l = DebugJS.DBGWIN_POS_NONE;
          }
        } else {
          w = DebugJS.DBGWIN_EXPAND_W;
          h = DebugJS.DBGWIN_EXPAND_H;
          l = clientWidth / 2 - w / 2;
          t = clientHeight / 2 - h / 2;
        }
      }
    } else {
      w = ((DebugJS.DBGWIN_EXPAND_W > clientWidth) ? clientWidth : DebugJS.DBGWIN_EXPAND_W);
      h = ((DebugJS.DBGWIN_EXPAND_H > clientHeight) ? clientHeight : DebugJS.DBGWIN_EXPAND_H);
      l = clientWidth / 2 - w / 2;
      t = clientHeight / 2 - h / 2;
    }

    if ((auto) && (sizePos.w >= DebugJS.DBGWIN_EXPAND_W) && (sizePos.h >= DebugJS.DBGWIN_EXPAND_H)) {
      ctx.setDebugWindowFull();
    } else {
      ctx.setDebugWindowPos(t, l);
      ctx.setDebugWindowSize(w, h);
      ctx.status &= ~DebugJS.STATE_POS_AUTO_ADJUST;
      if ((w == clientWidth) && (h == clientHeight)) {
        ctx.sizeStatus = DebugJS.SIZE_ST_FULL_WH;
      } else if (w == clientWidth) {
        ctx.sizeStatus = DebugJS.SIZE_ST_FULL_W;
      } else if (h == clientHeight) {
        ctx.sizeStatus = DebugJS.SIZE_ST_FULL_H;
      } else {
        ctx.sizeStatus = DebugJS.SIZE_ST_EXPANDED;
      }
    }
  },

  setDebugWindowFull: function() {
    var ctx = DebugJS.ctx;
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var t = 0, l = 0;
    ctx.setDebugWindowPos(t, l);
    ctx.setDebugWindowSize(w, h);
    ctx.status &= ~DebugJS.STATE_POS_AUTO_ADJUST;
    ctx.sizeStatus = DebugJS.SIZE_ST_FULL_WH;
  },

  setDebugWindowPos: function(t, l) {
    var ctx = DebugJS.ctx;
    if (t > DebugJS.DBGWIN_POS_NONE) ctx.dbgWin.style.top = t + 'px';
    if (l > DebugJS.DBGWIN_POS_NONE) ctx.dbgWin.style.left = l + 'px';
  },

  setDebugWindowSize: function(w, h) {
    var ctx = DebugJS.ctx;
    var clientWidth = document.documentElement.clientWidth;
    var clientHeight = document.documentElement.clientHeight;
    if (w > 0) ctx.dbgWin.style.width = w + 'px';
    if (h > 0) ctx.dbgWin.style.height = h + 'px';
    ctx.resizeMainHeight();
    ctx.resizeImgPreview();
  },

  adjustDebugWindowPos: function() {
    var ctx = DebugJS.ctx;
    var sizePos = ctx.getSelfSizePos();
    ctx.setWindowPosition(ctx.options.position, sizePos.w, sizePos.h);
  },

  adjustWindowMax: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.sizeStatus == DebugJS.SIZE_ST_FULL_W) || (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH)) {
      ctx.dbgWin.style.width = document.documentElement.clientWidth + 'px';
    }
    if ((ctx.sizeStatus == DebugJS.SIZE_ST_FULL_H) || (ctx.sizeStatus == DebugJS.SIZE_ST_FULL_WH)) {
      ctx.dbgWin.style.height = document.documentElement.clientHeight + 'px';
    }
    ctx.resizeMainHeight();
    ctx.resizeImgPreview();
  },

  saveSizeAndPos: function() {
    var ctx = DebugJS.ctx;
    ctx.saveSize();
    ctx.savePos();
  },

  saveSize: function() {
    var ctx = DebugJS.ctx;
    var shadow = (ctx.status & DebugJS.STATE_DYNAMIC) ? (DebugJS.WIN_SHADOW / 2) : 0;
    ctx.orgSizePos.w = (ctx.dbgWin.offsetWidth + DebugJS.WIN_BORDER - shadow);
    ctx.orgSizePos.h = (ctx.dbgWin.offsetHeight + DebugJS.WIN_BORDER - shadow);
  },

  savePos: function() {
    var ctx = DebugJS.ctx;
    ctx.orgSizePos.t = ctx.dbgWin.offsetTop;
    ctx.orgSizePos.l = ctx.dbgWin.offsetLeft;
  },

  savePosNone: function() {
    var ctx = DebugJS.ctx;
    ctx.orgSizePos.t = DebugJS.DBGWIN_POS_NONE;
    ctx.orgSizePos.l = DebugJS.DBGWIN_POS_NONE;
  },

  restoreDebugWindow: function() {
    var ctx = DebugJS.ctx;
    var w = ctx.orgSizePos.w;
    var h = ctx.orgSizePos.h;
    var t = ctx.orgSizePos.t;
    var l = ctx.orgSizePos.l;
    ctx.setDebugWindowSize(w, h);
    ctx.setDebugWindowPos(t, l);
    ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
    ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
    if (ctx.status & DebugJS.STATE_POS_AUTO_ADJUST) {
      ctx.adjustDebugWindowPos();
    }
  },

  resetDebugWindowSizePos: function() {
    var ctx = DebugJS.ctx;
    var w = (ctx.initWidth - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
    var h = (ctx.initHeight - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
    ctx.setWindowPosition(ctx.options.position, ctx.initWidth, ctx.initHeight);
    ctx.setDebugWindowSize(w, h);
    ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
    ctx.saveExpandModeOrgSizeAndPos();
    ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
    if (ctx.status & DebugJS.STATE_DRAGGABLE) {
      ctx.status |= DebugJS.STATE_POS_AUTO_ADJUST;
      ctx.adjustDebugWindowPos();
    }
  },

  isOutOfWindow: function() {
    var ctx = DebugJS.ctx;
    var ret = false;
    var sizePos = ctx.getSelfSizePos();
    if ((sizePos.x1 > document.documentElement.clientWidth) ||
        (sizePos.y1 > document.documentElement.clientHeight) ||
        (sizePos.x2 < 0) ||
        (sizePos.y2 < 0)) {
      ret = true;
    }
    return ret;
  },

  resetToOriginalPosition: function() {
    var ctx = DebugJS.ctx;
    var sizePos = ctx.getSelfSizePos();
    ctx.setWindowPosition(ctx.options.position, sizePos.w, sizePos.h);
    if (ctx.status & DebugJS.STATE_DRAGGABLE) {
      ctx.status |= DebugJS.STATE_POS_AUTO_ADJUST;
    }
  },

  showDebugWindow: function() {
    var ctx = DebugJS.ctx;
    ctx.dbgWin.style.display = 'block';
    ctx.status |= DebugJS.STATE_VISIBLE;
    if ((ctx.status & DebugJS.STATE_POS_AUTO_ADJUST) ||
       ((ctx.status & DebugJS.STATE_DYNAMIC) && (ctx.isOutOfWindow()))) {
      ctx.status |= DebugJS.STATE_POS_AUTO_ADJUST;
      ctx.adjustDebugWindowPos();
    } else {
      ctx.adjustWindowMax();
    }
    if (ctx.status & DebugJS.STATE_NEED_TO_SCROLL) {
      ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
      ctx.status &= ~DebugJS.STATE_NEED_TO_SCROLL;
    }
    ctx.resizeMainHeight();
  },

  showDebugWindowOnError: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.errStatus) && !(ctx.status & DebugJS.STATE_VISIBLE)) {
      if (ctx.dbgWin) {
        if (((ctx.options.popupOnError.scriptError) && (ctx.errStatus & DebugJS.ERR_STATE_SCRIPT)) ||
            ((ctx.options.popupOnError.loadError) && (ctx.errStatus & DebugJS.ERR_STATE_LOAD)) ||
            ((ctx.options.popupOnError.errorLog) && (ctx.errStatus & DebugJS.ERR_STATE_LOG))) {
          ctx.showDebugWindow();
          ctx.errStatus = DebugJS.ERR_STATE_NONE;
        }
      }
    }
  },

  hideDebugWindow: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.options.togglableShowHide) return;
    ctx.errStatus = DebugJS.ERR_STATE_NONE;
    ctx.status &= ~DebugJS.STATE_DRAGGING;
    ctx.dbgWin.style.display = 'none';
    ctx.status &= ~DebugJS.STATE_VISIBLE;
  },

  closeDebugWindow: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_MEASURE) {
      ctx.disableMeasureMode();
    }
    if (ctx.status & DebugJS.STATE_ELEMENT_INSPECTING) {
      ctx.disableElmInfo();
    }
    ctx.hideDebugWindow();
  },

  focusCmdLine: function() {
    var ctx = DebugJS.ctx;
    if (ctx.cmdLine) ctx.cmdLine.focus();
  },

  startMeasure: function(e) {
    var ctx = DebugJS.ctx;
    var posX = e.clientX;
    var posY = e.clientY;
    if (ctx.isOnDebugWindow(posX, posY)) return;

    ctx.status |= DebugJS.STATE_MEASURING;
    ctx.clickedPosX = posX;
    ctx.clickedPosY = posY;

    if (ctx.measureBox == null) {
      var box = document.createElement('div');
      box.style.position = 'fixed';
      box.style.zIndex = 0x7fffffff;
      box.style.top = ctx.clickedPosY + 'px';
      box.style.left = ctx.clickedPosX + 'px';
      box.style.width = '0px';
      box.style.height = '0px';
      box.style.border = 'dotted 1px #333';
      box.style.background = 'rgba(0,0,0,0.1)';
      ctx.measureBox = box;
      ctx.bodyEl.appendChild(box);
    }
    ctx.savedFunc = document.onselectstart;
    document.onselectstart = function() {return false;};
  },

  doMeasure: function(e) {
    var ctx = DebugJS.ctx;
    var currentPosX = e.clientX;
    var currentPosY = e.clientY;
    var deltaX = currentPosX - ctx.clickedPosX;
    var deltaY = currentPosY - ctx.clickedPosY;
    var clientWidth = document.documentElement.clientWidth;
    if (deltaX < 0) {
      ctx.measureBox.style.left = currentPosX + 'px';
      deltaX *= -1;
    }
    if (deltaY < 0) {
      ctx.measureBox.style.top = currentPosY + 'px';
      deltaY *= -1;
    }
    ctx.measureBox.style.width = deltaX + 'px';
    ctx.measureBox.style.height = deltaY + 'px';
    var sizeLabelW = 210;
    var sizeLabelH = 40;
    var sizeLabelY = (deltaY / 2) - (sizeLabelH / 2);
    var sizeLabelX = (deltaX / 2) - (sizeLabelW / 2);
    var originY = 'top';
    var originX = 'left';
    if (deltaX < sizeLabelW) {
      sizeLabelX = 0;
      if ((deltaY < sizeLabelH) || (deltaY > ctx.clickedPosY)) {
        if (ctx.clickedPosY < sizeLabelH) {
          sizeLabelY = deltaY;
        } else {
          sizeLabelY = sizeLabelH * (-1);
        }
      } else {
        sizeLabelY = sizeLabelH * (-1);
      }
    }

    if (currentPosY < sizeLabelH) {
      if (ctx.clickedPosY > sizeLabelH) {
        sizeLabelY = (deltaY / 2) - (sizeLabelH / 2);
      }
    }

    if (((ctx.clickedPosX + sizeLabelW) > clientWidth) && ((currentPosX + sizeLabelW) > clientWidth)) {
      sizeLabelX = (sizeLabelW - (clientWidth - ctx.clickedPosX)) * (-1);
    }

    var endPointY = 'bottom';
    var endPointX = 'right';
    if (currentPosX < ctx.clickedPosX) {
      originX = 'right';
      endPointX = 'left';
    }
    if (currentPosY < ctx.clickedPosY) {
      originY = 'bottom';
      endPointY = 'top';
    }
    var size = '<span style="font-family:' + ctx.options.fontFamily + ';font-size:32px;color:#fff;background:rgba(0,0,0,0.7);padding:1px 3px;white-space:pre;position:relative;top:' + sizeLabelY + 'px;left:' + sizeLabelX + 'px">W=' + (deltaX | 0) + ' H=' + (deltaY | 0) + '</span>';
    var origin = '<span style="font-family:' + ctx.options.fontFamily + ';font-size:12px;color:#fff;background:rgba(0,0,0,0.3);white-space:pre;position:absolute;' + originY + ':1px;' + originX + ':1px;padding:1px">x=' + ctx.clickedPosX + ',y=' + ctx.clickedPosY + '</span>';
    var endPoint = '';
    //endPoint = '<span style="font-family:' + ctx.options.fontFamily + ';font-size:12px;color:#fff;background:rgba(0,0,0,0.3);white-space:pre;position:absolute;' + endPointY + ':1px;' + endPointX + ':1px;padding:1px">x=' + currentPosX + ',y=' + currentPosY + '</span>';
    ctx.measureBox.innerHTML = origin + size + endPoint;
  },

  stopMeasure: function() {
    var ctx = DebugJS.ctx;
    if (ctx.measureBox != null) {
      ctx.bodyEl.removeChild(ctx.measureBox);
      ctx.measureBox = null;
    }
    document.onselectstart = ctx.savedFunc;
    ctx.status &= ~DebugJS.STATE_MEASURING;
  },

  toggleSystemInfoMode: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_SYSTEM_INFO) {
      ctx.disableSystemInfo();
    } else {
      ctx.enableSystemInfo();
    }
  },

  enableSystemInfo: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.STATE_SYSTEM_INFO;
    if (ctx.sysInfoPanel == null) {
      ctx.sysInfoPanel = document.createElement('div');
      ctx.sysInfoPanel.innerHTML = '<span style="color:' + DebugJS.SYS_BTN_COLOR + '">&lt;SYSTEM INFO&gt;</span>';
      if (DebugJS.SYS_INFO_FULL_OVERLAY) {
        ctx.sysInfoPanel.className = ctx.id + '-overlay-panel-full';
        ctx.addOverlayPanelFull(ctx.sysInfoPanel);
      } else {
        ctx.sysInfoPanel.className = ctx.id + '-overlay-panel';
        ctx.addOverlayPanel(ctx.sysInfoPanel);
        ctx.expandHightIfNeeded(ctx.windowExpandHeight);
      }
      ctx.sysTimePanel = document.createElement('div');
      ctx.sysTimePanel.style.marginRight = '4px';
      ctx.sysTimePanel.color = '#fff';
      ctx.sysInfoPanel.appendChild(ctx.sysTimePanel);
      ctx.updateSystemTime();
      ctx.sysInfoPanelBody = document.createElement('div');
      ctx.sysInfoPanelBody.style.top = ctx.computedFontSize;
      ctx.sysInfoPanel.appendChild(ctx.sysInfoPanelBody);
    }
    ctx.updateSysInfoBtn();
    ctx.showSystemInfo();
    ctx.setIntervalH();
  },

  updateSystemTime: function() {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.STATE_SYSTEM_INFO)) {
      return;
    }
    var sysTime = (new Date()).getTime();
    var sysTimeBin = DebugJS.formatBin(parseInt(sysTime).toString(2), false, 1);
    var html = '<pre><span style="color:' + DebugJS.ITEM_NAME_COLOR + '">SYSTEM TIME</span> : ' + DebugJS.getDateTimeStr(DebugJS.getDateTime(sysTime)) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">         RAW</span>  (new Date()).getTime() = ' + sysTime + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">         BIN</span>  ' + sysTimeBin + '</pre>';
    ctx.sysTimePanel.innerHTML = html;
    setTimeout(ctx.updateSystemTime, DebugJS.UPDATE_INTERVAL_H);
  },

  disableSystemInfo: function() {
    var ctx = DebugJS.ctx;
    if (ctx.sysInfoPanel != null) {
      if (DebugJS.SYS_INFO_FULL_OVERLAY) {
        ctx.removeOverlayPanelFull(ctx.sysInfoPanel);
      } else {
        ctx.removeOverlayPanel(ctx.sysInfoPanel);
        ctx.resetExpandedHeightIfNeeded();
      }
      ctx.sysInfoPanel = null;
    }
    ctx.status &= ~DebugJS.STATE_SYSTEM_INFO;
    ctx.updateSysInfoBtn();
    ctx.setIntervalL();
  },

  showSystemInfo: function(e) {
    var ctx = DebugJS.ctx;
    var INDENT = '                  ';
    var screenSize = 'width = ' + screen.width + ' x height = ' + screen.height;
    var languages = ctx.getLanguages(INDENT);
    var browser = DebugJS.getBrowserType();
    var jq = '<span class="' + ctx.id + '-na">not loaded</span>';
    if (typeof jQuery != 'undefined') {
      jq = 'v' + jQuery.fn.jquery;
    }

    var metaTags = document.getElementsByTagName('meta');
    var charset;
    for (var i = 0; i < metaTags.length; i++) {
      charset = metaTags[i].getAttribute('charset');
      if (charset) {
        break;
      } else {
        charset = metaTags[i].getAttribute('content');
        if (charset) {
          var content = charset.match(/charset=(.*)/);
          if (content != null) {
            charset = content[1];
            break;
          }
        }
      }
    }
    if (charset == null) charset = '';

    var INDENT = '         ';
    var links = document.getElementsByTagName('link');
    var loadedStyles = '<span class="' + ctx.id + '-na">not loaded</span>';
    for (var i = 0; i < links.length; i++) {
      if (links[i].rel == 'stylesheet') {
        if (i == 0) {
          loadedStyles = ctx.createFoldingText(links[i].href, 'linkHref' + i, DebugJS.OMIT_MID);
        } else {
          loadedStyles += '\n' + INDENT + ctx.createFoldingText(links[i].href, 'linkHref' + i, DebugJS.OMIT_MID);
        }
      }
    }

    var scripts = document.getElementsByTagName('script');
    var loadedScripts = '<span class="' + ctx.id + '-na">not loaded</span>';
    for (var i = 0; i < scripts.length; i++) {
      if (scripts[i].src) {
        if (i == 0) {
          loadedScripts = ctx.createFoldingText(scripts[i].src, 'scriptSrc' + i, DebugJS.OMIT_MID);
        } else {
          loadedScripts += '\n' + INDENT + ctx.createFoldingText(scripts[i].src, 'scriptSrc' + i, DebugJS.OMIT_MID);
        }
      }
    }

    var navUserAgent = ctx.createFoldingText(navigator.userAgent, 'navUserAgent', DebugJS.OMIT_LAST);
    var navAppVersion = ctx.createFoldingText(navigator.appVersion, 'navAppVersion', DebugJS.OMIT_LAST);
    var winOnload = ctx.createFoldingText(window.onload, 'winOnload', DebugJS.OMIT_LAST);
    var winOnunload = ctx.createFoldingText(window.onunload, 'winOnunload', DebugJS.OMIT_LAST);
    var winOnclick = ctx.createFoldingText(window.onclick, 'winOnclick', DebugJS.OMIT_LAST);
    var winOnmousedown = ctx.createFoldingText(window.onmousedown, 'winOnmousedown', DebugJS.OMIT_LAST);
    var winOnmousemove = ctx.createFoldingText(window.onmousemove, 'winOnmousemove', DebugJS.OMIT_LAST);
    var winOnmouseup = ctx.createFoldingText(window.onmousedown, 'winOnmouseup', DebugJS.OMIT_LAST);
    var winOnkeydown = ctx.createFoldingText(window.onkeydown, 'winOnkeydown', DebugJS.OMIT_LAST);
    var winOnkeypress = ctx.createFoldingText(window.onkeypress, 'winOnkeypress', DebugJS.OMIT_LAST);
    var winOnkeyup = ctx.createFoldingText(window.onkeyup, 'winOnkeyup', DebugJS.OMIT_LAST);
    var winOncontextmenu = ctx.createFoldingText(window.oncontextmenu, 'winOncontextmenu', DebugJS.OMIT_LAST);
    var winOnresize = ctx.createFoldingText(window.oncontextmenu, 'winOnresize', DebugJS.OMIT_LAST);
    var winOnscroll = ctx.createFoldingText(window.oncontextmenu, 'winOnscroll', DebugJS.OMIT_LAST);
    var winOnselect = ctx.createFoldingText(window.oncontextmenu, 'winOnselect', DebugJS.OMIT_LAST);
    var winOnselectstart = ctx.createFoldingText(window.oncontextmenu, 'winOnselectstart', DebugJS.OMIT_LAST);
    var winOnerror = ctx.createFoldingText(window.onerror, 'winOnerror', DebugJS.OMIT_LAST);
    var docOnclick = ctx.createFoldingText(document.onclick, 'documentOnclick', DebugJS.OMIT_LAST);
    var docOnmousedown = ctx.createFoldingText(document.onmousedown, 'documentOnmousedown', DebugJS.OMIT_LAST);
    var docOnmousemove = ctx.createFoldingText(document.onmousemove, 'documentOnmousemove', DebugJS.OMIT_LAST);
    var docOnmouseup = ctx.createFoldingText(document.onmousedown, 'documentOnmouseup', DebugJS.OMIT_LAST);
    var docOnkeydown = ctx.createFoldingText(document.onkeydown, 'documentOnkeydown', DebugJS.OMIT_LAST);
    var docOnkeypress = ctx.createFoldingText(document.onkeypress, 'documentOnkeypress', DebugJS.OMIT_LAST);
    var docOnkeyup = ctx.createFoldingText(document.onkeyup, 'documentOnkeyup', DebugJS.OMIT_LAST);
    var docOnselectstart = ctx.createFoldingText(document.onselectstart, 'documentOnselectstart', DebugJS.OMIT_LAST);
    var docOncontextmenu = ctx.createFoldingText(document.oncontextmenu, 'documentOncontextmenu', DebugJS.OMIT_LAST);

    var lsKeys = '';
    if (DebugJS.LS_AVAILABLE) {
      for (i = 0; i < localStorage.length; i++) {
        if (i == 0) {
          lsKeys += '(' + i + ') = ' + localStorage.key(i);
        } else {
          lsKeys += '\n    (' + i + ') = ' + localStorage.key(i);
        }
      }
    }

    var ssKeys = '';
    if (DebugJS.SS_AVAILABLE) {
      for (i = 0; i < sessionStorage.length; i++) {
        if (i == 0) {
          ssKeys += '(' + i + ') = ' + sessionStorage.key(i);
        } else {
          ssKeys += '\n    (' + i + ') = ' + sessionStorage.key(i);
        }
      }
    }

    var html = '<pre>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">screen.</span>     : ' + screenSize + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">Browser</span>     : ' + DebugJS.browserColoring(browser.name) + ' ' + browser.version + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">navigator.</span>\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> userAgent</span>  : ' + navUserAgent + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> language</span>       : ' + DebugJS.setStyleIfObjNotAvailable(navigator.language) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> browserLanguage</span>: ' + DebugJS.setStyleIfObjNotAvailable(navigator.browserLanguage) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> userLanguage</span>   : ' + DebugJS.setStyleIfObjNotAvailable(navigator.userLanguage) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> languages</span>      : ' + languages + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">charset</span>: ' + charset + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">jQuery</span> : ' + jq + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">css</span>    : ' + loadedStyles + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">script</span> : ' + loadedScripts + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">navigator.</span>\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> appCodeName</span>  : ' + DebugJS.setStyleIfObjNotAvailable(navigator.appCodeName) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> appName</span>      : ' + DebugJS.setStyleIfObjNotAvailable(navigator.appName) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> appVersion</span>   : ' + navAppVersion + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> buildID</span>      : ' + DebugJS.setStyleIfObjNotAvailable(navigator.buildID) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> product </span>     : ' + DebugJS.setStyleIfObjNotAvailable(navigator.product) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> productSub</span>   : ' + DebugJS.setStyleIfObjNotAvailable(navigator.productSub) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> vendor</span>       : ' + DebugJS.setStyleIfObjNotAvailable(navigator.vendor) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> platform</span>     : ' + DebugJS.setStyleIfObjNotAvailable(navigator.platform) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> oscpu</span>        : ' + DebugJS.setStyleIfObjNotAvailable(navigator.oscpu) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> cookieEnabled</span>: ' + navigator.cookieEnabled + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">window.</span>\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onload</span>       : ' + winOnload + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onunload</span>     : ' + winOnunload + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onclick</span>      : ' + winOnclick + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmousedown</span>  : ' + winOnmousedown + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmousemove</span>  : ' + winOnmousemove + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmouseup</span>    : ' + winOnmouseup + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeydown</span>    : ' + winOnkeydown + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeypress</span>   : ' + winOnkeypress + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeyup</span>      : ' + winOnkeyup + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onresize</span>     : ' + winOnresize + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onscroll</span>     : ' + winOnscroll + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onselect</span>     : ' + winOnselect + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onselectstart</span>: ' + winOnselectstart + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> oncontextmenu</span>: ' + winOncontextmenu + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onerror</span>      : ' + winOnerror + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">document.</span>\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onclick</span>      : ' + docOnclick + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmousedown</span>  : ' + docOnmousedown + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmousemove</span>  : ' + docOnmousemove + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onmouseup</span>    : ' + docOnmouseup + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeydown</span>    : ' + docOnkeydown + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeypress</span>   : ' + docOnkeypress + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onkeyup</span>      : ' + docOnkeyup + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> onselectstart</span>: ' + docOnselectstart + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> oncontextmenu</span>: ' + docOncontextmenu + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> location</span> : ' + ctx.createFoldingText(document.location, 'docLocation' + i, DebugJS.OMIT_MID) + '\n' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> baseURI</span>  : ' + ctx.createFoldingText(document.baseURI, 'docBaseURL' + i, DebugJS.OMIT_MID) + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">localStorage.</span>\n';
    if (DebugJS.LS_AVAILABLE) {
      html += '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> key</span>' + lsKeys + '\n';
    } else {
      html += ' <span class="' + ctx.id + '-na">undefined</span>';
    }
    html += '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">sessionStorage.</span>\n';
    if (DebugJS.SS_AVAILABLE) {
      html += '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '"> key</span>' + ssKeys + '\n';
    } else {
      html += ' <span class="' + ctx.id + '-na">undefined</span>';
    }
    html += '<div class="' + ctx.id + '-separator"></div>' +
    '<span style="color:' + DebugJS.ITEM_NAME_COLOR + '">document.cookie</span>: ' + ctx.createFoldingText(document.cookie, 'cookie', DebugJS.OMIT_MID) + '\n' +
    '<div class="' + ctx.id + '-separator"></div>' +
    '</pre>';
    ctx.sysInfoPanelBody.innerHTML = html;
  },

  getLanguages: function(indent) {
    var ctx = DebugJS.ctx;
    var languages;
    var navLangs = navigator.languages;
    if (navLangs) {
      for (var i = 0; i < navLangs.length; i++) {
        if (i == 0) {
          languages = '[' + i + '] ' + navLangs[i];
        } else {
          languages += '\n' + indent + '[' + i + '] ' + navLangs[i];
        }
      }
    } else {
      languages = DebugJS.setStyleIfObjNotAvailable(navLangs);
    }
    return languages;
  },

  showHideByName: function(name) {
    var ctx = DebugJS.ctx;
    var btn = document.getElementById(ctx.id + '-' + name + '__button');
    var partialBody = document.getElementById(ctx.id + '-' + name + '__partial-body');
    var body = document.getElementById(ctx.id + '-' + name + '__body');
    if ((body) && ((!body.style.display) || (body.style.display == 'none'))) {
      btn.innerHTML = DebugJS.CLOSEBTN;
      partialBody.style.display = 'none';
      body.style.display = 'block';
      if (ctx.elmInfoShowHideStatus[name] != undefined) {
        ctx.elmInfoShowHideStatus[name] = true;
      }
    } else {
      btn.innerHTML = DebugJS.EXPANDBTN;
      partialBody.style.display = 'inline';
      body.style.display = 'none';
      if (ctx.elmInfoShowHideStatus[name] != undefined) {
        ctx.elmInfoShowHideStatus[name] = false;
      }
    }
  },

  createFoldingText: function(obj, name, omitpart, lineMaxLen, style, show) {
    var ctx = DebugJS.ctx;
    var DEFAULT_MAX_LEN = 50;
    var foldingText;
    if (lineMaxLen == undefined) lineMaxLen = DEFAULT_MAX_LEN;
    if (!style) style = 'color:#aaa';
    if (!obj) {
      foldingText = '<span class="' + ctx.id + '-na">' + obj + '</span>';
    } else {
      var btn = DebugJS.EXPANDBTN;
      var partDisplay = 'inline';
      var bodyDisplay = 'none';
      if (show) {
        btn = DebugJS.CLOSEBTN;
        partDisplay = 'none';
        bodyDisplay = 'block';
      }
      foldingText = obj + '';
      if ((foldingText.indexOf('\n') >= 1) || (foldingText.length > lineMaxLen)) {
        partial = DebugJS.trimDownText2(foldingText, lineMaxLen, omitpart, style);
        foldingText = '<span class="' + ctx.id + '-showhide-btn ' + ctx.id + '-nomove" id="' + ctx.id + '-' + name + '__button" onclick="DebugJS.ctx.showHideByName(\'' + name + '\')">' + btn + '</span> ' +
        '<span id="' + ctx.id + '-' + name + '__partial-body" style="display:' + partDisplay + '">' + partial + '</span>' +
        '<div style="display:' + bodyDisplay + '" id="' + ctx.id + '-' + name + '__body">' + obj + '</div>';
      } else {
        foldingText = obj;
      }
    }
    return foldingText;
  },

  toggleElmInfoMode: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_ELEMENT_INSPECTING) {
      ctx.disableElmInfo();
    } else {
      ctx.enableElmInfo();
    }
  },

  enableElmInfo: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.STATE_ELEMENT_INSPECTING;
    if (ctx.elmInfoPanel == null) {
      ctx.elmInfoPanel = document.createElement('div');
      if (DebugJS.ELM_INFO_FULL_OVERLAY) {
        ctx.elmInfoPanel.className = ctx.id + '-overlay-panel-full';
        ctx.addOverlayPanelFull(ctx.elmInfoPanel);
      } else {
        ctx.elmInfoPanel.className = ctx.id + '-overlay-panel';
        ctx.addOverlayPanel(ctx.elmInfoPanel);
        ctx.expandHightIfNeeded(ctx.windowExpandHeight);
      }

      ctx.elmInfoHeaderPanel = document.createElement('div');
      ctx.elmInfoPanel.appendChild(ctx.elmInfoHeaderPanel);

      ctx.elmPrevBtn = ctx.createElmInfoHeadButton('<<', DebugJS.ctx.showPrevElem);
      ctx.elmPrevBtn.style.color = DebugJS.COLOR_INACTIVE;

      ctx.elmTitle = document.createElement('span');
      ctx.elmTitle.style.marginLeft = '4px';
      ctx.elmTitle.style.marginRight = '4px';
      ctx.elmTitle.style.color = DebugJS.DOM_BTN_COLOR;
      ctx.elmTitle.innerText = 'ELEMENT INFO';
      ctx.elmInfoHeaderPanel.appendChild(ctx.elmTitle);

      ctx.elmNextBtn = ctx.createElmInfoHeadButton('>>', DebugJS.ctx.showNextElem);
      ctx.elmNextBtn.style.color = DebugJS.COLOR_INACTIVE;

      ctx.elmSelectBtn = ctx.createElmInfoHeadButton('SELECT', DebugJS.ctx.toggleElmSelectMode);
      ctx.elmSelectBtn.style.marginLeft = '8px';
      ctx.elmSelectBtn.style.marginRight = '4px';

      ctx.elmHighlightBtn = ctx.createElmInfoHeadButton('HIGHLIGHT', DebugJS.ctx.toggleElmHighlightMode);
      ctx.elmHighlightBtn.style.marginLeft = '4px';
      ctx.elmHighlightBtn.style.marginRight = '4px';

      ctx.elmUpdateBtn = ctx.createElmInfoHeadButton('UPDATE', DebugJS.ctx.updateElementInfo);
      ctx.elmUpdateBtn.style.marginLeft = '4px';
      ctx.elmUpdateBtn.style.color = DebugJS.COLOR_INACTIVE;

      var UPDATE_COLOR = '#ccc';
      ctx.elmUpdateInputLabel = document.createElement('span');
      ctx.elmUpdateInputLabel.style.marginRight = '0px';
      ctx.elmUpdateInputLabel.style.color = UPDATE_COLOR;
      ctx.elmUpdateInputLabel.innerText = ':';
      ctx.elmInfoHeaderPanel.appendChild(ctx.elmUpdateInputLabel);

      ctx.elmUpdateInput = ctx.createTextInput('30px', 'right', UPDATE_COLOR, ctx.elmUpdateInterval, DebugJS.ctx.onchangeElmUpdateInterval);
      ctx.elmInfoHeaderPanel.appendChild(ctx.elmUpdateInput);

      ctx.elmUpdateInputLabel2 = document.createElement('span');
      ctx.elmUpdateInputLabel2.style.marginLeft = '2px';
      ctx.elmUpdateInputLabel2.style.color = UPDATE_COLOR;
      ctx.elmUpdateInputLabel2.innerText = 'ms';
      ctx.elmInfoHeaderPanel.appendChild(ctx.elmUpdateInputLabel2);

      ctx.elmNumPanel = document.createElement('span');
      ctx.elmNumPanel.style.float = 'right';
      ctx.elmNumPanel.style.marginRight = '4px';
      ctx.elmInfoHeaderPanel.appendChild(ctx.elmNumPanel);
      ctx.updateElementInfoInterval();

      ctx.elmCapBtn = ctx.createElmInfoHeadButton('CAPTURE', DebugJS.ctx.exportTargetElm);
      ctx.elmCapBtn.style.float = 'right';
      ctx.elmCapBtn.style.marginRight = '4px';
      ctx.elmCapBtn.style.color = DebugJS.COLOR_INACTIVE;

      ctx.elmInfoBodyPanel = document.createElement('div');
      ctx.elmInfoBodyPanel.style.width = '100%';
      ctx.elmInfoBodyPanel.style.height = 'calc(100% - 1.3em)';
      ctx.elmInfoBodyPanel.style.overflow = 'auto';
      ctx.elmInfoPanel.appendChild(ctx.elmInfoBodyPanel);
    }
    ctx.updateElmInfoBtn();
    ctx.updateElmSelectBtn();
    ctx.updateElmHighlightBtn();
  },

  createElmInfoHeadButton: function(label, handler) {
    var ctx = DebugJS.ctx;
    var btn = document.createElement('span');
    btn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
    btn.onclick = handler;
    btn.innerText = label;
    ctx.elmInfoHeaderPanel.appendChild(btn);
    return btn;
  },

  disableElmInfo: function() {
    var ctx = DebugJS.ctx;
    if (ctx.targetElm) {
      DebugJS.removeClass(ctx.targetElm, ctx.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX);
      ctx.targetElm = null;
    }
    if (ctx.elmInfoPanel != null) {
      if (DebugJS.ELM_INFO_FULL_OVERLAY) {
        ctx.removeOverlayPanelFull(ctx.elmInfoPanel);
      } else {
        ctx.removeOverlayPanel(ctx.elmInfoPanel);
        ctx.resetExpandedHeightIfNeeded();
      }
      ctx.elmInfoPanel = null;
      ctx.elmInfoBodyPanel = null;
      ctx.elmNumPanel = null;
    }
    ctx.updateTargetElm(null);
    ctx.status &= ~DebugJS.STATE_ELEMENT_INSPECTING;
    ctx.updateElmInfoBtn();
  },

  inspectElement: function(e) {
    var ctx = DebugJS.ctx;
    if (!(ctx.elmInfoStatus & DebugJS.ELMINFO_STATE_SELECT)) {
      return;
    }
    var posX = e.clientX;
    var posY = e.clientY;
    if (ctx.isOnDebugWindow(posX, posY)) return;
    var el = document.elementFromPoint(posX, posY);
    if (el != ctx.targetElm) {
      ctx.showElementInfo(el);
      ctx.updateTargetElm(el);
    }
  },

  showElementInfo: function(el) {
    if (!el) return;
    var ctx = DebugJS.ctx;
    var OMIT_STYLE = 'color:#888';
    var OMIT_STYLE2 = 'color:#666';
    var html = '<pre>';
    if (el && el.tagName) {
      DebugJS.dom = el;
      var computedStyle = window.getComputedStyle(el);
      var rect = el.getBoundingClientRect();
      var MAX_LEN = 50;
      var text = '';
      if ((el.tagName != 'HTML') && (el.tagName != 'BODY')) {
        if (el.tagName == 'META') {
          text = DebugJS.escTag(el.outerHTML);
        } else {
          text = DebugJS.escTag(el.innerText);
        }
      }
      var txt = ctx.createFoldingText(text, 'text', DebugJS.OMIT_LAST, MAX_LEN, OMIT_STYLE, ctx.elmInfoShowHideStatus['text']);
      var className = el.className;
      className = className.replace(ctx.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX, '<span style="' + OMIT_STYLE2 + '">' + ctx.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX + '</span>');

      var href = (el.href ? ctx.createFoldingText(el.href, 'elHref', DebugJS.OMIT_MID, MAX_LEN, OMIT_STYLE) : DebugJS.setStyleIfObjNotAvailable(el.href));
      var src = (el.src ? ctx.createFoldingText(el.src, 'elSrc', DebugJS.OMIT_MID, MAX_LEN, OMIT_STYLE) : DebugJS.setStyleIfObjNotAvailable(el.src));

      var backgroundColor = computedStyle.backgroundColor;
      var bgColor16 = '';
      if (backgroundColor != 'transparent') {
        var bgColor10 = backgroundColor.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var bgColor16cnv = DebugJS.convRGB10to16(bgColor10);
        bgColor16 = '#' + bgColor16cnv.r + bgColor16cnv.g + bgColor16cnv.b;
      }

      var color = computedStyle.color;
      var color10 = color.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
      var color16cnv = DebugJS.convRGB10to16(color10);
      var color16 = '#' + color16cnv.r + color16cnv.g + color16cnv.b;

      var borderColorT16 = '';
      var borderColorT = computedStyle.borderTopColor;
      if (borderColorT) {
        var borderColorT10 = borderColorT.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var borderColorT16cnv = DebugJS.convRGB10to16(borderColorT10);
        borderColorT16 = '#' + borderColorT16cnv.r + borderColorT16cnv.g + borderColorT16cnv.b;
      }

      var borderColorL16 = '';
      var borderColorL = computedStyle.borderLeftColor;
      if (borderColorL) {
        var borderColorL10 = borderColorL.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var borderColorL16cnv = DebugJS.convRGB10to16(borderColorL10);
        borderColorL16 = '#' + borderColorL16cnv.r + borderColorL16cnv.g + borderColorL16cnv.b;
      }

      var borderColorR16 = '';
      var borderColorR = computedStyle.borderRightColor;
      if (borderColorR) {
        var borderColorR10 = borderColorR.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var borderColorR16cnv = DebugJS.convRGB10to16(borderColorR10);
        borderColorR16 = '#' + borderColorR16cnv.r + borderColorR16cnv.g + borderColorR16cnv.b;
      }

      var borderColorB16 = '';
      var borderColorB = computedStyle.borderBottomColor;
      if (borderColorB) {
        var borderColorB10 = borderColorB.replace('rgba', '').replace('rgb', '').replace('(', '').replace(')', '').replace(',', '');
        var borderColorB16cnv = DebugJS.convRGB10to16(borderColorB10);
        borderColorB16 = '#' + borderColorB16cnv.r + borderColorB16cnv.g + borderColorB16cnv.b;
      }

      var borderT = 'top   : ' + computedStyle.borderTopWidth + ' ' + computedStyle.borderTopStyle + ' ' + computedStyle.borderTopColor + ' ' + borderColorT16 + ' <span style="background:' + borderColorT + ';width:6px;height:12px;display:inline-block"> </span>';
      var borderLRB = '            left  : ' + computedStyle.borderLeftWidth + ' ' + computedStyle.borderLeftStyle + ' ' + computedStyle.borderLeftColor + ' ' + borderColorL16 + ' <span style="background:' + borderColorL + ';width:6px;height:12px;display:inline-block"> </span>\n' +
      '            right : ' + computedStyle.borderRightWidth + ' ' + computedStyle.borderRightStyle + ' ' + computedStyle.borderRightColor + ' ' + borderColorR16 + ' <span style="background:' + borderColorR + ';width:6px;height:12px;display:inline-block"> </span>\n' +
      '            bottom: ' + computedStyle.borderBottomWidth + ' ' + computedStyle.borderBottomStyle + ' ' + computedStyle.borderBottomColor + ' ' + borderColorB16 + ' <span style="background:' + borderColorB + ';width:6px;height:12px;display:inline-block"> </span>';

      var allStyles = '';
      var LEADING_INDENT = '           ';
      var MIN_KEY_LEN = 20;
      for (var key in computedStyle) {
        if (!(key.match(/^\d.*/))) {
          if (typeof computedStyle[key] != 'function') {
            var indent = '';
            if (key.length < MIN_KEY_LEN) {
              for (var i = 0; i < (MIN_KEY_LEN - key.length); i++) {
                indent += ' ';
              }
            }
            allStyles += ' ' + key + indent + ': ' + computedStyle[key] + '\n';
          }
        }
      }
      allStylesFolding = ctx.createFoldingText(allStyles, 'allStyles', DebugJS.OMIT_LAST, 0, OMIT_STYLE, ctx.elmInfoShowHideStatus['allStyles']);
      var name = (el.name == undefined) ? DebugJS.setStyleIfObjNotAvailable(el.name) : DebugJS.escTag(el.name);
      var val = (el.value == undefined) ? DebugJS.setStyleIfObjNotAvailable(el.value) : DebugJS.escapeSpclChr(el.value);

      html += '<span style="color:#8f0;display:inline-block;height:14px">#text</span> ' + txt + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'object    : ' + Object.prototype.toString.call(el) + '\n' +
      'tag       : &lt;' + el.tagName + (el.type ? ' type="' + el.type + '"' : '') + '&gt;\n' +
      'id        : ' + el.id + '\n' +
      'class     : ' + className + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'display   : ' + computedStyle.display + '\n' +
      'position  : ' + computedStyle.position + '\n' +
      'z-index   : ' + computedStyle.zIndex + '\n' +
      'float     : ' + computedStyle.cssFloat + ' / clear: ' + computedStyle.clear + '\n' +
      'margin    : ' + computedStyle.marginTop + ' ' + computedStyle.marginRight + ' ' + computedStyle.marginBottom + ' ' + computedStyle.marginLeft + '\n' +
      'border    : ' + borderT + ' ' + ctx.createFoldingText(borderLRB, 'elBorder', DebugJS.OMIT_LAST, 0, OMIT_STYLE, ctx.elmInfoShowHideStatus['elBorder']) + '\n' +
      'padding   : ' + computedStyle.paddingTop + ' ' + computedStyle.paddingRight + ' ' + computedStyle.paddingBottom + ' ' + computedStyle.paddingLeft + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'bg-color  : ' + backgroundColor + ' ' + bgColor16 + ' <span style="background:' + backgroundColor + ';width:6px;height:12px;display:inline-block"> </span>\n' +
      'color     : ' + color + ' ' + color16 + ' <span style="background:' + color + ';width:6px;height:12px;display:inline-block"> </span>\n' +
      'font      : size  : ' + computedStyle.fontSize + '\n' +
      '            family: ' + computedStyle.fontFamily + '\n' +
      '            weight: ' + computedStyle.fontWeight + '\n' +
      '            style : ' + computedStyle.fontStyle + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'size      : W:' + el.clientWidth + ' x H:' + el.clientHeight + ' px\n' +
      'location  : <span style="color:#aaa">winOffset + pageOffset = pos (computedStyle)</span>\n' +
      '            top   : ' + Math.round(rect.top) + ' + ' + window.pageYOffset + ' = ' + Math.round(rect.top + window.pageYOffset) + ' px (' + computedStyle.top + ')\n' +
      '            left  : ' + Math.round(rect.left) + ' + ' + window.pageXOffset + ' = ' + Math.round(rect.left + window.pageXOffset) + ' px (' + computedStyle.left + ')\n' +
      '            right : ' + Math.round(rect.right) + ' + ' + window.pageXOffset + ' = ' + Math.round(rect.right + window.pageXOffset) + ' px (' + computedStyle.right + ')\n' +
      '            bottom: ' + Math.round(rect.bottom) + ' + ' + window.pageYOffset + ' = ' + Math.round(rect.bottom + window.pageYOffset) + ' px (' + computedStyle.bottom + ')\n' +
      'scroll    : top = ' + el.scrollTop + ' / left = ' + el.scrollLeft + '\n' +
      'overflow  : ' + computedStyle.overflow + '\n' +
      'opacity   : ' + computedStyle.opacity + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'All Styles: window.getComputedStyle(element) ' + allStylesFolding + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'name      : ' + name + '\n' +
      'value     : ' + ctx.createFoldingText(val, 'elValue', DebugJS.OMIT_LAST, MAX_LEN, OMIT_STYLE) + '\n' +
      'tabIndex  : ' + el.tabIndex + '\n' +
      'accessKey : ' + el.accessKey + '\n' +
      'disabled  : ' + DebugJS.setStyleIfObjNotAvailable(el.disabled, true) + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'href      : ' + href + '\n' +
      'src       : ' + src + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'onclick      : ' + ctx.getEventHandlerString(el.onclick, 'elOnclick') + '\n' +
      'ondblclick   : ' + ctx.getEventHandlerString(el.ondblclick, 'elOnDblClick') + '\n' +
      'onmousedown  : ' + ctx.getEventHandlerString(el.onmousedown, 'elOnMouseDown') + '\n' +
      'onmouseup    : ' + ctx.getEventHandlerString(el.onmouseup, 'elOnMouseUp') + '\n' +
      'onmouseover  : ' + ctx.getEventHandlerString(el.onmouseover, 'elOnMouseOver') + '\n' +
      'onmouseout   : ' + ctx.getEventHandlerString(el.onmouseout, 'elOnMouseOut') + '\n' +
      'onmousemove  : ' + ctx.getEventHandlerString(el.onmousemove, 'elOnMouseMove') + '\n' +
      'oncontextmenu: ' + ctx.getEventHandlerString(el.oncontextmenu, 'elOnContextmenu') + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'onkeydown    : ' + ctx.getEventHandlerString(el.onkeydown, 'elOnKeyDown') + '\n' +
      'onkeypress   : ' + ctx.getEventHandlerString(el.onkeypress, 'elOnKeyPress') + '\n' +
      'onkeyup      : ' + ctx.getEventHandlerString(el.onkeyup, 'elOnKeyUp') + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'onfocus      : ' + ctx.getEventHandlerString(el.onfocus, 'elOnFocus') + '\n' +
      'onblur       : ' + ctx.getEventHandlerString(el.onblur, 'elOnBlur') + '\n' +
      'onchange     : ' + ctx.getEventHandlerString(el.onchange, 'elOnChange') + '\n' +
      'oninput      : ' + ctx.getEventHandlerString(el.oninput, 'elOnInput') + '\n' +
      'onselect     : ' + ctx.getEventHandlerString(el.onselect, 'elOnSelect') + '\n' +
      'onselectstart: ' + ctx.getEventHandlerString(el.onselectstart, 'elOnSelectStart') + '\n' +
      'onsubmit     : ' + ctx.getEventHandlerString(el.onsubmit, 'elOnSubmit') + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'onscroll     : ' + ctx.getEventHandlerString(el.onscroll, 'elOnScroll') + '\n' +
      '<div class="' + ctx.id + '-separator"></div>' +
      'dataset (data-*):\n';
      if (el.dataset) {
        html += '{' + ((Object.keys(el.dataset).length > 0) ? '\n' : '');
        for (var data in el.dataset) {
          html += ' ' + data + ': ' + el.dataset[data] + '\n';
        }
        html += '}';
      } else {
        html += '<span style="color:#aaa">' + el.dataset + '</span>';
      }

      var htmlSrc = el.outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      htmlSrc = ctx.createFoldingText(htmlSrc, 'htmlSrc', DebugJS.OMIT_LAST, 0, OMIT_STYLE, ctx.elmInfoShowHideStatus['htmlSrc']);
      html += '<div class="' + ctx.id + '-separator"></div>' +
      'outerHTML: ' + htmlSrc;
    }
    html += '</pre>';
    ctx.elmInfoBodyPanel.innerHTML = html;

    ctx.showAllElmNum();
  },

  showPrevElem: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.targetElm) return;
    var el = ctx.targetElm.previousElementSibling;
    if ((el != null) && (el.id == ctx.id)) {
      el = ctx.targetElm.previousElementSibling;
    }
    if (el == null) {
      el = ctx.targetElm.parentNode;
    } else {
      if (el.childElementCount > 0) {
        var lastChild = el.lastElementChild;
        while (lastChild.childElementCount > 0) {
          lastChild = lastChild.lastElementChild;
        }
        el = lastChild;
      }
    }
    if (el) {
      if (!(el instanceof HTMLDocument)) {
        ctx.showElementInfo(el);
        ctx.updateTargetElm(el);
      }
    }
  },

  showNextElem: function() {
    var ctx = DebugJS.ctx;
    if (!ctx.targetElm) return;
    var el = ctx.targetElm.firstElementChild;
    if ((el == null) || ((el != null) && (el.id == ctx.id))) {
      el = ctx.targetElm.nextElementSibling;
      if (el == null) {
        var parentNode = ctx.targetElm.parentNode;
        if (parentNode) {
          do {
            el = parentNode.nextElementSibling;
            if ((el != null) && (el.id != ctx.id)) {
              break;
            }
            parentNode = parentNode.parentNode;
          } while ((parentNode != null) && (parentNode.tagName != 'HTML'));
        }
      }
    }
    if (el) {
      ctx.showElementInfo(el);
      ctx.updateTargetElm(el);
    }
  },

  updateTargetElm: function(el) {
    var ctx = DebugJS.ctx;
    if (ctx.elmInfoStatus & DebugJS.ELMINFO_STATE_HIGHLIGHT) {
      ctx.highlightElement(ctx.targetElm, el);
    }
    if (el) {
      ctx.targetElm = el;
      ctx.elmPrevBtn.style.color = ctx.options.btnColor;
      ctx.elmNextBtn.style.color = ctx.options.btnColor;
      ctx.elmUpdateBtn.style.color = ctx.options.btnColor;
      ctx.elmCapBtn.style.color = ctx.options.btnColor;
    }
  },

  highlightElement: function(removeTarget, setTarget) {
    var ctx = DebugJS.ctx;
    if (removeTarget) {
      DebugJS.removeClass(removeTarget, ctx.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX);
    }
    if (setTarget) {
      DebugJS.addClass(setTarget, ctx.id + DebugJS.ELM_HIGHLISGHT_CLASS_SUFFIX);
    }
  },

  updateElementInfo: function() {
    var ctx = DebugJS.ctx;
    ctx.showAllElmNum();
    ctx.showElementInfo(ctx.targetElm);
  },

  showAllElmNum: function() {
    var ctx = DebugJS.ctx;
    ctx.elmNumPanel.innerHTML = '(All: ' + document.getElementsByTagName('*').length + ')';
  },

  onchangeElmUpdateInterval: function() {
    var ctx = DebugJS.ctx;
    var interval = ctx.elmUpdateInput.value;
    if (interval == '') {
      interval = 0;
    }
    if (isFinite(interval)) {
      ctx.elmUpdateInterval = interval;
      clearTimeout(ctx.elmUpdateTimerId);
      ctx.elmUpdateTimerId = setTimeout(ctx.updateElementInfoInterval, ctx.elmUpdateInterval);
    }
  },

  updateElementInfoInterval: function() {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.STATE_ELEMENT_INSPECTING)) {
      return;
    }
    ctx.updateElementInfo();
    if (ctx.elmUpdateInterval > 0) {
      ctx.elmUpdateTimerId = setTimeout(ctx.updateElementInfoInterval, ctx.elmUpdateInterval);
    }
  },

  toggleElmSelectMode: function() {
    var ctx = DebugJS.ctx;
    if (ctx.elmInfoStatus & DebugJS.ELMINFO_STATE_SELECT) {
      ctx.elmInfoStatus &= ~DebugJS.ELMINFO_STATE_SELECT;
    } else {
      ctx.elmInfoStatus |= DebugJS.ELMINFO_STATE_SELECT;
    }
    ctx.updateElmSelectBtn();
  },

  updateElmSelectBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.elmSelectBtn.style.color = (ctx.elmInfoStatus & DebugJS.ELMINFO_STATE_SELECT) ? ctx.options.btnColor : DebugJS.COLOR_INACTIVE;
  },

  toggleElmHighlightMode: function() {
    var ctx = DebugJS.ctx;
    if (ctx.elmInfoStatus & DebugJS.ELMINFO_STATE_HIGHLIGHT) {
      ctx.elmInfoStatus &= ~DebugJS.ELMINFO_STATE_HIGHLIGHT;
      ctx.highlightElement(ctx.targetElm, null);
    } else {
      ctx.elmInfoStatus |= DebugJS.ELMINFO_STATE_HIGHLIGHT;
      ctx.highlightElement(null, ctx.targetElm);
    }
    ctx.updateElmHighlightBtn();
  },

  updateElmHighlightBtn: function() {
    var ctx = DebugJS.ctx;
    ctx.elmHighlightBtn.style.color = (ctx.elmInfoStatus & DebugJS.ELMINFO_STATE_HIGHLIGHT) ? ctx.options.btnColor : DebugJS.COLOR_INACTIVE;
  },

  exportTargetElm: function() {
    if (DebugJS.ctx.targetElm) {
      DebugJS.ctx.captureElm(DebugJS.ctx.targetElm);
    }
  },

  captureElm: function(elm) {
    DebugJS.el = elm;
    if (DebugJS._AVAILABLE) _ = DebugJS.el;
    DebugJS.log.s('&lt;' + DebugJS.el.tagName + '&gt; object has been exported to <span style="color:' + DebugJS.KEYWORD_COLOR + '">' + ((dbg == DebugJS) ? 'dbg' : 'DebugJS') + '.el</span>' + (DebugJS._AVAILABLE ? ', <span style="color:' + DebugJS.KEYWORD_COLOR + '">_</span>' : ''));
  },

  getEventHandlerString: function(handler, name) {
    var ctx = DebugJS.ctx;
    var MAX_LEN = 300;
    var str = '';
    if (handler) {
      str = handler.toString();
      str = str.replace(/\n/g, '');
      str = str.replace(/[^.]{1,}\{/, '');
      str = str.replace(/\}$/, '');
      str = str.replace(/^\s{1,}/, '');
    } else {
      str = '<span style="color:#aaa">null</span>';
    }
    str = ctx.createFoldingText(str, name, DebugJS.OMIT_LAST, MAX_LEN, 'color:#888');
    return str;
  },

  toggleHtmlSrcMode: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_HTML_SRC) {
      ctx.disableHtmlSrc();
    } else {
      ctx.enableHtmlSrc();
    }
  },

  enableHtmlSrc: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.STATE_HTML_SRC;
    if (ctx.htmlSrcPanel == null) {
      ctx.htmlSrcPanel = document.createElement('div');
      if (DebugJS.HTML_SRC_FULL_OVERLAY) {
        ctx.htmlSrcPanel.className = ctx.id + '-overlay-panel-full';
        ctx.addOverlayPanelFull(ctx.htmlSrcPanel);
      } else {
        ctx.htmlSrcPanel.className = ctx.id + '-overlay-panel';
        ctx.addOverlayPanel(ctx.htmlSrcPanel);
      }
      ctx.expandHightIfNeeded(ctx.windowExpandHeight);

      ctx.htmlSrcHeaderPanel = document.createElement('div');
      ctx.htmlSrcPanel.appendChild(ctx.htmlSrcHeaderPanel);

      ctx.htmlSrcTitle = document.createElement('span');
      ctx.htmlSrcTitle.style.color = DebugJS.HTML_BTN_COLOR;
      ctx.htmlSrcTitle.innerText = 'HTML SOURCE';
      ctx.htmlSrcHeaderPanel.appendChild(ctx.htmlSrcTitle);

      var UPDATE_COLOR = '#fff';
      ctx.htmlSrcUpdateInputLabel2 = document.createElement('span');
      ctx.htmlSrcUpdateInputLabel2.style.float = 'right';
      ctx.htmlSrcUpdateInputLabel2.style.marginLeft = '2px';
      ctx.htmlSrcUpdateInputLabel2.style.color = UPDATE_COLOR;
      ctx.htmlSrcUpdateInputLabel2.innerText = 'ms';
      ctx.htmlSrcHeaderPanel.appendChild(ctx.htmlSrcUpdateInputLabel2);

      ctx.htmlSrcUpdateInput = ctx.createTextInput('50px', 'right', UPDATE_COLOR, ctx.htmlSrcUpdateInterval, DebugJS.ctx.onchangeHtmlSrcUpdateInterval);
      ctx.htmlSrcUpdateInput.style.float = 'right';
      ctx.htmlSrcHeaderPanel.appendChild(ctx.htmlSrcUpdateInput);

      ctx.htmlSrcUpdateInputLabel = document.createElement('span');
      ctx.htmlSrcUpdateInputLabel.style.float = 'right';
      ctx.htmlSrcUpdateInputLabel.style.color = UPDATE_COLOR;
      ctx.htmlSrcUpdateInputLabel.innerText = ':';
      ctx.htmlSrcHeaderPanel.appendChild(ctx.htmlSrcUpdateInputLabel);

      ctx.htmlSrcUpdateBtn = document.createElement('span');
      ctx.htmlSrcUpdateBtn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
      ctx.htmlSrcUpdateBtn.style.float = 'right';
      ctx.htmlSrcUpdateBtn.style.marginLeft = '4px';
      ctx.htmlSrcUpdateBtn.style.color = ctx.options.btnColor;
      ctx.htmlSrcUpdateBtn.onclick = DebugJS.ctx.showHtmlSrc;
      ctx.htmlSrcUpdateBtn.innerText = 'UPDATE';
      ctx.htmlSrcHeaderPanel.appendChild(ctx.htmlSrcUpdateBtn);

      ctx.htmlSrcBodyPanel = document.createElement('div');
      ctx.htmlSrcBodyPanel.style.width = '100%';
      ctx.htmlSrcBodyPanel.style.height = 'calc(100% - 1.3em)';
      ctx.htmlSrcBodyPanel.style.overflow = 'auto';
      ctx.htmlSrcPanel.appendChild(ctx.htmlSrcBodyPanel);

      ctx.htmlSrcBody = document.createElement('pre');
      ctx.htmlSrcBodyPanel.appendChild(ctx.htmlSrcBody);
    }
    ctx.updateHtmlSrcBtn();
    ctx.showHtmlSrc();
  },

  disableHtmlSrc: function() {
    var ctx = DebugJS.ctx;
    if (ctx.htmlSrcPanel != null) {
      if (DebugJS.HTML_SRC_FULL_OVERLAY) {
        ctx.removeOverlayPanelFull(ctx.htmlSrcPanel);
      } else {
        ctx.removeOverlayPanel(ctx.htmlSrcPanel);
      }
      ctx.resetExpandedHeightIfNeeded();
      ctx.htmlSrcPanel = null;
    }
    ctx.status &= ~DebugJS.STATE_HTML_SRC;
    ctx.updateHtmlSrcBtn();
  },

  showHtmlSrc: function() {
    var ctx = DebugJS.ctx;
    ctx.htmlSrcBodyPanel.removeChild(ctx.htmlSrcBody);
    var html = document.getElementsByTagName('html')[0].outerHTML.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    ctx.htmlSrcBodyPanel.appendChild(ctx.htmlSrcBody);
    ctx.htmlSrcBody.innerHTML = html;
  },

  onchangeHtmlSrcUpdateInterval: function() {
    var ctx = DebugJS.ctx;
    var interval = ctx.htmlSrcUpdateInput.value;
    if (interval == '') {
      interval = 0;
    }
    if (isFinite(interval)) {
      ctx.htmlSrcUpdateInterval = interval;
      clearTimeout(ctx.htmlSrcUpdateTimerId);
      ctx.htmlSrcUpdateTimerId = setTimeout(ctx.updateHtmlSrcInterval, ctx.htmlSrcUpdateInterval);
    }
  },

  updateHtmlSrcInterval: function() {
    var ctx = DebugJS.ctx;
    if (!(ctx.status & DebugJS.STATE_HTML_SRC)) {
      return;
    }
    ctx.showHtmlSrc();
    if (ctx.htmlSrcUpdateInterval > 0) {
      ctx.elmUpdateTimerId = setTimeout(ctx.updateHtmlSrcInterval, ctx.htmlSrcUpdateInterval);
    }
  },

  toggleToolsMode: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_TOOLS) {
      ctx.disableTools();
    } else {
      ctx.enableTools();
    }
  },

  enableTools: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.STATE_TOOLS;
    var activeFunc = DebugJS.TOOLS_ACTIVE_FNC_TIMER;
    if (ctx.toolsPanel == null) {
      var defaultFontSize = ctx.computedFontSize;
      ctx.toolsPanel = document.createElement('div');
      ctx.toolsPanel.className = ctx.id + '-overlay-panel-full';

      ctx.toolsHeaderPanel = document.createElement('div');
      ctx.toolsHeaderPanel.style.position = 'relative';
      ctx.toolsHeaderPanel.style.height = ctx.computedFontSize + 'px';
      ctx.toolsPanel.appendChild(ctx.toolsHeaderPanel);

      ctx.toolsBodyPanel = document.createElement('div');
      ctx.toolsBodyPanel.style.position = 'relative';
      ctx.toolsBodyPanel.style.height = 'calc(100% - ' + ctx.computedFontSize + 'px)';
      ctx.toolsPanel.appendChild(ctx.toolsBodyPanel);

      ctx.timerBtn = ctx.createToolsHeaderButton('TIMER', 'TOOLS_ACTIVE_FNC_TIMER', 'timerBtn');
      ctx.txtChkBtn = ctx.createToolsHeaderButton('TEXT', 'TOOLS_ACTIVE_FNC_TEXT', 'txtChkBtn');
      ctx.htmlPrevBtn = ctx.createToolsHeaderButton('HTML', 'TOOLS_ACTIVE_FNC_HTML', 'htmlPrevBtn');
      ctx.fileLoaderBtn = ctx.createToolsHeaderButton('FILE', 'TOOLS_ACTIVE_FNC_FILE', 'fileLoaderBtn');
      ctx.memoBtn = ctx.createToolsHeaderButton('MEMO', 'TOOLS_ACTIVE_FNC_MEMO', 'memoBtn');

      ctx.addOverlayPanelFull(ctx.toolsPanel);
      ctx.switchToolsFunction();
    } else {
      ctx.addOverlayPanelFull(ctx.toolsPanel);
      ctx.resizeImgPreview();
      activeFunc = ctx.toolsActiveFunction;
    }
    ctx.switchToolsFunction(activeFunc);
    ctx.updateToolsButtons();
    ctx.updateToolsBtn();
  },

  createToolsHeaderButton: function(label, state, btnobj) {
    var ctx = DebugJS.ctx;
    var btn = document.createElement('span');
    btn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
    btn.style.marginRight = '4px';
    btn.innerText = '<' + label + '>';
    btn.onclick = new Function('DebugJS.ctx.switchToolsFunction(DebugJS.' + state + ');');
    btn.onmouseover = new Function('DebugJS.ctx.' + btnobj + '.style.color=DebugJS.TOOLS_COLOR_ACTIVE;');
    btn.onmouseout = new Function('DebugJS.ctx.' + btnobj + '.style.color=(DebugJS.ctx.toolsActiveFunction & DebugJS.' + state + ') ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;');
    ctx.toolsHeaderPanel.appendChild(btn);
    return btn;
  },

  disableTools: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolsPanel != null) {
      ctx.removeOverlayPanelFull(ctx.toolsPanel);
    }
    ctx.status &= ~DebugJS.STATE_TOOLS;
    ctx.updateToolsBtn();
    ctx.switchToolsFunction(0);
  },

  updateToolsButtons: function() {
    var ctx = DebugJS.ctx;
    ctx.timerBtn.style.color = (ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_TIMER) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;
    ctx.txtChkBtn.style.color = (ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_TEXT) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;
    ctx.htmlPrevBtn.style.color = (ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_HTML) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;
    ctx.fileLoaderBtn.style.color = (ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_FILE) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;
    ctx.memoBtn.style.color = (ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_MEMO) ? DebugJS.TOOLS_COLOR_ACTIVE : DebugJS.TOOLS_COLOR_INACTIVE;
  },

  switchToolsFunction: function(kind, param) {
    var ctx = DebugJS.ctx;
    if (kind & DebugJS.TOOLS_ACTIVE_FNC_TIMER) {
      ctx.enableTimer();
    } else {
      ctx.disableTimer();
    }
    if (kind & DebugJS.TOOLS_ACTIVE_FNC_TEXT) {
      ctx.enableTextChecker();
    } else {
      ctx.disableTextChecker();
    }
    if (kind & DebugJS.TOOLS_ACTIVE_FNC_HTML) {
      ctx.enableHtmlEditor();
    } else {
      ctx.disableHtmlEditor();
    }
    if (kind & DebugJS.TOOLS_ACTIVE_FNC_FILE) {
      ctx.enableFileLoader(param);
    } else {
      ctx.disableFileLoader();
    }
    if (kind & DebugJS.TOOLS_ACTIVE_FNC_MEMO) {
      ctx.enableMemoEditor();
    } else {
      ctx.disableMemoEditor();
    }
    if (kind) ctx.toolsActiveFunction = kind;
    ctx.updateToolsButtons();
  },

  enableTimer: function() {
    var ctx = DebugJS.ctx;
    if (ctx.timerBasePanel == null) {
      var baseFontSize = ctx.computedFontSize;
      var fontSize = baseFontSize * 6.5;

      ctx.timerBasePanel = document.createElement('div');
      ctx.timerBasePanel.className = ctx.id + '-tools';
      ctx.timerBasePanel.style.fontSize = fontSize + 'px';
      ctx.timerBasePanel.style.lineHeight = '1em';
      ctx.timerBasePanel.style.textAlign = 'center';
      ctx.toolsBodyPanel.appendChild(ctx.timerBasePanel);

      ctx.createTimerClockSubPanel();
      ctx.createTimerStopWatchCuSubPanel();
      ctx.createTimerStopWatchCdSubPanel();
      ctx.createTimerStopWatchCdInpSubPanel();
      if (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING_CD) &&
          !(ctx.toolStatus & DebugJS.TOOL_ST_SW_TIMEUP)) {
        ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_RST;
      }
      ctx.switchTimerMode(ctx.toolTimerMode);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.timerBasePanel);
    }
    ctx.setIntervalH();
  },

  createTimerClockSubPanel: function() {
    var ctx = DebugJS.ctx;
      var fontSize = ctx.computedFontSize;
      ctx.timerClockSubPanel = document.createElement('div');

      var marginB = 20 * ctx.options.zoom;
      ctx.timerClockLabel = document.createElement('div');
      ctx.timerClockLabel.style.marginBottom = marginB + 'px';
      ctx.timerClockSubPanel.appendChild(ctx.timerClockLabel);

      var btns = document.createElement('div');
      btns.style.fontSize = (fontSize * 3) + 'px';
      btns.style.borderTop = 'solid 2px ' + ctx.options.timerLineColor;
      btns.style.lineHeight = (fontSize * 5) + 'px';
      ctx.timerClockSubPanel.appendChild(btns);

      ctx.createTimerButton(btns, 'MODE', ctx.toggleTimerMode);
      ctx.createTimerButton(btns, 'RST', null, true);
      ctx.createTimerButton(btns, '>>', null, true);
  },

  createTimerStopWatchCuSubPanel: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize;
    ctx.timerStopWatchCuSubPanel = document.createElement('div');

    var margin = 40 * ctx.options.zoom;
    ctx.timerStopWatchCuLabel = document.createElement('div');
    ctx.timerStopWatchCuLabel.style.margin = margin + 'px 0';
    ctx.timerStopWatchCuSubPanel.appendChild(ctx.timerStopWatchCuLabel);

    var btns = document.createElement('div');
    btns.style.fontSize = (fontSize * 3) + 'px';
    btns.style.borderTop = 'solid 2px ' + ctx.options.timerLineColor;
    btns.style.lineHeight = (fontSize * 5) + 'px';
    ctx.timerStopWatchCuSubPanel.appendChild(btns);

    ctx.createTimerButton(btns, 'MODE', ctx.toggleTimerMode);
    ctx.createTimerButton(btns, 'RST', ctx.timerResetCu);
    ctx.timerStartStopBtnCu = ctx.createTimerButton(btns, '>>', ctx.startStopTimerStopWatchCu);
  },

  createTimerStopWatchCdSubPanel: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize;
    ctx.timerStopWatchCdSubPanel = document.createElement('div');

    var margin = 40 * ctx.options.zoom;
    ctx.timerStopWatchCdLabel = document.createElement('div');
    ctx.timerStopWatchCdLabel.style.margin = margin + 'px 0';
    ctx.timerStopWatchCdSubPanel.appendChild(ctx.timerStopWatchCdLabel);

    var btns = document.createElement('div');
    btns.style.fontSize = (fontSize * 3) + 'px';
    btns.style.borderTop = 'solid 2px ' + ctx.options.timerLineColor;
    btns.style.lineHeight = (fontSize * 5) + 'px';
    ctx.timerStopWatchCdSubPanel.appendChild(btns);

    ctx.createTimerButton(btns, 'MODE', ctx.toggleTimerMode);
    ctx.createTimerButton(btns, 'RST', ctx.timerResetCd);
    ctx.timerStartStopBtnCd = ctx.createTimerButton(btns, '>>', ctx.startStopTimerStopWatchCd);
  },

  createTimerStopWatchCdInpSubPanel: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize;
    var baseFontSize = fontSize * 6.5;
    var msFontSize = baseFontSize * 0.65;
    ctx.timerStopWatchCdInpSubPanel = document.createElement('div');

    var timerUpBtns = document.createElement('div');
    timerUpBtns.style.fontSize = (fontSize * 3) + 'px';
    timerUpBtns.style.marginTop = '-' + (fontSize * 1.5) + 'px';
    timerUpBtns.style.marginBottom = '-' + (fontSize * 2.5) + 'px';
    ctx.timerStopWatchCdInpSubPanel.appendChild(timerUpBtns);
    ctx.createTimerUpDwnButton(true, 'hh', timerUpBtns, 3);
    ctx.createTimerUpDwnButton(true, 'mi', timerUpBtns, 3);
    ctx.createTimerUpDwnButton(true, 'ss', timerUpBtns, 2.5);
    ctx.createTimerUpDwnButton(true, 'sss', timerUpBtns);

    ctx.timerStopWatchCdInput = document.createElement('div');
    ctx.timerStopWatchCdInput.style.margin = '0';
    ctx.timerStopWatchCdInpSubPanel.appendChild(ctx.timerStopWatchCdInput);
    ctx.timerTxtHH = ctx.createTimerInput(ctx.timerStopWatchCdInput, ctx.options.timerDefaultVal.hh, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerStopWatchCdInput, ':');
    ctx.timerTxtMI = ctx.createTimerInput(ctx.timerStopWatchCdInput, ctx.options.timerDefaultVal.mi, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerStopWatchCdInput, ':');
    ctx.timerTxtSS = ctx.createTimerInput(ctx.timerStopWatchCdInput, ctx.options.timerDefaultVal.ss, baseFontSize);
    ctx.createTimerInputLabel(ctx.timerStopWatchCdInput, '.', msFontSize);
    ctx.timerTxtSSS = ctx.createTimerInput(ctx.timerStopWatchCdInput, ctx.options.timerDefaultVal.sss, msFontSize, '2em');

    var timerDwnBtns = document.createElement('div');
    timerDwnBtns.style.fontSize = (fontSize * 3) + 'px';
    timerDwnBtns.style.marginTop = '-' + (fontSize * 2.5) + 'px';
    ctx.timerStopWatchCdInpSubPanel.appendChild(timerDwnBtns);
    ctx.createTimerUpDwnButton(false, 'hh', timerDwnBtns, 3);
    ctx.createTimerUpDwnButton(false, 'mi', timerDwnBtns, 3);
    ctx.createTimerUpDwnButton(false, 'ss', timerDwnBtns, 2.5);
    ctx.createTimerUpDwnButton(false, 'sss', timerDwnBtns);

    var btns = document.createElement('div');
    btns.style.fontSize = (fontSize * 3) + 'px';
    btns.style.borderTop = 'solid 2px ' + ctx.options.timerLineColor;
    btns.style.lineHeight = (fontSize * 5) + 'px';
    ctx.timerStopWatchCdInpSubPanel.appendChild(btns);

    ctx.createTimerButton(btns, 'MODE', ctx.toggleTimerMode);
    ctx.createTimerButton(btns, 'RST', ctx.timerResetCd);
    ctx.timerStartStopBtnCdInp = ctx.createTimerButton(btns, '>>', ctx.startStopTimerStopWatchCd);
  },

  createTimerInput: function(base, val, fontSize, width) {
    var ctx = DebugJS.ctx;
    var txt = document.createElement('input');
    txt.className = ctx.id + '-timer-input';
    txt.style.setProperty('font-size', fontSize + 'px', 'important');
    if (width) txt.style.setProperty('width', width, 'important');
    txt.value = val;
    base.appendChild(txt);
    return txt;
  },

  createTimerInputLabel: function(base, label, fontSize) {
    var ctx = DebugJS.ctx;
    var span = document.createElement('span');
    span.innerText = label;
    if (fontSize) span.style.fontSize = fontSize + 'px';
    base.appendChild(span);
  },

  createTimerButton: function(base, label, handler, disabled) {
    var ctx = DebugJS.ctx;
    var btn = document.createElement('span');
    btn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
    btn.style.marginRight = '0.5em';
    btn.style.color = (disabled ? '#888' : DebugJS.TOOL_TIMER_BTN_COLOR);
    btn.onclick = handler;
    btn.innerText = label;
    base.appendChild(btn);
    return btn;
  },

  createTimerUpDwnButton: function(up, part, area, margin) {
    var ctx = DebugJS.ctx;
    var btn = document.createElement('span');
    btn.className = ctx.id + '-btn ' + ctx.id + '-nomove ' + ctx.id + '-timerupdwn';
    btn.style.marginRight = margin + 'em';
    btn.style.color = DebugJS.TOOL_TIMER_BTN_COLOR;
    btn.onclick = new Function('DebugJS.ctx.timerUpDwn(\'' + part + '\', ' + up + ')');
    btn.innerText = (up ? '+' : '-');
    area.appendChild(btn);
    return btn;
  },

  disableTimerUpDwnButton: function() {
    var ctx = DebugJS.ctx;
    var btn = document.getElementsByClassName(ctx.id + '-timerupdwn');
    for (var i = 0; btn.length; i++) {
      btn[i].style.color = 'transparent';
    }
  },

  timerUpDwn: function(part, up) {
    var ctx = DebugJS.ctx;
    var val = ctx.calcTimeupTimeInp();
    var v = 0;
    switch (part) {
      case 'hh':
        v = 60 * 60 * 1000;
        break;
      case 'mi':
        v = 60 * 1000;
        break;
      case 'ss':
        v = 1000;
        break;
      case 'sss':
        v = 1;
    }
    if (up) {
      val += v;
    } else {
      if (val >= v) val -= v;
    }
    ctx.updateTimeupTimeInp(val);
    ctx.drawStopWatchCd();
  },

  calcTimeupTimeInp: function() {
    var ctx = DebugJS.ctx;
    var timeupHH = (ctx.timerTxtHH.value | 0) * 60 * 60 * 1000;
    var timeupMI = (ctx.timerTxtMI.value | 0) * 60 * 1000;
    var timeupSS = (ctx.timerTxtSS.value | 0) * 1000;
    var timeupSSS = (ctx.timerTxtSSS.value | 0);
    var timeup = timeupHH + timeupMI + timeupSS + timeupSSS;
    return timeup;
  },

  updateTimeupTimeInp: function(v) {
    var ctx = DebugJS.ctx;
    var tm = DebugJS.parseTime(v);
    ctx.timerTxtHH.value = tm.hh;
    ctx.timerTxtMI.value = tm.mi;
    ctx.timerTxtSS.value = tm.ss;
    ctx.timerTxtSSS.value = tm.sss;
  },

  toggleTimerMode: function() {
    var ctx = DebugJS.ctx;
    var nextMode;
    if (ctx.toolTimerMode == DebugJS.TOOL_TIMER_MODE_CLOCK) {
      nextMode = DebugJS.TOOL_TIMER_MODE_SW_CU;
    } else if (ctx.toolTimerMode == DebugJS.TOOL_TIMER_MODE_SW_CU) {
      nextMode = DebugJS.TOOL_TIMER_MODE_SW_CD;
    } else {
      nextMode = DebugJS.TOOL_TIMER_MODE_CLOCK;
    }
    ctx.switchTimerMode(nextMode);
  },

  switchTimerMode: function(mode) {
    var ctx = DebugJS.ctx;
    if (mode == DebugJS.TOOL_TIMER_MODE_SW_CU) {
      ctx.switchTimerModeStopWatchCu();
    } else if (mode == DebugJS.TOOL_TIMER_MODE_SW_CD) {
      ctx.switchTimerModeStopWatchCd();
    } else {
      ctx.switchTimerModeClock();
    }
  },

  switchTimerModeClock: function() {
    var ctx = DebugJS.ctx;
    ctx.replaceTimerSubPanel(ctx.timerClockSubPanel);
    ctx.toolTimerMode = DebugJS.TOOL_TIMER_MODE_CLOCK;
    ctx.updateTimerClock();
  },

  switchTimerModeStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.toolTimerMode = DebugJS.TOOL_TIMER_MODE_SW_CU;
    ctx.replaceTimerSubPanel(ctx.timerStopWatchCuSubPanel);
    ctx.drawStopWatchCu();
    ctx.updateTimerStopWatchCu();
    ctx.updateTimerSwBtnsCu();
  },

  switchTimerModeStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    ctx.toolTimerMode = DebugJS.TOOL_TIMER_MODE_SW_CD;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RST) {
      ctx.replaceTimerSubPanel(ctx.timerStopWatchCdInpSubPanel);
    } else {
      ctx.replaceTimerSubPanel(ctx.timerStopWatchCdSubPanel);
      ctx.drawStopWatchCd();
      ctx.updateTimerStopWatchCd();
    }
    ctx.updateTimerSwBtnsCd();
  },

  replaceTimerSubPanel: function(panel) {
    var ctx = DebugJS.ctx;
    for (var i = ctx.timerBasePanel.childNodes.length - 1; i >= 0; i--) {
      ctx.timerBasePanel.removeChild(ctx.timerBasePanel.childNodes[i]);
    }
    ctx.timerBasePanel.appendChild(panel);
  },

  updateTimerClock: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolTimerMode != DebugJS.TOOL_TIMER_MODE_CLOCK) return;
    var tm = DebugJS.getDateTime();
    ctx.timerClockLabel.innerHTML = ctx.createClockStr(tm);
    setTimeout(ctx.updateTimerClock, ctx.clockUpdInt);
  },

  startStopTimerStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING_CU) {
      ctx.stopTimerStopWatchCu();
    } else {
      ctx.startTimerStopWatchCu();
    }
  },

  startStopTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING_CD) {
      ctx.stopTimerStopWatchCd();
    } else {
      ctx.startTimerStopWatchCd();
    }
  },

  startTimerStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.toolStatus |= DebugJS.TOOL_ST_SW_RUNNING_CU;
    ctx.timerSwStartTime = (new Date()).getTime() - ctx.timerSwTimeCu;
    ctx.updateTimerStopWatchCu();
    ctx.updateTimerSwBtnsCu();
  },

  startTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_TIMEUP) {
      ctx.timerResetCd();
    }

    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_CD_RST) {
      ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_CD_RST;
      var timeup = ctx.calcTimeupTimeInp();
      ctx.timerTimeUpTime = (new Date()).getTime() + timeup;
      ctx.replaceTimerSubPanel(ctx.timerStopWatchCdSubPanel);
    } else {
      ctx.timerTimeUpTime = (new Date()).getTime() + ctx.timerSwTimeCd;
    }

    ctx.toolStatus |= DebugJS.TOOL_ST_SW_RUNNING_CD;
    ctx.updateTimerStopWatchCd();
    ctx.updateTimerSwBtnsCd();
  },

  stopTimerStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    ctx.updateTimerStopWatchCu();
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_RUNNING_CU;
    ctx.drawStopWatchCu();
    ctx.updateTimerSwBtnsCu();
  },

  stopTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    ctx.updateTimerStopWatchCd();
    ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_RUNNING_CD;
    ctx.drawStopWatchCd();
    ctx.updateTimerSwBtnsCd();
  },

  updateTimerStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolTimerMode != DebugJS.TOOL_TIMER_MODE_SW_CU) || (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING_CU))) return;
    var now = (new Date()).getTime();
    ctx.timerSwTimeCu = now - ctx.timerSwStartTime;
    ctx.drawStopWatchCu();
    setTimeout(ctx.updateTimerStopWatchCu, DebugJS.UPDATE_INTERVAL_H);
  },

  updateTimerStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolTimerMode != DebugJS.TOOL_TIMER_MODE_SW_CD) || ((!(ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING_CD)) && (!(ctx.toolStatus & DebugJS.TOOL_ST_SW_TIMEUP)))) return;
    var now = (new Date()).getTime();
    ctx.timerSwTimeCd = ctx.timerTimeUpTime - now;
    if (ctx.timerSwTimeCd < 0) {
      ctx.toolStatus |= DebugJS.TOOL_ST_SW_TIMEUP;
      ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_RUNNING_CD;
      ctx.updateTimerSwBtnsCd();
    }
    ctx.drawStopWatchCd();
    setTimeout(ctx.updateTimerStopWatchCd, DebugJS.UPDATE_INTERVAL_H);
  },

  drawStopWatchCu: function() {
    var ctx = DebugJS.ctx;
    var currentTime = ctx.timerSwTimeCu;
    var tm = DebugJS.parseTime(currentTime);
    ctx.timerStopWatchCuLabel.innerHTML = ctx.createTimeStr(tm);
  },

  drawStopWatchCd: function() {
    var ctx = DebugJS.ctx;
    var currentTime = ctx.timerSwTimeCd;
    var tm = DebugJS.parseTime(currentTime);
    ctx.timerStopWatchCdLabel.innerHTML = ctx.createTimeStr(tm);
  },

  updateTimerSwBtnsCu: function() {
    var ctx = DebugJS.ctx;
    var btn = (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING_CU) ? '||' : '>>';
    ctx.timerStartStopBtnCu.innerText = btn;
  },

  updateTimerSwBtnsCd: function() {
    var ctx = DebugJS.ctx;
    var btn = (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING_CD) ? '||' : '>>';
    ctx.timerStartStopBtnCd.innerText = btn;
    ctx.timerStartStopBtnCdInp.innerText = btn;
  },

  timerResetCu: function() {
    var ctx = DebugJS.ctx;
    ctx.timerSwStartTime = (new Date()).getTime();
    ctx.timerSwTimeCu = 0;
    ctx.drawStopWatchCu();
    ctx.updateTimerSwBtnsCu();
  },

  timerResetCd: function() {
    var ctx = DebugJS.ctx;
    if (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING_CD) {
      var timeup = ctx.calcTimeupTimeInp();
      ctx.timerTimeUpTime = (new Date()).getTime() + timeup;
      ctx.updateTimerStopWatchCd();
    } else {
      ctx.toolStatus &= ~DebugJS.TOOL_ST_SW_TIMEUP;
      ctx.toolStatus |= DebugJS.TOOL_ST_SW_CD_RST;
      ctx.replaceTimerSubPanel(ctx.timerStopWatchCdInpSubPanel);
      ctx.updateTimerSwBtnsCd();
    }
  },

  createClockStr: function(tm) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize * 8;
    var dtFontSize = fontSize * 0.45;
    var msFontSize = fontSize * 0.65;
    var marginT = 20 * ctx.options.zoom;
    var marginB = 10 * ctx.options.zoom;
    var dot = '.';
    if (tm.sss > 500) {
      dot = '&nbsp;';
    }
    var date = tm.yyyy + '-' + tm.mm + '-' + tm.dd + ' <span style="color:#' + DebugJS.WDAYS_COLOR[tm.wday] + '">' + DebugJS.WDAYS[tm.wday] + '</span>';
    var time = tm.hh + ':' + tm.mi + '<span style="margin-left:' + (msFontSize / 5) + 'px;font-size:' + msFontSize + 'px">' + tm.ss + dot + '</span>';
    var label = '<div style="font-size:' + dtFontSize + 'px">' + date + '</div>' +
                '<div style="font-size:' + fontSize + 'px;margin:-' + marginT + 'px 0 ' + marginB + 'px 0">' + time + '</div>';
    return label;
  },

  createTimeStr: function(tm) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize * 7;
    var msFontSize = fontSize * 0.65;
    var dot = '.';
    if (((tm.sss > 500) &&
         (ctx.toolTimerMode == DebugJS.TOOL_TIMER_MODE_SW_CU) &&
         (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING_CU)) ||
        ((tm.sss < 500) &&
         (ctx.toolTimerMode == DebugJS.TOOL_TIMER_MODE_SW_CD) &&
         (ctx.toolStatus & DebugJS.TOOL_ST_SW_RUNNING_CD))) {
      dot = '&nbsp;';
    }
    var str = tm.hh + ':' + tm.mi + ':' + tm.ss + '<span style="font-size:' + msFontSize + 'px">' + dot + tm.sss + '</span>';
    if ((ctx.toolTimerMode == DebugJS.TOOL_TIMER_MODE_SW_CD) && (ctx.toolStatus & DebugJS.TOOL_ST_SW_TIMEUP)) {
      if (tm.sss > 500) {
        str = '&nbsp;<span style="font-size:' + msFontSize + 'px">' + '&nbsp;</span>';
      } else {
        str = '00:00:00<span style="font-size:' + msFontSize + 'px">' + '.000</span>';
      }
    }
    var label = '<div style="font-size:' + fontSize + 'px">' + str + '</div>';
    return label;
  },

  disableTimer: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_TIMER) &&
        (ctx.timerBasePanel != null)) {
      ctx.toolsBodyPanel.removeChild(ctx.timerBasePanel);
      ctx.setIntervalL();
    }
  },

  enableBtn: function(btn, fn, color) {
    btn.onclick = fn;
    btn.style.color = color;
  },

  disableBtn: function(btn) {
    btn.onclick = null;
    btn.style.color = DebugJS.COLOR_INACTIVE;
  },

  enableTextChecker: function() {
    var ctx = DebugJS.ctx;
    if (ctx.txtChkPanel == null) {
      var defaultFontSize = ctx.computedFontSize;
      var defaultFontFamily = 'Consolas';
      var defaultFontWeight = 400;
      var defaultFgRGB16 = 'fff';
      var defaultBgRGB16 = '000';
      var panelPadding = 2;
      ctx.txtChkPanel = document.createElement('div');
      ctx.txtChkPanel.className = ctx.id + '-tools';
      ctx.toolsBodyPanel.appendChild(ctx.txtChkPanel);

      var txtPadding = 4;
      var txtChk = document.createElement('input');
      txtChk.style.setProperty('width', 'calc(100% - ' + ((txtPadding + panelPadding) * 2) + 'px)', 'important');
      txtChk.style.setProperty('min-height', (20 * ctx.options.zoom) + 'px', 'important');
      txtChk.style.setProperty('margin-bottom', '8px', 'important');
      txtChk.style.setProperty('padding', txtPadding + 'px', 'important');
      txtChk.style.setProperty('border', '0', 'important');
      txtChk.style.setProperty('border-radius', '0', 'important');
      txtChk.style.setProperty('outline', 'none', 'important');
      txtChk.style.setProperty('font-size', defaultFontSize + 'px', 'important');
      txtChk.style.setProperty('font-family', defaultFontFamily, 'important');
      txtChk.value = 'ABCDEFG.abcdefg 12345-67890_!?';
      ctx.txtChkPanel.appendChild(txtChk);
      ctx.txtChk = txtChk;

      ctx.txtChkCtrl = document.createElement('div');
      ctx.txtChkPanel.appendChild(ctx.txtChkCtrl);
      var html = 'font-size: <input type="range" min="0" max="128" step="1" id="' + ctx.id + '-fontsize-range" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeFontSize(true);" onchange="DebugJS.ctx.onChangeFontSize(true);">' +
      '<input value="' + defaultFontSize + '" id="' + ctx.id + '-font-size" class="' + ctx.id + '-txt-text" style="width:30px;text-align:right" oninput="DebugJS.ctx.onChangeFontSizeTxt()">px' +
      '<br>' +
      'font-family: <input value="' + defaultFontFamily + '" class="' + ctx.id + '-txt-text" style="width:110px" oninput="DebugJS.ctx.onChangeFontFamily(this)">&nbsp;&nbsp;' +
      'font-weight: <input type="range" min="100" max="900" step="100" value="' + defaultFontWeight + '" id="' + ctx.id + '-fontweight-range" class="' + ctx.id + '-txt-range" style="width:80px" oninput="DebugJS.ctx.onChangeFontWeight();" onchange="DebugJS.ctx.onChangeFontWeight();"><span id="' + ctx.id + '-font-weight"></span> ' +
      '<table class="' + ctx.id + '-txt-tbl">' +
      '<tr><td colspan="2">FG #<input id="' + ctx.id + '-fg-rgb" class="' + ctx.id + '-txt-text" value="' + defaultFgRGB16 + '" style="width:80px" oninput="DebugJS.ctx.onChangeFgRGB()"></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_R + '">R</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-fg-range-r" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeFgColor(true);" onchange="DebugJS.ctx.onChangeFgColor(true);"></td><td><span id="' + ctx.id + '-fg-r"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_G + '">G</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-fg-range-g" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeFgColor(true);" onchange="DebugJS.ctx.onChangeFgColor(true);"></td><td><span id="' + ctx.id + '-fg-g"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_B + '">B</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-fg-range-b" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeFgColor(true);" onchange="DebugJS.ctx.onChangeFgColor(true);"></td><td><span id="' + ctx.id + '-fg-b"></span></td></tr>' +
      '<tr><td colspan="2">BG #<input id="' + ctx.id + '-bg-rgb" class="' + ctx.id + '-txt-text" value="' + defaultBgRGB16 + '" style="width:80px" oninput="DebugJS.ctx.onChangeBgRGB()"></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_R + '">R</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-bg-range-r" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeBgColor(true);" onchange="DebugJS.ctx.onChangeBgColor(true);"></td><td><span id="' + ctx.id + '-bg-r"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_G + '">G</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-bg-range-g" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeBgColor(true);" onchange="DebugJS.ctx.onChangeBgColor(true);"></td><td><span id="' + ctx.id + '-bg-g"></span></td></tr>' +
      '<tr><td><span style="color:' + DebugJS.COLOR_B + '">B</span>:</td><td><input type="range" min="0" max="255" step="1" id="' + ctx.id + '-bg-range-b" class="' + ctx.id + '-txt-range" oninput="DebugJS.ctx.onChangeBgColor(true);" onchange="DebugJS.ctx.onChangeBgColor(true);"></td><td><span id="' + ctx.id + '-bg-b"></span></td></tr>' +
      '</tbale>';
      ctx.txtChkCtrl.innerHTML = html;

      ctx.txtChkFontSizeRange = document.getElementById(ctx.id + '-fontsize-range');
      ctx.txtChkFontSizeInput = document.getElementById(ctx.id + '-font-size');
      ctx.txtChkFontWeightRange = document.getElementById(ctx.id + '-fontweight-range');
      ctx.txtChkFontWeightLabel = document.getElementById(ctx.id + '-font-weight');
      ctx.txtChkInputFgRGB = document.getElementById(ctx.id + '-fg-rgb');
      ctx.txtChkRangeFgR = document.getElementById(ctx.id + '-fg-range-r');
      ctx.txtChkRangeFgG = document.getElementById(ctx.id + '-fg-range-g');
      ctx.txtChkRangeFgB = document.getElementById(ctx.id + '-fg-range-b');
      ctx.txtChkLabelFgR = document.getElementById(ctx.id + '-fg-r');
      ctx.txtChkLabelFgG = document.getElementById(ctx.id + '-fg-g');
      ctx.txtChkLabelFgB = document.getElementById(ctx.id + '-fg-b');
      ctx.txtChkInputBgRGB = document.getElementById(ctx.id + '-bg-rgb');
      ctx.txtChkRangeBgR = document.getElementById(ctx.id + '-bg-range-r');
      ctx.txtChkRangeBgG = document.getElementById(ctx.id + '-bg-range-g');
      ctx.txtChkRangeBgB = document.getElementById(ctx.id + '-bg-range-b');
      ctx.txtChkLabelBgR = document.getElementById(ctx.id + '-bg-r');
      ctx.txtChkLabelBgG = document.getElementById(ctx.id + '-bg-g');
      ctx.txtChkLabelBgB = document.getElementById(ctx.id + '-bg-b');

      ctx.onChangeFontSizeTxt();
      ctx.onChangeFontWeight();
      ctx.onChangeFgRGB();
      ctx.onChangeBgRGB();
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.txtChkPanel);
    }
  },

  onChangeFgRGB: function() {
    var ctx = DebugJS.ctx;
    var rgb16 = '#' + ctx.txtChkInputFgRGB.value;
    var rgb10 = DebugJS.convRGB16to10(rgb16);
    ctx.txtChkRangeFgR.value = rgb10.r;
    ctx.txtChkRangeFgG.value = rgb10.g;
    ctx.txtChkRangeFgB.value = rgb10.b;
    ctx.onChangeFgColor(null);
    ctx.txtChk.style.setProperty('color', rgb16, 'important');
  },

  onChangeBgRGB: function() {
    var ctx = DebugJS.ctx;
    var rgb16 = '#' + ctx.txtChkInputBgRGB.value;
    var rgb10 = DebugJS.convRGB16to10(rgb16);
    ctx.txtChkRangeBgR.value = rgb10.r;
    ctx.txtChkRangeBgG.value = rgb10.g;
    ctx.txtChkRangeBgB.value = rgb10.b;
    ctx.onChangeBgColor(null);
    ctx.txtChk.style.setProperty('background', rgb16, 'important');
  },

  onChangeFgColor: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var fgR = ctx.txtChkRangeFgR.value;
    var fgG = ctx.txtChkRangeFgG.value;
    var fgB = ctx.txtChkRangeFgB.value;
    var rgb16 = DebugJS.convRGB10to16(fgR + ' ' + fgG + ' ' + fgB);
    ctx.txtChkLabelFgR.innerText = fgR;
    ctx.txtChkLabelFgG.innerText = fgG;
    ctx.txtChkLabelFgB.innerText = fgB;
    if (callFromRange) {
      ctx.txtChkInputFgRGB.value = rgb16.r + rgb16.g + rgb16.b;
      ctx.txtChk.style.setProperty('color', 'rgb(' + fgR + ',' + fgG + ',' + fgB + ')', 'important');
    }
  },

  onChangeBgColor: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var bgR = ctx.txtChkRangeBgR.value;
    var bgG = ctx.txtChkRangeBgG.value;
    var bgB = ctx.txtChkRangeBgB.value;
    var rgb16 = DebugJS.convRGB10to16(bgR + ' ' + bgG + ' ' + bgB);
    ctx.txtChkLabelBgR.innerText = bgR;
    ctx.txtChkLabelBgG.innerText = bgG;
    ctx.txtChkLabelBgB.innerText = bgB;
    if (callFromRange) {
      ctx.txtChkInputBgRGB.value = rgb16.r + rgb16.g + rgb16.b;
      ctx.txtChk.style.setProperty('background', 'rgb(' + bgR + ',' + bgG + ',' + bgB + ')', 'important');
    }
  },

  onChangeFontSizeTxt: function() {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.txtChkFontSizeInput.value;
    ctx.txtChkFontSizeRange.value = fontSize;
    ctx.onChangeFontSize(null);
    ctx.txtChk.style.setProperty('font-size', fontSize + 'px', 'important');
  },

  onChangeFontSize: function(callFromRange) {
    var ctx = DebugJS.ctx;
    var fontSize;
    fontSize = ctx.txtChkFontSizeRange.value;
    if (callFromRange) {
      ctx.txtChkFontSizeInput.value = fontSize;
      ctx.txtChk.style.setProperty('font-size', fontSize + 'px', 'important');
    }
  },

  onChangeFontWeight: function() {
    var ctx = DebugJS.ctx;
    var fontWeight = ctx.txtChkFontWeightRange.value;
    ctx.txtChk.style.setProperty('font-weight', fontWeight, 'important');
    if (fontWeight == 400) {
      fontWeight += '(normal)';
    } else if (fontWeight == 700) {
      fontWeight += '(bold)';
    }
    ctx.txtChkFontWeightLabel.innerText = fontWeight;
  },

  onChangeFontFamily: function(font) {
    var fontFamily = font.value;
    DebugJS.ctx.txtChk.style.setProperty('font-family', fontFamily, 'important');
  },

  disableTextChecker: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_TEXT) &&
        (ctx.txtChkPanel != null)) {
      ctx.toolsBodyPanel.removeChild(ctx.txtChkPanel);
    }
  },

  enableFileLoader: function(format) {
    var ctx = DebugJS.ctx;
    var fontSize = ctx.computedFontSize + 'px';
    if (ctx.fileLoaderPanel == null) {
      ctx.fileLoaderPanel = document.createElement('div');
      ctx.fileLoaderPanel.className = ctx.id + '-tools';
      ctx.toolsBodyPanel.appendChild(ctx.fileLoaderPanel);

      var fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.style.setProperty('width', 'calc(100% - ' + (ctx.computedFontSize * 12) + 'px)', 'important');
      fileInput.style.setProperty('min-height', (20 * ctx.options.zoom) + 'px', 'important');
      fileInput.style.setProperty('margin', '0 0 4px 0', 'important');
      fileInput.style.setProperty('padding', '1px', 'important');
      fileInput.style.setProperty('border', '0', 'important');
      fileInput.style.setProperty('border-radius', '0', 'important');
      fileInput.style.setProperty('outline', 'none', 'important');
      fileInput.style.setProperty('font-size', fontSize, 'important');
      fileInput.style.setProperty('font-family', ctx.options.fontFamily + 'px', 'important');
      fileInput.addEventListener('change', ctx.handleFileSelect, false);
      ctx.fileLoaderPanel.appendChild(fileInput);
      ctx.fileInput = fileInput;

      ctx.fileLoaderLabelBin = document.createElement('label');
      ctx.fileLoaderLabelBin.innerText = 'Binary';
      ctx.fileLoaderLabelBin.style.marginLeft = '10px';
      ctx.fileLoaderPanel.appendChild(ctx.fileLoaderLabelBin);
      ctx.fileLoaderRadioBin = document.createElement('input');
      ctx.fileLoaderRadioBin.type = 'radio';
      ctx.fileLoaderRadioBin.name = ctx.id + '-load-type';
      ctx.fileLoaderRadioBin.value = 'binary';
      ctx.fileLoaderRadioBin.onchange = ctx.loadFile;
      ctx.fileLoaderRadioBin.checked = true;
      ctx.fileLoaderLabelBin.appendChild(ctx.fileLoaderRadioBin);

      ctx.fileLoaderLabelB64 = document.createElement('label');
      ctx.fileLoaderLabelB64.innerText = 'Base64';
      ctx.fileLoaderLabelB64.style.marginLeft = '10px';
      ctx.fileLoaderPanel.appendChild(ctx.fileLoaderLabelB64);
      ctx.fileLoaderRadioB64 = document.createElement('input');
      ctx.fileLoaderRadioB64.type = 'radio';
      ctx.fileLoaderRadioB64.name = ctx.id + '-load-type';
      ctx.fileLoaderRadioB64.value = 'base64';
      ctx.fileLoaderRadioB64.onchange = ctx.loadFile;
      ctx.fileLoaderLabelB64.appendChild(ctx.fileLoaderRadioB64);

      ctx.filePreviewWrapper = document.createElement('div');
      ctx.filePreviewWrapper.style.setProperty('width', 'calc(100% - ' + (DebugJS.WIN_ADJUST + 2) + 'px)', 'important');
      ctx.filePreviewWrapper.style.setProperty('height', 'calc(100% - ' + ((ctx.computedFontSize * 4) + 10) + 'px)', 'important');
      ctx.filePreviewWrapper.style.setProperty('margin-bottom', '4px', 'important');
      ctx.filePreviewWrapper.style.setProperty('padding', '2px', 'important');
      ctx.filePreviewWrapper.style.setProperty('border', '1px dotted #ccc', 'important');
      ctx.filePreviewWrapper.style.setProperty('font-size', fontSize, 'important');
      ctx.filePreviewWrapper.style.setProperty('font-family', ctx.options.fontFamily + 'px', 'important');
      ctx.filePreviewWrapper.style.setProperty('overflow', 'auto', 'important');
      ctx.filePreviewWrapper.addEventListener('dragover', ctx.handleDragOver, false);
      ctx.filePreviewWrapper.addEventListener('drop', ctx.handleFileDrop, false);
      ctx.fileLoaderPanel.appendChild(ctx.filePreviewWrapper);

      ctx.filePreview = document.createElement('pre');
      ctx.filePreview.style.setProperty('background', 'transparent', 'important');
      ctx.filePreview.style.setProperty('color', ctx.options.fontColor, 'important');
      ctx.filePreview.style.setProperty('font-size', fontSize, 'important');
      ctx.filePreview.style.setProperty('font-family', ctx.options.fontFamily + 'px', 'important');
      ctx.filePreviewWrapper.appendChild(ctx.filePreview);
      ctx.filePreview.innerText = 'Drop a file here';

      ctx.fileLoaderFooter = document.createElement('div');
      ctx.fileLoaderFooter.style.width = 'calc(100% - ' + (DebugJS.WIN_ADJUST + DebugJS.WIN_SHADOW) + 'px)';
      ctx.fileLoaderFooter.style.height = (ctx.computedFontSize + 3) + 'px';
      ctx.fileLoaderFooter.style.opacity = 0;
      ctx.fileLoaderFooter.style.transition = 'opacity 0.5s linear';
      ctx.fileLoaderPanel.appendChild(ctx.fileLoaderFooter);

      ctx.fileLoadProgressBar = document.createElement('div');
      ctx.fileLoadProgressBar.style.display = 'inline-block';
      ctx.fileLoadProgressBar.style.width = 'calc(100% - ' + (ctx.computedFontSize * 5) + 'px)';
      ctx.fileLoadProgressBar.style.height = 'auto';
      ctx.fileLoadProgressBar.style.padding = 0;
      ctx.fileLoadProgressBar.style.border = '1px solid #ccc';
      ctx.fileLoaderFooter.appendChild(ctx.fileLoadProgressBar);

      ctx.fileLoadProgress = document.createElement('div');
      ctx.fileLoadProgress.style.width = 'calc(100% - ' + (DebugJS.WIN_BORDER * 2) + 'px)';
      ctx.fileLoadProgress.style.height = 'auto';
      ctx.fileLoadProgress.style.padding = '1px';
      ctx.fileLoadProgress.style.border = 'none';
      ctx.fileLoadProgress.style.background = '#00f';
      ctx.fileLoadProgress.style.fontSize = (ctx.computedFontSize * 0.8) + 'px';
      ctx.fileLoadProgress.style.fontFamily = ctx.options.fontFamily + 'px';
      ctx.fileLoadProgress.innerText = '0%';
      ctx.fileLoadProgressBar.appendChild(ctx.fileLoadProgress);

      ctx.fileLoadCancelBtn = document.createElement('span');
      ctx.fileLoadCancelBtn.className = ctx.id + '-btn ' + ctx.id + '-nomove';
      ctx.fileLoadCancelBtn.style.position = 'relative';
      ctx.fileLoadCancelBtn.style.top = '2px';
      ctx.fileLoadCancelBtn.style.float = 'right';
      ctx.fileLoadCancelBtn.onclick = DebugJS.ctx.cancelLoadFile;
      ctx.fileLoadCancelBtn.innerText = '[CANCEL]';
      ctx.fileLoaderFooter.appendChild(ctx.fileLoadCancelBtn);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.fileLoaderPanel);
    }

    if (format != undefined) {
      if (format == DebugJS.FILE_LOAD_FORMAT_B64) {
        ctx.fileLoaderRadioBin.checked = false;
        ctx.fileLoaderRadioB64.checked = true;
      } else {
        ctx.fileLoaderRadioBin.checked = true;
        ctx.fileLoaderRadioB64.checked = false;
      }
      if (ctx.fileLoadFormat != format) {
        ctx.loadFile();
      }
    }
  },

  disableFileLoader: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_FILE) &&
        (ctx.fileLoaderPanel != null)) {
      ctx.toolsBodyPanel.removeChild(ctx.fileLoaderPanel);
    }
  },

  handleFileSelect: function(e) {
    if (e.target.files) {
      DebugJS.ctx.fileLoaderFile = e.target.files[0];
      DebugJS.ctx.loadFile();
    } else {
      DebugJS.log.e('unsupported');
    }
  },

  handleDragOver: function(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  },

  handleFileDrop: function(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.dataTransfer.files) {
      DebugJS.ctx.fileLoaderFile = e.dataTransfer.files[0];
      DebugJS.ctx.loadFile();
    } else {
      DebugJS.log.e('unsupported');
    }
  },

  loadFile: function() {
    var ctx = DebugJS.ctx;
    var file = ctx.fileLoaderFile;
    if (!file) {
      return;
    }

    ctx.fileLoadProgress.style.width = '0%';
    ctx.fileLoadProgress.textContent = '0%';

    ctx.fileReader = new FileReader();
    ctx.fileReader.onerror = ctx.fileLoadErrorHandler;
    ctx.fileReader.onprogress = ctx.updateFileLoadProgress;
    ctx.fileReader.onabort = ctx.onAbortLoadFile;
    ctx.fileReader.onloadstart = ctx.onFileLoadStart;
    ctx.fileReader.onload = (function(theFile) {
      return function(e) {
        ctx.onFileLoadCompleted(theFile, e);
      };
    })(file);

    if (ctx.fileLoaderRadioB64.checked) {
      ctx.fileLoadFormat = DebugJS.FILE_LOAD_FORMAT_B64;
      ctx.fileReader.readAsDataURL(file);
    } else {
      ctx.fileLoadFormat = DebugJS.FILE_LOAD_FORMAT_BIN;
      ctx.fileReader.readAsArrayBuffer(file);
    }
  },

  cancelLoadFile: function() {
    var ctx = DebugJS.ctx;
    if (ctx.fileReader) {
      ctx.fileReader.abort();
    }
  },

  onAbortLoadFile: function(e) {
    DebugJS.ctx.updateFilePreview('File read cancelled.');
    setTimeout(DebugJS.ctx.fileLoadFinalize, 1000);
  },

  fileLoadErrorHandler: function(e) {
    var ctx = DebugJS.ctx;
    switch (e.target.error.code) {
      case e.target.error.NOT_FOUND_ERR:
        ctx.updateFilePreview('NOT_FOUND_ERR');
        break;
      case e.target.error.NOT_READABLE_ERR:
        ctx.updateFilePreview('NOT_READABLE_ERR');
        break;
      case e.target.error.ABORT_ERR:
        ctx.updateFilePreview('ABORT_ERR');
        break;
      default:
        ctx.updateFilePreview('FILE_READ_ERROR');
    }
  },

  updateFileLoadProgress: function(e) {
    if (e.lengthComputable) {
      var ctx = DebugJS.ctx;
      var total = e.total;
      var loaded = e.loaded;
      var percentLoaded = (total == 0) ? 100 : Math.round((loaded / total) * 100);
      ctx.fileLoadProgress.style.width = 'calc(' + percentLoaded + '% - ' + (DebugJS.WIN_BORDER * 2) + 'px)';
      ctx.fileLoadProgress.textContent = percentLoaded + '%';
      ctx.updateFilePreview('LOADING...\n' + DebugJS.formatDec(loaded) + ' / ' + DebugJS.formatDec(total) + ' bytes');
    }
  },

  onFileLoadStart: function(e) {
    var ctx = DebugJS.ctx;
    DebugJS.addClass(ctx.fileLoaderFooter, ctx.id + '-loading');
    ctx.updateFilePreview('LOADING...');
  },

  onFileLoadCompleted: function(file, e) {
    var ctx = DebugJS.ctx;
    var limit = ctx.properties.prevlimit.value;
    var content = (ctx.fileReader.result == null) ? '' : ctx.fileReader.result;
    var dt = DebugJS.getDateTime(file.lastModifiedDate);
    var fileDate = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.sss;
    var preview = '';
    if (file.size > 0) {
      if (ctx.fileLoadFormat == DebugJS.FILE_LOAD_FORMAT_B64) {
        preview = ctx.getContentPreview(file, content);
      } else {
        var buf = new Uint8Array(content);
        preview = '\n' + ctx.getHexDump(buf);
      }
    }
    var html = 'file    : ' + file.name + '\n' +
    'type    : ' + file.type + '\n' +
    'size    : ' + DebugJS.formatDec(file.size) + ' byte' + ((file.size >= 2) ? 's' : '') + '\n' +
    'modified: ' + fileDate + '\n' +
    preview + '\n';
    if (ctx.fileLoadFormat == DebugJS.FILE_LOAD_FORMAT_B64) {
      if (file.size <= limit) {
        html += content;
      } else {
        html += '<span style="color:' + ctx.options.logColorW + '">The file size exceeds the limit allowed. (limit=' + limit + ')</span>';
      }
    }
    ctx.updateFilePreview(html);
    setTimeout(ctx.fileLoadFinalize, 1000);
    var cb = ctx.options.onFileLoaded;
    if (cb) {
      var isB64 = (ctx.fileLoadFormat == DebugJS.FILE_LOAD_FORMAT_B64);
      cb(file, content, isB64);
    }
  },

  getContentPreview: function(file, contentB64) {
    var ctx = DebugJS.ctx;
    var preview = '';
    if (file.type.match(/image\//)) {
      var ctxSizePos = ctx.getSelfSizePos();
      preview = '<img src="' + contentB64 + '" id="' + ctx.id + '-img-preview" style="max-width:' + (ctxSizePos.w - 32) + 'px;max-height:' + (ctxSizePos.h - (ctx.computedFontSize * 13) - 8) + 'px">\n';
    } else if (file.type.match(/text\//)) {
      var contents = contentB64.split(',');
      var decodedContent = DebugJS.decodeBase64(contents[1]);
      decodedContent = DebugJS.escTag(decodedContent);
      preview = '<span style="color:#0f0">' + decodedContent + '</span>\n';
    }
    return preview;
  },

  resizeImgPreview: function() {
    var ctx = DebugJS.ctx;
    if ((!(ctx.status & DebugJS.STATE_TOOLS)) ||
        (!(DebugJS.ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_FILE)) ||
        (!(ctx.fileLoadFormat == DebugJS.FILE_LOAD_FORMAT_B64))) {
      return;
    }
    var imgPreview = document.getElementById(ctx.id + '-img-preview');
    if (imgPreview == null) return;
    var ctxSizePos = ctx.getSelfSizePos();
    var maxW = (ctxSizePos.w - 32);
    if (maxW < 100) maxW = 100;
    var maxH = (ctxSizePos.h - (ctx.computedFontSize * 13) - 8);
    if (maxH < 100) maxH = 100;
    imgPreview.style.maxWidth = maxW + 'px';
    imgPreview.style.maxHeight = maxH + 'px';
  },

  getHexDump: function(buf) {
    var ctx = DebugJS.ctx;
    var limit = ctx.properties.hexdumplimit.value;
    var bLen = buf.length;
    var len = ((bLen > limit) ? limit : bLen);
    if (len % 0x10 != 0) {
      len = (((len / 0x10) + 1) | 0) * 0x10;
    }
    var hexDump = '<pre style="white-space:pre !important"><span style="background:#0cf;color:#000">Address    +0 +1 +2 +3 +4 +5 +6 +7  +8 +9 +A +B +C +D +E +F  ASCII           </span>';
    hexDump += ctx.dumpAddr(0);
    for (var i = 0; i < len; i++) {
      hexDump += ctx.printDump(i, buf, len);
    }
    if (bLen > limit) {
      if (bLen - limit > 0x10) {
        hexDump += '\n<span style="color:#ccc">...</span>';
      }
      var rem = (bLen % 0x10);
      var start = (rem == 0 ? (bLen - 0x10) : (bLen - rem));
      var end = start + 0x10;
      hexDump += ctx.dumpAddr(start);
      for (i = start; i < end; i++) {
        hexDump += ctx.printDump(i, buf, end);
      }
    }
    hexDump += '</pre>';
    return hexDump;
  },

  printDump: function(i, buf, len) {
    var b = DebugJS.ctx.dumpBin(i, buf);
    if ((i + 1) % 0x10 == 0) {
      b += '  ' + DebugJS.ctx.dumpAscii(((i + 1) - 0x10), buf, len);
      if ((i + 1) < len) {
        b += DebugJS.ctx.dumpAddr(i + 1);
      }
    } else if ((i + 1) % 8 == 0) {
      b += '  ';
    } else {
      b += ' ';
    }
    return b;
  },

  dumpAddr: function(i) {
    var addr = ('0000000' + i.toString(16)).slice(-8).toUpperCase();
    var b = '\n' + addr + ' : ';
    return b;
  },

  dumpBin: function(i, buf) {
    var b = ((buf[i] == undefined) ? '  ' : ('0' + buf[i].toString(16)).slice(-2).toUpperCase());
    return b;
  },

  dumpAscii: function(pos, buf, len) {
    var b = '';
    var lim = pos + 0x10;
    for (var i = pos; i < lim; i++) {
      var code = buf[i];
      if (code == undefined) break;
      switch (code) {
        case 0x0A:
        case 0x0D:
          b += '<span style="color:#0cf">&#x21b5;</span>';
          break;
        case 0x22:
          b += '&quot;';
          break;
        case 0x26:
          b += '&amp;';
          break;
        case 0x3C:
          b += '&lt;';
          break;
        case 0x3E:
          b += '&gt;';
          break;
        default:
          if ((code >= 0x20) && (code <= 0x7E)) {
            b += String.fromCharCode(code);
          } else {
            b += ' ';
          }
      }
    }
    return b;
  },

  updateFilePreview: function(html) {
    DebugJS.ctx.filePreview.innerHTML = html;
    DebugJS.ctx.filePreviewWrapper.scrollTop = 0;
  },

  fileLoadFinalize: function() {
    var ctx = DebugJS.ctx;
    DebugJS.removeClass(ctx.fileLoaderFooter, ctx.id + '-loading');
  },

  switchFileScreen: function() {
    var ctx = DebugJS.ctx;
    if (ctx.fileLoaderRadioB64.checked) {
      ctx.fileLoaderRadioBin.checked = true;
    } else {
      ctx.fileLoaderRadioB64.checked = true;
    }
    ctx.loadFile();
  },

  enableHtmlEditor: function() {
    var ctx = DebugJS.ctx;
    if (ctx.htmlPrevBasePanel == null) {
      ctx.htmlPrevBasePanel = document.createElement('div');
      ctx.htmlPrevBasePanel.className = ctx.id + '-tools';
      ctx.toolsBodyPanel.appendChild(ctx.htmlPrevBasePanel);

      ctx.htmlPrevPrevPanel = document.createElement('div');
      ctx.htmlPrevPrevPanel.style.height = '50%';
      ctx.htmlPrevPrevPanel.innerHTML = 'HTML PREVIEWER';
      ctx.htmlPrevBasePanel.appendChild(ctx.htmlPrevPrevPanel);

      ctx.htmlPrevEditorPanel = document.createElement('div');
      var html = '<span style="color:#ccc">HTML Editor</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="float:right;margin-right:4px" onclick="DebugJS.ctx.drawHtml();DebugJS.ctx.htmlPrevEditor.focus();">[DRAW]</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:4px" onclick="DebugJS.ctx.insertHtmlSnippet()">[CLR]</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:8px" onclick="DebugJS.ctx.insertHtmlSnippet(0)">&lt;CODE1&gt;</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:4px" onclick="DebugJS.ctx.insertHtmlSnippet(1)">&lt;CODE2&gt;</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:4px" onclick="DebugJS.ctx.insertHtmlSnippet(2)">&lt;CODE3&gt;</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:4px" onclick="DebugJS.ctx.insertHtmlSnippet(3)">&lt;CODE4&gt;</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:4px" onclick="DebugJS.ctx.insertHtmlSnippet(4)">&lt;CODE5&gt;</span>';
      ctx.htmlPrevEditorPanel.innerHTML = html;
      ctx.htmlPrevBasePanel.appendChild(ctx.htmlPrevEditorPanel);

      ctx.htmlPrevEditor = document.createElement('textarea');
      ctx.htmlPrevEditor.className = ctx.id + '-editor';
      ctx.htmlPrevEditor.style.setProperty('height', 'calc(50% - ' + (ctx.computedFontSize + 10) + 'px)', 'important');
      ctx.htmlPrevEditor.onblur = DebugJS.ctx.saveHtmlBuf;
      ctx.htmlPrevEditor.value = ctx.htmlPrevBuf;
      ctx.htmlPrevBasePanel.appendChild(ctx.htmlPrevEditor);
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.htmlPrevBasePanel);
    }
    ctx.htmlPrevEditor.focus();
  },

  insertHtmlSnippet: function(n) {
    var ctx = DebugJS.ctx;
    var editor = ctx.htmlPrevEditor;
    if (n == undefined) {
      editor.value = '';
      editor.focus();
    } else {
      var code = DebugJS.HTML_SNIPPET[n];
      var buf = editor.value;
      var posCursole = editor.selectionStart;
      var leftBuf = buf.substr(0, posCursole);
      var rightBuf = buf.substr(posCursole, buf.length);
      buf = leftBuf + code + rightBuf;
      ctx.htmlPrevEditor.focus();
      ctx.htmlPrevEditor.value = buf;
      editor.selectionStart = editor.selectionEnd = posCursole + code.length;
    }
  },

  saveHtmlBuf: function() {
    DebugJS.ctx.htmlPrevBuf = DebugJS.ctx.htmlPrevEditor.value;
  },

  drawHtml: function() {
    var ctx = DebugJS.ctx;
    ctx.htmlPrevPrevPanel.innerHTML = ctx.htmlPrevBuf;
  },

  disableHtmlEditor: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_HTML) &&
        (ctx.htmlPrevBasePanel != null)) {
      ctx.toolsBodyPanel.removeChild(ctx.htmlPrevBasePanel);
    }
  },

  enableMemoEditor: function() {
    var ctx = DebugJS.ctx;
    if (ctx.memoBasePanel == null) {
      ctx.memoBasePanel = document.createElement('div');
      ctx.memoBasePanel.className = ctx.id + '-tools';
      ctx.toolsBodyPanel.appendChild(ctx.memoBasePanel);
      ctx.memoEditorPanel = document.createElement('div');
      var html = '<span style="color:#ccc">Memo</span>';
      if (DebugJS.LS_AVAILABLE) {
        html += '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="float:right;margin-right:4px" onclick="DebugJS.ctx.saveMemo();DebugJS.ctx.memoEditor.focus();">[SAVE]</span>';
      } else {
        html += '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove ' + ctx.id + '-btn-disabled" style="float:right;margin-right:4px">[SAVE]</span>' +
        '<span style="float:right;margin-right:4px;color:#caa">Save function (localStorage) is not available.</span>';
      }
      ctx.memoEditorPanel.innerHTML = html;
      ctx.memoBasePanel.appendChild(ctx.memoEditorPanel);
      ctx.memoEditor = document.createElement('textarea');
      ctx.memoEditor.className = ctx.id + '-editor';
      ctx.memoEditor.style.setProperty('height', 'calc(100% - ' + (ctx.computedFontSize + 10) + 'px)', 'important');
      ctx.memoBasePanel.appendChild(ctx.memoEditor);
      if (DebugJS.LS_AVAILABLE) {
        ctx.loadMemo();
      }
    } else {
      ctx.toolsBodyPanel.appendChild(ctx.memoBasePanel);
    }
    ctx.memoEditor.focus();
  },

  loadMemo: function() {
    var memo = localStorage.getItem('DebugJS-memo');
    if (memo == null) memo = '';
    DebugJS.ctx.memoEditor.value = memo;
  },

  saveMemo: function() {
    var memo = DebugJS.ctx.memoEditor.value;
    if (memo != '') {
      localStorage.setItem('DebugJS-memo', memo);
    } else {
      localStorage.removeItem('DebugJS-memo');
    }
    DebugJS.log.s('Saved.');
  },

  disableMemoEditor: function() {
    var ctx = DebugJS.ctx;
    if ((ctx.toolsActiveFunction & DebugJS.TOOLS_ACTIVE_FNC_MEMO) &&
        (ctx.memoBasePanel != null)) {
      ctx.toolsBodyPanel.removeChild(ctx.memoBasePanel);
    }
  },

  toggleScriptMode: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_SCRIPT) {
      ctx.disableScriptEditor();
    } else {
      ctx.enableScriptEditor();
    }
  },

  enableScriptEditor: function() {
    var ctx = DebugJS.ctx;
    ctx.status |= DebugJS.STATE_SCRIPT;
    if (ctx.scriptPanel == null) {
      ctx.scriptPanel = document.createElement('div');
      ctx.scriptPanel.className = ctx.id + '-overlay-panel';
      var html = '<div class="' + ctx.id + '-btn ' + ctx.id + '-nomove" ' +
      'style="position:relative;top:-1px;float:right;' +
      'font-size:' + (18 * ctx.options.zoom) + 'px;color:#888" ' +
      'onclick="DebugJS.ctx.disableScriptEditor();" ' +
      'onmouseover="this.style.color=\'#d88\';" ' +
      'onmouseout="this.style.color=\'#888\';">x</div>' +
      '<span style="color:#ccc">Script Editor</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="float:right;margin-right:4px" onclick="DebugJS.ctx.execScript();">[EXEC]</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:4px" onclick="DebugJS.ctx.insertSnippet()">[CLR]</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:8px" onclick="DebugJS.ctx.insertSnippet(0)">{CODE1}</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:4px" onclick="DebugJS.ctx.insertSnippet(1)">{CODE2}</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:4px" onclick="DebugJS.ctx.insertSnippet(2)">{CODE3}</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:4px" onclick="DebugJS.ctx.insertSnippet(3)">{CODE4}</span>' +
      '<span class="' + ctx.id + '-btn ' + ctx.id + '-nomove" style="margin-left:4px" onclick="DebugJS.ctx.insertSnippet(4)">{CODE5}</span>';
      ctx.scriptPanel.innerHTML = html;
      ctx.addOverlayPanel(ctx.scriptPanel);
      ctx.scriptEditor = document.createElement('textarea');
      ctx.scriptEditor.className = ctx.id + '-editor';
      ctx.scriptEditor.onblur = DebugJS.ctx.saveScriptBuf;
      ctx.scriptEditor.value = ctx.scriptBuf;
      ctx.scriptPanel.appendChild(ctx.scriptEditor);
    }
    ctx.updateScriptBtn();
    ctx.scriptEditor.focus();
  },

  addOverlayPanel: function(panel) {
    var ctx = DebugJS.ctx;
    if (ctx.overlayBasePanel == null) {
      ctx.collapseLogPanel();
      ctx.overlayBasePanel = document.createElement('div');
      ctx.overlayBasePanel.className = ctx.id + '-overlay-base-panel';
      //ctx.mainPanel.insertBefore(ctx.overlayBasePanel, ctx.logPanel); //bottom position
      ctx.mainPanel.appendChild(ctx.overlayBasePanel);
    }
    ctx.overlayBasePanel.appendChild(panel);
    ctx.overlayPanels.push(panel);
  },

  removeOverlayPanel: function(panel) {
    var ctx = DebugJS.ctx;
    if (ctx.overlayBasePanel != null) {
      for (var i = 0; i < ctx.overlayPanels.length; i++) {
        if (ctx.overlayPanels[i] == panel) {
          ctx.overlayPanels.splice(i, 1);
          ctx.overlayBasePanel.removeChild(panel);
          break;
        }
      }
      if (ctx.overlayPanels.length == 0) {
        ctx.mainPanel.removeChild(ctx.overlayBasePanel);
        ctx.overlayBasePanel = null;
        ctx.expandLogPanel();
      }
    }
  },

  addOverlayPanelFull: function(panel) {
    DebugJS.ctx.mainPanel.appendChild(panel);
  },

  removeOverlayPanelFull: function(panel) {
    DebugJS.ctx.mainPanel.removeChild(panel);
  },

  insertSnippet: function(n) {
    var ctx = DebugJS.ctx;
    var editor = ctx.scriptEditor;
    if (n == undefined) {
      editor.value = '';
      editor.focus();
    } else {
      var code = DebugJS.SNIPPET[n];
      var buf = editor.value;
      var posCursole = editor.selectionStart;
      var leftBuf = buf.substr(0, posCursole);
      var rightBuf = buf.substr(posCursole, buf.length);
      buf = leftBuf + code + rightBuf;
      ctx.scriptEditor.focus();
      ctx.scriptEditor.value = buf;
      editor.selectionStart = editor.selectionEnd = posCursole + code.length;
    }
  },

  saveScriptBuf: function() {
    DebugJS.ctx.scriptBuf = DebugJS.ctx.scriptEditor.value;
  },

  execScript: function() {
    DebugJS.ctx.execCode(DebugJS.ctx.scriptBuf);
  },

  execCode: function(code) {
    if (code == '') return;
    try {
      var ret = eval(code);
      DebugJS.log.res(ret);
    } catch (e) {
      DebugJS.log.e(e);
    }
  },

  disableScriptEditor: function() {
    DebugJS.ctx.stopScript();
    DebugJS.ctx.updateScriptBtn();
  },

  stopScript: function() {
    var ctx = DebugJS.ctx;
    if (ctx.scriptPanel != null) {
      ctx.removeOverlayPanel(ctx.scriptPanel);
      ctx.scriptPanel = null;
    }
    ctx.status &= ~DebugJS.STATE_SCRIPT;
  },

  isOnDebugWindow: function(x, y) {
    var sizePos = DebugJS.ctx.getSelfSizePos();
    if (((x >= sizePos.x1) && (x <= sizePos.x2)) && ((y >= sizePos.y1) && (y <= sizePos.y2))) {
      return true;
    }
    return false;
  },

  getSelfSizePos: function() {
    var ctx = DebugJS.ctx;
    var rect = ctx.dbgWin.getBoundingClientRect();
    var resizeBoxSize = 6;
    var sizePos = {};
    sizePos.w = ctx.dbgWin.clientWidth;
    sizePos.h = ctx.dbgWin.clientHeight;
    sizePos.x1 = rect.left - resizeBoxSize / 2;
    sizePos.y1 = rect.top - resizeBoxSize / 2;
    sizePos.x2 = sizePos.x1 + ctx.dbgWin.clientWidth + resizeBoxSize + DebugJS.WIN_BORDER;
    sizePos.y2 = sizePos.y1 + ctx.dbgWin.clientHeight + resizeBoxSize + DebugJS.WIN_BORDER;
    return sizePos;
  },

  setSelfSizeW: function(w) {
    var ctx = DebugJS.ctx;
    ctx.dbgWin.style.width = w + 'px';
    ctx.resizeMainHeight();
    ctx.resizeImgPreview();
  },

  setSelfSizeH: function(h) {
    var ctx = DebugJS.ctx;
    ctx.dbgWin.style.height = h + 'px';
    ctx.resizeMainHeight();
    ctx.resizeImgPreview();
  },

  expandHight: function(height) {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_DYNAMIC) {
      ctx.saveExpandModeOrgSizeAndPos();
      var clientHeight = document.documentElement.clientHeight;
      var sizePos = ctx.getSelfSizePos();
      if (sizePos.h >= height) {
        return;
      } else if (clientHeight <= height) {
        height = clientHeight;
      }
      ctx.setSelfSizeH(height);
      sizePos = ctx.getSelfSizePos();
      if (ctx.status & DebugJS.STATE_POS_AUTO_ADJUST) {
        ctx.adjustDebugWindowPos();
      } else {
        if (sizePos.y2 > clientHeight) {
          if (clientHeight < (height + ctx.options.adjPosY)) {
            ctx.dbgWin.style.top = 0;
          } else {
            var top = clientHeight - height - ctx.options.adjPosY;
            ctx.dbgWin.style.top = top + 'px';
          }
        }
      }
    }
  },

  expandHightIfNeeded: function(height) {
    var ctx = DebugJS.ctx;
    if (ctx.windowExpandCnt == 0) {
      ctx.expandHight(height);
    }
    ctx.windowExpandCnt++;
  },

  resetExpandedHeight: function() {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_DYNAMIC) {
      ctx.dbgWin.style.width = ctx.expandModeOrg.w + 'px';
      ctx.dbgWin.style.height = ctx.expandModeOrg.h + 'px';
      ctx.resizeMainHeight();
      ctx.resizeImgPreview();
      ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
      if (ctx.status & DebugJS.STATE_POS_AUTO_ADJUST) {
        ctx.adjustDebugWindowPos();
      }
    }
  },

  resetExpandedHeightIfNeeded: function() {
    var ctx = DebugJS.ctx;
    ctx.windowExpandCnt--;
    if (ctx.windowExpandCnt == 0) {
      ctx.resetExpandedHeight();
    }
  },

  saveExpandModeOrgSizeAndPos: function() {
    var ctx = DebugJS.ctx;
    var shadow = (ctx.status & DebugJS.STATE_DYNAMIC) ? (DebugJS.WIN_SHADOW / 2) : 0;
    ctx.expandModeOrg.w = (ctx.dbgWin.offsetWidth + DebugJS.WIN_BORDER - shadow);
    ctx.expandModeOrg.h = (ctx.dbgWin.offsetHeight + DebugJS.WIN_BORDER - shadow);
    ctx.expandModeOrg.t = ctx.dbgWin.offsetTop;
    ctx.expandModeOrg.l = ctx.dbgWin.offsetLeft;
  },

  turnLed: function(pos, active) {
    var ctx = DebugJS.ctx;
    var bit = DebugJS.LED_BIT[pos];
    if (active) {
      ctx.led |= bit;
    } else {
      ctx.led &= ~bit;
    }
    ctx.updateLedPanel();
  },

  setLed: function(val) {
    var ctx = DebugJS.ctx;
    try {
      ctx.led = eval(val);
      ctx.updateLedPanel();
    } catch (e) {
      DebugJS.log.e('invalid value');
    }
  },

  setMsg: function(msg) {
    DebugJS.ctx.msgString = msg;
    DebugJS.ctx.updateMsgPanel();
  },

  execCmd: function() {
    var ctx = DebugJS.ctx;
    var cl = ctx.cmdLine.value;
    ctx.cmdLine.value = '';
    if (cl == '') {
      DebugJS.log('');
      return;
    }
    if (cl.substr(0, 2) == '!!') {
      var event = ctx.getLastHistory();
      if (event == '') {
        DebugJS.log.w('!!: event not found');
        return;
      }
      cl = event + cl.substr(2);
    } else if (cl.substr(0, 1) == '!') {
      var str = cl.substr(1).match(/(\d*)(.*)/);
      var num = str[1];
      var arg = str[2];
      if (num != '') {
        var event = ctx.getHistory((num | 0) - 1);
        if (event == '') {
          DebugJS.log.w('!' + num + ': event not found');
          return;
        }
        cl = event + arg;
      } else if (arg != '') {
        cl = '!' + arg;
      }
    }
    ctx.saveHistory(cl);
    ctx._execCmd(cl, true);
  },

  _execCmd: function(str, echo) {
    var ctx = DebugJS.ctx;
    if (echo) {
      var echoStr = str;
      echoStr = DebugJS.escTag(echoStr);
      echoStr = DebugJS.trimDownText(echoStr, DebugJS.CMD_ECHO_MAX_LEN, 'color:#aaa');
      DebugJS.log.s(echoStr);
    }
    var cmd, arg;
    var cmds = DebugJS.splitCmdLineInTwo(str);
    cmd = cmds[0];
    arg = cmds[1];

    var found = false;
    for (var i = 0, len = ctx.CMD_TBL.length; i < len; i++) {
      if (cmd == ctx.CMD_TBL[i].cmd) {
        found = true;
        ctx.CMD_TBL[i].fnc(arg, ctx.CMD_TBL[i]);
        break;
      }
    }

    if (ctx.options.disableAllCommands) {
      return;
    }

    if ((!found) && (str.match(/^\s*http/))) {
      DebugJS.ctx.doHttpRequest('GET', str);
      return;
    }

    if (!found) {
      found = ctx.cmdRadixConv(str);
    }

    if (!found) {
      found = ctx.cmdTimeCalc(str);
    }

    if ((!found) && (str.match(/^\s*U\+/i))) {
      ctx.cmdUnicode('-d ' + str);
      return;
    }

    if (!found) {
      ctx.execCode(str);
    }
  },

  cmdBase64: function(arg, tbl) {
    DebugJS.ctx.execDecodeAndEncode(arg, tbl, DebugJS.decodeBase64, DebugJS.encodeBase64);
  },

  cmdBin: function(arg, tbl) {
    var data = DebugJS.ctx.radixCmd(arg, tbl);
    if (data == null) {
      return;
    }
    try {
      ret = DebugJS.convertBin(data);
      DebugJS.log(ret);
    } catch (e) {
      DebugJS.log.e('invalid value');
    }
  },

  cmdCls: function(arg, tbl) {
    DebugJS.ctx.clearMessage();
  },

  cmdDate: function(arg, tbl) {
    var d = DebugJS.date(arg);
    DebugJS.log.res(d);
  },

  cmdDumpLog: function(arg, tbl) {
    var l;
    if (DebugJS.omitLeadingAndTrailingWhiteSpace(arg) == '-b64') {
      l = DebugJS.dumpLog('json', true);
    } else {
      l = DebugJS.dumpLog('json');
    }
    DebugJS.log.res(l);
  },

  cmdElements: function(arg, tbl) {
    arg = DebugJS.omitLeadingAndTrailingWhiteSpace(arg);
    if ((arg == '-h') || (arg == '--help')) {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.countElements(arg, true);
    }
  },

  cmdExecute: function(arg, tbl) {
    DebugJS.ctx.execScript();
  },

  cmdExit: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    ctx.closeFeatures();
    if (ctx.options.useSuspendLogButton) {
      ctx.status &= ~DebugJS.STATE_LOG_SUSPENDING;
      ctx.updateSuspendLogBtn();
    }
    if (ctx.status & DebugJS.STATE_STOPWATCH_RUNNING) {
      ctx.stopStopWatch();
    }
    ctx.resetStopWatch();
    ctx.setLed(0);
    ctx.setMsg('');
    if (ctx.status & DebugJS.STATE_DYNAMIC) {
      if (ctx.options.usePinButton) {
        ctx.enableDraggable();
      }
      if (!ctx.options.mode == 'kiosk') {
        ctx.resetDebugWindowSizePos();
        ctx.updateWinCtrlBtnPanel();
      }
    }
    ctx.scriptBuf = '';
    ctx.filterText = '';
    if (ctx.filterInput) ctx.filterInput.value = '';
    ctx.closeDebugWindow();
    ctx.clearMessage();
    ctx.logFilter = DebugJS.LOG_FILTER_ALL;
    ctx.updateLogFilterButtons();
  },

  cmdHelp: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var str = 'Available Commands:\n<table>';
    for (var i = 0, len = ctx.CMD_TBL.length; i < len; i++) {
      if (!(ctx.CMD_TBL[i].attr & DebugJS.CMD_ATTR_HIDDEN)) {
        if (i == ctx.intCmdTblLen) {
          str += '<tr><td colspan="2">---- ---- ---- ---- ---- ---- ---- ----</td></tr>';
        }
        var style1 = '';
        var style2 = '';
        if (ctx.CMD_TBL[i].attr & DebugJS.CMD_ATTR_DISABLED) {
          style1 = '<span style="color:#aaa">';
          style2 = '</span>';
        }
        str += '<tr><td>' + style1 + ctx.CMD_TBL[i].cmd + style2 + '</td><td>' + style1 + ctx.CMD_TBL[i].desc + style2 + '</td></tr>';
      }
    }
    str += '</table>';
    DebugJS.log.mlt(str);
  },

  cmdHex: function(arg, tbl) {
    var data = DebugJS.ctx.radixCmd(arg, tbl);
    if (data == null) {
      return;
    }
    try {
      var v2 = '';
      var v16 = '';
      var val = eval(data.exp);
      if (val < 0) {
        for (var i = (DebugJS.DEFAULT_UNIT - 1); i >= 0; i--) {
          v2 += (val & 1 << i) ? '1' : '0';
        }
        v16 = parseInt(v2, 2).toString(16);
      } else {
        v16 = parseInt(val).toString(16);
      }
      var hex = DebugJS.formatHex(v16, false, true);
      var ret = hex;
      if (data.digit > 0) {
        if (hex.length > data.digit) {
          ret = hex.slice(data.digit * -1);
          var omit = hex.substr(0, hex.length - data.digit);
          ret = '<span style="color:#888">' + omit + '</span>' + ret;
        } else if (hex.length < data.digit) {
          var padding = data.digit - hex.length;
          var zero = '';
          for (var i = 0; i < padding; i++) {
            zero += ((val < 0) ? 'F' : '0');
          }
          ret = zero + hex;
        }
      }
      ret = '0x' + ret;
      DebugJS.log(ret);
    } catch (e) {
      DebugJS.log.e('invalid value');
    }
  },

  radixCmd: function(arg, tbl) {
    var args = DebugJS.splitArgs(arg);
    if (args[0] == '') {
      DebugJS.printUsage(tbl.usage);
      return null;
    }
    var argLen = args.length;
    var digit = 0;
    var exp = args[0];
    if (argLen == 2) {
      digit = args[1];
    } else if (argLen >= 3) {
      if (args[0].match(/^\(/)) {
        var expLen;
        if (args[argLen - 2].match(/\)$/)) {
          digit = args[argLen - 1];
          expLen = argLen - 1;
        } else if (args[argLen - 1].match(/\)$/)) {
          expLen = argLen;
        } else {
          DebugJS.log.e('invalid value');
          return null;
        }
        exp = '';
        for (var i = 0; i < expLen; i++) {
          exp += ((i >= 1) ? ' ' : '') + args[i];
        }
      } else {
        DebugJS.log.e('invalid value');
        return null;
      }
    }
    var data = {
      exp: exp,
      digit: (digit | 0)
    };
    return data;
  },

  cmdHistory: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var args = DebugJS.parseArgs(arg);
    try {
      if ((args.opt == '') && (args.data == '')) {
        ctx.showHistory();
      } else if (args.opt == 'c') {
        ctx.clearHistory();
      } else if (args.opt == 'd') {
        ctx.delHistory(args.data);
      } else {
        DebugJS.printUsage(tbl.usage);
      }
    } catch (e) {
      DebugJS.log.e(e);
    }
  },

  initHistory: function() {
    var ctx = DebugJS.ctx;
    if (ctx.cmdHistoryBuf == null) {
      ctx.CMD_HISTORY_MAX = ctx.options.cmdHistoryMax;
      ctx.cmdHistoryBuf = new DebugJS.RingBuffer(ctx.CMD_HISTORY_MAX);
    }
    if (DebugJS.LS_AVAILABLE) {
      ctx.loadHistory();
    }
  },

  showHistory: function() {
    var bf = DebugJS.ctx.cmdHistoryBuf.getAll();
    var str = '<table>';
    for (var i = 0, len = bf.length; i < len; i++) {
      var cmd = bf[i];
      cmd = DebugJS.escTag(cmd);
      cmd = DebugJS.trimDownText(cmd, DebugJS.CMD_ECHO_MAX_LEN, 'color:#aaa');
      str += '<tr><td style="vertical-align:top;text-align:right;white-space:nowrap">' + (i + 1) + '</td><td>' + cmd + '</td></tr>';
    }
    str += '</table>';
    DebugJS.log.mlt(str);
  },

  saveHistory: function(cmd) {
    var ctx = DebugJS.ctx;
    ctx.cmdHistoryBuf.add(cmd);
    ctx.cmdHistoryIdx = (ctx.cmdHistoryBuf.count() < ctx.CMD_HISTORY_MAX) ? ctx.cmdHistoryBuf.count() : ctx.CMD_HISTORY_MAX;
    if (DebugJS.LS_AVAILABLE) {
      var bf = ctx.cmdHistoryBuf.getAll();
      var cmds = '';
      for (var i = 0, len = bf.length; i < len; i++) {
        cmds += bf[i] + '\n';
      }
      localStorage.setItem('DebugJS-history', cmds);
    }
  },

  loadHistory: function() {
    var ctx = DebugJS.ctx;
    if (DebugJS.LS_AVAILABLE) {
      var bf = localStorage.getItem('DebugJS-history');
      if (bf != null) {
        var cmds = bf.split('\n');
        for (var i = 0, len = (cmds.length - 1); i < len; i++) {
          ctx.cmdHistoryBuf.add(cmds[i]);
          ctx.cmdHistoryIdx = (ctx.cmdHistoryBuf.count() < ctx.CMD_HISTORY_MAX) ? ctx.cmdHistoryBuf.count() : ctx.CMD_HISTORY_MAX;
        }
      }
    }
  },

  getHistory: function(idx) {
    var cmds = DebugJS.ctx.cmdHistoryBuf.getAll();
    var cmd = cmds[idx];
    return ((cmd == undefined) ? '' : cmd);
  },

  getLastHistory: function() {
    var cmds = DebugJS.ctx.cmdHistoryBuf.getAll();
    var cmd = cmds[cmds.length - 1];
    return ((cmd == undefined) ? '' : cmd);
  },

  delHistory: function(idx) {
    var ctx = DebugJS.ctx;
    var cmds = ctx.cmdHistoryBuf.getAll();
    ctx.clearHistory();
    for (var i = 0; i < cmds.length; i++) {
      if (cmds.length < ctx.options.cmdHistoryMax) {
        if (i != (idx - 1)) {
          ctx.saveHistory(cmds[i]);
        }
      } else if (cmds.length >= ctx.options.cmdHistoryMax) {
        if (i != (idx - 2)) {
          ctx.saveHistory(cmds[i]);
        }
      }
    }
  },

  clearHistory: function() {
    DebugJS.ctx.cmdHistoryBuf.clear();
    if (DebugJS.LS_AVAILABLE) {
      localStorage.removeItem('DebugJS-history');
    }
  },

  cmdHttp: function(arg, tbl) {
    args = DebugJS.splitCmdLineInTwo(arg);
    var method = args[0];
    var data = args[1];
    if (method == '') {
      DebugJS.printUsage(tbl.usage);
      return;
    } else if (method.match(/^\s*http/)) {
      method = 'GET';
      data = arg;
    }
    DebugJS.ctx.doHttpRequest(method, data);
  },

  cmdJson: function(arg, tbl) {
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var json = DebugJS.omitLeadingWhiteSpace(arg);
      var lv = 0;
      var jsnFlg = true;
      if (json.substr(0, 1) == '-') {
        var opt = json.match(/-p\s/);
        if (opt != null) jsnFlg = false;
        opt = json.match(/-l(\d+)/);
        if (opt) lv = opt[1];
        json = json.match(/({.*)/);
        if (json) {
          json = json[1];
        }
      }
      if (json) {
        DebugJS.execCmdJson(json, jsnFlg, lv);
      } else {
        DebugJS.printUsage(tbl.usage);
      }
    }
  },

  cmdJquery: function(arg, tbl) {
    if (typeof jQuery == 'undefined') {
      DebugJS.log.w('jQuery is not loaded.');
    } else {
      DebugJS.log('jQuery v' + jQuery.fn.jquery);
    }
  },

  cmdKeys: function(arg, tbl) {
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var args = arg.split(' ');
      for (var i = 0, len = args.length; i < len; i++) {
        if (args[i] == '') continue;
        var cmd = 'DebugJS.buf="' + args[i] + ' = ";DebugJS.buf+=DebugJS.getKeysStr(' + args[i] + ');DebugJS.log.mlt(DebugJS.buf);';
        try {
          eval(cmd);
        } catch (e) {
          DebugJS.log.e(e);
        }
      }
    }
  },

  cmdLaptime: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    if (ctx.status & DebugJS.STATE_STOPWATCH_LAPTIME) {
      ctx.stopStopWatch();
    } else {
      if (ctx.status & DebugJS.STATE_STOPWATCH_RUNNING) {
        ctx.stopStopWatch();
        ctx.resetStopWatch();
      }
      ctx.status |= DebugJS.STATE_STOPWATCH_LAPTIME;
      ctx.startStopWatch();
    }
  },

  cmdLaunch: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var args = DebugJS.splitArgs(arg);
    var func = args[0];
    var subfunc = args[1];
    var opt = args[2];
    if (func == '') {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    switch (func) {
      case 'measure':
        ctx.enableMeasureMode();
        break;
      case 'sys':
        ctx.enableSystemInfo();
        break;
      case 'html':
        ctx.enableHtmlSrc();
        break;
      case 'dom':
        ctx.enableElmInfo();
        break;
      case 'js':
        ctx.enableScriptEditor();
        break;
      case 'tool':
        var kind;
        var param;
        switch (subfunc) {
          case 'timer':
            kind = DebugJS.TOOLS_ACTIVE_FNC_TIMER;
            break;
          case 'text':
            kind = DebugJS.TOOLS_ACTIVE_FNC_TEXT;
            break;
          case 'html':
            kind = DebugJS.TOOLS_ACTIVE_FNC_HTML;
            break;
          case 'file':
            kind = DebugJS.TOOLS_ACTIVE_FNC_FILE;
            if (opt == 'bin') {
              param = DebugJS.FILE_LOAD_FORMAT_BIN;
            } else {
              param = DebugJS.FILE_LOAD_FORMAT_B64;
            }
            break;
          case 'memo':
            kind = DebugJS.TOOLS_ACTIVE_FNC_MEMO;
            break;
          default:
            DebugJS.printUsage(tbl.usage);
            return;
        }
        ctx.enableTools();
        ctx.switchToolsFunction(kind, param);
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },

  cmdLed: function(arg, tbl) {
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.ctx.setLed(arg);
    }
  },

  cmdMsg: function(arg, tbl) {
    DebugJS.ctx.setMsg(arg);
  },

  cmdP: function(arg, tbl) {
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.execCmdP(arg);
    }
  },

  cmdPos: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var args = DebugJS.parseArgs(arg);
    var pos = args.data;
    switch (pos) {
      case 'n':
      case 'ne':
      case 'e':
      case 'se':
      case 's':
      case 'sw':
      case 'w':
      case 'nw':
      case 'c':
        var sizePos = ctx.getSelfSizePos();
        ctx.setWindowPosition(pos, sizePos.w, sizePos.h);
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },

  cmdProp: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    arg = DebugJS.omitLeadingWhiteSpace(arg);
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      var name = arg;
      if (ctx.properties[name] != undefined) {
        DebugJS.log.res(ctx.properties[name].value);
      } else {
        DebugJS.log.e(name + ' is invalid property name.');
      }
    }
  },

  cmdProps: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var str = 'Available properties:\n<table>';
    for (var key in ctx.properties) {
      str += '<tr><td>' + key + '</td><td>' + ctx.properties[key].value + '</td></tr>';
    }
    str += '</table>';
    DebugJS.log.mlt(str);
  },

  cmdRandom: function(arg, tbl) {
    var args = DebugJS.splitArgs(arg);
    var type = args[0] || DebugJS.RANDOM_TYPE_NUM;
    var min, max;
    if (args[0] == '') {
      type = DebugJS.RANDOM_TYPE_NUM;
    } else {
      if ((args[0] == DebugJS.RANDOM_TYPE_NUM) || (args[0] == DebugJS.RANDOM_TYPE_STR)) {
        type = args[0];
        min = args[1];
        max = args[2];
      } else if (args[0].match(/[0-9]{1,}/)) {
        type = DebugJS.RANDOM_TYPE_NUM;
        min = args[0];
        max = args[1];
      } else {
        DebugJS.printUsage(tbl.usage);
      }
    }
    var random = DebugJS.getRandom(type, min, max);
    DebugJS.log(random);
  },

  cmdRadixConv: function(v) {
    v = DebugJS.omitLeadingAndTrailingWhiteSpace(v);
    var rdx = DebugJS.checkRadix(v);
    if (rdx == 10) {
      v = v.replace(/,/g, '');
      DebugJS.convRadixFromDEC(v);
      return true;
    } else if (rdx == 16) {
      DebugJS.convRadixFromHEX(v.substr(2));
      return true;
    } else if (rdx == 2) {
      DebugJS.convRadixFromBIN(v.substr(2));
      return true;
    } else {
      return false;
    }
  },

  cmdRGB: function(arg, tbl) {
    arg = DebugJS.omitLeadingAndTrailingWhiteSpace(arg);
    arg = arg.replace(/\s{2,}/g, ' ');
    if (arg == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      DebugJS.convRGB(arg);
    }
  },

  cmdLoad: function(arg, tbl) {
    var args = DebugJS.parseArgs(arg);
    if (args.data == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      try {
        switch (args.opt) {
          case 'b64':
            DebugJS.loadLog(args.data, true);
            break;
          default:
            DebugJS.loadLog(args.data);
        }
        DebugJS.ctx.printLogMsg();
      } catch (e) {
        DebugJS.log.e(e);
      }
    }
  },

  cmdSelf: function(arg, tbl) {
    var sizePos = DebugJS.ctx.getSelfSizePos();
    var str = 'width : ' + sizePos.w + '\n' +
    'height: ' + sizePos.h + '\n' +
    'posX1 : ' + sizePos.x1 + '\n' +
    'posY1 : ' + sizePos.y1 + '\n' +
    'posX2 : ' + sizePos.x2 + '\n' +
    'posY2 : ' + sizePos.y2 + '\n';
    DebugJS.log.mlt(str);
  },

  cmdSet: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var args = DebugJS.splitArgs(arg);
    var name = args[0];
    var value = ((args[1] == undefined) ? '' : args[1]);
    if ((name == '') || (value == '')) {
      DebugJS.printUsage(tbl.usage);
      return;
    }
    if (ctx.properties[name] != undefined) {
      if (ctx.properties[name].restriction != undefined) {
        if (!value.match(ctx.properties[name].restriction)) {
          DebugJS.log.e(value + ' is invalid.');
          return;
        }
      }
      ctx.properties[name].value = value;
      DebugJS.log.res(value);
    } else {
      DebugJS.log.e(name + ' is invalid property name.');
    }
  },

  cmdTimeCalc: function(arg) {
    var wkArg = arg.replace(/\s{2,}/g, ' ');
    if (!wkArg.match(/\d{1,}:{1}\d{2}/)) {
      return false;
    }
    wkArg = wkArg.replace(/\s/g, '');
    var op;
    if (wkArg.indexOf('-') >= 0) {
      op = '-';
    } else if (wkArg.indexOf('+') >= 0) {
      op = '+';
    }
    var vals = wkArg.split(op);
    if (vals.length < 2) {
      return false;
    }
    var timeL = DebugJS.convertTimeJson(vals[0]);
    var timeR = DebugJS.convertTimeJson(vals[1]);
    if ((timeL == null) || (timeR == null)) {
      DebugJS.log.e('Invalid time format');
      return true;
    }
    var byTheDay = (vals[2] == undefined);
    var ret;
    if (op == '-') {
      ret = DebugJS.subTime(timeL, timeR, byTheDay);
    } else if (op == '+') {
      ret = DebugJS.addTime(timeL, timeR, byTheDay);
    }
    DebugJS.log.res(ret);
    return true;
  },

  cmdTimer: function(arg, tbl) {
    var args = DebugJS.splitArgs(arg);
    var operation = args[0];
    var timerName = args[1];
    if (timerName == undefined) timerName = DebugJS.DEFAULT_TIMER_NAME;
    switch (operation) {
      case 'start':
        DebugJS.timeStart(timerName);
        break;
      case 'split':
        DebugJS.timeSplit(timerName, false);
        break;
      case 'stop':
        DebugJS.timeEnd(timerName);
        break;
      case 'list':
        DebugJS.timeList();
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },

  cmdStopwatch: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var args = DebugJS.splitArgs(arg);
    switch (args[0]) {
      case 'start':
        ctx.startStopWatch();
        break;
      case 'stop':
        ctx.stopStopWatch();
        break;
      case 'reset':
        ctx.resetStopWatch();
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },

  cmdUnicode: function(arg, tbl) {
    DebugJS.ctx.execDecodeAndEncode(arg, tbl, DebugJS.decodeUnicode, DebugJS.encodeUnicode);
  },

  cmdUri: function(arg, tbl) {
    DebugJS.ctx.execDecodeAndEncode(arg, tbl, DebugJS.decodeUri, DebugJS.encodeUri, DebugJS.decodeUri);
  },

  cmdV: function(arg, tbl) {
    DebugJS.log(DebugJS.ctx.v);
  },

  cmdWin: function(arg, tbl) {
    var args = DebugJS.parseArgs(arg);
    var size = args.data;
    switch (size) {
      case 'min':
      case 'normal':
      case 'max':
      case 'full':
      case 'expand':
      case 'restore':
      case 'reset':
        DebugJS.ctx.setWindowSize(size);
        break;
      default:
        DebugJS.printUsage(tbl.usage);
    }
  },

  setWindowSize: function(opt) {
    var ctx = DebugJS.ctx;
    switch (opt) {
      case 'min':
        ctx.saveSize();
        ctx.savePosNone();
        ctx.setDebugWindowSize(ctx.computedMinW, ctx.computedMinH);
        ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
        ctx.status &= ~DebugJS.STATE_POS_AUTO_ADJUST;
        ctx.sizeStatus = DebugJS.SIZE_ST_MIN;
        ctx.updateWinCtrlBtnPanel();
        break;
      case 'normal':
        var w = (ctx.initWidth - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
        var h = (ctx.initHeight - (DebugJS.WIN_SHADOW / 2) + DebugJS.WIN_BORDER);
        ctx.setDebugWindowSize(w, h);
        ctx.sizeStatus = DebugJS.SIZE_ST_NORMAL;
        ctx.updateWinCtrlBtnPanel();
        ctx.logPanel.scrollTop = ctx.logPanel.scrollHeight;
        break;
      case 'max':
        ctx.expandDebugWindow(false);
        ctx.updateWinCtrlBtnPanel();
        break;
      case 'full':
        ctx.saveSizeAndPos();
        ctx.setDebugWindowFull();
        ctx.updateWinCtrlBtnPanel();
        break;
      case 'expand':
        ctx.expandDebugWindow(true);
        ctx.updateWinCtrlBtnPanel();
        break;
      case 'restore':
        if (ctx.sizeStatus != DebugJS.SIZE_ST_NORMAL) {
          ctx.restoreDebugWindow();
          ctx.updateWinCtrlBtnPanel();
        }
        break;
      case 'reset':
        ctx.resetDebugWindowSizePos();
        ctx.updateWinCtrlBtnPanel();
        break;
    }
  },

  cmdZoom: function(arg, tbl) {
    var ctx = DebugJS.ctx;
    var args = DebugJS.parseArgs(arg);
    var zoom = args.data;
    if (zoom == '') {
      DebugJS.printUsage(tbl.usage);
    } else if (zoom != ctx.options.zoom) {
      var restoreOption = {
        cause: DebugJS.INIT_CAUSE_ZOOM,
        status: ctx.status,
        sizeStatus: ctx.sizeStatus
      };
      ctx.closeFeatures();
      ctx.setWindowSize('normal');
      ctx.init({zoom: zoom}, restoreOption);
    }
  },

  execDecodeAndEncode: function(arg, tbl, decodeFunc, encodeFunc, defaultFunc) {
    var args = DebugJS.parseArgs(arg);
    var res = '';
    if (args.data == '') {
      DebugJS.printUsage(tbl.usage);
    } else {
      try {
        switch (args.opt) {
          case '':
          case 'e':
            res = encodeFunc(args.dataRaw);
            break;
          case 'd':
            res = decodeFunc(args.dataRaw);
            break;
          default:
            DebugJS.printUsage(tbl.usage);
        }
        res = DebugJS.encloseStringIfNeeded(res);
        DebugJS.log.res(res);
      } catch (e) {
        DebugJS.log.e(e);
      }
    }
  },

  doHttpRequest: function(method, arg) {
    var args = DebugJS.splitCmdLineInTwo(arg);
    var url = args[0];
    var data = args[1];
    var user = '';
    var pass = '';
    if (url == '--user') {
      var parts = DebugJS.splitCmdLineInTwo(data);
      var auth = parts[0];
      var auths = auth.split(':');
      if (auths.length > 1) {
        user = auths[0];
        pass = auths[1];
        parts = DebugJS.splitCmdLineInTwo(parts[1]);
        url = parts[0];
        data = parts[1];
      }
    }
    data = DebugJS.encodeURIString(data);
    var req = 'Sending a ' + method + ' request.\n' +
    'URL : ' + url + '\n' +
    'Body: ' + ((data == '') ? '<span style="color:#ccc">null</span>' : data);
    if (user || pass) {
      req += '\nuser: ' + user + ':' + (pass ? '*' : '');
    }
    DebugJS.log(req);
    var request = {
      url: url,
      method: method,
      data: data,
      async: true,
      cache: false,
      user: user,
      pass: pass,
      //userAgent: 'Mozilla/5.0 (' + DebugJS.getBrowserType().name + ') DebugJS/1.0'
    };
    try {
      DebugJS.httpRequest(request, DebugJS.onHttpRequestDone);
    } catch (e) {
      DebugJS.log.e(e);
      var baseURI = document.baseURI;
      var regexp = new RegExp('^' + baseURI + '(.*?)');
      if (!url.match(regexp)) {
        DebugJS.log.w('Cross-Origin Request\nsource : ' + baseURI + '\nrequest: ' + url);
      }
    }
  },

  initExtension: function() {
    var ctx = DebugJS.ctx;
    if (DebugJS.x.CMD_TBL) {
      ctx.addCmdTbl(DebugJS.x.CMD_TBL);
    }
    for (var key in DebugJS.x) {
      if (DebugJS.x[key].CMD_TBL) {
        ctx.addCmdTbl(DebugJS.x[key].CMD_TBL);
      }
    }
  },

  addCmdTbl: function(table) {
    var ctx = DebugJS.ctx;
    for (var i = 0; i < table.length; i++) {
      if (ctx.existCmd(table[i].cmd)) {
        table[i].attr |= DebugJS.CMD_ATTR_DISABLED;
      }
      ctx.CMD_TBL.push(table[i]);
    }
  },

  existCmd: function(cmd) {
    var ctx = DebugJS.ctx;
    for (var i = 0; i < ctx.CMD_TBL.length; i++) {
      if (ctx.CMD_TBL[i].cmd == cmd) return true;
    }
    return false;
  }
};

DebugJS.RingBuffer = function(len) {
  if (len == undefined) len = 0;
  this.buffer = new Array(len);
  this.cnt = 0;
};

DebugJS.RingBuffer.prototype = {
  add: function(data) {
    var newIdx = (this.cnt % this.buffer.length);
    this.buffer[newIdx] = data;
    this.cnt++;
  },

  set: function(index, data) {
    this.buffer[index] = data;
  },

  get: function(index) {
    if (this.buffer.length < this.cnt) {
      index += this.cnt;
    }
    index %= this.buffer.length;
    return this.buffer[index];
  },

  getAll: function() {
    var allBuf = [];
    var bufLen = this.buffer.length;
    var pos = 0;
    if (this.cnt > bufLen) {
      pos = (this.cnt % bufLen);
    }
    for (var i = 0; i < bufLen; i++) {
      if (pos >= bufLen) {
        pos = 0;
      }
      if (this.buffer[pos] == undefined) {
        break;
      } else {
        allBuf[i] = this.buffer[pos];
        pos++;
      }
    }
    return allBuf;
  },

  clear: function() {
    this.buffer = new Array(this.buffer.length);
    this.cnt = 0;
    return;
  },

  count: function() {
    return this.cnt;
  },

  lastIndex: function() {
    var lastIdx = (this.cnt - 1) % this.buffer.length;
    return lastIdx;
  },

  getSize: function() {
    return this.buffer.length;
  }
};

// " 1  2 3  4 " -> [0]="1" [1]=" 2 3  4 "
DebugJS.splitCmdLineInTwo = function(str) {
  var res = [];
  var strs = str.match(/([^\s]{1,})\s(.*)/);
  if (strs == null) {
    res[0] = DebugJS.omitLeadingWhiteSpace(str);
    res[1] = '';
  } else {
    res[0] = strs[1];
    res[1] = strs[2];
  }
  return res;
};

// " 1  2 3  4 " -> [0]="1" [1]="2" [2]="3" [3]="4"
DebugJS.splitArgs = function(arg) {
  var wkArg = arg.replace(/\s{2,}/g, ' ');
  wkArg = wkArg.replace(/^\s/, '');
  var args = wkArg.split(' ');
  if ((args.length >= 2) && (args[args.length - 1] == '')) {
    args.pop();
  }
  return args;
};

// " 1  2 3  4 "
// opt: ""
// data: "1  2 3  4"
// dataRaw: " 1  2 3  4 "
//
// " -a  1  2 3  4 "
// opt: "a"
// data: "1  2 3  4"
// dataRaw: " 1  2 3  4 "
DebugJS.parseArgs = function(arg) {
  var args = {opt: '', data: '', dataRaw: ''};
  var wkArgs = DebugJS.omitLeadingWhiteSpace(arg);
  wkArgs = wkArgs.match(/-{1}([^\s]*)\s{0,1}(.*)/);
  if (wkArgs == null) {
    args.dataRaw = arg;
    args.data = DebugJS.omitLeadingAndTrailingWhiteSpace(arg);
  } else {
    args.opt = wkArgs[1];
    args.dataRaw = wkArgs[2];
    args.data = DebugJS.omitLeadingAndTrailingWhiteSpace(wkArgs[2]);
  }
  return args;
};

DebugJS.omitAllWhiteSpace = function(str) {
  return str.replace(/\s/g, '');
};

DebugJS.omitLeadingWhiteSpace = function(str) {
  return str.replace(/^\s{1,}/, '');
};

DebugJS.omitTrailingWhiteSpace = function(str) {
  return str.replace(/\s+$/, '');
};

DebugJS.omitLeadingAndTrailingWhiteSpace = function(str) {
  str = str.replace(/^\s{1,}/, '');
  str = str.replace(/\s+$/, '');
  return str;
};

DebugJS.encloseString = function(str) {
  return '<span style="color:#0ff">"</span>' + str + '<span style="color:#0ff">"</span>';
};

DebugJS.encloseStringIfNeeded = function(str) {
  str += '';
  if ((str.match(/^\s|^&#x3000/)) || (str.match(/\s$|&#x3000$/))) {
    str = DebugJS.encloseString(str);
  }
  return str;
};

DebugJS.getDateTime = function(dt) {
  if ((dt == undefined) || (dt === '')) {
    dt = new Date();
  } else if (!(dt instanceof Date)) {
    dt = new Date(dt);
  }
  var time = dt.getTime();
  var yyyy = dt.getFullYear();
  var mm = dt.getMonth() + 1;
  var dd = dt.getDate();
  var hh = dt.getHours();
  var mi = dt.getMinutes();
  var ss = dt.getSeconds();
  var ms = dt.getMilliseconds();
  var wd = dt.getDay();
  if (mm < 10) mm = '0' + mm;
  if (dd < 10) dd = '0' + dd;
  if (hh < 10) hh = '0' + hh;
  if (mi < 10) mi = '0' + mi;
  if (ss < 10) ss = '0' + ss;
  if (ms < 10) {ms = '00' + ms;}
  else if (ms < 100) {ms = '0' + ms;}
  var dateTime = {time: time, yyyy: yyyy, mm: mm, dd: dd, hh: hh, mi: mi, ss: ss, sss: ms, wday: wd};
  return dateTime;
};

DebugJS.date = function(arg) {
  arg = DebugJS.omitLeadingAndTrailingWhiteSpace(arg);
  var s;
  if ((arg == '') || isNaN(arg)) {
    var dt = DebugJS.getDateTime(arg);
    var tm = dt.time;
    if (!isNaN(tm)) {
      s = DebugJS.date(tm + '') + ' (' + tm + ')';
    }
  } else {
    arg = DebugJS.parseInt(arg);
    var dt = DebugJS.getDateTime(arg);
    s = DebugJS.getDateTimeStr(dt);
  }
  return s;
};

DebugJS.getDateTimeStr = function(d) {
  return (d.yyyy + '-' + d.mm + '-' + d.dd + ' ' + DebugJS.WDAYS[d.wday] + ' ' + d.hh + ':' + d.mi + ':' + d.ss + '.' + d.sss);
};

DebugJS.getLogTime = function() {
  var d = DebugJS.getDateTime();
  var t = d.hh + ':' + d.mi + ':' + d.ss + '.' + d.sss;
  return t;
};

DebugJS.parseTime = function(timeMs) {
  var wkPassedTimeSec = Math.floor(timeMs / 1000);
  var passedHour;
  if (wkPassedTimeSec >= 3600) {
    passedHour = Math.floor(wkPassedTimeSec / 3600);
    wkPassedTimeSec = (wkPassedTimeSec - (passedHour * 3600));
  } else {
    passedHour = 0;
  }
  var passedMin;
  if (wkPassedTimeSec >= 60) {
    passedMin = Math.floor(wkPassedTimeSec / 60);
    wkPassedTimeSec = (wkPassedTimeSec - (passedMin * 60));
  } else {
    passedMin = 0;
  }
  var passedSec = wkPassedTimeSec;
  var passedMsec = ('00' + timeMs).slice(-3);
  if (passedHour < 10) passedHour = '0' + passedHour;
  if (passedMin < 10) passedMin = '0' + passedMin;
  if (passedSec < 10) passedSec = '0' + passedSec;
  var tm = {
    hh: passedHour,
    mi: passedMin,
    ss: passedSec,
    sss: passedMsec
  };
  return tm;
};

DebugJS.getTimerStr = function(timeMs) {
  var tm = DebugJS.parseTime(timeMs);
  var ret = tm.hh + ':' + tm.mi + ':' + tm.ss + '.' + tm.sss;
  return ret;
};

DebugJS.checkModKey = function(e) {
  var shift = e.shiftKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var ctrl = e.ctrlKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var alt = e.altKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var meta = e.metaKey ? DebugJS.COLOR_ACTIVE : DebugJS.COLOR_INACTIVE;
  var metaKey = '<span style="color:' + shift + '">S</span><span style="color:' + ctrl + '">C</span><span style="color:' + alt + '">A</span><span style="color:' + meta + '">M</span>';
  return metaKey;
};

DebugJS.execCmdP = function(arg) {
  var args = arg.split(' ');
  var opt = args[0].match(/-l(\d+)/);
  var start = 0;
  var levelLimit = 0;
  var noMaxLimit = false;
  var valLenLimit = DebugJS.ctx.properties.dumpvallen.value;
  if (opt != null) {
    start = 1;
    levelLimit = opt[1];
  } else {
    if (args[0] == '-a') {
      start = 1;
      noMaxLimit = true;
    }
  }
  for (var i = start, len = args.length; i < len; i++) {
    if (args[i] == '') continue;
    var cmd = 'DebugJS.buf="' + args[i] + ' = ";DebugJS.buf+=DebugJS.objDump(' + args[i] + ', false, ' + levelLimit + ', ' + noMaxLimit + ', ' + valLenLimit + ');DebugJS.log.mlt(DebugJS.buf);';
    try {
      eval(cmd);
    } catch (e) {
      DebugJS.log.e(e);
    }
  }
};

DebugJS.INDENT_SP = ' ';
DebugJS.objDump = function(obj, toJson, levelLimit, noMaxLimit, valLenLimit) {
  if (levelLimit == undefined) {
    levelLimit = 0;
  }
  var arg = {lv: 0, cnt: 0, dump: ''};
  if (typeof obj === 'function') {
    arg.dump += '<span style="color:#4c4">function</span>()\n';
  }
  var ret = DebugJS._objDump(obj, arg, toJson, levelLimit, noMaxLimit, valLenLimit);
  if ((!noMaxLimit) && (ret.cnt >= DebugJS.ctx.properties.dumplimit.value)) {
    DebugJS.log.w('The object is too large. (>=' + ret.cnt + ')');
  }
  ret.dump = ret.dump.replace(/: {2,}\{/g, ': {');
  ret.dump = ret.dump.replace(/\[\n {2,}\]/g, '\[\]');
  return ret.dump;
};

DebugJS._objDump = function(obj, arg, toJson, levelLimit, noMaxLimit, valLenLimit) {
  try {
    if ((levelLimit >= 1) && (arg.lv > levelLimit)) {
      return arg;
    }
    if ((!noMaxLimit) && (arg.cnt >= DebugJS.ctx.properties.dumplimit.value)) {
      if ((typeof obj !== 'function') || (Object.keys(obj).length > 0)) {
        arg.dump += '<span style="color:#aaa">...</span>'; arg.cnt++;
      }
      return arg;
    }
    var indent = '';
    for (var i = 0; i < arg.lv; i++) {
      indent += DebugJS.INDENT_SP;
    }
    if (obj instanceof Array) {
      arg.cnt++;
      if (toJson) {
        arg.dump += '[';
        if (obj.length > 0) {
          arg.dump += '\n';
        }
        indent += DebugJS.INDENT_SP;
      } else {
        arg.dump += '<span style="color:#c08">[Array][' + obj.length + ']</span>';
      }
      if ((levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
        var sibling = 0;
        for (var i in obj) {
          if (sibling > 0) {
            if (toJson) {
              arg.dump += ',\n';
            }
          }
          arg.lv++; indent += DebugJS.INDENT_SP;
          if (!toJson) {
            arg.dump += '\n' + indent + '[' + i + '] ';
          }
          arg = DebugJS._objDump(obj[i], arg, toJson, levelLimit, noMaxLimit, valLenLimit);
          arg.lv--; indent = indent.replace(DebugJS.INDENT_SP, '');
          sibling++;
        }
      }
      if (toJson) {
        indent = indent.replace(DebugJS.INDENT_SP, '');
        if (sibling > 0) {
          arg.dump += '\n';
        }
        if (obj.length > 0) {
          if ((levelLimit >= 1) && (arg.lv >= levelLimit)) {
            arg.dump += indent + DebugJS.INDENT_SP + '<span style="color:#aaa">...</span>\n';
          }
          arg.dump += indent;
        }
        arg.dump += ']';
      }
    } else if (obj instanceof Object) {
      arg.cnt++;
      if ((typeof obj !== 'function') &&
          (Object.prototype.toString.call(obj) !== '[object Date]') &&
          ((window.ArrayBuffer) && !(obj instanceof ArrayBuffer))) {
        if (toJson) {
          arg.dump += indent;
        } else {
          arg.dump += '<span style="color:#49f">[Object]</span> ';
        }
        if ((toJson) || (levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
          arg.dump += '{\n';
        }
      }
      if ((levelLimit == 0) || ((levelLimit >= 1) && (arg.lv < levelLimit))) {
        indent += DebugJS.INDENT_SP;
        var sibling = 0;
        for (var key in obj) {
          if (sibling > 0) {
            if (toJson) {
              arg.dump += ',';
            }
            arg.dump += '\n';
          }
          if (typeof obj[key] === 'function') {
            arg.dump += indent + '<span style="color:#4c4">function</span>';
            if (obj[key].toString().match(/\[native code\]/)) {
              arg.dump += ' [native]';
            }
            arg.dump += ' ' + key + '()';
            arg.cnt++;
            if ((levelLimit == 0) || ((levelLimit >= 1) && ((arg.lv + 1) < levelLimit))) {
              if (Object.keys(obj[key]).length > 0) {
                arg.dump += ' {\n';
              }
            }
          } else if (Object.prototype.toString.call(obj[key]) === '[object Date]') {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += key;
            if (toJson) {arg.dump += '"';}
            var dt = DebugJS.getDateTime(obj[key]);
            var date = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.sss + ' (' + obj[key].getTime() + ')';
            arg.dump += ': <span style="color:#f80">[Date]</span> ' + date;
            sibling++;
            continue;
          } else if ((window.ArrayBuffer) && (obj[key] instanceof ArrayBuffer)) {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += key;
            if (toJson) {arg.dump += '"';}
            arg.dump += ': <span style="color:#d4c">[ArrayBuffer]</span> (byteLength = ' + obj[key].byteLength + ')';
            sibling++;
            continue;
          } else {
            arg.dump += indent;
            if (toJson) {arg.dump += '"';}
            arg.dump += key;
            if (toJson) {arg.dump += '"';}
            arg.dump += ': ';
          }
          var hasChildren = false;
          for (var cKey in obj[key]) {
            hasChildren = true;
            break;
          }
          if ((typeof obj[key] !== 'function') || (hasChildren)) {
            arg.lv++;
            arg = DebugJS._objDump(obj[key], arg, toJson, levelLimit, noMaxLimit, valLenLimit);
            arg.lv--;
          }
          if (typeof obj[key] === 'function') {
            if ((levelLimit == 0) || ((levelLimit >= 1) && ((arg.lv + 1) < levelLimit))) {
              if (Object.keys(obj[key]).length > 0) {
                arg.dump += '\n' + indent + '}';
              }
            }
          }
          sibling++;
        }
        var empty = false;
        if (sibling == 0) {
          if (typeof obj === 'function') {
            arg.dump += '<span style="color:#4c4">function</span>()';
            if (obj.toString().match(/\[native code\]/)) {
              arg.dump += ' [native]';
            }
          } else if (Object.prototype.toString.call(obj) === '[object Date]') {
            var dt = DebugJS.getDateTime(obj);
            var date = dt.yyyy + '-' + dt.mm + '-' + dt.dd + ' ' + DebugJS.WDAYS[dt.wday] + ' ' + dt.hh + ':' + dt.mi + ':' + dt.ss + '.' + dt.sss + ' (' + obj.getTime() + ')';
            arg.dump += '<span style="color:#f80">[Date]</span> ' + date;
          } else if ((window.ArrayBuffer) && (obj instanceof ArrayBuffer)) {
            arg.dump += '<span style="color:#d4c">[ArrayBuffer]</span> (byteLength = ' + obj.byteLength + ')';
          } else {
            empty = true;
            arg.dump = arg.dump.replace(/\n$/, '');
            arg.dump += '}';
          }
          arg.cnt++;
        }
        indent = indent.replace(DebugJS.INDENT_SP, '');
        if ((typeof obj !== 'function') &&
            (Object.prototype.toString.call(obj) !== '[object Date]') &&
            ((window.ArrayBuffer) && !(obj instanceof ArrayBuffer) && (!empty))) {
          arg.dump += '\n' + indent + '}';
        }
      }
      if ((toJson) && (levelLimit >= 1) && (arg.lv >= levelLimit)) {
        arg.dump += indent + DebugJS.INDENT_SP + '<span style="color:#aaa">...</span>\n' + indent + '}';
      }
    } else if (obj === null) {
      if (toJson) {
        arg.dump += 'null';
      } else {
        arg.dump += '<span style="color:#ccc">null</span>';
      }
      arg.cnt++;
    } else if (obj === undefined) {
      if (toJson) {
        arg.dump += 'undefined';
      } else {
        arg.dump += '<span style="color:#ccc">undefined</span>';
      }
      arg.cnt++;
    } else if (typeof obj === 'string') {
      var str;
      if (obj.length > valLenLimit) {
        str = obj.substr(0, valLenLimit);
        str = str.replace(/</g, '&lt;').replace(/>/g, '&gt;') + (toJson ? '...' : '<span style="color:#aaa">...</span>');
      } else {
        str = obj.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      }
      arg.dump += '"' + str + '"';
      arg.cnt++;
    } else {
      arg.dump += obj; arg.cnt++;
    }
  } catch (e) {
    arg.dump += '<span style="color:#f66">parse error: ' + e + '</span>'; arg.cnt++;
  }
  return arg;
};

DebugJS.getKeys = function(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }
  return keys;
};

DebugJS.getKeysStr = function(obj) {
  var keys = '';
  for (var key in obj) {
    keys += key + '\n';
  }
  return keys;
};

DebugJS.countElements = function(selector, showDetail) {
  if (!selector) {selector = '*';}
  var cnt = {};
  var element = null;
  var elmList = [];
  var total = 0;
  switch (selector.charAt(0)) {
    case '#':
      element = document.getElementById(selector.substr(1));
      break;
    case '.':
      elmList = document.getElementsByClassName(selector.substr(1));
      break;
    default:
      elmList = document.getElementsByTagName(selector);
  }
  if (element) {
    DebugJS.getChildElements(element, elmList);
  }
  if (elmList) {
    for (var i = 0, len = elmList.length; i < len; i++) {
      if (!cnt[elmList[i].tagName]) {
        cnt[elmList[i].tagName] = 1;
      } else {
        cnt[elmList[i].tagName]++;
      }
      total++;
    }
  }
  if (showDetail) {
    var l = '<table>';
    for (var key in cnt) {
      l += '<tr><td>' + key + '</td><td style="text-align:right">' + cnt[key] + '</td></tr>';
    }
    l += '<tr><td>Total</td><td style="text-align:right">' + total + '</td></tr></table>';
    DebugJS.log.mlt(l);
  }
  return total;
};

DebugJS.getChildElements = function(el, list) {
  if (!el.tagName) {return;}
  list.push(el);
  var children = el.childNodes;
  if (children) {
    var len = children.length;
    for (var i = 0; i < len; i++) {
      DebugJS.getChildElements(children[i], list);
    }
  }
};

DebugJS.execCmdJson = function(json, flg, lv) {
  try {
    var j = JSON.parse(json);
    var valLen = DebugJS.ctx.properties.dumpvallen.value;
    var jsn = DebugJS.objDump(j, flg, lv, false, valLen);
    DebugJS.log.mlt(jsn);
  } catch (e) {
    DebugJS.log.e('JSON format error.');
    var detail = DebugJS.checkJson(json);
    DebugJS.log.e(detail);
  }
};

DebugJS.checkJson = function(json) {
  var ctx = DebugJS.ctx;
  json = DebugJS.omitLeadingAndTrailingWhiteSpace(json);
  var wkJson = json.split('\\');
  var cnt = 0;
  var res = '';
  for (var i = 0; i < wkJson.length; i++) {
    if (wkJson[i] == '') {
      cnt++;
    } else {
      if (i == 0) {
        res += wkJson[i];
        continue;
      }
      if (cnt >= 1) {
        res += '\\';
        for (var j = 0; j < (cnt - 1); j++) {
          res += '\\';
        }
        if (cnt % 2 == 0) {
          res += '<span class="' + ctx.id + '-txt-hl">\\</span>';
        } else {
          res += '\\';
        }
        res += wkJson[i];
        cnt = 0;
      } else {
        if (wkJson[i].match(/^n|^r|^t|^b|^"/)) {
          res += '\\' + wkJson[i];
        } else {
          res += '<span class="' + ctx.id + '-txt-hl">\\</span>' + wkJson[i];
        }
      }
    }
  }
  res = res.replace(/\t/g, '<span class="' + ctx.id + '-txt-hl">\\t</span>');
  res = res.replace(/\r\n/g, '<span class="' + ctx.id + '-txt-hl">\\r\\n</span>');
  res = res.replace(/([^\\])\r/g, '$1<span class="' + ctx.id + '-txt-hl">\\r</span>');
  res = res.replace(/([^\\])\n/g, '$1<span class="' + ctx.id + '-txt-hl">\\n</span>');
  if (!res.match(/^{/)) {
    res = '<span class="' + ctx.id + '-txt-hl"> </span>' + res;
  }
  res = res.replace(/}([^}]+)$/, '}<span class="' + ctx.id + '-txt-hl">$1</span>');
  if (!res.match(/}$/)) {
    res = res + '<span class="' + ctx.id + '-txt-hl"> </span>';
  }
  return res;
};

DebugJS.digits = function(x) {
  var digit = 0;
  while (x != 0) {
    x = (x / 10) << 0; digit++;
  }
  return digit;
};

DebugJS.parseInt = function(v) {
  var rdx = DebugJS.checkRadix(v);
  if (rdx == 10) {
    return parseInt(v, 10);
  } else if (rdx == 16) {
    return parseInt(v, 16);
  } else if (rdx == 2) {
    v = v.substr(2);
    return parseInt(v, 2);
  }
  return 0;
};

DebugJS.checkRadix = function(v) {
  if (v.match(/^\-{0,1}[0-9,]+$/)) {
    return 10;
  } else if (v.match(/^\-{0,1}0x[0-9A-Fa-f]+$/)) {
    return 16;
  } else if (v.match(/^\-{0,1}0b[01\s]+$/)) {
    return 2;
  } else {
    return 0;
  }
};

DebugJS.printUsage = function(m) {
  DebugJS.log('Usage: ' + m);
};

DebugJS.convRGB = function(v) {
  var ret;
  if (v.indexOf('#') == 0) {
    ret = DebugJS.convRGB16to10(v);
  } else {
    ret = DebugJS.convRGB10to16(v);
  }
  DebugJS.log(ret.rgb);
};

DebugJS.convRGB16to10 = function(rgb16) {
  var ctx = DebugJS.ctx;
  var boxSize = '0.7em';
  var r16, g16, b16, r10, g10, b10;
  rgb16 = rgb16.replace(/\s/g, '');
  if (rgb16.length == 7) {
    r16 = rgb16.substr(1, 2);
    g16 = rgb16.substr(3, 2);
    b16 = rgb16.substr(5, 2);
  } else if (rgb16.length == 4) {
    r16 = rgb16.substr(1, 1);
    g16 = rgb16.substr(2, 1);
    b16 = rgb16.substr(3, 1);
    r16 += r16;
    g16 += g16;
    b16 += b16;
  } else {
    return '<span style="color:' + ctx.options.logColorE + '">invalid value.</span>';
  }
  r10 = parseInt(r16, 16);
  g10 = parseInt(g16, 16);
  b10 = parseInt(b16, 16);
  var rgb10 = '<span style="vertical-align:top;display:inline-block;height:1em"><span style="background:rgb(' + r10 + ',' + g10 + ',' + b10 + ');width:' + boxSize + ';height:' + boxSize + ';margin-top:0.2em;display:inline-block"> </span></span> <span style="color:' + DebugJS.COLOR_R + '">' + r10 + '</span> <span style="color:' + DebugJS.COLOR_G + '">' + g10 + '</span> <span style="color:' + DebugJS.COLOR_B + '">' + b10 + '</span>';
  var rgb = {r: r10, g: g10, b: b10, rgb: rgb10};
  return rgb;
};

DebugJS.convRGB10to16 = function(rgb10) {
  var ctx = DebugJS.ctx;
  var boxSize = '0.7em';
  rgb10 = rgb10.replace(/\s{2,}/g, ' ');
  var rgb10s = rgb10.split(' ', 3);
  if ((rgb10s.length != 3) || ((rgb10s[0] < 0) || (rgb10s[0] > 255)) || ((rgb10s[1] < 0) || (rgb10s[1] > 255)) || ((rgb10s[2] < 0) || (rgb10s[2] > 255))) {
    return '<span style="color:' + ctx.options.logColorE + '">invalid value.</span>';
  }
  var r16 = ('0' + parseInt(rgb10s[0]).toString(16)).slice(-2);
  var g16 = ('0' + parseInt(rgb10s[1]).toString(16)).slice(-2);
  var b16 = ('0' + parseInt(rgb10s[2]).toString(16)).slice(-2);
  if ((r16.charAt(0) == r16.charAt(1)) && (g16.charAt(0) == g16.charAt(1)) && (b16.charAt(0) == b16.charAt(1))) {
    r16 = r16.substring(0, 1);
    g16 = g16.substring(0, 1);
    b16 = b16.substring(0, 1);
  }
  var rgb16 = '<span style="vertical-align:top;display:inline-block;height:1em"><span style="background:#' + r16 + g16 + b16 + ';width:' + boxSize + ';height:' + boxSize + ';margin-top:0.2em;display:inline-block"> </span></span> #<span style="color:' + DebugJS.COLOR_R + '">' + r16 + '</span><span style="color:' + DebugJS.COLOR_G + '">' + g16 + '</span><span style="color:' + DebugJS.COLOR_B + '">' + b16 + '</span>';
  var rgb = {r: r16, g: g16, b: b16, rgb: rgb16};
  return rgb;
};

DebugJS.convRadixFromHEX = function(v16) {
  var v10 = parseInt(v16, 16).toString(10);
  var bin = DebugJS.convertBin({exp: v10, digit: DebugJS.DEFAULT_UNIT});
  if (v10 > 0xffffffff) {
    var v2 = parseInt(v10).toString(2);
    bin = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THRESHOLD);
  }
  var hex = DebugJS.formatHex(v16, false, true);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  var res = 'HEX ' + hex + '\n' +
  'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'BIN ' + bin + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.convRadixFromDEC = function(v10) {
  var unit = DebugJS.DEFAULT_UNIT;
  var bin = DebugJS.convertBin({exp: v10, digit: DebugJS.DEFAULT_UNIT});
  var v16 = parseInt(v10).toString(16);
  if (v10 < 0) {
    var v2 = '';
    for (var i = (unit - 1); i >= 0; i--) {
      v2 += (v10 & 1 << i) ? '1' : '0';
    }
    v16 = parseInt(v2, 2).toString(16);
  } else if (v10 > 0xffffffff) {
    var v2 = parseInt(v10).toString(2);
    bin = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THRESHOLD);
  }
  var hex = DebugJS.formatHex(v16, false, true);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  var res = 'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'HEX ' + hex + '<br>' +
  'BIN ' + bin + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.convRadixFromBIN = function(v2) {
  v2 = v2.replace(/\s/g, '');
  var v10 = parseInt(v2, 2).toString(10);
  var v16 = parseInt(v2, 2).toString(16);
  var bin = DebugJS.convertBin({exp: v10, digit: DebugJS.DEFAULT_UNIT});
  if (v10 > 0xffffffff) {
    v2 = parseInt(v10).toString(2);
    bin = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THRESHOLD);
  }
  var hex = DebugJS.formatHex(v16, false, true);
  if (hex.length >= 2) {
    hex = '0x' + hex;
  }
  var res = 'BIN ' + bin + '\n' +
  'DEC ' + DebugJS.formatDec(v10) + '\n' +
  'HEX ' + hex + '\n';
  DebugJS.log.mlt(res);
};

DebugJS.convRadixDECtoHEX = function(v10, upper) {
  var v16 = parseInt(v10).toString(16);
  if (upper) {
    v16 = v16.toUpperCase();
  }
  return v16;
};

DebugJS.convertBin = function(data) {
  var digit = data.digit;
  if (digit == 0) {
    digit = DebugJS.DEFAULT_UNIT;
  }
  var val = eval(data.exp);
  var v2 = parseInt(val).toString(2);
  var v2len = v2.length;
  var loop = ((digit > v2len) ? digit : v2len);
  v2 = '';
  for (var i = (loop - 1); i >= 0; i--) {
    v2 += (val & 1 << i) ? '1' : '0';
  }
  var ret = v2;
  var hldigit = v2len;
  var overflow = false;
  if (val < 0) {
    hldigit = digit;
  } else if ((data.digit > 0) && (v2len > data.digit)) {
    overflow = true;
    hldigit = data.digit;
  }
  ret = DebugJS.formatBin(v2, true, DebugJS.DISP_BIN_DIGITS_THRESHOLD, hldigit, overflow);
  return ret;
};

DebugJS.formatBin = function(v2, grouping, n, highlight, overflow) {
  var len = v2.length;
  var bin = '';
  if (grouping) {
    if ((highlight > 0) && (len > highlight)) {
      bin += '<span style="color:#888">';
    }
    for (var i = 0; i < len; i++) {
      if ((i != 0) && ((len - i) % 4 == 0)) {
        bin += ' ';
      }
      bin += v2.charAt(i);
      if ((highlight > 0) && ((len - i) == (highlight + 1))) {
        bin += '</span>';
      }
    }
  } else {
    bin = v2;
  }
  if (n) {;
    if (len >= n) {
      var digits = len;
      if (overflow == false) {
        digits = highlight;
      }
      bin += ' (' + digits + ' bits)';
    }
  }
  return bin;
};

DebugJS.formatDec = function(v10) {
  v10 += '';
  var len = v10.length;
  var dec = '';
  for (var i = 0; i < len; i++) {
    if ((i != 0) && ((len - i) % 3 == 0)) {
      if (!((i == 1) && (v10.charAt(0) == '-'))) {
        dec += ',';
      }
    }
    dec += v10.charAt(i);
  }
  return dec;
};

DebugJS.formatHex = function(v16, prefix, upper) {
  var hex = v16;
  if (upper) {
    hex = v16.toUpperCase();
  }
  if (prefix) {
    hex = '0x' + hex;
  }
  return hex;
};

DebugJS.encodeBase64 = function(str) {
  if (!window.btoa) return '';
  var encoded = '';
  try {
    encoded = btoa(str);
  } catch (e) {
    encoded = btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  return encoded;
};

DebugJS.decodeBase64 = function(str) {
  if (!window.atob) return '';
  var decoded = '';
  try {
    decoded = decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  } catch (e) {
    decoded = atob(str);
  }
  return decoded;
};

DebugJS.decodeUnicode = function(arg) {
  var str = '';
  var args = arg.split(' ');
  for (var i = 0, len = args.length; i < len; i++) {
    if (args[i] == '') continue;
    var codePoint = args[i].replace(/^U\+/i, '');
    if (codePoint == '20') {
      str += ' ';
    } else {
      str += '&#x' + codePoint;
    }
  }
  return str;
};

DebugJS.encodeUnicode = function(str) {
  var code = '';
  for (var i = 0, len = str.length; i < len; i++) {
    var point = str.charCodeAt(i);
    if (i > 0) {
      code += ' ';
    }
    code += 'U+' + DebugJS.convRadixDECtoHEX(point, true);
  }
  return code;
};

DebugJS.decodeUri = function(str) {
  return decodeURIComponent(str);
};

DebugJS.encodeUri = function(str) {
  return encodeURIComponent(str);
};

DebugJS.convertTimeJson = function(t) {
  var hour = min = sec = msec = 0;
  var s;
  var times = t.split(':');
  if (times.length == 3) {
    hour = times[0] | 0;
    min = times[1] | 0;
    s = times[2];
  } else if (times.length == 2) {
    hour = times[0] | 0;
    min = times[1] | 0;
    s = '0';
  } else {
    return null;
  }
  var ss = s.split('.');
  if (ss.length == 2) {
    sec = ss[0] | 0;
    msec = ((ss[1] + '00').substr(0, 3)) | 0;
  } else {
    sec = ss | 0;
  }
  if ((min >= 60) || (sec >= 60)) {
    return null;
  }
  var time = {hour: hour, min: min, sec: sec, msec: msec};
  return time;
};

DebugJS.subTime = function(tL, tR, byTheDay) {
  var hh, mm, ss, ms;
  var c = false;
  if (tL.msec >= tR.msec) {
    ms = tL.msec - tR.msec;
  } else {
    ms = 1000 - tR.msec + tL.msec;
    c = true;
  }
  if (tL.sec > tR.sec) {
    ss = tL.sec - tR.sec;
    if (c) {
      ss -= 1;
    }
    c = false;
  } else if (tL.sec == tR.sec) {
    ss = 0;
    if (c) {
      ss -= 1;
      if (ss == -1) {
        ss = 59;
      }
    }
  } else {
    ss = 60 - tR.sec + tL.sec;
    if (c) {
      ss -= 1;
    }
    c = true;
  }

  if (tL.min > tR.min) {
    mm = tL.min - tR.min;
    if (c) {
      mm -= 1;
    }
    c = false;
  } else if (tL.min == tR.min) {
    mm = 0;
    if (c) {
      mm -= 1;
      if (mm == -1) {
        mm = 59;
      }
    }
  } else {
    mm = 60 - tR.min + tL.min;
    if (c) {
      mm -= 1;
    }
    c = true;
  }

  var days = 0;
  if (tL.hour > tR.hour) {
    hh = tL.hour - tR.hour;
    if (c) {
      hh -= 1;
    }
    c = false;
  } else if (tL.hour == tR.hour) {
    hh = 0;
    if (c) {
      hh -= 1;
      if ((byTheDay) && (hh == -1)) {
        days = -1;
        hh = 23;
      }
    }
  } else {
    hh = tL.hour - tR.hour;
    if (c) {
      hh -= 1;
    }
    if (byTheDay) {
      days = Math.floor(hh / 24);
      hh -= (24 * days);
    }
    c = true;
  }

  var excess = '';
  if (days < 0) {
    excess = ' (' + days + ' Day' + ((days <= -2) ? 's' : '') + ')';
  }
  if (byTheDay) {
    hh = ('0' + hh).slice(-2);
  }
  var ret = hh + ':' + ('0' + mm).slice(-2) + ':' + ('0' + ss).slice(-2) + '.' + ('00' + ms).slice(-3) + excess;
  return ret;
};

DebugJS.addTime = function(tL, tR, byTheDay) {
  var hh, mm, ss, ms;
  var c = false;
  ms = tR.msec + tL.msec;
  if (ms >= 1000) {
    ms -= 1000;
    c = true;
  }

  ss = tL.sec + tR.sec;
  if (c) {
    ss++;
  }
  if (ss >= 60) {
    ss -= 60;
    c = true;
  } else {
    c = false;
  }

  mm = tL.min + tR.min;
  if (c) {
    mm++;
  }
  if (mm >= 60) {
    mm -= 60;
    c = true;
  } else {
    c = false;
  }

  var days = 0;
  hh = tL.hour + tR.hour;
  if (c) {
    hh++;
  }
  if ((byTheDay) && (hh >= 24)) {
    days = Math.floor(hh / 24);
    hh -= (24 * days);
    c = true;
  } else {
    c = false;
  }

  var excess = '';
  if (days > 0) {
    excess = ' (+' + days + ' Day' + ((days >= 2) ? 's' : '') + ')';
  }
  if (byTheDay) {
    hh = ('0' + hh).slice(-2);
  }
  var ret = hh + ':' + ('0' + mm).slice(-2) + ':' + ('0' + ss).slice(-2) + '.' + ('00' + ms).slice(-3) + excess;
  return ret;
};

DebugJS.timeStart = function(timerName, msg) {
  var ctx = DebugJS.ctx;
  var _timerName = timerName;

  if ((timerName === undefined) || (timerName === null)) {
    _timerName = DebugJS.DEFAULT_TIMER_NAME;
  }

  ctx.timers[_timerName] = {};
  ctx.timers[_timerName].start = (new Date());

  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return;
  }

  var str;
  if (msg === undefined) {
    str = _timerName + ': timer started';
  } else {
    str = msg.replace(/%n/g, _timerName).replace(/%t/g, '<span style="color:' + ctx.options.timerColor + '">00:00:00.000</span>');
  }

  DebugJS.log(str);
};

DebugJS.timeSplit = function(timerName, isEnd, msg) {
  var now = new Date();
  var ctx = DebugJS.ctx;
  var _timerName = timerName;

  if ((timerName === undefined) || (timerName === null)) {
    _timerName = DebugJS.DEFAULT_TIMER_NAME;
  }

  if (!ctx.timers[_timerName]) {
    DebugJS.log.w(_timerName + ': timer undefined');
    return null;
  }

  var prevSplit = ctx.timers[_timerName].split;
  var t = DebugJS.getElapsedTimeStr(ctx.timers[_timerName].start, now);
  var dt = '<span style="color:' + ctx.options.timerColor + '">' + t + '</span>';

  if (isEnd) {
    delete ctx.timers[_timerName];
  } else {
    ctx.timers[_timerName].split = now;
  }

  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }

  var dtLap = '';
  if (prevSplit) {
    var tLap = DebugJS.getElapsedTimeStr(prevSplit, now);
    dtLap = '<span style="color:' + ctx.options.timerColor + '">' + tLap + '</span>';
  } else {
    if (!isEnd) {
      dtLap = dt;
    }
  }

  var str;
  if (msg === undefined) {
    str = _timerName + ': ' + dt;
    if (dtLap != '') {
      str += ' (⊿' + dtLap + ')';
    }
  } else {
    str = msg.replace(/%n/g, _timerName).replace(/%lt/g, dtLap).replace(/%t/g, dt);
  }

  DebugJS.log(str);
  return t;
};

DebugJS.timeEnd = function(timerName, msg) {
  return DebugJS.timeSplit(timerName, true, msg);
};

DebugJS.timeLog = function(msg, timerName) {
  var now = new Date();
  var ctx = DebugJS.ctx;
  if (!timerName) {
    timerName = DebugJS.DEFAULT_TIMER_NAME;
  }
  var t;
  if (ctx.timers[timerName]) {
    t = DebugJS.getElapsedTimeStr(ctx.timers[timerName].start, now);
  } else {
    ctx.timers[timerName] = {};
    ctx.timers[timerName].start = (new Date());
    t = '00:00:00.000';
  }
  var dt = '<span style="color:' + ctx.options.timerColor + '">' + t + '</span>';
  var dtLap = '';
  if (ctx.timers[timerName].split) {
    var tLap = DebugJS.getElapsedTimeStr(ctx.timers[timerName].split, now);
    dtLap = '<span style="color:' + ctx.options.timerColor + '">' + tLap + '</span>';
  }
  var str = dt + ' ' + msg.replace(/%n/g, timerName).replace(/%lt/g, dtLap).replace(/%t/g, dt);
  DebugJS.log(str);
};

DebugJS.timeCheck = function(timerName, now) {
  var ctx = DebugJS.ctx;
  if (timerName === undefined) timerName = DebugJS.DEFAULT_TIMER_NAME;
  if (!ctx.timers[timerName]) return null;
  var t = DebugJS.getElapsedTimeStr(ctx.timers[timerName].start, now);
  return t;
};

DebugJS.timeList = function() {
  var ctx = DebugJS.ctx;
  var now = new Date();
  var l;
  if (Object.keys(ctx.timers).length == 0) {
    l = '<span style="color:#ccc">no timers</span>';
  } else {
    l = '<table>';
    for (var key in ctx.timers) {
      l += '<tr><td>' + key + '</td><td><span style="color:' + ctx.options.timerColor + '">' + DebugJS.timeCheck(key, now) + '</font></td></tr>';
    }
    l += '</table>';
  }
  DebugJS.log.mlt(l);
};

DebugJS.getElapsedTimeStr = function(t1, t2) {
  var delta = t2.getTime() - t1.getTime();
  var elapsed = DebugJS.getTimerStr(delta);
  return elapsed;
};

DebugJS.getRandom = function(type, min, max) {
  if (min !== undefined) {
    min |= 0;
    if (max) {
      max |= 0;
    } else {
      if (type == DebugJS.RANDOM_TYPE_NUM) {
        max = min;
        min = 0;
      } else if (type == DebugJS.RANDOM_TYPE_STR) {
        max = min;
      }
    }
    if (min > max) {
      var wk = min; min = max; max = wk;
    }
  } else {
    if (type == DebugJS.RANDOM_TYPE_NUM) {
      min = 0;
      max = 0x7fffffff;
    } else if (type == DebugJS.RANDOM_TYPE_STR) {
      min = 1;
      max = DebugJS.RANDOM_STRING_DEFAULT_MAX_LEN;
    }
  }
  var random;
  switch (type) {
    case DebugJS.RANDOM_TYPE_NUM:
      random = DebugJS.getRandomNumber(min, max);
      break;
    case DebugJS.RANDOM_TYPE_STR:
      random = DebugJS.getRandomString(min, max);
      break;
  }
  return random;
};

DebugJS.getRandomNumber = function(min, max) {
  var minDigit = (min + '').length;
  var maxDigit = (max + '').length;
  var digit = Math.floor(Math.random() * (maxDigit - minDigit + 1)) + minDigit;
  var randMin = (digit == 1) ? 0 : Math.pow(10, (digit - 1));
  var randMax = Math.pow(10, digit) - 1;
  if (min < randMin) min = randMin;
  if (max > randMax) max = randMax;
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
};

DebugJS.getRandomCharater = function() {
  var ch = String.fromCharCode(DebugJS.getRandomNumber(0x20, 0x7e));
  return ch;
};

DebugJS.RANDOM_STRING_DEFAULT_MAX_LEN = 10;
DebugJS.RANDOM_STRING_MAX_LEN = 1024;
DebugJS.getRandomString = function(min, max) {
  if (min > DebugJS.RANDOM_STRING_MAX_LEN) min = DebugJS.RANDOM_STRING_MAX_LEN;
  if (max > DebugJS.RANDOM_STRING_MAX_LEN) max = DebugJS.RANDOM_STRING_MAX_LEN;
  var len = DebugJS.getRandomNumber(min, max);
  var str = '';
  for (var i = 0; i < len; i++) {
    var ch;
    var retry = true;
    while (retry) {
      ch = DebugJS.getRandomCharater();
      if ((!(ch.match(/[!-/:-@[-`{-~]/))) && (!(((i == 0) || (i == (len - 1))) && (ch == ' ')))) {
        retry = false;
      }
    }
    str += ch;
  }
  return str;
};

DebugJS.httpRequest = function(rq, cb) {
  if ((rq.data == undefined) || (rq.data == '')) data = null;
  if (rq.async == undefined) rq.async = true;
  if (rq.user == undefined) rq.user = '';
  if (rq.pass == undefined) rq.pass = '';
  rq.method = rq.method.toUpperCase();
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      if (cb) cb(xhr);
    }
  };
  xhr.open(rq.method, rq.url, rq.async, rq.user, rq.pass);
  if (!rq.cache) {
    xhr.setRequestHeader('If-Modified-Since', 'Thu, 01 Jun 1970 00:00:00 GMT');
  }
  if (rq.userAgent) {
    xhr.setRequestHeader('User-Agent', rq.userAgent);
  }
  xhr.send(rq.data);
};

DebugJS.onHttpRequestDone = function(xhr) {
  var statusMsg = xhr.status + ' ' + xhr.statusText;
  if (xhr.status == 0) {
    DebugJS.log.e('cannot load: ' + statusMsg);
  } else if ((xhr.status >= 300) && (xhr.status <= 399)) {
    DebugJS.log.w(statusMsg);
  } else if ((xhr.status >= 400) && (xhr.status <= 599)) {
    DebugJS.log.e(statusMsg);
  } else {
    DebugJS.log(statusMsg);
  }
  var head = xhr.getAllResponseHeaders();
  var txt = xhr.responseText.replace(/</g, '&lt;');
  txt = txt.replace(/>/g, '&gt;');
  if (head || txt) {
    var res = '<span style="color:#5ff">' + head + '</span>' + txt;
    DebugJS.log.mlt(res);
  }
};

DebugJS.encodeURIString = function(data) {
  var encData = encodeURIComponent(data);
  encData = encData.replace(/%20/g, '+');
  encData = encData.replace(/%3D/gi, '=');
  encData = encData.replace(/%26/g, '&');
  return encData;
};

DebugJS.getBrowserType = function() {
  var ua = navigator.userAgent;
  var ver;
  var browser = {name: '', version: ''};
  if (ua.indexOf('Edge') >= 1) {
    browser.name = 'Edge';
    ver = ua.match(/Edge\/(.*)/);
    if (ver) {
      browser.version = ver[1];
    }
    return browser;
  }

  if (ua.indexOf('OPR/') >= 1) {
    browser.name = 'Opera';
    ver = ua.match(/OPR\/(.*)/);
    if (ver) {
      browser.version = ver[1];
    }
    return browser;
  }

  if (ua.indexOf('Chrome') >= 1) {
    browser.name = 'Chrome';
    ver = ua.match(/Chrome\/(.*)\s/);
    if (ver) {
      browser.version = ver[1];
    }
    return browser;
  }

  if (ua.indexOf('Firefox') >= 1) {
    browser.name = 'Firefox';
    ver = ua.match(/Firefox\/(.*)/);
    if (ver) {
      browser.version = ver[1];
    }
    return browser;
  }

  if (ua.indexOf('Trident/7.') >= 1) {
    browser.name = 'IE11';
    browser.family = 'IE';
    return browser;
  }

  if (ua.indexOf('Trident/6.') >= 1) {
    browser.name = 'IE10';
    browser.family = 'IE';
    return browser;
  }

  if (ua.indexOf('Trident/5.') >= 1) {
    browser.name = 'IE9';
    browser.family = 'IE';
    return browser;
  }

  if ((ua.indexOf('Safari/') >= 1) && (ua.indexOf('Version/') >= 1)) {
    browser.name = 'Safari';
    ver = ua.match(/Version\/(.*)\sSafari/);
    if (ver) {
      browser.version = ver[1];
    }
    return browser;
  }

  return browser;
};

DebugJS.browserColoring = function(name) {
  var str = name;
  switch (name) {
    case 'Chrome':
      str = '<span style="color:#f44">Ch</span><span style="color:#ff0">ro</span><span style="color:#4f4">m</span><span style="color:#6cf">e</span>';
      break;
    case 'Edge':
      str = '<span style="color:#0af">' + name + '</span>';
      break;
    case 'Firefox':
      str = '<span style="color:#e57f25">' + name + '</span>';
      break;
    case 'Opera':
      str = '<span style="color:#f44">' + name + '</span>';
      break;
    case 'IE11':
    case 'IE10':
    case 'IE9':
      str = '<span style="color:#61d5f8">' + name + '</span>';
      break;
    case 'Safari':
      str = '<span style="color:#86c8e8">Safa</span><span style="color:#dd5651">r</span><span style="color:#ececec">i</span>';
      break;
  }
  return str;
};

DebugJS.substr = function(text, len) {
  var textLen = text.length;
  var count = 0;
  var str = '';
  var i;
  if (len >= 0) {
    for (i = 0; i < textLen; i++) {
      var x = encodeURIComponent(text.charAt(i));
      if (x.length <= 3) {
        count++;
      } else {
        count += 2;
      }
      if (count > len) {
        break;
      }
      str += text.charAt(i);
    }
  } else {
    len *= (-1);
    for (i = (textLen - 1); i >= 0; i--) {
      var x = encodeURIComponent(text.charAt(i));
      if (x.length <= 3) {
        count++;
      } else {
        count += 2;
      }
      if (count >= len) {
        break;
      }
    }
    str = text.substr(i);
  }
  return str;
};

DebugJS.trimDownText = function(text, maxLen, style) {
  var snip = '...';
  if (style) {
    snip = '<span style="' + style + '">' + snip + '</span>';
  }
  var str = text;
  if (text.length > maxLen) {
    str = DebugJS.substr(str, maxLen) + snip;
  }
  return str;
};

DebugJS.trimDownText2 = function(text, maxLen, omitpart, style) {
  var snip = '...';
  if (style) {
    snip = '<span style="' + style + '">' + snip + '</span>';
  }
  var str = text.replace(/(\r?\n|\r)/g, ' ').replace(/\t/g, ' ').replace(/\s{2,}/g, ' ');
  if (text.length > maxLen) {
    switch (omitpart) {
      case DebugJS.OMIT_FIRST:
        str = DebugJS.substr(str, (maxLen * (-1)));
        str = snip + DebugJS.escTag(str);
        break;
      case DebugJS.OMIT_MID:
        var firstLen = maxLen / 2;
        var latterLen = firstLen;
        if ((maxLen % 2) != 0) {
          firstLen = Math.floor(firstLen);
          latterLen = firstLen + 1;
        }
        var firstText = DebugJS.substr(str, firstLen);
        var latterText = DebugJS.substr(str, (latterLen * (-1)));
        str = DebugJS.escTag(firstText) + snip + DebugJS.escTag(latterText);
        break;
      default:
        str = DebugJS.substr(str, maxLen);
        str = DebugJS.escTag(str) + snip;
    }
  }
  return str;
};

DebugJS.setStyleIfObjNotAvailable = function(obj, exceptFalse) {
  var text = obj;
  if ((exceptFalse && ((obj == undefined) || (obj == null))) || ((!exceptFalse) && (obj !== 0) && (!obj))) {
    text = '<span class="' + DebugJS.ctx.id + '-na">' + obj + '</span>';
  }
  return text;
};

DebugJS.escTag = function(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

DebugJS.escapeSpclChr = function(str) {
  var txt = str + '';
  txt = txt.replace(/&/g, '&amp;');
  txt = txt.replace(/</g, '&lt;');
  txt = txt.replace(/>/g, '&gt;');
  return txt;
};

DebugJS.addClass = function(el, className) {
  if (el.className == '') {
    el.className = className;
  } else {
    el.className += ' ' + className;
  }
};

DebugJS.removeClass = function(el, className) {
  var orgClassName = el.className;
  var regexp = new RegExp('\\s*' + className, 'g');
  var newClassName = orgClassName.replace(regexp, '');
  newClassName = newClassName.replace(/\s+$/, '');
  newClassName = newClassName.replace(/^\s+/, '');
  el.className = newClassName;
};

DebugJS.hasClass = function(el, name) {
  var className = el.className;
  var names = className.split(' ');
  for (var i = 0; i < names.length; i++) {
    if (names[i] == name) {
      return true;
    }
  }
  return false;
};

DebugJS.deepCopy = function(src, dest) {
  for (var key in src) {
    dest[key] = src[key];
  }
};

DebugJS.dumpLog = function(type, b64) {
  var buf = DebugJS.ctx.msgBuf.getAll();
  var b = [];
  var l = '';
  for (var i = 0; i < buf.length; i++) {
    var data = buf[i];
    if (type == 'json') {
      l = {type: data.type, time: data.time, msg: data.msg};
      l.msg = DebugJS.encodeBase64(l.msg);
      b.push(l);
    } else {
      var type = 'LOG';
      switch (data.type) {
        case DebugJS.LOG_TYPE_ERR:
          type = 'ERR';
          break;
        case DebugJS.LOG_TYPE_WRN:
          type = 'WRN';
          break;
        case DebugJS.LOG_TYPE_INF:
          type = 'INF';
          break;
        case DebugJS.LOG_TYPE_DBG:
          type = 'DBG';
          break;
        case DebugJS.LOG_TYPE_VRB:
          type = 'VRB';
          break;
        case DebugJS.LOG_TYPE_SYS:
          type = 'SYS';
          break;
      }
      l += data.time + '\t' + type + '\t' + data.msg + '\n';
    }
  }
  if (type == 'json') l = JSON.stringify(b);
  if (b64) l = DebugJS.encodeBase64(l);
  return l;
};

DebugJS.loadLog = function(json, b64) {
  if (b64) json = DebugJS.decodeBase64(json);
  var buf = JSON.parse(json);
  for (var i = 0; i < buf.length; i++) {
    var bf = buf[i];
    bf.msg = DebugJS.decodeBase64(bf.msg);
    DebugJS.ctx.msgBuf.add(bf);
  }
};

DebugJS.saveStatus = function() {
  if (!DebugJS.LS_AVAILABLE) return;
  localStorage.setItem('DebugJS-st', DebugJS.ctx.status + '');
};

DebugJS.loadStatus = function() {
  if (!DebugJS.LS_AVAILABLE) return 0;
  var st = localStorage.getItem('DebugJS-st');
  if (st == null) return 0;
  localStorage.removeItem('DebugJS-st');
  st |= 0;
  return st;
};

DebugJS.preserveLog = function() {
  if (!DebugJS.LS_AVAILABLE) return;
  var json = DebugJS.dumpLog('json');
  localStorage.setItem('DebugJS-log', json);
};

DebugJS.restoreLog = function() {
  if (!DebugJS.LS_AVAILABLE) return;
  var json = localStorage.getItem('DebugJS-log');
  if (!json) return;
  localStorage.removeItem('DebugJS-log');
  DebugJS.loadLog(json);
};

DebugJS.onReady = function() {
  DebugJS._init();
};

DebugJS.onLoad = function() {
  window.addEventListener('unload', DebugJS.onUnload, true);
};

DebugJS.onUnload = function() {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_PRESERVED) {
    DebugJS.preserveLog();
    DebugJS.saveStatus();
  }
};

DebugJS.onError = function(e) {
  var ctx = DebugJS.ctx;
  var msg;
  ctx.errStatus |= DebugJS.ERR_STATE_SCRIPT;
  if ((e.error) && (e.error.stack)) {
    msg = e.error.stack;
  } else {
    if ((e.message == undefined) && (e.filename == undefined)) {
      if ((e.target) && (e.target.outerHTML)) {
        ctx.errStatus |= DebugJS.ERR_STATE_LOAD;
        ctx.errStatus &= ~DebugJS.ERR_STATE_SCRIPT;
        msg = 'LOAD_ERROR: ' + (e.target.outerHTML).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else {
        msg = 'UNKNOWN_ERROR';
      }
    } else {
      msg = e.message + ' ' + e.filename + '(' + e.lineno + ':' + e.colno + ')';
    }
  }
  DebugJS.log.e(msg);
  ctx.showDebugWindowOnError();
};

DebugJS.log = function(m) {
  if (m instanceof Object) {
    DebugJS.log.p(m, 0);
  } else {
    DebugJS.log.out(m, DebugJS.LOG_TYPE_LOG);
  }
};

DebugJS.log.e = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_ERR);
};

DebugJS.log.w = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_WRN);
};

DebugJS.log.i = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_INF);
};

DebugJS.log.d = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_DBG);
};

DebugJS.log.v = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_VRB);
};

DebugJS.log.s = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_SYS);
};

DebugJS.log.p = function(o, l, m) {
  var valLen = DebugJS.ctx.properties.dumpvallen.value;
  var str = (m ? m : '') + '\n' + DebugJS.objDump(o, false, l, false, valLen);
  DebugJS.log.out(str, DebugJS.LOG_TYPE_LOG);
};

DebugJS.log.res = function(m) {
  m = DebugJS.setStyleIfObjNotAvailable(m);
  m = DebugJS.encloseStringIfNeeded(m);
  var msg = '<span style="color:' + DebugJS.ctx.options.promptColor + '">&gt;</span> ' + m;
  DebugJS.log(msg);
};

DebugJS.log.res.err = function(m) {
  m = DebugJS.setStyleIfObjNotAvailable(m);
  m = DebugJS.encloseStringIfNeeded(m);
  var msg = '<span style="color:' + DebugJS.ctx.options.promptColorE + '">&gt;</span> ' + m;
  DebugJS.log(msg);
};

DebugJS.log.mlt = function(m) {
  DebugJS.log.out(m, DebugJS.LOG_TYPE_MLT);
};

DebugJS.log.out = function(m, type) {
  m = DebugJS.setStyleIfObjNotAvailable(m);
  var data = {type: type, time: DebugJS.getLogTime(), msg: m};
  DebugJS.ctx.msgBuf.add(data);
  if (!(DebugJS.ctx.status & DebugJS.STATE_INITIALIZED)) {
    if (!DebugJS._init()) {return;}
  }
  DebugJS.ctx.printLogMsg();
};

DebugJS.time = {};
DebugJS.time.start = function(timerName, msg) {
  DebugJS.timeStart(timerName, msg);
};

DebugJS.time.split = function(timerName, msg) {
  var t = DebugJS.timeSplit(timerName, false, msg);
  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }
  return;
};

DebugJS.time.end = function(timerName, msg) {
  var t = DebugJS.timeEnd(timerName, msg);
  if ((msg === null) || ((timerName === null) && (msg === undefined))) {
    return t;
  }
  return;
};

DebugJS.time.check = function(timerName) {
  var now = new Date();
  return DebugJS.timeCheck(timerName, now);
};

DebugJS.call = function(fnc, delay) {
  if (delay === undefined) delay = 0;
  return setTimeout(fnc, delay);
};

DebugJS.cmd = function(c, echo) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.ctx._execCmd(c, echo);
};

DebugJS.led = function(v) {
  DebugJS.ctx.setLed(v);
};

DebugJS.led.on = function(pos) {
  DebugJS.ctx.turnLed(pos, true);
};

DebugJS.led.off = function(pos) {
  DebugJS.ctx.turnLed(pos, false);
};

DebugJS.led.all = function(flg) {
  if (flg) {
    DebugJS.ctx.setLed(0xff);
  } else {
    DebugJS.ctx.setLed(0);
  }
};

DebugJS.msg = function(val) {
  DebugJS.ctx.setMsg(val);
};

DebugJS.msg.clear = function() {
  DebugJS.ctx.setMsg('');
};

DebugJS.random = function(min, max) {
  return DebugJS.getRandom(DebugJS.RANDOM_TYPE_NUM, min, max);
};

DebugJS.random.string = function(min, max) {
  return DebugJS.getRandom(DebugJS.RANDOM_TYPE_STR, min, max);
};

DebugJS._init = function() {
  if (!(DebugJS.ctx.status & DebugJS.STATE_INITIALIZED)) {
    return DebugJS.ctx.init(null, null);
  } else {
    return true;
  }
};

DebugJS.init = function(options) {
  DebugJS.ctx.init(options, null);
};
// ---- ---- ---- ----
var log = function(m) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log(m);
};

log.e = function(m) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  var ctx = DebugJS.ctx;
  DebugJS.log.e(m);
  ctx.errStatus |= DebugJS.ERR_STATE_LOG;
  ctx.showDebugWindowOnError();
};

log.w = function(m) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.w(m);
};

log.i = function(m) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.i(m);
};

log.d = function(m) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.d(m);
};

log.v = function(m) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.v(m);
};

log.t = function(m, n) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.timeLog(m, n);
};

log.p = function(o, l, m) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.p(o, l, m);
};

log.res = function(m) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.res(m);
};

log.res.err = function(m) {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.log.res.err(m);
};

log.stack = function() {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  var err = new Error();
  DebugJS.log(err.stack);
};

log.clear = function() {
  if (DebugJS.ctx.status & DebugJS.STATE_LOG_SUSPENDING) return;
  DebugJS.ctx.clearMessage();
};

DebugJS.start = function() {
  DebugJS.ctx = DebugJS.ctx || new DebugJS();
  DebugJS.el = null;
  if (!window._) DebugJS._AVAILABLE = true;
  if (typeof window.localStorage != 'undefined') {
    DebugJS.LS_AVAILABLE = true;
  }
  if (typeof window.sessionStorage != 'undefined') {
    DebugJS.SS_AVAILABLE = true;
  }
  window.addEventListener('DOMContentLoaded', DebugJS.onReady, true);
  window.addEventListener('load', DebugJS.onLoad, true);
  window.addEventListener('error', DebugJS.onError, true);
  if ((DebugJS.MERGE_CONSOLE) && (window.console)) {
    console.log = function(x) {log(x);};
    console.info = function(x) {log.i(x);};
    console.warn = function(x) {log.w(x);};
    console.error = function(x) {log.e(x);};
    console.time = function(x) {time.start(x);};
    console.timeEnd = function(x) {time.end(x);};
  }
  var st = DebugJS.loadStatus();
  if (st & DebugJS.STATE_LOG_PRESERVED) {
    DebugJS.ctx.status |= DebugJS.STATE_LOG_PRESERVED;
    DebugJS.restoreLog();
  }
};

DebugJS.disable = function() {
  log = function(x) {};
  log.e = function(x) {};
  log.w = function(x) {};
  log.i = function(x) {};
  log.d = function(x) {};
  log.v = function(x) {};
  log.t = function(x, xx) {};
  log.p = function(x, xx, xxx) {};
  log.stack = function() {};
  log.clear = function() {};
  DebugJS.msg = function(x) {};
  DebugJS.msg.clear = function() {};
  DebugJS.time.start = function(x, xx) {};
  DebugJS.time.split = function(x, xx) {};
  DebugJS.time.end = function(x, xx) {};
  DebugJS.time.check = function(x) {};
  DebugJS.init = function(x) {};
  DebugJS.call = function(x, xx) {};
  DebugJS.cmd = function(x, xx) {};
  DebugJS.countElements = function(x, xx) {};
  DebugJS.led = function(x) {};
  DebugJS.led.on = function(x) {};
  DebugJS.led.off = function(x) {};
  DebugJS.led.all = function(x) {};
};

var dbg = dbg || DebugJS;
var time = time || DebugJS.time;
DebugJS.x = DebugJS.x || {};
if (DebugJS.ENABLE) {
  DebugJS.start();
} else {
  DebugJS.disable();
}
