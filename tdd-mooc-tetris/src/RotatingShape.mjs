// Rotatingshape - 3h

export class RotatingShape{

    constructor(newShape, name, yPos = -1, xPos = null){
        this.shape = newShape
        this.name = name
        this.falling = true
        this.yPos = yPos
        this.xPos = xPos
    }
    blockShapes = {
        T_0 :  `....\nTTT.\n.T..\n....\n`,
        T_1 :  `.T..\nTT..\n.T..\n....\n`,
        T_2 :  `....\n.T..\nTTT.\n....\n`,
        T_3 :  `.T..\n.TT.\n.T..\n....\n`,
        I_0 :  `....\nIIII\n....\n....\n`,
        I_1 :  `..I.\n..I.\n..I.\n..I.\n`,
        L_0 :  `....\nLLL.\nL...\n....\n`,
        L_1 :  `LL..\n.L..\n.L..\n....\n`,
        L_2 :  `....\n..L.\nLLL.\n....\n`,
        L_3 :  `.L..\n.L..\n.LL.\n....\n`,
        J_0 :  `....\nJJJ.\n..J.\n....\n`,
        J_1 :  `.J..\n.J..\nJJ..\n....\n`,
        J_2 :  `....\nJ...\nJJJ.\n....\n`,
        J_3 :  `.JJ.\n.J..\n.J..\n....\n`,
        S_0 :  `....\n.SS.\nSS..\n....\n`,
        S_1 :  `S...\nSS..\n.S..\n....\n`,
        Z_0 :  `....\nZZ..\n.ZZ.\n....\n`,
        Z_1 :  `..Z.\n.ZZ.\n.Z..\n....\n`,
        O_0 :  `....\n.OO.\n.OO.\n....\n`
    }

    rotateRight(){
        var newString = "";
        if(this.name == "I" && this.shape == this.blockShapes.I_0){
            newString = this.blockShapes.I_1
        }else if(this.name == "I" && this.shape == this.blockShapes.I_1){
            newString = this.blockShapes.I_0
        }

        if(this.name == "T" && this.shape == this.blockShapes.T_0){
            newString = this.blockShapes.T_1
        }else if(this.name == "T" && this.shape == this.blockShapes.T_1){
            newString = this.blockShapes.T_2
        }else if(this.name == "T" && this.shape == this.blockShapes.T_2){
            newString = this.blockShapes.T_3
        }else if(this.name == "T" && this.shape == this.blockShapes.T_3){
            newString = this.blockShapes.T_0
        }

        if(this.name == "L" && this.shape == this.blockShapes.L_0){
            newString = this.blockShapes.L_1
        }else if(this.name == "L" && this.shape == this.blockShapes.L_1){
            newString = this.blockShapes.L_2
        }else if(this.name == "L" && this.shape == this.blockShapes.L_2){
            newString = this.blockShapes.L_3
        }else if(this.name == "L" && this.shape == this.blockShapes.L_3){
            newString = this.blockShapes.L_0
        }

        if(this.name == "J" && this.shape == this.blockShapes.J_0){
            newString = this.blockShapes.J_1
        }else if(this.name == "J" && this.shape == this.blockShapes.J_1){
            newString = this.blockShapes.J_2
        }else if(this.name == "J" && this.shape == this.blockShapes.J_2){
            newString = this.blockShapes.J_3
        }else if(this.name == "J" && this.shape == this.blockShapes.J_3){
            newString = this.blockShapes.J_0
        }

        if(this.name == "S" && this.shape == this.blockShapes.S_0){
            newString = this.blockShapes.S_1
        }else if(this.name == "S" && this.shape == this.blockShapes.S_1){
            newString = this.blockShapes.S_0
        }

        if(this.name == "Z" && this.shape == this.blockShapes.Z_0){
            newString = this.blockShapes.Z_1
        }else if(this.name == "Z" && this.shape == this.blockShapes.Z_1){
            newString = this.blockShapes.Z_0
        }

        if(this.name == "O"){
            newString = this.blockShapes.O_0
        }

        return new RotatingShape(newString, this.name, this.yPos, this.xPos)  
    }

    rotateLeft(){
        var newString = "";
        if(this.name == "I" && this.shape == this.blockShapes.I_0){
            newString = this.blockShapes.I_1
        }else if(this.name == "I" && this.shape == this.blockShapes.I_1){
            newString = this.blockShapes.I_0
        }

        if(this.name == "T" && this.shape == this.blockShapes.T_3){
            newString = this.blockShapes.T_2
        }else if(this.name == "T" && this.shape == this.blockShapes.T_2){
            newString = this.blockShapes.T_1
        }else if(this.name == "T" && this.shape == this.blockShapes.T_1){
            newString = this.blockShapes.T_0
        }else if(this.name == "T" && this.shape == this.blockShapes.T_0){
            newString = this.blockShapes.T_3
        }

        if(this.name == "L" && this.shape == this.blockShapes.L_3){
            newString = this.blockShapes.L_2
        }else if(this.name == "L" && this.shape == this.blockShapes.L_2){
            newString = this.blockShapes.L_1
        }else if(this.name == "L" && this.shape == this.blockShapes.L_1){
            newString = this.blockShapes.L_0
        }else if(this.name == "L" && this.shape == this.blockShapes.L_0){
            newString = this.blockShapes.L_3
        }

        if(this.name == "J" && this.shape == this.blockShapes.J_3){
            newString = this.blockShapes.J_2
        }else if(this.name == "J" && this.shape == this.blockShapes.J_2){
            newString = this.blockShapes.J_1
        }else if(this.name == "J" && this.shape == this.blockShapes.J_1){
            newString = this.blockShapes.J_0
        }else if(this.name == "J" && this.shape == this.blockShapes.J_0){
            newString = this.blockShapes.J_3
        }

        if(this.name == "S" && this.shape == this.blockShapes.S_0){
            newString = this.blockShapes.S_1
        }else if(this.name == "S" && this.shape == this.blockShapes.S_1){
            newString = this.blockShapes.S_0
        }

        if(this.name == "Z" && this.shape == this.blockShapes.Z_0){
            newString = this.blockShapes.Z_1
        }else if(this.name == "Z" && this.shape == this.blockShapes.Z_1){
            newString = this.blockShapes.Z_0
        }

        if(this.name == "O"){
            newString = this.blockShapes.O_0
        }

        return new RotatingShape(newString, this.name, this.yPos, this.xPos)  
    }

    toString(){
        return this.shape;
    }
}