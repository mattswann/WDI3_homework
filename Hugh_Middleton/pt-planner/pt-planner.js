// PT Planner Exercise

var metro = {

  alamein : {
    name : "Alamein",
    stops : ['Flinders Street', 'Richmond', 'East Richmond', 'Burnley', 'Hawthorn','Glenferrie']
  },

	glenWaverly : {
    name : "Glen Waverly",
    stops : ['Flagstaff', 'Melbourne Central', 'Parliament', 'Richmond', 'Kooyong', 'Tooronga']
  },

	sandringham : {
    name : "Sandringham",
    stops : ['Southern Cross', 'Richmond', 'South Yarra', 'Prahran', 'Windsor']
  }

};

var linesThrough = function(station) {
  lines = [];

  for (var line in metro) {
    if (metro[line].stops.indexOf(station) != -1) {
      lines.push(line);
    }
  }

  return lines;
};

var singleLine = function(origin, destination) {
  for (var line in metro) {
    if (metro[line].stops.indexOf(origin) > -1 && metro[line].stops.indexOf(destination) > -1) {
      return line;
    }
  }
  return false;
};

var determineLines = function(origin, destination) {
  var lines = [];

  if (linesThrough(origin).length < 1 || linesThrough(destination).length < 1) {
    return lines;
  } else if (singleLine(origin, destination)) {
    lines.push(singleLine(origin, destination));
    return lines;
  } else {
    lines.push(linesThrough(origin)[0]);
    lines.push(linesThrough(destination)[0]);
    return lines;
  }
};

var planTrip = function(origin, destination) {
  var tripLines = determineLines(origin, destination);
  var journey;

  if (tripLines.length < 1) {
    console.log('Unable to plan this trip.');
  } else if (tripLines.length === 1) {
    journey = singleLineJourney(tripLines[0], origin, destination);
  } else {
    journey = multiLineJourney(tripLines[0], origin, tripLines[1], destination);
  }

  updateJourneyHTML(journey);
};

var singleLineJourney = function(line, startStation, endStation) {
  var originIndex = metro[line].stops.indexOf(startStation);
  var destinationIndex = metro[line].stops.indexOf(endStation);
  var journey = [];
  var leg;

  if (originIndex <= destinationIndex) {
    leg = metro[line].stops.slice(originIndex, destinationIndex + 1);
    journey.push({ line: line, stops: leg });
  } else {
    reverseLine = metro[line].stops.reverse();
    leg = reverseLine.slice(reverseLine.indexOf(startStation), reverseLine.indexOf(endStation) + 1);
    journey.push({ line: line, stops: leg });
  }

  return journey;
};

var multiLineJourney = function(startLine, startStation, endLine, endStation) {
  var startLineStops = metro[startLine].stops;
  var endLineStops = metro[endLine].stops;

  var originIndex = startLineStops.indexOf(startStation);
  var destinationIndex = endLineStops.indexOf(endStation);
  var richmondIndexStart = startLineStops.indexOf('Richmond');
  var richmondIndexEnd = endLineStops.indexOf('Richmond');

  var journey = [];
  var leg;

  // First Leg
  if (originIndex <= richmondIndexStart) {
    leg = startLineStops.slice(originIndex, richmondIndexStart + 1);
    journey.push({ line: startLine, stops: leg });
  } else {
    reverseLine = startLineStops.reverse();
    originIndex = reverseLine.indexOf(startStation);
    richmondIndexStart = reverseLine.indexOf('Richmond');
    leg = reverseLine.slice(originIndex, richmondIndexStart + 1);
    journey.push({ line: startLine, stops: leg });
  }

  // Second Leg
  if (richmondIndexEnd <= destinationIndex) {
    leg = endLineStops.slice(richmondIndexEnd, destinationIndex + 1);
    journey.push({ line: endLine, stops: leg });
  } else {
    reverseLine = endLineStops.reverse();
    destinationIndex = reverseLine.indexOf(endStation);
    richmondIndexEnd = reverseLine.indexOf('Richmond');
    leg = reverseLine.slice(richmondIndexEnd, destinationIndex + 1);
    journey.push({ line: endLine, stops: leg });
  }

  return journey;
};


var updateJourneyHTML = function(journey) {
  var numberOfStops = 0;
  var journeyDiv = document.getElementById('journey');
  var journeyHTML = '';

  if (journey.length === 2) {
    numberOfStops = -1;
  }

  for (var i = 0; i < journey.length; i++) {
    numberOfStops += journey[i].stops.length;
  }

  journeyHTML += '<p>Your journey has ' + numberOfStops + ' stops.</p>';
  journeyHTML += '<ul>';

  for (var j = 0; j < journey.length; j++) {
    journeyHTML += '<li>' + metro[journey[j].line].name + ' line: ' + journey[j].stops.join(' => ') + '</li>';
  }

  journeyHTML += '</ul>';
  journeyDiv.innerHTML = journeyHTML;
};

var planButton = document.getElementById('planButton');

planButton.addEventListener("click", function() {
  var origin = document.getElementById('origin-select').value;
  var destination = document.getElementById('destination-select').value;

  planTrip(origin, destination);
});

// var logDivider = function(n) {
//   var divider = '';
//   for (var i = 0; i < n; i++) {
//     divider += '=';
//   }
//   console.log(divider);
// };
//
// var logJourney = function(journey) {
//   var numberOfStops = 0;
//
//   if (journey.length === 2) {
//     numberOfStops = -1;
//   }
//
//   for (var i = 0; i < journey.length; i++) {
//     numberOfStops += journey[i].stops.length;
//   }
//
//   console.log('Your journey consists of ' + numberOfStops + ' stops.');
//
//   for (var j = 0; j < journey.length; j++) {
//     console.log(metro[journey[j].line].name + ' line: ' + journey[j].stops.join(' => '));
//   }
// };
