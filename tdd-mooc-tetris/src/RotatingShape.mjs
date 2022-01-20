
export class RotatingShape{

    shape;
    name;

    constructor(newShape, name){
        this.shape = newShape.split(" ").join("") + "\n" 
        this.name = name
    }

    rotateRight(){
        var newString = ""
        if(this.name == "I" && this.shape[2] == "."){
            newString = `..I..
                        ..I..
                        ..I..
                        ..I..
                        .....`

        }else if (this.name == "I"){
            newString = `.....
                        .....
                        IIII.
                        .....
                        .....`
        }
        else if (this.shape.length == 12){
            var trimShape = this.shape.replace(/\s/g, "")
            newString = trimShape[6] + trimShape[3] + trimShape[0] + "\n" +
                            trimShape[7] + trimShape[4] + trimShape[1] + "\n" +
                            trimShape[8] + trimShape[5] + trimShape[2];           
        }else{
            var tS = this.shape.replace(/\s/g, "")
            newString = tS[20] + tS[15] + tS[10] + tS[5] + tS[0] +  "\n" +
                            tS[21] + tS[16] + tS[11] + tS[6] + tS[1] +  "\n" +
                            tS[22] + tS[17] + tS[12] + tS[7] + tS[2] +  "\n" +
                            tS[23] + tS[18] + tS[13] + tS[8] + tS[3] +  "\n" +
                            tS[24] + tS[19] + tS[14] + tS[9] + tS[4];
        }

        return new RotatingShape(newString, this.name)  
    }

    rotateLeft(){
        var newString = ""
        if(this.name == "I" && this.shape[2] == "."){
            newString = `..I..
                        ..I..
                        ..I..
                        ..I..
                        .....`

        }else if (this.name == "I"){
            newString = `.....
                        .....
                        IIII.
                        .....
                        .....`
        }
        else if (this.shape.length == 12){
            var trimShape = this.shape.replace(/\s/g, "")
            newString = trimShape[2] + trimShape[5] + trimShape[8] + "\n" +
                            trimShape[1] + trimShape[4] + trimShape[7] + "\n" +
                            trimShape[0] + trimShape[3] + trimShape[6];
        }else{
            var tS = this.shape.replace(/\s/g, "")
            newString = tS[4] + tS[9] + tS[14] + tS[19] + tS[24] +  "\n" +
                            tS[3] + tS[8] + tS[13] + tS[18] + tS[23] +  "\n" +
                            tS[2] + tS[7] + tS[12] + tS[17] + tS[22] +  "\n" +
                            tS[1] + tS[6] + tS[11] + tS[16] + tS[21] +  "\n" +
                            tS[0] + tS[5] + tS[10] + tS[15] + tS[20];
        }
        return new RotatingShape(newString, this.name)
    }
    toString(){
        return this.shape;
    }
}