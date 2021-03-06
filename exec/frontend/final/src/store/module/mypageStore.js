import { rscApi } from '@/services/api';
const state = {
  myDogListInfo: {}, // 유저의 강아지들 정보
  dogInfo: [], // 특정 강아지 한마리의 정보
  allHealthList: [], // 특정 강아지 한마리가 쓴 일기의 건강상태 모음집
  statistics: {}, // 통계
};
const getters = {
  getDogInfo(state) {
    return state.dogInfo
  },
  getAllHealthList(state) {
    return state.allHealthList
  },
  getMyDogListInfo(state) {
    return state.myDogListInfo
  },
  getStatistics(state) {
    return state.statistics
  }
};
const mutations = {
  setDogInfo(state,info) {
    state.dogInfo = info
  },
  setAllHealthList(state, list) {
    state.allHealthList = list
  },
  setMyDogListInfo(state, list) {
    state.myDogListInfo = list
  },
  setStatistics(state, data) {
    state.statistics = data
  }
};
const actions = {
  // 유저 인포 불러오기 (강아지정보 포함)
  getUserInfoInApi(context, params) {
    return rscApi.get(`user/info?uid=${params}`)
    .then((res)=> {
      context.commit('setMyDogListInfo', res.data.petList)
      return res;
    })
  },
  // 반려견 등록 사진있음
  dogRegisterInApi(context, params) {
    return rscApi.post('pet/insert', params)
    .then ((res) => {
      context.commit('setDogInfo', res.data);
      return res;
    })
    .catch(()=>{});
  },
  // 반려견 등록 사진없음
  NoPhotoDogRegisterInApi(context, params) {
    return rscApi.post('pet/insert/np', params)
    .then ((res) => {
      context.commit('setDogInfo', res.data);
      return res;
    })
    .catch(()=>{});
  },
  // 반려견 정보 보기
  showDogInfoInApi(context, params) {
    return rscApi.get(`pet/show?peid=${params}`)
    .then ((res)=> {
      context.commit('setDogInfo', res.data);
      return res;
    })
    .catch(()=>{});
  },
  // 반려견 정보 수정 사진 있음
  updateDogInfoInApi(context, params) {
    return rscApi.put('pet/update', params)
    .then ((res)=> {
      context.commit('setDogInfo', res.data);
      return res;
    })
    .catch(()=>{});
  },
  // 반려견 정보 수정 사진추가없음
  NoPhotoUpdateDogInfoInApi(context, params) {
    return rscApi.put('pet/update/np', params)
    .then ((res)=> {
      context.commit('setDogInfo', res.data);
      return res;
    })
    .catch(()=>{});
  },
  // 마이페이지 메인 > 건강
  allHealthListInApi(context, params) {
    return rscApi.get(`pet/health/${params}`)
    .then((res) => {
      context.commit('setAllHealthList', res.data.listHealth)
    }).catch((error)=> {
      console.error(error)
    })
  },
  // 반려견 정보 삭제
  deletePetInApi(context, params) {
    return rscApi.put('pet/leave', params)
    .then(() => {
      context.commit('setDogInfo', null)
    })
    .catch((error) => {
      console.error(error)
    })
  },
  // 통계
  statisticsInApi(context, peid) {
    return rscApi.get(`data/statistics/${peid}`)
    .then((res) => {
      context.commit('setStatistics', res.data)
      return res.data 
    })
  }
};

export default {
  state: {
    ...state,
  },
  getters,
  mutations,
  actions,
};
