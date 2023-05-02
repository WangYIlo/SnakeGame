//引入其他类
import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'


//游戏控制器  控制所有类
class GameControl {
    //定义三个属性
    //蛇
    snake: Snake;
    //食物
    food: Food;
    //记分牌
    scorePanel: ScorePanel

    //创建一个属性存储蛇的移动方向(按键的方向)
    direction: string = 'd'

    //创建一个属性用来记录游戏是否结束
    isLive: boolean = true


    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel()

        this.init()
    }

    // 游戏初始化
    init() {
        //绑定键盘按键按下事件---利用bind改变this指向
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }

    // ArrowUpw
    // ArrowDown
    // ArrowLeft
    // ArrowRight

    //创建一个键盘按下的响应函数
    keydownHandler(event: KeyboardEvent) {
        //修改direction属性  注意: this指向发生改变
        //需要检测key是否合法
        if (this.direction)
            this.direction = event.key
    }

    //创建一个控制蛇移动的方法
    run() {
        //根据方向(this.direction)使蛇的位置改变

        //获取蛇的坐标
        let X = this.snake.X
        let Y = this.snake.Y

        switch (this.direction) {
            case "ArrowUp":
            case "w":
                Y -= 10
                break;
            case "ArrowDown":
            case "s":
                Y += 10
                break;
            case "ArrowLeft":
            case "a":
                X -= 10
                break;
            case "ArrowRight":
            case "d":
                X += 10
                break;
        }


        //检测蛇是否吃到了食物
        this.checkEat(X, Y)
     
        //修改蛇的X和Y
        try {
            this.snake.X = X
            this.snake.Y = Y
        } catch (e) {
            alert((e as Error).message + ' GMAE OVER!')
            this.isLive = false
        }

        this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
    }


    //定义一个方法,用来检查蛇是否吃到食物
    checkEat(X: number, Y: number) {
        if (X === this.food.X && Y === this.food.Y) {
            //改变食物位置
            this.food.change()
            //加分
            this.scorePanel.addScore()
            //蛇要增加一节身体
            this.snake.addBody()
        }
    }
}


export default GameControl