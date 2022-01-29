// Tetromin - 1 h

import { RotatingShape } from "./RotatingShape.mjs"

const Tetromino = {
    T_SHAPE : new RotatingShape(`....
                                TTT.
                                .T..
                                ....`, "T"),
    I_SHAPE : new RotatingShape(`....
                                IIII
                                ....
                                ....`, "I"),
    O_SHAPE : new RotatingShape(`....
                                .OO.
                                .OO.
                                ....`, "O"),
    S_SHAPE : new RotatingShape(`....
                                .SS.
                                SS..
                                ....`, "S"),
    Z_SHAPE : new RotatingShape(`....
                                ZZ..
                                .ZZ.
                                ....`, "Z"),
    L_SHAPE : new RotatingShape(`....
                                LLL.
                                L...
                                ....`, "L"),
    J_SHAPE : new RotatingShape(`....
                                JJJ.
                                ..J.
                                ....`, "J")

}


export {Tetromino}
