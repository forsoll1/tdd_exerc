// Rotatingshape - 3h

export class RotatingShape{

    constructor(newShape, name, yPos = 0, xPos = null){
        this.shape = newShape.split(" ").join("") + "\n" 
        this.name = name
        this.falling = true
        this.yPos = yPos
        this.xPos = xPos
    }
    blockShapes = {
        T_0 :  `....
                TTT.
                .T..
                ....`,
        T_1 :  `.T..
                TT..
                .T..
                ....`,
        T_2 :  `....
                .T..
                TTT.
                ....
                ....`,
        T_3 :  `.T..
                .TT.
                .T..
                ....`,
        I_0 :  `....
                IIII
                ....
                ....`,
        I_1 :  `..I.
                ..I.
                ..I.
                ..I.`,
        L_0 :  `....
                LLL.
                L...
                ....`,
        L_1 :  `LL..
                .L..
                .L..
                ....`,
        L_2 :  `....
                ..L.
                LLL.
                ....`,
        L_3 :  `.L..
                .L..
                .LL.
                ....`,
        J_0 :  `....
                JJJ.
                ..J.
                ....`,
        J_1 :  `.J..
                .J..
                JJ..
                ....`,
        J_2 :  `....
                J...
                JJJ.
                ....`,
        J_3 :  `.JJ.
                .J..
                .J..
                ....`,
        S_0 :  `....
                .SS.
                SS..
                ....`,
        S_1 :  `S...
                SS..
                .S..
                ....`,
        Z_0 :  `....
                ZZ..
                .ZZ.
                ....`,
        Z_1 :  `..Z.
                .ZZ.
                .Z..
                ....`,
        O_0 : `....
                .OO.
                .OO.
                ....`
    }

    rotateRight(){
        var newString;
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
        var newString;
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