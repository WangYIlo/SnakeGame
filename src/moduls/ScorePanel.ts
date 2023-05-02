//定义计分牌
class ScorePanel{
    //score 和 level 用来记录分数和等级
    score:number=0
    level:number=1

    scoreEle:HTMLElement
    levelEle:HTMLElement

    //最大等级
    maxLevel:number
    //设置一个变量表示多少分进行升级
    upScore:number

    constructor(maxLevel:number=10,upScore:number=10){
        this.scoreEle=document.getElementById('score')!
        this.levelEle=document.getElementById('level')!
        this.maxLevel=maxLevel
        this.upScore=upScore
    }


    //加分
    addScore(){
        this.scoreEle.innerHTML=++this.score+''

        //判断分数进行升级
        if(this.score%this.upScore===0){
            this.levelUp()
        }
    }

    //提升等级的方法
    levelUp(){
        if(this.level<this.maxLevel){
          this.levelEle.innerHTML=++this.level+''
        }
    }
}


export default ScorePanel