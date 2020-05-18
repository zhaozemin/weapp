import wepy from '@wepy/core'

const host = 'http://larabbs.test/api/v1/'

const request = async (url,option = {},showLoading = true) => {
    //显示加载中
    if(showLoading) {
        wx.showLoading({title:'加载中'})
    }
    //拼接请求地址
    option.url = host + url

    let response = await wepy.wx.request(option)

    if (showLoading) {
        wx.hideLoading()
    }

    if (response.statusCode >= 200 && response.statusCode < 300) {
        return response
    }

    if (response.statusCode === 429) {
        wx.showModal({
            title:'提示',
            content: '请求太频繁,请稍后再试',
        })
    }

    if (response.statusCode === 500) {
        wx.showModal({
            title: '提示',
            content: '服务器错误，请联系管理员或重试',
        })
    }

    const error = new Error(response.data.message)
    error.response = response
    return Promise.reject(error)
}
export {
    request
}