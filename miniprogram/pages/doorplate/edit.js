// pages/doorplate/edit.js
Page({
  data: {
    hasChanged: false,
    showSaveTip: false,
    relations: ['👪 户主', '❤️ 配偶', '👶 子女', '👴 长辈', '👥 其他'],
    family: {
      plate: '吴汪家',
      location: {
        lat: 31.2304,
        lng: 121.4737
      }
    },
    familyMembers: []
  },

  // 自动保存防抖
  autoSave: debounce(function() {
    this.setData({ showSaveTip: true })
    wx.cloud.callFunction({
      name: 'saveFamilyInfo',
      data: this.data
    }).then(() => {
      setTimeout(() => {
        this.setData({ showSaveTip: false })
      }, 2000)
    })
  }, 1000),

  // 拖拽排序实现
  handleSortEnd(e) {
    const { from, to } = e.detail
    const members = this.data.familyMembers
    const [removed] = members.splice(from, 1)
    members.splice(to, 0, removed)
    this.setData({ familyMembers: members })
  },

  // 头像上传优化
  uploadAvatar(e) {
    const index = e.currentTarget.dataset.index
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      success: res => {
        const key = `familyMembers[${index}].avatar`
        this.setData({ 
          [key]: res.tempFiles[0].tempFilePath,
          hasChanged: true
        })
        this.autoSave()
      }
    })
  }
});
// 防抖函数
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    if(timer) clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}