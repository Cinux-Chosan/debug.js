var extsample = extsample || {};

//--------------------------------------
extsample.p1Body = null;
extsample.p1ActiveCount = 0;

extsample.onCreateP1 = function(panel) {
  log('onCreateP1');
  var body = document.createElement('pre');
  body.style.boxSizing = 'border-box';
  body.style.width = '100%';
  body.style.height = '100%';
  body.style.padding = '4px';

  var content = 'Panel1';
  body.innerHTML = content;

  panel.appendChild(body);
  extsample.panel1Body = body;
};

extsample.onActiveP1 = function(panel) {
  log('onActiveP1');
  extsample.p1ActiveCount++;

  var content = 'Panel1\n' +
                'Active = ' + extsample.p1ActiveCount;

  extsample.panel1Body.innerHTML = content;
};

extsample.onInActiveP1 = function(panel) {
  log('onInActiveP1');
};

//--------------------------------------
extsample.onCreateP2 = function(panel) {
  log('onCreateP2');
  var body = document.createElement('div');
  body.style.boxSizing = 'border-box';
  body.style.width = '100%';
  body.style.height = '100%';
  body.style.padding = '4px';
  body.style.background = 'rgba(240, 255, 255, 0.6)';
  body.style.color = '#00f';

  var content = 'Panel2';
  body.innerHTML = content;

 panel.appendChild(body);
};

extsample.onActiveP2 = function(panel) {
  log('onActiveP2');
};

extsample.onInActiveP2 = function(panel) {
  log('onInActiveP2');
};

//--------------------------------------
extsample.onCreateP3 = function(panel) {
  log('onCreateP3');
  var html = '<div style="box-sizing:border-box; ' +
             'width:100%; ' +
             'height:100%; ' +
             'padding:4px; ' +
             'background:rgba(255, 240, 240, 0.6); ' +
             'color:#a00;">' +
             'Panel3' +
             '</div>';
  panel.innerHTML = html;
};

extsample.onActiveP3 = function(panel) {
  log('onActiveP3');
};

extsample.onInActiveP3 = function(panel) {
  log('onInActiveP3');
};

//--------------------------------------
extsample.init = function() {
  var panel1 = {
    name: 'P1',
    onCreate: extsample.onCreateP1,
    onActive: extsample.onActiveP1,
    onInActive: extsample.onInActiveP1
  };
  DebugJS.x.addPanel(panel1);
};

extsample.onLoad = function() {
  DebugJS.x.setBtnLabel('EXT');
  extsample.addMorePanels();
};

extsample.addMorePanels = function() {
  var panel2 = {
    name: 'P2',
    onCreate: extsample.onCreateP2,
    onActive: extsample.onActiveP2,
    onInActive: extsample.onInActiveP2
  };
  DebugJS.x.addPanel(panel2);

  var panel3 = {
    name: 'P3',
    onCreate: extsample.onCreateP3,
    onActive: extsample.onActiveP3,
    onInActive: extsample.onInActiveP3
  };
  DebugJS.x.addPanel(panel3);
};

//--------------------------------------
extsample.init();
window.addEventListener('load', extsample.onLoad, true);
