// Tetromin - 1 h

import { RotatingShape } from "./RotatingShape.mjs"

const Tetromino = {
    T_SHAPE : new RotatingShape(`....\nTTT.\n.T..\n....\n`, "T"),
    I_SHAPE : new RotatingShape(`....\nIIII\n....\n....\n`, "I"),
    O_SHAPE : new RotatingShape(`....\n.OO.\n.OO.\n....\n`, "O"),
    S_SHAPE : new RotatingShape(`....\n.SS.\nSS..\n....\n`, "S"),
    Z_SHAPE : new RotatingShape(`....\nZZ..\n.ZZ.\n....\n`, "Z"),
    L_SHAPE : new RotatingShape(`....\nLLL.\nL...\n....\n`, "L"),
    J_SHAPE : new RotatingShape(`....\nJJJ.\n..J.\n....\n`, "J")
}


export {Tetromino}
