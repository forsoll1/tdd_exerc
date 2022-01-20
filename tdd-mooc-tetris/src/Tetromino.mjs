import { RotatingShape } from "./RotatingShape.mjs"

const Tetromino = {
    T_SHAPE : new RotatingShape(`.T.
                                TTT
                                ...`, "T"),
    I_SHAPE : new RotatingShape(`.....
                                .....
                                IIII.
                                .....
                                .....`, "I")

}


export {Tetromino}
