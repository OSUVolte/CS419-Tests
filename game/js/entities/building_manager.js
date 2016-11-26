
    //Todo Add functions that are the logic for all buildings

    //what happens on building destroy

    //what happens when user kill building

    //what happens when....

/**
 * BuildingArea defines the path where building is allowed
 * controls the building area, button pushes  (b for build etc)
 *
 */
game.BuildingArea = me.Renderable.extend({
    init: function (x, y, settings) {
        // set the coordinates to fit in the screen. Really it just needs any size greather than 0x0, and needs to be floating, so when the camera moves, it's always on screen
        console.log(settings.width, settings.height, x ,y)

        this._super(me.Renderable, "init", [x, y, settings.width, settings.height]);
        this.floating = true;
        this.pos.x = x;
        this.pos.y = y;
        this.width = settings.width;
        this.height = settings.height;
        //setting this I need it to be inherited.
        //Surely there must be a way to get this, but I'm losing it in inheritance hell
        this.bounds = {
                x: x,
                y: y,
                width: this.width,
                height: this.height
        }

        this.structureProperties = {
            player: '',
            time: '',
            id: ''
        }

        this.structures = []; // Array to hold all structures in play.
    },

    update: function () {

        //build
        if (me.input.isKeyPressed("build")) {
            console.log("build");
            this.isPlacing = true;
        }
        //What to do if building and type barracks
        if (this.isPlacing == true && me.input.isKeyPressed("barracks")) {
            game.data.message= {msgTime: me.timer.getTime(), msg:"Placing Barracks", msgDur: 5, color:"white"};

            //TODO: dynamically use cost of building instead of hardcoded "200"
            if(game.data.playergold >= 200) {
                console.log((this.pos.x + this.width) / 2, (this.pos.y + this.height) / 2);
                // Adding it to the world, at a place near the bounding box as set by the tiled map object
                me.game.world.addChild(new game.FootPrint((this.pos.x + this.width) / 2, (this.pos.y + this.height) / 2, {
                    width: 192,
                    height: 192,
                    bounds: this.bounds, // we'll need them from the box to determine if we can buiild at that postion
                    type: "barracks"
                }), 10);
                game.data.playergold -= 200;
            }
            else {
                //display message
                game.data.message= {msgTime: me.timer.getTime(), msg:"Not enough Money", msgDur: 5, color:"red"};

            }
            console.log(game.data.playergold);
            this.isPlacing = false;

        //What to do if building and type Armourer
        }else if (this.isPlacing == true && me.input.isKeyPressed("armourer")) {

            //TODO: dynamically use cost of building instead of hardcoded "200"
            if(game.data.playergold >= 200) {
                // Adding it to the world, at a place near the bounding box as set by the tiled map object
                me.game.world.addChild(new game.FootPrint((this.pos.x + this.width) / 2, (this.pos.y + this.height) / 2, {
                    width: 128,
                    height: 128,
                    bounds: this.bounds, // we'll need them from the box to determine if we can buiild at that postion
                    type: "armourer"
                }), 10);
                game.data.playergold -= 200;
            }
            else {
                //display message
                game.data.message= {msgTime: me.timer.getTime(), msg:"Not enough Money", msgDur: 5, color:"red"};

            }
            console.log(game.data.playergold);
            this.isPlacing = false;

        }else if (this.isPlacing == true && me.input.isKeyPressed("arsenal")) {

            //TODO: dynamically use cost of building instead of hardcoded "200"
            if(game.data.playergold >= 200) {
                // Adding it to the world, at a place near the bounding box as set by the tiled map object
                me.game.world.addChild(new game.FootPrint((this.pos.x + this.width) / 2, (this.pos.y + this.height) / 2, {
                    width: 150,
                    height: 150,
                    bounds: this.bounds, // we'll need them from the box to determine if we can buiild at that postion
                    type: "arsenal"
                }), 10);
                game.data.playergold -= 200;
            }
            else {
                //display message
                game.data.message= {msgTime: me.timer.getTime(), msg:"Not enough Money", msgDur: 5, color:"red"};

            }
            console.log(game.data.playergold);
            this.isPlacing = false;
        }


        return this.selected || this.hover;
    },
    addStructure: function(structure){
            this.structures.push(structure);
    }

});

