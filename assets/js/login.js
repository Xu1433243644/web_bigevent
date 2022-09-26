$(function () {
  // 点击去注册页面显示注册页面
  $('#link_reg').on('click', function () {
    $('.loginBox').hide()
    $('.regBox').show()
  })
  // 点击去登录实现登录页面
  $('#link_login').on('click', function () {
    $('.regBox').hide()
    $('.loginBox').show()
  })

  // 获取layui的表单元素
  let form = layui.form
  // 获取layui的
  let layer = layui.layer
  // 密码校验规则
  form.verify({
    // 自定义一个密码校验规则
    psw: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    // 校验两次密码是否一致
    repsw: function (value) {
      const pswValue = $('.regBox [name=password]').val()
      if (pswValue !== value) {
        return '两次密码不一致'
      }
    }

  })

  // 注册调用ajax接口
  $('#regBox_form').on('submit', function (e) {
    const username = $('#regBox_form [name=username]').val()
    const password = $('#regBox_form [name=password]').val()
    // 阻止表单默认行为
    e.preventDefault()
    // 调用接口
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username,
        password
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功，请登录！')
      }
    })
  })

  // 登录调用ajax接口
  $('#loginBoxForm').on('submit', function (e) {
    const username = $('#loginBoxForm [name=username]').val()
    const password = $('#loginBoxForm [name=password]').val()
    // 阻止表单默认行为
    e.preventDefault()
    // 调用接口
    $.ajax({
      method: 'POST',
      url: '/api/login',
      data: {
        username,
        password
      },
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('登陆成功！')
        // 将登陆成功的token权限值保存到本地存储中
        localStorage.setItem('token',res.token)
        // location.href = './index.html'
      }
    })
  })







})
