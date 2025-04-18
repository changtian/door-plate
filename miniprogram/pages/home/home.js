
Page({
  data: {
      family:{
        plate: '吴汪家',
        address: '上海市嘉定区嘉定新城理想之地21幢'
      },
    familyMembers: [
      { id: 1, name: '吴国锋', age: 30, relationship: '父亲', avatar:'' },
      { id: 2, name: '汪玲莉', age: 28, relationship: '母亲', avatar:'' },
      { id: 3, name: '吴汪兮', age: 5, relationship: '女儿', avatar:'' }
    ]
  },
 // 图片加载失败处理
  onImageError(e) {
    console.error('图片加载失败:', e.detail.errMsg)
  },

  // 加载更多成员
  loadMore() {
    if (!this.data.isLoading) {
      this.setData({ isLoading: true })
      // 模拟异步加载
      setTimeout(() => {
        this.setData({
          familyMembers: [...this.data.familyMembers, ...newMembers],
          isLoading: false
        })
      }, 1000)
    }
  },
  
  // 查看成员详情
  viewDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/memberDetail/memberDetail?id=${id}`
    })
  },

  onLoad: function () {
    // 页面加载时的初始化逻辑
  },

  handleDoorplateClick() {
  wx.showModal({
    title: '编辑电子门牌',
    content: '是否要修改家庭信息？',
    success: (res) => {
      if (res.confirm) {
        wx.navigateTo({
          url: '/pages/doorplate/edit',
          events: { // ✅ 新增事件定义
            initData: (data) => {
              console.log('接收编辑页返回数据:', data)
            }
          },
          success: (res) => {
            // ✅ 通过res.eventChannel获取通道
            res.eventChannel.emit('initData', {
              family: this.data.family,
              members: this.data.familyMembers
            })
          }
        })
      }
    }
  })
}
});