game.BuildingAreaAI = me.Renderable.extend({
    init: function (x, y, settings) {
        // set the coordinates to fit in the screen. Really it just needs any size greather than 0x0, and needs to be floating, so when the camera moves, it's always on screen
        console.log(settings.width, settings.height, x ,y)

        this._super(me.Renderable, "init", [x, y, settings.width, settings.height]);
        this.floating = true;
        this.pos.x = x;
        this.pos.y = y;
        this.width = settings.width;
        this.height = settings.height;
        //setting this I need it to be inherited.
        //Surely there must be a way to get this, but I'm losing it in inheritance hell
        this.bounds = {
            x: x,
            y: y,
            width: this.width,
            height: this.height
        }

        this.structureProperties = {
            player: '',
            time: '',
            id: ''
        }

        this.structures = []; // Array to hold all structures in play.
    },

    update: function () {

        // //build
        // if (me.input.isKeyPressed("build")) {
        //     console.log("build");
        //     this.isPlacing = true;
        // }
        // //What to do if building and type barracks
        // if (this.isPlacing == true && me.input.isKeyPressed("barracks")) {
        //     game.data.message= {msgTime: me.timer.getTime(), msg:"Placing Barracks", msgDur: 5, color:"white"};
        //
        //     //TODO: dynamically use cost of building instead of hardcoded "200"
        //     if(game.data.playergold >= 200) {
        //         // Adding it to the world, at a place near the bounding box as set by the tiled map object
        //         me.game.world.addChild(new game.FootPrint((this.pos.x + this.width) / 2, (this.pos.y + this.height) / 2, {
        //             width: 128,
        //             height: 102,
        //             bounds: this.bounds, // we'll need them from the box to determine if we can buiild at that postion
        //             type: "barracks"
        //         }), 10);
        //         game.data.playergold -= 200;
        //     }
        //     else {
        //         //display message
        //         game.data.message= {msgTime: me.timer.getTime(), msg:"Not enough Money", msgDur: 5, color:"red"};
        //
        //     }
        //     console.log(game.data.playergold);
        //     this.isPlacing = false;
        //
        //     //What to do if building and type Armourer
        // }else if (this.isPlacing == true && me.input.isKeyPressed("armourer")) {
        //
        //     //TODO: dynamically use cost of building instead of hardcoded "200"
        //     if(game.data.playergold >= 200) {
        //         // Adding it to the world, at a place near the bounding box as set by the tiled map object
        //         me.game.world.addChild(new game.FootPrint((this.pos.x + this.width) / 2, (this.pos.y + this.height) / 2, {
        //             width: 128,
        //             height: 96,
        //             bounds: this.bounds, // we'll need them from the box to determine if we can buiild at that postion
        //             type: "armourer"
        //         }), 10);
        //         game.data.playergold -= 200;
        //     }
        //     else {
        //         //display message
        //         game.data.message= {msgTime: me.timer.getTime(), msg:"Not enough Money", msgDur: 5, color:"red"};
        //
        //     }
        //     console.log(game.data.playergold);
        //     this.isPlacing = false;
        //
        // }else if (this.isPlacing == true && me.input.isKeyPressed("arsenal")) {
        //
        //     //TODO: dynamically use cost of building instead of hardcoded "200"
        //     if(game.data.playergold >= 200) {
        //         // Adding it to the world, at a place near the bounding box as set by the tiled map object
        //         me.game.world.addChild(new game.FootPrint((this.pos.x + this.width) / 2, (this.pos.y + this.height) / 2, {
        //             width: 150,
        //             height: 150,
        //             bounds: this.bounds, // we'll need them from the box to determine if we can buiild at that postion
        //             type: "arsenal"
        //         }), 10);
        //         game.data.playergold -= 200;
        //     }
        //     else {
        //         //display message
        //         game.data.message= {msgTime: me.timer.getTime(), msg:"Not enough Money", msgDur: 5, color:"red"};
        //
        //     }
        //     console.log(game.data.playergold);
        //     this.isPlacing = false;
        // }


        return this.selected || this.hover;
    },
    addStructure: function(structure){
        this.structures.push(structure);
    }

});

