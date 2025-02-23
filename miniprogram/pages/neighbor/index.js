Page({
  data: {
    searchKeyword: '',      // 搜索关键词
    buildingList: ['1', '2', '3', '5', '6'], // 所有楼栋号
    selectedBuilding: null,
    currentBuildingIndex: 0,
    searchHistory: [],
    
    // 模拟邻居数据
    neighbors: [
      {
        id: 1,
        name: '王先生',
        avatar: '/images/examples/avatar-wang.jpeg',
        building: '1',
        unit: '2',
        room: '301',
        tags: ['健身达人', '宠物爱好者']
      },
      {
        id: 2,
        name: '李女士',
        avatar: '/images/examples/avatar-li.jpeg',
        building: '2',
        unit: '3',
        room: '502',
        tags: ['宝妈', '烘焙能手']
      },
      // 更多数据...
    ],
    
    filteredNeighbors: []
  },

  onLoad() {
    this.filterNeighbors();
  },

  // 楼栋筛选
  // 楼栋筛选
  handleBuildingChange(e) {
    const index = e.detail.value;
    this.setData({
      currentBuildingIndex: index,
      selectedBuilding: index === 0 ? null : this.data.buildingList[index]
    }, this.filterNeighbors);
  },

  // 输入处理（带防抖）
  handleSearchInput: debounce(function(e) {
    this.setData({
      searchKeyword: e.detail.value.trim()
    }, this.filterNeighbors);
  }, 300),

  // 清空搜索
  clearSearch() {
    this.setData({
      searchKeyword: ''
    }, this.filterNeighbors);
  },

  clearBuilding(){
    this.setData({
      selectedBuilding: null
    }, this.filterNeighbors);
  },

  // 复合筛选逻辑
  filterNeighbors() {
    const { selectedBuilding, searchKeyword, neighbors } = this.data;
    
    let filtered = neighbors.filter(item => {
      // 楼栋筛选
      const buildingMatch = !selectedBuilding || item.building === selectedBuilding;
      
      // 姓名筛选
      const nameMatch = !searchKeyword || 
        item.name.includes(searchKeyword) || 
        item.name.toLowerCase().includes(searchKeyword.toLowerCase());
      
      return buildingMatch && nameMatch;
    });

    this.setData({ filteredNeighbors: filtered });
  },

  // 保存搜索记录
saveSearchHistory() {
  if(this.data.searchKeyword) {
    const newHistory = [...new Set([
      this.data.searchKeyword, 
      ...this.data.searchHistory
    ])].slice(0, 5);
    
    this.setData({ searchHistory: newHistory });
  }
},



  // 头像加载失败处理
  onAvatarError(e) {
    const index = e.currentTarget.dataset.index;
    const key = `filteredNeighbors[${index}].avatar`;
    this.setData({
      [key]: '/images/default-avatar.png'
    });
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
