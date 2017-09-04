//TODO: Make the following as pull requests/bug reports on Github
//TODO: words starting with lowercase 'a' after a number are removed, such as '1and'. Fix this.
//TODO: feature add: checkbox option to have Psalm chantable



var input = document.getElementById("input");
var parseButton = document.getElementById("parse");
var prayerOfTheDay = document.getElementById("prayer-day");
var firstReading = document.getElementById("first-reading");
var psalm = document.getElementById("psalm");
var secondReading = document.getElementById("second-reading");
var gospel = document.getElementById("gospel");



//event listener for parse button
parseButton.addEventListener('click', parse, false);

//start and stop are strings at the beginning and end (inclusive) that bookend the subset you're looking for
function getSubset(start, stop) {
	var inputString = input.value;
	var startPoint = inputString.indexOf(start) + start.length;
	var afterStart = inputString.substring(startPoint);
	var stopPoint = afterStart.indexOf(stop) + startPoint;
	var output = inputString.substring(startPoint, stopPoint);
	output = output.replace(/\s+/g, " ");//removes extra spaces
	return output;

}

function readingify(substring) {//makes it into a first reading, second, or gospel format with italics intro and separate scripture
	var verseStart = substring.search(/\d(?=[A-Z]|\[)/);
	var introString = substring.substring(0, verseStart);
	var scriptureString = substring.substring(verseStart);
	scriptureString = scriptureString.replace(/\[|\]/g, "");
	scriptureString = scriptureString.replace(/\d[a-b]/g, "");
	scriptureString = scriptureString.replace(/\d/g, "");
	var outputString = "<p><em>" + introString + "</em></p><p>" + scriptureString + "</p>";
	return outputString;

}

function psalmify(substring) {//takes a psalm and formats it for congregational response by whole verse
	var psalmStart = substring.search(/\d(?=[A-Z]|\[)/);
	var introString = substring.substring(0, psalmStart);
	var psalmString = substring.substring(psalmStart);
	var outputString = "";
	var array = psalmString.split(/\d+/g);
	for (var i = 1; i < array.length; i++) {
		if (i%2 !== 0) {
			outputString = outputString + "<div>P: " + array[i] + "</div>";
		} else {
			outputString = outputString + "<strong>C: " + array[i] + "</strong>";
		}
		
	};
	outputString = "<p><em>" + introString + "</em></p><p>" + outputString; + "</p>";
	return outputString;

}

//total function that button does and contains execution of other functions
function parse() {
	prayerOfTheDay.innerHTML = getSubset("Prayer of the Day", "Amen.") + "<strong>Amen.</strong>";
	firstReading.innerHTML = readingify(getSubset("First Reading:", "Psalm:"));
	var psalmText = getSubset("Psalm:", "Second Reading:");
	psalmText = psalmText.replace(/\|/g, "");//removes |'s from psalm
	//TODO: The following DON'T WORK because replace() only replaces the first occurance of a string.
	//you will need to figure out REGEX for these next two:
	psalmText = psalmText.replace(/(\-\s*)/g, "");//removes - between syllables
	psalmText = psalmText.replace(/\.\sR/g, ".");//removes R for refrains (hopefully not beginning of sentences because those have number before)
	psalm.innerHTML = psalmify(psalmText);
	secondReading.innerHTML = readingify(getSubset("Second Reading:", "Gospel:"));
	gospel.innerHTML = readingify(getSubset("Gospel:", "Semicontinuous First Reading:"));
	//experiment:
	var experimentString = getSubset("First Reading:", "Psalm:");
	//console.log(experimentString);//works
	var startPoint = experimentString.search(/\d(?=[a-zA-Z])/);
	console.log(startPoint);
	var expSub = experimentString.substring(startPoint, startPoint + 30);
	console.log(expSub);

}