/**
 * BuildingObject is the starting point of any building
 * necessary for dragging and dropping of the footprint
 *
 */
game.BuildingObject = me.Entity.extend({
    /**
     * constructor
     */
    init: function (x, y, settings) {
        // ensure we do not create a default shape
        settings.shapes = [];
        // call the super constructor
        this._super(me.Entity, "init", [x, y, settings]);

        // status flags
        this.selected = false;
        this.hover = false;

        // to memorize where we grab the shape
        this.grabOffset = new me.Vector2d(0,0);

        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);

    },

    onActivateEvent: function () {
        //register on mouse/touch event
        me.input.registerPointerEvent("pointerdown", this, this.onSelect.bind(this));
        me.input.registerPointerEvent("pointerup", this, this.onRelease.bind(this));
        me.input.registerPointerEvent("pointercancel", this, this.onRelease.bind(this));
        //register locally...i think.
        me.input.registerPointerEvent('pointermove', this, this.pointerMove.bind(this));
    },

    /**
     * pointermove function
     */
    pointerMove: function (event) {

        this.hover = false;
        //console.log(event.gameX, event.gameY);
        // move event is global (relative to the viewport)
        if (this.getBounds().containsPoint(event.gameX, event.gameY)) {
            // calculate the final coordinates
            var parentPos = this.ancestor.getBounds().pos;
            var x = event.gameX - this.pos.x - parentPos.x;
            var y = event.gameY - this.pos.y - parentPos.y;

            // the pointer event system will use the object bounding rect, check then with with all defined shapes
            for (var i = this.body.shapes.length, shape; i--, (shape = this.body.shapes[i]);) {
                if (shape.containsPoint(x, y)) {

                    this.hover = true;
                    break;
                }
            }
        }

        if (this.selected) {
            // follow the pointer
            me.game.world.moveUp(this);
            this.pos.set(event.gameX, event.gameY, this.pos.z);
            this.pos.sub(this.grabOffset);
            this.checkPosition();
        }

        if (this.hover || this.selected) {
            return false;
        }
    },
    /*
     * Check the position  to be within the "build" area and updates the image
     */
    checkPosition : function () {
        //todo flesh this out so it also checks for entities in the way
        //console.log( this.bounds);

        if(this.pos.x > this.bounds.x
            && this.pos.x < this.bounds.width+this.bounds.x
            && this.pos.y > this.bounds.y
            && this.pos.y < this.bounds.height+this.bounds.y){
            //update the image
            this.chooseImage("good");
            return true;
        }else{
            console.log("not");
            this.chooseImage("bad");
        }
        return false;
    },
    // mouse down function
    onSelect : function (event) {
        if (this.hover === true) {
            this.grabOffset.set(event.gameX, event.gameY);
            this.grabOffset.sub(this.pos);
            console.log('selected');
            this.selected = true;
            // don"t propagate the event furthermore
            return false;
        }
        return true;
    },

    // mouse up function
    onRelease : function (/*event*/) {
        this.selected = false;

        this.checkPosition();

        //todo fix error from removal
        if(this.placeBuilding()){
            this.destroy();
        }
        // don"t propagate the event furthermore
        return false;
    },

    /**
     * update function
     */
    update: function () {

        return this.selected || this.hover;
    },

    /**
     * draw the square
     */
    draw: function (renderer) {
        renderer.setGlobalAlpha(this.hover ? 1.0 : 0.5);
        this._super(me.Entity, "draw", [renderer]);
        renderer.setGlobalAlpha(0.80);
    },
    destroy: function(){

        me.input.releasePointerEvent('pointerdown', this);
        me.game.world.removeChild(this);
    },
    onCollision: function(){
        console.log("i hit something");
        return false;
    }

});
/**
* footprint is determined by the parameters sent to it in the call from game.BuildingArea = me.Renderable.extend
* it extends the building object which contains all the drag a drop functions
*/
game.FootPrint = game.BuildingObject.extend({
    /**
     * constructor
     */
    init: function (x, y, settings) {
        // we want the foot print established by the settings from which was called.
        //settings.image =  "footprint-spritesheet";
        //console.log("the bloody settings!", settings);

        // call the super constructor
        this._super(game.BuildingObject, "init", [x, y, settings]);

        // the bounds of the Building Container
        this.bounds = settings.bounds;

        // add a body shape
        console.log("sprite Sheet",settings.width, settings.height);
        this.body.addShape(new me.Rect(0, 0, settings.width, settings.height));

        //different sprite states determined by position of element
        // this.renderable.addAnimation("neutral", [0]);
        // this.renderable.addAnimation("bad", [1]);
        // this.renderable.addAnimation("caution", [2]);
        // this.renderable.addAnimation("good", [3]);

        //set the initial image
        //this.chooseImage("neutral");
        this.checkPosition();

        //use to the track if it has been placed
        this.placed = false;

        //fonts
        this.color = "green";
        this.font = new me.Font("Arial", 15, "black");
        this.font.textAlign = "left";
        this.font.bold();

        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
    },
    /**
     * Change the image
     */
    chooseImage: function (frameName) {
        //this.renderable.setCurrentAnimation(frameName);

    },
    /*
        This places the actual building of the specific type defined in the buildingArea call
     */
    placeBuilding: function (){

        //add building to the area.
        if(this.type == "barracks") {
            //console.log("positioningbarracks:", this.pos.x, this.pos.y);
            //todo disallow placement when not enough money to build
            if (this.checkPosition()) {

                var newBldg =  me.game.world.addChild(new game.Barracks(this.pos.x, this.pos.y, {
                    width: this.width,
                    height: this.height,
                    bounds: this.bounds,
                    type: "barracks"
                }), 10);
                //todo maybe use this to easily apply upgrades to all buildings at once?
                //me.game.  addStructure(newBldg) // add the building to the array of structures
                return true;
            }
        }
        if(this.type == "armourer") {

            //todo disallow placement when not enough money to build
            if (this.checkPosition()) {
                var newBldg =  me.game.world.addChild(new game.Armourer(this.pos.x, this.pos.y, {
                    width: this.width,
                    height: this.height,
                    bounds: this.bounds,
                    type: "armourer"
                }), 10);

                // me.game.  addStructure(newBldg) // add the building to the array of structures
                return true;
            }
        }
        if(this.type == "arsenal") {

            //todo disallow placement when not enough money to build
            if (this.checkPosition()) {
                var newBldg =  me.game.world.addChild(new game.Arsenal(this.pos.x, this.pos.y, {
                    width: this.width,
                    height: this.height,
                    bounds: this.bounds,
                    type: "arsenal"
                }), 10);

                // me.game.  addStructure(newBldg) // add the building to the array of structures
                return true;
            }
        }
        return false;
    },
    onCollision: function(response, other){
        console.log("eeew I touched something");
        return false;
    },
    draw: function (renderer) {
        renderer.setGlobalAlpha(0.5);
        renderer.setColor(this.color);
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        this.font.draw(renderer, this.type, this.pos.x, this.pos.y);
    }
});

game.Queue = me.Renderable.extend({
    init: function (x, y, settings) {

        this._super(me.Renderable, "init", [0, 0, me.game.viewport.width, me.game.viewport.height]);
        this.floating = true;
        this.pos.x = x;
        this.pos.y = y;
        this.width = settings.width;
        this.height = settings.height;
    }
});