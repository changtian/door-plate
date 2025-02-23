//云函数
const cloud = require('wx-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async(event, context)=>{
    const fileID = event.fileID //从请求中获得文件ID

    //获取文件的临时连接
    const result = await cloud.getTempFileURL({fileList:[fileID]})

    return result
}