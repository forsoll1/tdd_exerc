
export class RotatingShape{

    shape;

    constructor(newShape){
        this.shape = newShape.split(" ").join("") + "\n" 
    }

    rotateRight(){
        var trimShape = this.shape.replace(/\s/g, "")
        var newString = trimShape[6] + trimShape[3] + trimShape[0] + "\n" +
                        trimShape[7] + trimShape[4] + trimShape[1] + "\n" +
                        trimShape[8] + trimShape[5] + trimShape[2] + "\n";
        return newString
    }

    rotateLeft(){
        var trimShape = this.shape.replace(/\s/g, "")
        var newString = trimShape[2] + trimShape[5] + trimShape[8] + "\n" +
                        trimShape[1] + trimShape[4] + trimShape[7] + "\n" +
                        trimShape[0] + trimShape[3] + trimShape[6] + "\n";
        return newString
    }

    toString(){
        return this.shape;
    }
}