module pureEgret
{
    /**
    *pureEgret是基于EgretEngine和pureMVC进行插件化改造的游戏开发框架。
    * -------------------------------------------
    * 使用方式： 
    * 继承Clinet来启动puremvc框架
    * 继承Plugin来制作插件，在插件里注册各种puremvc功能
    * 继承Mgr来 使用和扩展 管理器
    * -------------------------------------------
    * 默认Mgr里 有 pureEgret.LoaderManager。
    * 加载插件的方法：可以一次性加载多个。
    * GM.getInstance().loaderMgr.addPlugin(PLUGIN.CITY,"hello city!");
    * GM.getInstance().loaderMgr.startLoad();
    * 
    * 移除插件的方法：
    * GM.getInstance().loaderMgr.killPlugin(PLUGIN.BUILD);
    * 插件注册的 proxy，mediator，command 都会自动移除掉。
    * 开发者需要在对应的proxy和mediator中 在onRemove()方法里 处理相关内容
    *--------------------------------------------
    * 游戏开启流程：
    *初始化pureMVC框架->初始化基础manager->初始化扩展manager->注册所有插件->预加载->加载需要的插件
    * 
    * 以override_开头的方法需要重写
    * 在override_setupManagers中安装管理器
    * 在override_Start中开始游戏
    * @author Fox 463592417@qq.com 
    */
    export class Client extends egret.DisplayObjectContainer
    {
        /**
        * pureMVC的facade的引用
        */
        protected  facade:puremvc.IFacade;

        constructor()
        {
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
        }

        private start(e:egret.Event=null):void
        {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.start,this);
            //setup pureMVC
            this.facade = puremvc.Facade.getInstance();
            console.log("[core] setup pureMVC OK!");
            //setup managers
            this.override_setupManagers();
            console.log("[core] setup managers OK!");
            //game start
            this.override_Start();
            console.log("[core] game start");
        }

        /**
        *在该方法内，setup各种管理器
        * */
        protected override_setupManagers():void
        {
            throw Error("[core] need override ,set up managers!");
        }

        protected override_Start():void
        {
            throw Error("need override ,game start!");
        }

    }
}
