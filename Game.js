;(function(window){
    //声明一个变量 , 保存Game对象
    var that = null;
    //1.创建游戏对象的构造函数
    function Game(map) {
        this.snake = new Snake();
        this.food = new Food();
        this.map = map;

        that = this;
      }

      //2.0 让游戏对象 , 控制开始游戏
      Game.prototype.start = function () {
          //显示食物和蛇
          this.snake.render(this.map);
          this.food.render(this.map);

          //蛇自动移动的方法
          snakeAutoMove();

          //根据按下的键 , 设置蛇头的位置
          bindKey();
        }

      //3.0 蛇自动移动的方法
      function snakeAutoMove(){
          var timeId = setInterval(function(){
              this.snake.move(this.food , this.map);
              this.snake.render(this.map);

              //判断是否撞墙 , 即蛇头坐标与地图坐标重合 , 就让蛇死掉(清空计时器)
              var snakeHeadX = this.snake.body[0].x * this.snake.width;
              var snakeHeadY = this.snake.body[0].y * this.snake.height;

              if(snakeHeadX >= this.map.offsetWidth || snakeHeadY >= this.map.offsetHeight || snakeHeadX < 0 || snakeHeadY < 0){
                  alert('Game over!');
                  clearInterval(timeId);
              }
          }.bind(that), 300);
      }


      //4.0 封装函数 , 获取按键
      function bindKey(){
          //给document , 注册一个键盘按下事件
          document.onkeydown = function (e) {
              e = e || window.event;
              switch (e.keyCode) {
                  case 37:
                      if(this.snake.direction != 'right'){
                          this.snake.direction = 'left';
                      }
                  break;
                      case 38:
                        this.snake.direction = 'top';
                      break;
                  break;
                      case 39:
                        this.snake.direction = 'right';
                      break;
                  break;
                      case 40:
                        this.snake.direction = 'bottom';
                      break;

              }
            }.bind(that);
      }


      //把构造函数暴露出去
      window.Game = Game;
})(window)


