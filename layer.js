;(function(){
	var currentWindow = window;
	var $ = currentWindow.$;
	var zindex = 1;
	var spriteIndex = 0;

	function layer(scene, name, w, h) {
	
	    this.sprites = {};
	    this.scene = scene;
	    this.name = name;
	    this.scene.layers[name] = this;

	    var domElement = document.createElement('div');
	    this.parent = this.scene.dom;
	    this.parent.appendChild(domElement);
	    
	    domElement.id = domElement.id || scene.id+'-'+name;
	    zindex += 1;
	    domElement.style.zIndex = String(zindex);
	    
	    this.h = h || scene.h;
	    this.w = w || scene.w;
	    
        domElement.style.height = this.h + 'px';
        domElement.style.width = this.w + 'px';
	    domElement.style.position = 'absolute';
	
	    this.dom = domElement;
	};
	
	currentWindow.$layer = layer;
	
	/* functions */
	
	layer.prototype.remove = function(){
	    this.parent.removeChild(this.dom);
	    delete this.scene.layers[this.name];
	};
	
	layer.prototype.addSprite = function(sprite){
	    spriteIndex = spriteIndex + 1;
	    this.sprites[spriteIndex] = sprite;
	};
	
	layer.prototype.bringToFront = function() {
	    zindex += 1;
	    this.dom.style.zIndex = String(zindex);
	};
	
	/* end of functions */
})(window);