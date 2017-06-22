<template>
    <div>
        <head-top :headTitle="headTitle" />
    
        <div id="content">
            <table>
                <tbody>
                    <tr v-for="items in grid">
                        <td :class="item" v-for="item in items"></td>
                    </tr>
                </tbody>
            </table>
            <p class="notice">提示：空格键控制开始/ 暂停，方向键控制蛇的移动方向，F5刷新</p>
            <p class="time">{{run}}</p>
        </div>
    </div>
</template>

<script>
import headTop from 'src/components/headTop'
export default {
    data() {
        return {
            headTitle: 'snake',
            width: 18,//地图的行列
            height: 18,
            grid: [],//地图的数组
            snakeGrid: [],//存放蛇的数组
            foodGrid: [],//食物的数组
            derectkey: 39,//按下额方向键
            goX: 0,//蛇的位移
            goY: 0,
            speed: 10,//移速
            stop: true,//控制开始.暂停
            snakeTimer: null,//蛇移动的即时器
            run: 0,

        }
    },
    components: { headTop },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.grid = new Array();
            for (let i = 0; i < 18; i++) {
                this.grid[i] = new Array();
                for (let j = 0; j < 18; j++) {
                    this.grid[i][j] = "notsnake"
                }
            }
            this.initSnake();
            this.initFood();
            this.bindKeydown();
        },
        initSnake() {
            this.snakeGrid.push([1, 3]);
            this.snakeGrid.push([1, 2]);
            this.snakeGrid.push([1, 1]);
            //设置蛇的背景色
            this.painSnake();
            //设置蛇头的背景色
            this.grid[this.snakeGrid[0][0]][this.snakeGrid[0][1]] = "snake_head";
        },
        painSnake() {//设置蛇的颜色
            console.log("设置蛇身颜色")
            let snakeGrid = this.snakeGrid;
            for (let i = 1; i < snakeGrid.length; i++) {
                let snake_temp1 = snakeGrid[i][0];
                let snake_temp2 = snakeGrid[i][1];
                console.log(snake_temp1 + "--" + snake_temp2)
                this.grid[snake_temp1][snake_temp2] = "snake";
            }
        },
        initFood() {//初始化食物
            this.foodGrid = this.randomPoint();
            if (this.pointInSnake(this.foodGrid)) {
                this.initFood();
            } else {
                this.grid[this.foodGrid[0]][this.foodGrid[1]] = "food";
            }
        },
        randomPoint(initX, initY, endX, endY) {//生成随机点
            let initx = initX || 0;
            let inity = initY || 0;
            let endx = endX || (this.grid[0].length - 1);
            let endy = endY || (this.grid.length - 1);
            let p = [];
            p[0] = Math.floor(Math.random() * (endx - initx)) + initx;
            p[1] = Math.floor(Math.random() * (endy - inity)) + inity;
            return p;
        },
        pointInSnake(point, start) {
            let snakeGrid = this.snakeGrid;
            for (let i = start; i < snakeGrid.length; i++) {
                if (point[0] == snakeGrid[i][0] && point[1] == snakeGrid[i][1]) {
                    return true;
                }
            }
            return false;
        },
        bindKeydown() {
            let _this = this;
            window.addEventListener('keydown', function keydown(e) {
                let code = e.which;
                console.log("keydown" + code);
                if (code == 116) { window.location.reload(); }	//按下F5键，刷新页面
                if (code == 32) {
                    if (_this.stop) {
                        _this.move(_this);
                        _this.stop = false;
                    } else {
                        if (_this.snakeTimer) { clearTimeout(_this.snakeTimer); }
                        _this.stop = true;

                    }
                }
                if (code == 65) { _this.grid[10][10] = "snake"; _this.headTitle = "snake1" }
                if (code >= 37 && code <= 40) {				//方向键改变蛇的移动方向
                    if (!_this.stop) { _this.derectkey = code; }
                }

            });
        },
        move(_this) {
            console.log("move")
            if (this.snakeTimer) { clearTimeout(this.snakeTimer) }
            this.snakeTimer = setTimeout(this.main, 3000 / this.speed)
        },
        main() {
            let headx = this.snakeGrid[0][0],
                heady = this.snakeGrid[0][1],
                temp = this.snakeGrid[this.snakeGrid.length - 1],
                isEnd = false,
                msg = '';
            //根据方向键的控制确定方向
            switch (this.derectkey) {
                case 37:
                    if (this.goY != 1) { this.goY = -1; this.goX = 0 } 	//防止控制蛇往相反反方向走
                    break;
                case 38:
                    if (this.goX != 1) { this.goX = -1; this.goY = 0 }
                    break;
                case 39:
                    if (this.goY != -1) { this.goY = 1; this.goX = 0 }
                    break;
                case 40:
                    if (this.goX != -1) { this.goX = 1; this.goY = 0 }
            }
            headx += this.goX;
            heady += this.goY;
            //判断吃到食物
            if (headx == this.foodGrid[0] && heady == this.foodGrid[1]) {
                this.snakeGrid.unshift(this.foodGrid);
                this.initFood();
                if (this.snakeGrid.length > 4) {		//控制蛇加速
                    if (this.snakeGrid.length == 5) {
                        this.speed += 5;
                    }
                    else if (this.snakeGrid.length == 10) {
                        this.speed += 3;
                    }
                    else if (this.snakeGrid.length == 20) {
                        this.speed += 3;
                    }
                    else if (this.snakeGrid.length == 30) {
                        this.speed += 3;
                    }
                    this.move();
                }
            } else {
                for (let i = this.snakeGrid.length - 1; i > 0; i--) {
                    this.snakeGrid[i] = this.snakeGrid[i - 1];
                }
                this.snakeGrid[0] = [headx, heady];
                if (this.pointInSnake(this.snakeGrid[0], 1)) {
                    isEnd = true;
                    msg = "这肉好香,擦,是我自己的!!";
                } else if (this.isWall(this.snakeGrid[0])) {
                    isEnd = true;
                    msg = "这墙好硬!!!";
                }
            }
            if (isEnd) {
                if (this.snakeTimer) { clearTimeout(this.snakeTimer) }
                if (confirm(msg + "你的分数是：" + this.getScore() + "！ 是否重新开始？")) {
                    //this.reset();
                    window.location.reload();
                }
                return false;
            } else {
                this.grid[temp[0]][temp[1]] = "notsnake";
            }
            this.painSnake();
            this.grid[headx][heady] = "snake_head";
            this.run = this.run + 1;
            this.snakeTimer = setTimeout(this.main, 3000 / this.speed);
        },
        getScore() {
            let length = this.snakeGrid.length;
            let score = 0;
            let i = parseInt(length / 5);		//临界分值
            if (i == 0) {
                score = length;
            }
            else {
                i = i > 4 ? 4 : i;	//若蛇长超过20则临界分值为4
                var j = i;
                while (j > 0) {
                    score += 5 * j;
                    j--;
                }
                score += (length - 5 * i) * (i + 1);	//最大分值为临界分值+1
            }
            return score;
        },
        isWall(point) {
            console.log(point[0] + "-" + point[1])
            if (point[0] < 0 || point[1] < 0 || point[0] > this.grid[0].length - 1 || point[1] > this.grid.length - 1) {
                return true;
            }
            return false;
        },
        reset() {
            this.derectkey = 39; 	//按下的方向键
            this.goX = 0; 		//蛇横向移动的位移，1或-1
            this.goY = 0; 		//蛇纵向移动的位移，1或-1
            this.speed = 10;
            this.stop = true;
            this.run = 0;
            this.grid = [];
            this.snakeGrid = [];
            this.foodGrid = [];
            this.init();
        },
    }
}
</script>

<style lang='scss' scoped>
body {
    height: 50%;
}

#content {
    padding-top: 2rem;

    text-align: center;
    table {
        margin: auto;
        border-collapse: collapse;
        overflow: hidden;
        border: 4px solid #ddd;
        padding: .2rem;
    }
    td {
        display: table-cell;
        width: 20px;
        height: 20px;
        background: #fff;
        border: 1px #eeeeee solid;
    }
    .snake {
        background: #33aa33;
    }
    .notsnake {
        background: #fff;
    }
    .food {
        background: #dd4444;
    }
    .snake_head {
        background: #3388ee;
    }

    .notice {
        background: #444;
        width: 100%;
        text-align: center;
        padding: .2rem;
        color: #fff;
        font-size: 14px;
    }
    .time {
        color: white
    }
}
</style>