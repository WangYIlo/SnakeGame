class Snake{
    // 蛇头
    head:HTMLElement
    // 蛇身(包括蛇头)
    bodies:HTMLCollection
    // 获取蛇容器
    element:HTMLElement

    constructor(){
        this.element=document.getElementById('snake')!
        this.head=document.querySelector('#snake>div') as HTMLElement
        this.bodies=this.element.getElementsByTagName('div')
    }

    //获取蛇坐标--蛇头
    get X(){
        return this.head.offsetLeft
    }

    get Y(){
        return this.head.offsetTop
    }
 
    //设置蛇坐标
    set X(value:number){

        //如果新值和旧值相同,则直接返回不再修改
        if(this.X===value){
            return
        }

        //value的值合法范围0-290--蛇撞墙了
        if(value<0||value>290){
            //抛出错误
            throw new Error('蛇撞墙了！')
        }

        //修改x时 修改水平方向，蛇在进行水平方向移动时，不能修改
        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetLeft===value){
            //如果发生掉头,让蛇向反方向走
            if(value>this.X){
                value=this.X-10
            }else{
                value=this.X+10
            }
        }

        this.moveBody()

        this.head.style.left=value+'px'

         //检查有无撞到自己
         this.checkHeadBody()
    }
    set Y(value:number){

         //如果新值和旧值相同,则直接返回不再修改
         if(this.Y===value){
            return
        }

        if(value<0||value>290){
            //抛出错误
            throw new Error('蛇撞墙了！')
        }

        if(this.bodies[1]&&(this.bodies[1] as HTMLElement).offsetTop===value){
            //如果发生掉头,让蛇向反方向走
            if(value>this.Y){
                value=this.Y-10
            }else{
                value=this.Y+10
            }
        }


        this.moveBody()

        this.head.style.top=value+'px'
        //检查有无撞到自己
        this.checkHeadBody()
    }


    //蛇增加身体--变长
    addBody(){
        //向element中添加div
        this.element.appendChild(document.createElement('div'))
    }

    //蛇身体移动方法
    moveBody(){
        //将后边的身体设置为前边身体的位置---第4节=第3节位置
        for(let i=this.bodies.length-1;i>0;i--){
            //获取前边身体的位置
            let X=(this.bodies[i-1] as HTMLElement).offsetLeft;
            let Y=(this.bodies[i-1] as HTMLElement).offsetTop;

            //将这个值设置当前身体
            (this.bodies[i] as HTMLElement).style.left=X+'px';
            (this.bodies[i] as HTMLElement).style.top=Y+'px';
        }

    }

    //蛇有无吃到自己
    checkHeadBody(){
        //获取所有的身体，检查是否有重叠
        for(let i=1;i<this.bodies.length;i++){
            let bd=this.bodies[i] as HTMLElement
            if(this.X===bd.offsetLeft&&this.Y===bd.offsetTop){
                throw new Error('蛇撞到自己了!')
            }
        }
    }

}

export default Snake