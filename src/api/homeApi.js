import axiosInstance from './api.js'
const api = {
  // 获取宠物详情
  getPetDetail() {
    return axiosInstance.get('/api/petDetail');
  },

  // 创建宠物
  createPet(data) {
    return axiosInstance.post('/api/createPet', data);
  },

  // 更新宠物
  updatePet(id, data) {
    return axiosInstance.put(`/api/updatePet/${id}`, data);
  },

  // 删除宠物
  deletePet(id) {
    return axiosInstance.delete(`/api/deletePet/${id}`);
  },

  // 你可以根据需要继续添加其他 API 方法
};

export default api;

