<template>
  <div id="mainBox">
    <div class="d-flex justify-center">
      <div style="width: 24px; background-color: white;">
      </div>
      <div>
        지역 등록
      </div>
      <div style="width: 24px; background-color: white;">
      </div>
    </div>
    <div class="register-btn-pd">
      <v-flex class="ph-size">
        <DaumPostcode
          :on-complete=handleAddress
          v-model="address"
        />
        <div class="mt-3">
          주소는 동단위까지 입력됩니다.
          <p style="font-size:14px">(예: '광주 광산구 장덕동')</p>
        </div>
        <div style="font-size:18px;">
          입력된 주소: <b>{{address}}</b>
        </div>
        <div class="register-btn-pd d-flex justify-center mt-5">
          <v-btn class="" id="mainBtn" @click="setAddress()" :disabled="confirm == false">지역 설정</v-btn>
        </div>
      </v-flex>
    </div>
  </div>
</template>

<script >
import DaumPostcode from 'vuejs-daum-postcode'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      address: '',
    }
  },
  created() {
    if (this.getUser == undefined) {
        alert('로그인 해주세요!')
        this.$router.push('/')
      }
  },
  computed: {
    ...mapGetters(['getUser']),
    confirm() {
        if (this.address.length < 1) {
          return false
        }
        return true
      }
  },
  components: {
    DaumPostcode
  },
  mounted() {
      let recaptchaScript = document.createElement('script')
      recaptchaScript.setAttribute('src', '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
      document.head.appendChild(recaptchaScript)
    },
  methods: {
    ...mapActions(['setAddressInApi']),
    handleAddress(data) {
      let fullAddress = data.address
      let fAddress = [] // 띄어쓰기 기준으로 나누어 단어 저장
      let sAddress = [] // '동' 으로 끝나는 단어 저장 
      fullAddress = data.jibunAddress
      // 띄어쓰기 기준으로 나누어 fAddress에 저장
      fAddress = fullAddress.split(' ');
      // 예: ["광주", "광산구", "장덕동", "992-8"]
      
      // 리스트 돌면서 마지막 단어가 '동'인 부분 저장 
      // 주소의 동까지 저장 
      for (let i in fAddress) {
        let checkAddress = fAddress[i]
        if(checkAddress.charAt(checkAddress.length-1) !== '동'){ 
          sAddress.push(checkAddress)
        }else {
          sAddress.push(checkAddress)
          break
        }  
      }
      const finalAddress = sAddress.join(" ");
      this.address = finalAddress
    },
    setAddress() {
      this.setAddressInApi({
        uid: this.getUser.uid,
        add: this.address
      })
      .then(() => {
        this.$router.push('/dogregister')
      })
    },
  }
}
</script>
<style scoped>
.register-btn {
  width: 200px;
}
.txt_example {
  font-size: 30px !important;
}
</style>