import { AcGameObject } from "/static/js/ac_game_object/base.js";  // 引入类
import { Controller } from "/static/js/controller/base.js";

export class GameMap extends AcGameObject {
    constructor(root) {
        super();
        this.root = root;

        //tabindex=0:让canvas聚焦以读取键盘输入
        this.$canvas = $('<canvas width="1280" height="720" tabindex=0></canvas>')
        this.ctx = this.$canvas[0].getContext('2d');   //把canvas对象取出来
        this.root.$kof.append(this.$canvas);  // 将canva加到div里边
        this.$canvas.focus();  //聚焦

        this.controller = new Controller(this.$canvas);

        this.root.$kof.append($(`<div class="kof-head">
        <div class="kof-head-hp-0"><div></div></div>
        <div class="kof-head-timer">60</div>
        <div class="kof-head-hp-1"><div></div></div>
    </div>`));

        this.time_left = 60000;  // 单位：ms
        this.$timer = this.root.$kof.find(`.kof-head-timer`);
    }

    start() {

    }

    update() {

        this.time_left -= this.timedelta;
        if (this.time_left < 0) {
            this.time_left = 0;

            let [a, b] = this.root.players;
            if (a.status !== 6 && b.status !== 6) {
                if (a.hp > b.hp) {
                    b.status = 6;
                } else if (a.hp < b.hp) {
                    a.status = 6;
                } else {
                    a.status = b.status = 6;
                }
                a.frame_current_cnt = b.frame_current_cnt = 0;
            }
        }

        this.$timer.text(parseInt(this.time_left / 1000));

        this.render();
    }

    render() {  //每一帧把地图清空一遍，不刷新存的是移动的路径
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}