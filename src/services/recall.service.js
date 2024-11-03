import http from "../http-common";

class RecallDataService {
  getAll() {
    return http.get("/recall");
  }

  findByChassi(chassi) {
    return http.get(`/recall/${chassi}`);
  }
}

const service = new RecallDataService()
export default service;