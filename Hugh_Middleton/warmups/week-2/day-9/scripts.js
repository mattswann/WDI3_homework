// GAir Conditioning

var acFuncSelect = document.getElementById('ac-functional');
var thermostatInput = document.getElementById('thermostat');
var acStatusDiv = document.getElementById('ac-status');
var currentTempInput = document.getElementById('current-temp');

var statuses = ["A/C Broken, call maintenance", "A/C COOLING", "A/C HEATING", "A/C Idle"];

currentTempInput.value = 23;
thermostatInput.value = 23;

var setStatus = function (statusId) {
  if (statusId >= 0 && statusId < statuses.length) {
    acStatusDiv.children[0].innerHTML = statuses[statusId];
  }
};

var checkTemps = function () {
  var desired = thermostatInput.value;
  var current = currentTempInput.value;

  // console.log('Desired:', desired, 'Current:', current);

  return (current - desired);
};

var updateAc = function () {
  if (parseInt(acFuncSelect.value) === 1) {
    if (checkTemps() > 0) {
      setStatus(1);
    } else if (checkTemps() < 0) {
      setStatus(2);
    } else {
      setStatus(3);
    }
  } else if (Math.abs(checkTemps()) === 0) {
    setStatus(3);
  } else {
    setStatus(0);
  }
};

updateAc();

acFuncSelect.addEventListener('change', updateAc);
thermostatInput.addEventListener('change', updateAc);
currentTempInput.addEventListener('change', updateAc);
