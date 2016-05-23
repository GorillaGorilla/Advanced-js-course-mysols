
var SAMURAIPRINCIPLE = {};

SAMURAIPRINCIPLE.GameOfLife = function() {
    'use strict';
    var self = this,
        isAlive = {};


}
SAMURAIPRINCIPLE.GameOfLife.cellKey = function (row, column) {
    return row + '_' + column;
};

SAMURAIPRINCIPLE.GameOfLife.prototype.isCellAlive = function (row, column) {
        return this.isAlive[this.cellKey(row, column)] || false;
    };
SAMURAIPRINCIPLE.GameOfLife.prototype.toggleCellState = function (row, column) {
        var key = this.cellKey(row, column);
        if (this.isAlive[key]) {
            delete this.isAlive[key];
        } else {
            this.isAlive[key] = true;
        }
        return this;
    };

SAMURAIPRINCIPLE.GameOfLife.prototype.tick = function () {
        var key, parts, row, column, numberOfNeighbours = {}, neighbourKey;
        for (key in this.isAlive) {
            parts = key.split('_');
            row = parseInt(parts[0], 10);
            column = parseInt(parts[1], 10);
            numberOfNeighbours[key] = numberOfNeighbours[key] || 0;
            [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(function (offset) {
                neighbourKey = this.cellKey(row + offset[0], column + offset[1]);
                numberOfNeighbours[neighbourKey] = (numberOfNeighbours[neighbourKey] || 0) + 1;
            });
        }
        for (key in numberOfNeighbours) {
            if (this.isAlive[key] && (numberOfNeighbours[key] < 2 || numberOfNeighbours[key] > 3) || !this.isAlive[key] && numberOfNeighbours[key] === 3) {
                parts = key.split('_');
                row = parseInt(parts[0], 10);
                column = parseInt(parts[1], 10);
                this.toggleCellState(row, column);
            }
        }
    };

//SAMURAIPRINCIPLE.GameOfLife = function(){
//    this.board = [];
//    for (i=0;i<20;i++){
//        this.board[i] = [];
//        for (j=0;j<20;j++){
//            this.board[i][j] = false;
//        }
//    }
//    this.isCellAlive = function(i, j){
//        return this.board[i][j];
//    };
//    this.toggleCellState = function(i, j){
//        if (this.board[i][j] === false)
//            return this.board[i][j] = true;
//
//        return this.board[i][j] = false;
//    };
//    this.tick = function (){
//
//    }
//    this.countLivingNeighbours = function(i, j){
//        var neighbourCount = 0;
//        if (i != 0 && j != 0 && i !=20 && j != 20){
//            for (row=0;row<3;row++){
//                for (col=0;col<3;col++){
//                    if (this.board[i-1+row][j-1+col]) {
//                        neighbourCount++}
//                }
//            }
//            if (this.board[i-1+row][j-1+col]){neighbourCount -= 1;}
//            return neighbourCount;
//        }
//    }
//    return this;
//};