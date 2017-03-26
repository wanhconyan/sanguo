cc.Class({
    extends: cc.Component,

    properties: {
      direction:0,  //方向
      action:1 ,    //动作
      speed:1,      //速度
      frameCount:8, //当前动画帧数
    },


    // use this for initialization
    onLoad: function () {
        this.initPlayerWithType(1, 1, "0_01_0");
    },

      //更换皮肤
    initPlayerWithType:function(type,formation,defaultAction)
    {
        var url = "unit/";
        var color = "blue/";
        if(formation === 1)
        {
          color =  "red/";
        }
        url =  url + color + type ;
        this.initPlayerWithUrl(url,defaultAction);
    },

       //更换皮肤
    initPlayerWithUrl:function(url,defaultAction)
    {
        let self = this ;
        if(url === undefined || url === "")
        {
            url = "unit/red/1" ;
        }
        self.animation = this.getComponent(cc.Animation);
        self.animation.active = true ;
        cc.loader.loadRes(url, cc.SpriteAtlas, (err, atlas) => {
        self.heroAtlas = atlas ;
        this.node.emit("loadComplete"); //通知资源加载完成
        this.play(defaultAction,8);
     });

    },

    //创建以key为截点的动画
    createAnimationClips:function(key,frameCount)
    {
        var frame = [];
        for(var i = 1; i <= frameCount ; i ++)
        {
            console.log(key);
            var spriteFrame =  this.heroAtlas.getSpriteFrame(key + i);
            frame.push(spriteFrame);
        }
        var clip = cc.AnimationClip.createWithSpriteFrames(frame,frameCount);
        clip.name = key ;
        clip.wrapMode = cc.WrapMode.Loop;
        this.animation.addClip(clip);
    },

    //播放相应动画
    play:function(key,framecount)
    {
        this.frameCount = framecount ;
        if(!this.animation._nameToState[key])
        {
            this.createAnimationClips(key,framecount);
        }
        this.animation.play(key);
    },

  
});
