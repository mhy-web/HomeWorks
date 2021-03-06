


var Music = function(){
	this.init()
	this.bind()
}
var proto =  Music.prototype


proto.init = function(){
	this.container = document.querySelector('.container')
	this.loginbtn = document.querySelector('#loginbtn')
	this.avatar = document.querySelector('#avatar')
	this.volume = document.querySelector('#volume')
	this.loginCt = document.querySelector('.loginCt')

	this.thumb = document.querySelector('#thumb-btn')
	this.collect = document.querySelector('#collect-btn')
	this.load = document.querySelector('#load-btn')
	this.review = document.querySelector('#review-btn')
	this.loop = document.querySelector('#loop')

	this.preplay = document.querySelector('#preplay')
	this.nextplay = document.querySelector('#nextplay')
	this.pause = document.querySelector('#pause')
	this.listShowBtn = document.querySelector('#listshow')
	this.musicList = document.querySelector	('#musicList')

	this.perc = document.querySelector('#perc')

}

proto.bind = function(){
	var _loginBtn = this.loginbtn,
		_listShowBtn = this.listShowBtn,
		_loginCt = this.loginCt,
		_musicList = this.musicList,
		_container = this.container;

	this.addEvent(_loginBtn, 'click', function(e){
		e.stopPropagation();
		_musicList.style.display ='none';
		_loginCt.style.display = 'block';
		_loginCt.style.width = '80%';

	})
	this.addEvent(_listShowBtn, 'click', function(e){
		e.stopPropagation();
		_loginCt.styledisplay == 'none';
		_musicList.style.display = 'block';
		_musicList.style.height = '65%';
	})

	this.addEvent(_loginCt, 'click', function(e){
		e.stopPropagation();
		return;
	})
	this.addEvent(_musicList, 'click', function(e){
		e.stopPropagation();
		return;
	})

	this.addEvent(_container, 'click', function(e){
		e.stopPropagation();
		_loginCt.style.display = 'none';
		_musicList.style.display = 'none';
	})
}

proto.addEvent = function (node, type, handler) {
	if (!node) return false;
	if (node.addEventListener) {
		node.addEventListener(type, handler, false);
		return true;
	} else if (node.attachEvent) {
		node['e' + type + handler] = handler;
		node[type + handler] = function() {
			node['e' + type + handler](window.event);
		};
		node.attachEvent('on' + type, node[type + handler]);
		return true;
	}
	return false;


}
new Music(document.querySelector('.container'))