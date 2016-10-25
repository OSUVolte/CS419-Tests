
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score : 0,

        //Build menu
        buildbutton: "",
        barracksbutton: "",
        menu_background: ""
    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(1024, 768, {wrapper : "screen", scale : "auto"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        
        // disable gravity
        me.sys.gravity = 0;
        
        // prevent default browser actions
        me.input.preventDefault = true;

        // add our player entity in the entity pool
        me.pool.register("spawn_top", game.Warrior);
        //me.pool.register("player", game.PlayerEntity);
        //me.pool.register("bottom", game.Bottom);
        //me.pool.register("top", game.Top);
        me.pool.register("mid", game.Mid);
        me.pool.register("queue", game.Queue);

        //buildings:
        //me.pool.register("build", game.BuildingObject);
        me.pool.register("build_area", game.Buildings);
        me.pool.register("structures", game.Structures);

        //Build Menu:
        me.pool.register("menu_background", game.BuildMenu, true);
        me.pool.register("buildbutton", game.BuildButton, true);
        me.pool.register("barracksbutton", game.BarracksButton, true);

        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,  "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        me.input.bindKey(me.input.KEY.B, "build", true);
        me.input.bindKey(me.input.KEY.NUM1, "barracks", true);
        me.input.bindKey(me.input.KEY.A, "accept");
        me.input.bindKey(me.input.KEY.X, "x", true);


        // render hitbox int the debug panel
        me.debug.renderHitBox = true;

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
