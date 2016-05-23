function isCellAliveInNextGeneration(isCellAlive, numberOfNeighbours) {
    if (isCellAlive === true){
        return numberOfNeighbours === 2 || numberOfNeighbours === 3;
    }else if (isCellAlive === false){
        if (numberOfNeighbours ===3){
            return true;
        }
    }

}
