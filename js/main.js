//1.数据定义
var data = [
	{img:1,h2:'Creative',h3:'DUET'},
	{img:2,h2:'Friendly',h3:'DEVIL'},
	{img:3,h2:'Tranquilent',h3:'COMPATRIOT'},
	{img:4,h2:'Insecure',h3:'HUSSLER'},
	{img:5,h2:'Loving',h3:'REBEL'},
	{img:6,h2:'Passionate',h3:'SEERKER'},
	{img:7,h2:'Crazy',h3:'FRIEND'}
];

//2.定义一个通用函数用来获取dom元素
var g = function(id){
	if (id.substr(0,1) == '.'){
		return document.getElementsByClassName(id.substr(1));//获取class元素
	}
	return document.getElementById(id);//获取id元素
}

//3.添加幻灯片操作(所用幻灯片&对应按钮)
function addSlider(){
	//3.1获取模版
	var tpl_main = g('template_main').innerHTML
									 .replace(/^\s*/,'')
									 .replace(/\s*$/,'');//清除template_mian的innerHTML头尾的空白符

	 var tpl_ctrl = g('template_ctrl').innerHTML
									 .replace(/^\s*/,'')
									 .replace(/\s*$/,'');//清除template_ctrl的innerHTML头尾的空白符

	//3.2定义最终输出的html变量
	var out_main = [];
	var out_ctrl = [];

	//遍历所有数据，构建最终输出的html
	 for (var i = 0; i < data.length; i++) {
	 	//定义两个临时变量用来储存遍历和替换data后的template_main和template_ctrl
	 	var _html_main = tpl_main
	 				.replace(/{{index}}/g,data[i].img)
	 				.replace(/{{h2}}/g,data[i].h2)
	 				.replace(/{{h3}}/g,data[i].h3);

	 	var _html_ctrl = tpl_ctrl.replace(/{{index}}/g,data[i].img);
	 	
	 	//将临时变量里的数据push到最终输出的html变量中
	 	out_main.push(_html_main);
	 	out_ctrl.push(_html_ctrl);
	 };

	 //3.4把html回写到对应的dom中
	 g('template_main').innerHTML = out_main.join('');//将out_main和out_ctrl中的数组元素拼接成字符串
	 g('template_ctrl').innerHTML = out_ctrl.join('');
}

function switchSlider(n){
	//获取要展现的幻灯片和相应的控制按钮的dom
	var main = g('main_'+n);
	var ctrl = g('ctrl_'+n);

	//获取所有幻灯片及其控制按钮
	var clear_main = g('.main-i');
	var clear_ctrl = g('.ctrl-i');

	//清除它们的active样式
	for (var i = 0; i < clear_ctrl.length; i++) {
		clear_main[i].className = clear_main[i].className.replace(' main-i_active','');
		clear_ctrl[i].className = clear_ctrl[i].className.replace(' ctrl-i_active','');
	};

	//为当前幻灯片和控制按钮添加active样式
	main.className += ' main-i_active';
	ctrl.className += ' ctrl-i_active';

}
window.onload = function(){
	addSlider();
	switchSlider(1);
}