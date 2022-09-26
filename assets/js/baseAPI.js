// 每次调用$.post() $.get() $.ajax()都会调用这个函数
$.ajaxPrefilter(function(options){
  // 在放送真正的ajax请求前，统一拼接请求的根路径
  options.url = 'http://big-event-api-t.itheima.net' + options.url
})