game.PlayScreen = me.ScreenObject.extend({
    /**
     *  action to perform on state change
     */
    onResetEvent: function() {
        // load level
//        me.levelDirector.loadLevel("test_dungeon");
        me.levelDirector.loadLevel("test_map");

        // reset the score
        game.data.score = 0;

        // Add our HUD to the game world, add it last so that this is on top of the rest.
        // Can also be forced by specifying a "Infinity" z value to the addChild function.
        this.HUD = new game.HUD.Container();
        me.game.world.addChild(this.HUD);
//        me.game.world.addChild(me.pool.pull("spawn_top", 50, 50), 1);

        //for draggable pieces
        var physicEditorContainer = new me.Container(50, 50, 400, 600);
        physicEditorContainer.addChild(new game.Barracks(200, 100, {width: 32, height: 32, sprite:"buildinga-footprint-spritesheet"}), 6);
        me.game.world.addChild(physicEditorContainer);

    },

    /**
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function() {
        // remove the HUD from the game world
        me.game.world.removeChild(this.HUD);
    }
});
