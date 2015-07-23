// PT Planner Exercise

// metro map
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
  },

  lilydale : {
      name: "Lilydale",
      stops : ['Lilydale', 'Mooroolbark', 'Croydon', 'Ringwood', 'Richmond', 'Flinders Street']
  }
};

// populate select boxes
var allStops = [];
for (var line in metro) {
  for (var i = 0; i < metro[line].stops.length; i++) {
    if (allStops.indexOf(metro[line].stops[i]) === -1) {
      allStops.push(metro[line].stops[i]);
    }
  }
}
allStops.sort();

var optionsHTML = '';

for (var i = 0; i < allStops.length; i++) {
  optionsHTML += '<option value="' + allStops[i] + '">' + allStops[i] + '</option>';
}

document.getElementById('origin-select').innerHTML = optionsHTML;
document.getElementById('destination-select').innerHTML = optionsHTML;


// trip planning
var linesThrough = function(station) {
  lines = [];

  for (var line in metro) {
    if (metro[line].stops.indexOf(station) != -1) {
      lines.push(line);
    }
  }

  return lines;
};

var sameLine = function(origin, destination) {
  for (var line in metro) {
    if (metro[line].stops.indexOf(origin) > -1 && metro[line].stops.indexOf(destination) > -1) {
      return line;
    }
  }
  return false;
};

var throughRichmond = function(line) {
  return metro[line].stops.indexOf('Richmond') > -1;
};

var intersectionsOf = function (line1, line2) {
  var intersections = [];

  for (var i = 0; i < line1.length; i++) {
    if (metro[line2].stops.indexOf(metro[line1].stops[i]) > -1) {
      intersections.push(metro[line1].stops[i]);
    }
  }

  return intersections;
};

var routeOptions = function(origin, destination) {
  var options = [];
  var originLines = linesThrough(origin);
  var destinationLines = linesThrough(destination);

  for (var i = 0; i < originLines.length; i++) {
    for (var j = 0; j < destinationLines.length; j ++) {
      if (intersectionsOf(originLines[i], destinationLines[j]).length > 0) {
        options.push({ lineOne : originLines[i],
                       lineTwo : destinationLines[j],
                       changeStation : intersectionsOf(originLines[i], destinationLines[j])[0] });
      }
    }
  }

  return options;
};

var determineLines = function(origin, destination) {
  var lines = [];

  if (linesThrough(origin).length < 1 || linesThrough(destination).length < 1) {
    return lines;
  } else if (sameLine(origin, destination)) {
    lines.push(sameLine(origin, destination));
    return lines;
  } else if (throughRichmond(linesThrough(origin)[0]) && throughRichmond(linesThrough(destination)[0])) {
    lines.push(linesThrough(origin)[0]);
    lines.push(linesThrough(destination)[0]);
    return lines;
  } else {
    return lines;
  }
};

var planTrip = function(origin, destination) {
  var tripLines = determineLines(origin, destination);
  var journey = [];

  if (tripLines.length === 1) {
    journey.push(singleLeg(tripLines[0], origin, destination));
  } else if (tripLines.length > 1) {
    journey.push(singleLeg(tripLines[0], origin, 'Richmond'));
    journey.push(singleLeg(tripLines[1], 'Richmond', destination));
  }
  updateJourneyHTML(journey);
};

var singleLeg = function(line, startStation, endStation) {
  var originIndex = metro[line].stops.indexOf(startStation);
  var destinationIndex = metro[line].stops.indexOf(endStation);
  var leg = { line: line };

  if (originIndex <= destinationIndex) {
    leg.stops = metro[line].stops.slice(originIndex, destinationIndex + 1);
    leg.direction = metro[line].stops[metro[line].stops.length - 1];
  } else {
    reverseLine = metro[line].stops.slice().reverse();
    leg.stops = reverseLine.slice(reverseLine.indexOf(startStation), reverseLine.indexOf(endStation) + 1);
    leg.direction = reverseLine[reverseLine.length - 1];
  }
  return leg;
};

// page updates and buttons
var pluralize = function(count, word) {
  if (count <= 0) {
    return 'no ' + word + 's';
  } else if (count === 1) {
    return count + ' ' + word;
  } else {
    return count + ' ' + word + 's';
  }
};

var updateJourneyHTML = function(journey) {
  var numberOfStops = 0;
  var numberOfChanges = journey.length - 1;
  var journeyDiv = document.getElementById('journey');
  var journeyHTML = '';

  if (journey.length === 2) {
    numberOfStops = -1;
  }

  for (var i = 0; i < journey.length; i++) {
    numberOfStops += journey[i].stops.length;
  }

  if (numberOfStops > 1) {
    journeyHTML += '<p>Your journey covers ' + pluralize(numberOfStops, 'stop') + ' with ' + pluralize(numberOfChanges, 'change') + '. </p>';

    for (var leg = 0; leg < journey.length; leg++) {
      journeyHTML += '<div class="journeyLeg">';
      journeyHTML += '<h3>' + metro[journey[leg].line].name + ' line (towards ' + journey[leg].direction + '):</h3>';
      journeyHTML += '<ul>';
      for (var stop = 0; stop < journey[leg].stops.length; stop++) {
        journeyHTML += '<li>' + journey[leg].stops[stop] + '</li>';
      }
      journeyHTML += '</ul></div>';
    }

    journeyDiv.innerHTML = journeyHTML;
  } else if (numberOfStops === 1) {
    journeyDiv.innerHTML = '<p>You do not need a train for this journey.</p>';
  } else {
    journeyDiv.innerHTML = '<p>Unable to plan this trip.</p>';
  }
};

var planButton = document.getElementById('planButton');

planButton.addEventListener("click", function() {
  var origin = document.getElementById('origin-select').value;
  var destination = document.getElementById('destination-select').value;

  planTrip(origin, destination);
});
