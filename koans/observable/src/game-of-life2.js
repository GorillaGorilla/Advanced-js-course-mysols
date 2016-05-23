/*global jQuery*/
var SAMURAIPRINCIPLE = SAMURAIPRINCIPLE || {};

SAMURAIPRINCIPLE.GameOfLife = function () {
	'use strict';
	var self = this,
		isAlive = {},
		cellKey = function (row, column) {
			return row + '_' + column;
		};
	SAMURAIPRINCIPLE.eventDispatcher(this);
	//this.createObservableProperty('cellState');
	this.isCellAlive = function (row, column) {
		return isAlive[cellKey(row, column)] || false;
	};

	this.toggleCellState = function (row, column) {
		var key = cellKey(row, column);
		if (isAlive[key]) {
			delete isAlive[key];
		} else {
			isAlive[key] = true;
		}
		self.dispatchEvent('cellStateChanged',row, column, self.isCellAlive(row,column));
		return this;
	};
	this.tick = function () {
		var key, parts, row, column, numberOfNeighbours = {}, neighbourKey;
		for (key in isAlive) {
			parts = key.split('_');
			row = parseInt(parts[0], 10);
			column = parseInt(parts[1], 10);
			numberOfNeighbours[key] = numberOfNeighbours[key] || 0;
			[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(function (offset) {
				neighbourKey = cellKey(row + offset[0], column + offset[1]);
				numberOfNeighbours[neighbourKey] = (numberOfNeighbours[neighbourKey] || 0) + 1;
			});
		}
		for (key in numberOfNeighbours) {
			if (isAlive[key] && (numberOfNeighbours[key] < 2 || numberOfNeighbours[key] > 3) || !isAlive[key] && numberOfNeighbours[key] === 3) {
				parts = key.split('_');
				row = parseInt(parts[0], 10);
				column = parseInt(parts[1], 10);
				self.toggleCellState(row, column);
			}
		}
	};
};

jQuery.fn.extend({
	gameOfLifeWidget: function (gameOfLife, rows, columns, animationDuration) {
		'use strict';
		return this.each(function () {
			var rootElement = jQuery(this);
			console.log(rootElement.find('.grid tr:nth-child(' + 1 + ') td:nth-child(' + 1 + ')'));
			//var handler = function(col, row){return function(){gameOfLife.toggleCellState(col, row);}};
			//for (var i=0;i<rows;i++){
			//	for (var j = 0; j<columns; j++){
			//		rootElement.find('.grid tr:nth-child(' + (i+1) + ') td:nth-child(' + (j+1) + ')').click(
			//			handler(i,j)
			//		);
			//	}
			//}
			for (var i= 0; i<rows;i++){
				for (var j = 0; j<columns; j++){

					rootElement.find('.grid tr:nth-child(' + (i+1) + ') td:nth-child(' + (j+1) + ')').click(
						 gameOfLife.toggleCellState.bind(gameOfLife,i,j)
					);
				}
			}


			rootElement.find('.tick').click(function(){
				gameOfLife.tick();
			});

			var displayLivingness = function(i, j, alive){
				var element = rootElement.find('.grid tr:nth-child(' + (i+1) + ') td:nth-child(' + (j+1) + ')');
					element.toggleClass('alive');

			};

			gameOfLife.addEventListener('cellStateChanged',displayLivingness);

		});
	}

});
