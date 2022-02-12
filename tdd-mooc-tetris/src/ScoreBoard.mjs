
export class ScoreBoard {

    score = 0

    countPoints(yValues){
        if(yValues.length == 1){
            this.score += 40
        }else if(yValues.length == 2){
            this.score += 100
        }else if(yValues.length == 3){
            this.score += 300
        }else if(yValues.length == 4){
            this.score += 1200
        }
    }

    toString(){
        return this.score.toString()
    }
}