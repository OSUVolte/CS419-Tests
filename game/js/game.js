
/* Game namespace */
var game = {

    // an object where to store game information
    data : {
        // score
        score: 0,
        gametime: 0,
        currentwave: 0,
        waveduration: 15, //set to 15 seconds for testing

        //Build menu
        buildbutton: "",
        barracksbutton: "",
        menu_background: "",
        isBuildMenuOpen: false,

        playergold: 1000, //set initial player gold to 1000
        playergoldrate: 5, //set initial player gold rate to 5 gold per sec

        //Used for displaying messages on the screen
        message: {
            msgTime: 0, //time message was entered
            msg: "",
            dur: 10, // duration of the message
            color: "black"
        },

        //tech
        atkBoost: 0,
        defBoost: 0,
        btBoost: 0,
        hpBoost: 0,

        //tech Scaling Factors
        //todo increase scale factor per level perhaps (ie player gets leveled up set by a conditional, and then this increases the scaling factor by .01 or something)
        sfArmor: 1,
        sfSpeed: 1,
        sfHealth: 1,
        sfAtk: 1,
        sfBuildTime: 1

    },
    //If this then that happens in the game:
    conditionals : {

        //time at which q one will be released
        waveTime: function () {

        },
        /**
         * BUILDING RELATED
         */
        //When will  building of type2 (rogue) entities be allowed
        //when player has x units in play, and gold greater than unit cost
        type2Allowed: function () {

        },
        //When will  building of type3 (slime) entities be allowed
        //when player has x units in play, and gold greater than unit cost
        type3Allowed: function () {

        },


    },


    // Run on page load.
    "onload" : function () {
        // Initialize the video.
        if (!me.video.init(1024, 768, {wrapper : "screen", scale : "auto", scaleMethod : "flex-width"})) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        me.sys.fps = 30;

        // add "#debug" to the URL to enable the debug Panel
        if (me.game.HASH.debug === true) {
            window.onReady(function () {
                me.plugin.register.defer(this, me.debug.Panel, "debug", me.input.KEY.V);
            });
        }

        // astar plugin
        me.plugin.register(aStarPlugin, "astar");
        
        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // set and load all resources.
        // (this will also automatically switch to the loading screen)
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    // Run on game resources loaded.
    "loaded" : function () {

        // load the texture  file
        // this will be used by object entities later
        game.texture = new me.video.renderer.Texture(
            me.loader.getJSON("UI_Assets2"),
            me.loader.getImage("UI_Assets2")
        );

        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        
        // disable gravity
        me.sys.gravity = 0;
        
        // prevent default browser actions
        me.input.preventDefault = true;

        // prevent game pauses when browser is out of focus
        me.sys.pauseOnBlur = false;
        me.sys.stopOnBlur = false;

        // add our player entity in the entity pool
        me.pool.register("spawn_top", game.Warrior);
        me.pool.register("chaser", game.ChaserEntity);
        me.pool.register("player", game.PlayerEntity);
        me.pool.register("units", game.Units, false);
        me.pool.register("queue", game.Queue);

        //buildings:
        me.pool.register("build_area", game.BuildingArea);
        me.pool.register("structures", game.Structures);

        //Build Menu:
        me.pool.register("menu_background", game.BuildMenu, true);
        me.pool.register("buildbutton", game.BuildButton, true);
        me.pool.register("barracksbutton", game.BarracksButton, true);
        me.pool.register("build_menu", game.BuildingStatus, true);

        //player Postions
        me.pool.register("player", game.PlayerEntity);
        me.pool.register("top", game.Top, false);
        me.pool.register("queue", game.Queue);

        // enable keyboard
        me.input.bindKey(me.input.KEY.LEFT,  "left");           // can add bind keys to play.js, under resetEvent function
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP,  "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        
        //Buildings
        me.input.bindKey(me.input.KEY.B, "build", true);
        me.input.bindKey(me.input.KEY.NUM1, "barracks", true);
        me.input.bindKey(me.input.KEY.NUM2, "unit_defense", true);

        //unknown
        me.input.bindKey(me.input.KEY.Q, "q", true);

        //spawn Units
        me.input.bindKey(me.input.KEY.W, "makeType1", true);
        me.input.bindKey(me.input.KEY.R, "makeType2", true);
        me.input.bindKey(me.input.KEY.E, "makeType3", true);

        // render hitbox int the debug panel
        me.debug.renderHitBox = true;

        // Start the game.
        me.state.change(me.state.PLAY);
    }
};
