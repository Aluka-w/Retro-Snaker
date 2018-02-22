;(function(window){
    //声明一个数组 , 保存显示蛇的div
    var list = [];
    //声明一个数组 , 保存不同的颜色
    var arr = ['red' , 'green' , 'skyblue' , 'yellow' , 'pink' , 'black']
    //创建蛇的构造函数
    function Snake(width , height , direction){
        this.width = width || 20;
        this.height = height || 20;
        this.direction = direction || 'right';
        this.body = [
            {x : 3 , y : 1 , color : 'red'},
            {x : 2 , y : 1 , color : 'green'},
            {x : 1 , y : 1 , color : 'pink'}
        ]
    }
    //蛇的渲染方法 , 记得删除老蛇
    Snake.prototype.render = function (map) { 
        //删除蛇
        remove()
        //循环渲染每一节身体
        for (let i = 0; i < this.body.length; i++) {
            //拿到每一节身体
            const element = this.body[i];
            //创建div
            var box = document.createElement('div');
            box.style.position = 'absolute';
            box.style.left = element.x * this.width + 'px';
            box.style.top = element.y * this.height + 'px';
            box.style.backgroundColor = element.color;
            box.style.width = this.width + 'px';
            box.style.height = this.height + 'px';
            //添加进map
            map.appendChild(box);
            list.push(box);
        }
     }
    //删除方法
    function remove() {
        for (let i = list.length -1; i >= 0; i--) {

             list[i].parentNode.removeChild(list[i]);
            list.pop();
        }
      }
    //蛇移动的方法
      Snake.prototype.move = function (food , map) {
          //先让身体动起来 , 最后一块到它前一块的地方去
          var index = this.body.length - 1;//最后一节
          for (let i = index; i > 0; i--) {
              this.body[i].x = this.body[i-1].x;
              this.body[i].y = this.body[i-1].y;

          }
          //让蛇头根据按键移动
          switch (this.direction) {
              case "right":
                  this.body[0].x++;
                  break;
              case "left":
                  this.body[0].x--;
                  break;
              case "top":
                  this.body[0].y--;
                  break;
              case "bottom":
                  this.body[0].y++;
                  break;
          }
    //判断蛇有没有迟到食物
          //判断蛇头与食物的坐标是否重合 , 重合就是吃了食物
          //取蛇头坐标
          var snakeHeadeX = this.body[0].x * this.width;
          var snakeHeadeY = this.body[0].y * this.height;
          //取食物坐标
          var foodx = food.x;
          var foody = food.y;
          //吃到了食物
          if(foodx ==snakeHeadeX && foody == snakeHeadeY){
            //长身体 , 取最后一个身体的坐标作为新身体的坐标
            var last = this.body[this.body.length - 1];
            this.body.push({
                x : last.x,
                y : last.y,
                color : arr[Math.floor(Math.random() *  arr.length)]
            })

            //长出来的身体 , 需要重新渲染一下
            food.render(map);

          }
        }


    //暴露出去
    window.Snake = Snake;
})(window)

