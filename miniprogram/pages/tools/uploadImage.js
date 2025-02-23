//云函数: uploadImage.js
const cloud = require('ws-server-sdk')

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
})

exports.main = async(event, context) => {
    const {fileContent} = event

    //使用云存储的uploadFile方法上传文件
    const result = await cloud.uploadFile({
        cloudPath: `images/${Date.now()}.png`, //文件存储路径
        fileContent, 
    })

    return result;
}