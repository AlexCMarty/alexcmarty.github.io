var state = {
  version: 3,
  graph: {
    showGrid: true,
    showXAxis: true,
    showYAxis: true,
    xAxisStep: 0,
    yAxisStep: 0,
    xAxisMinorSubdivisions: 0,
    yAxisMinorSubdivisions: 0,
    xAxisArrowMode: 'NONE',
    yAxisArrowMode: 'NONE',
    xAxisLabel: '',
    yAxisLabel: '',
    xAxisNumbers: true,
    yAxisNumbers: true,
    polarMode: false,
    polarNumbers: true,
    degreeMode: false,
    projectorMode: false,
    squareAxes: true,
    viewport: {
      xmin: -10,
      ymin: -10.309278350515463,
      xmax: 10,
      ymax: 10.309278350515463,
    },
  },
  expressions: {
    list: [
      { id: '2', type: 'text', text: '' },
      {
        id: '3',
        type: 'folder',
        title: '',
        memberIds: {},
        hidden: false,
        collapsed: false,
        secret: false,
      },
      {
        id: '4',
        type: 'expression',
        latex: 'a=4',
        domain: { min: '0', max: '1' },
        label: '',
        hidden: false,
        secret: false,
        color: '#2d70b3',
        style: 'normal',
        dragMode: 'AUTO',
        residualVariable: '',
        regressionParameters: {},
        isLogModeRegression: false,
        sliderMin: '-10',
        sliderMax: '10',
        sliderHardMin: false,
        sliderHardMax: false,
        sliderInterval: '',
        sliderAnimationPeriod: 4000,
        sliderLoopMode: 'LOOP_FORWARD_REVERSE',
        sliderPlayDirection: 1,
        sliderIsPlaying: false,
      },
      {
        id: '5',
        type: 'expression',
        latex: 'y=ax',
        domain: { min: '0', max: '1' },
        label: '',
        hidden: false,
        secret: false,
        color: '#388c46',
        style: 'normal',
        dragMode: 'AUTO',
        residualVariable: '',
        regressionParameters: {},
        isLogModeRegression: false,
      },
    ],
  },
};

var elt = document.getElementById('calculator');
var calculator = Desmos.Calculator(elt, { language: 'fr' });
calculator.setState(state);

var select = document.getElementById('language');
select.addEventListener('change', function (evt) {
  calculator.updateSettings({ language: evt.target.value });
});
