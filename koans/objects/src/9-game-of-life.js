var SAMURAIPRINCIPLE = {};
var choices = {
	'true' : [false,false,true,true,false,false,false,false],
	'false' : [false,false,false,true,false,false,false,false]
}

SAMURAIPRINCIPLE.isCellAliveInNextGeneration = function (isCellAlive, numberOfNeighbours) {
	return {
		true:{
			2: true,
			3: true
		},
		false: {
			3: true
		}
	}[isCellAlive].hasOwnProperty(numberOfNeighbours);
};


function getColour(name) {
	if (name === 'red') {
		return 0xFF0000;
	} else if (name === 'green') {
		return 0x00FF00;
	} else if (name === 'blue') {
		return 0x0000FF;
	}
}