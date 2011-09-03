;(function(){
	var currentWindow = window;
	var $ = currentWindow.$;
	var $layer = currentWindow.$layer;
	var $sprite = currentWindow.$sprite;
	var zindex = 1;
	var spriteIndex = 0;
	var nb_scene = 0;

	function scene(w,h) {

	    var div = document.createElement('div');
	    div.style.overflow = 'hidden';
	    div.style.position = 'relative';
	    div.className = 'scn';
	    div.id = 'scn' + nb_scene;
	    this.id = nb_scene;
	    nb_scene = nb_scene + 1;
	    
	    var parent = document.body;
	    parent.appendChild(div);
	    
	    this.w = w;
	    this.h = h;
	    this.dom = div;
	    this.dom.style.width = this.w + 'px';
	    this.dom.style.height = this.h + 'px';
	    this.layers = {};
	
	    this.layer("default");
	    return this;
	};
	
	currentWindow.$scene = scene;
	
	scene.prototype.constructor = scene;
	
	scene.prototype.sprite = function(src, layer){
	    return new $sprite(this, src, layer);
	};
	
	scene.prototype.layer = function(name, options){
	    return new $layer(this, name, options);
	};
	
	scene.prototype.destroy = function(){
		var i = this.layers.length;
		var l;
		for(;i;i--){
		    l = this.layers[i];
		    l.dom.parentNode.removeChild(l.dom);
		    delete l;
		}

	    while ( this.dom.childNodes.length >= 1 ) {
	        this.dom.removeChild(this.dom.firstChild);
	    }
	    this.layers = {};
	    this.layer("default");
	};
	
	/* end of functions */
})(window);