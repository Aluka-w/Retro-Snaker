;(function (window) {
    //声明一个数组 , 来储存食物
    var list = []
    //食物的构造函数
    function Food(x , y, width , height , color) { 
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 20;
        this.height = height || 20;
        this.color = color || 'red';
     }
    //食物原型上渲染 , 删除老食物
    Food.prototype.render = function (map) {
        //每次调用这个方法之前先删除老食物
        remove();

        //每个盒子的x , y必须是在map地图内
        this.x = Math.floor(Math.random() * map.offsetWidth / this.width) * this.width;
        this.y = Math.floor(Math.random() * map.offsetHeight / this.height) * this.height;

        //创建div
        var box = document.createElement('div');

        //给div添加属性
        box.style.position = 
        box.style.width = this.width + 'px';
        box.style.height = this.height + 'px';
        box.style.top = this.y + 'px';
        box.style.left = this.x + 'px';
        box.style.backgroundColor = this.color;
        //添加进map
        map.appendChild(box);
        //添加进数组中
        list.push(box);
      }

    //移除老食物的方法
    function remove() {
        for (let i = list.length-1; i >= 0; i--) {
            const element = list[i];
            element.parentNode.removeChild(element);
            list.pop();
        }
      }
    //把构造函数暴露出去
      window.Food = Food
})(window)
