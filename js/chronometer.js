function Chrono(onUpdate, onComplete)
{
	this.onUpdate = (onUpdate) ? onUpdate : function(){};
	this.onComplete = (onComplete) ? onComplete : function(){};
	this.duration = 0;
	this.diff = 10;
	this.timerID;
}

Chrono.prototype.start = function (duration) {
	var chrono = this;
	
	if (duration) {
		this.duration = duration * 1000;
	}
	
	var func = function () {
		chrono.duration -= chrono.diff;
		
		if (chrono.duration > 0) {
			chrono.timerID = setTimeout(func, chrono.diff);
			chrono.onUpdate();
		} else if (chrono.duration == 0) {
			chrono.onComplete();
		}
	};
	
	this.timerID = setTimeout(func, this.diff);
};

Chrono.prototype.stop = function () {
	clearTimeout(this.timerID);
};

Chrono.prototype.getSeconds = function () {
	return Math.floor(this.duration / 1000);
};

Chrono.prototype.getDecimals = function () {
	return (this.duration / 1000).toFixed(2).split(".")[1];
};