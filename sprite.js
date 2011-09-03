;(function(){
	var currentWindow = window;
	var $ = currentWindow.$;

	function sprite(scene,src,layer,x,y,w,h){
   		this.src = src;
        this.x = x;
        this.y = y;
        
        this.vx = 0;
        this.vy = 0;
        this.vr = 0;
        
	    this.w = w;
	    this.h = h;
	
	    this.xoffset = 0;
	    this.yoffset = 0;
	
	    this.xscale = 1;
	    this.yscale = 1;
	
	    this.opacity = 1;
        
        this.angle = 0;
        this.img = null;
        
        this.layer = layer;
        
        if(!this.layer){
	        this.layer = scene.layers['default'];
	    }

        var d = document.createElement('div');
        d.style.position = 'absolute';
        this.dom = d;
        this.layer.dom.appendChild(d);
        
        if(src){
        	this.loadImg(src);
        }
	};
    
    currentWindow.$sprite = sprite;
    
    /* setters */
    
	sprite.prototype.setX = function(value){
    	this.x = value;
    	return this;
	};
	
	sprite.prototype.setY = function(value){
    	this.y = value;
    	return this;
	};
	
	sprite.prototype.setAngle = function(value){
	    this.angle = value;
	    return this;
	};
	
	sprite.prototype.setW = function(value){
	    this.w = value;
	    return this;
	};

	sprite.prototype.setH = function(value){
	    this.h = value;
	    return this;
	};

	sprite.prototype.setXOffset = function(value){
	    this.xoffset = value;
	    return this;
	};

	sprite.prototype.setYOffset = function setYoffset(value){
	    this.yoffset = value;
	    return this;
	};

	sprite.prototype.setOpacity = function setOpacity(value){
	    this.opacity = value;
	    return this;
	};

	sprite.prototype.setXScale = function setXscale(value){
	    this.xscale = value;
	    return this;
	}

	sprite.prototype.setYScale = function setYscale(value){
	    this.yscale = value;
	    return this;
	};
    
    /* end of setters */
    
    /* functions */
   
	sprite.prototype.moveTo = function(x, y){
		this.setX(this.x+x);
		this.setY(this.y+y);
		return this;
	};

	sprite.prototype.position = function(x, y){
	    this.setX(x);
	    this.setY(y);
	    return this;
	};
	
	sprite.prototype.rotate = function(vr){
	    this.setAngle(this.angle + vr);
	    return this;
	};

	sprite.prototype.scale = function (x, y) {
	    if(this.xscale != x){
	        this.setXScale(x);
	    }
	    if(y === undefined){
	        y = x;
	    }
	    if(this.yscale != y){
	        this.setYScale(y);
	    }
	    return this;
	};

	sprite.prototype.offset = function(x, y){
	    this.setXOffset(x);
	    this.setYOffset(y);
	    return this;
	};

	sprite.prototype.size = function(w, h){
	    this.setW(w);
	    this.setH(h);
	    return this;
	};

	sprite.prototype.move = function(speed){
	    if(speed === undefined){
	        speed = 1;
	    }
	    if(this.vx != 0){
	        this.setX(this.x+this.vx*speed);
	    }
	    if(this.vy != 0){
	        this.setY(this.y+this.vy*speed);
	    }
	    if(this.vr != 0){
	        this.setAngle(this.angle+this.vr*speed);
	    }
	    return this;
	};

	sprite.prototype.moveReverse = function(speed){
	    if(speed === undefined){
	        speed = 1;
	    }
	    if(this.vx != 0){
	        this.setX(this.x-this.vx*speed);
	    }
	    if(this.vy != 0){
	        this.setY(this.y-this.vy*speed);
	    }
	    if(this.vr != 0){
	        this.setAngle(this.angle-this.vr*speed);
	    }
	    return this;
	};

	sprite.prototype.moveX = function(speed){
	    if(speed === undefined){
	        speed = 1;
	    }
	    if(this.vx != 0){
	        this.setX(this.x+this.vx*speed);
	    }
	};

	sprite.prototype.moveReverseX = function(speed){
	    if(speed === undefined){
	        speed = 1;
	    }
	    if(this.vx != 0){
	        this.setX(this.x-this.vx*speed);
	    }
	};

	sprite.prototype.moveY = function(speed){
	    if(speed === undefined){
	        speed = 1;
	    }
	    if(this.vy != 0){
	        this.setY(this.y+this.vy*speed);
	    }
	};

	sprite.prototype.moveReverseY = function(speed){
	    if(speed === undefined){
	        speed = 1;
	    }
	    if(this.vy != 0){
	        this.setY(this.y-this.vy*speed);
	    }
	};

	sprite.prototype.rotate = function(a){
	    this.vx = this.vx * Math.cos(a) - this.vy * Math.sin(a);
	    this.vy = this.vx * Math.sin(a) + this.vy * Math.cos(a);
	};

	sprite.prototype.destroy = function(){
		this.dom = null;
	    this.img = null;
	};
	
	sprite.prototype.update = function() {
	    var style = this.dom.style;
	    style.left=(this.x | 0)+'px';
	    style.top=(this.y | 0)+'px';
	    style.width=(this.w | 0) +'px';
	    style.height=(this.h | 0)+'px';
	    style.backgroundPosition=-(this.xoffset | 0)+'px '+-(this.yoffset | 0)+'px';
	    style.opacity = this.opacity;
        var trans = "";
        if(this.angle!=0){
            trans += 'rotate('+this.angle+'rad) ';
        }
        if(this.xscale!=1 || this.yscale!=1) {
            trans += ' scale('+this.xscale+', '+this.yscale+')';
        }
        style["MozTransform"] = trans;
	    return this;
	};
	
	sprite.prototype.loadImg = function(src){
	    this.src = src;
	    this.img = new Image();
	    this.img.src = src;

        this.dom.style.backgroundImage = 'url('+src+')';
	    
	    return this;
	};

	sprite.prototype.isInTouch = function(x, y){
		return (x >= this.x && x < this.x+this.w && y >= this.y && y < this.y+this.h);
	};
	
	sprite.prototype.distance = function(sprite){
		return Math.sqrt(Math.pow(this.x + (this.w / 2) - (sprite.x + (sprite.w / 2)), 2) + Math.pow(this.y + (this.h / 2) - (sprite.y + (sprite.h / 2)), 2));
	};
	
	sprite.prototype.distance = function(x, y){
		return Math.sqrt(Math.pow(this.x + this.w/2 - x, 2) + Math.pow(this.y + this.h/2 - y, 2));
	};

	/* end of functions */
})(window);