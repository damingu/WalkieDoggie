<template>
  <div>
    <div id="mainBox">
      <!-- 상단 뒤로가기 버튼 -->
      <div class="d-flex justify-space-between">
        <div>
        <v-icon @click="goback()">mdi-arrow-left</v-icon>
        </div>
        <div>
          일기쓰기
        </div>
        <div style="width: 24px; background-color: white;">
        </div>
      </div>
      <!-- 날짜 -->
      <div id="contentBox">
        {{getPrettyDate}}
      </div>
      <!-- 이미지 -->
      <div id="contentBox">
        <div class="loader d-flex justify-center align-center" v-if="!photo_url && pageOn" style="width: 100%; height: 330px;">
          <b-spinner label="Spinning"></b-spinner></div>
        <v-img
          v-if="photo_url"
          height="330"
          width="100%"
          :src="photo_url">
        </v-img>
        <div class="filebox mt-3"> 
          <label for="ex_file">사진 추가</label> 
          <input type="file" accept="image/*" @click="addPhoto()" id="ex_file"> 
        </div>
      </div>
      <!-- 일기 내용 -->
      <div id="contentBox">
        <v-textarea
          :rules="rules1"
          v-model="diaryContent"
          label="일기 내용"
          outlined
          rows="5"
          row-height="25"
          color="#48B9A8"
        ></v-textarea>
      </div>
      <v-divider></v-divider>
      <!-- 특이사항 -->
      <div id="contentBox">
        <v-checkbox
          v-model="memo"
          label="특이사항"
          color="#48B9A8"
          hide-details
        ></v-checkbox>
        <v-textarea
          :rules="rules2"
          class="px-5 mt-5"
          v-model="memoContent"
          v-if="memo"
          outlined
          rows="2"
          row-height="20"
          color="#48B9A8"
        ></v-textarea>
      </div>
      <!-- 건강사항 -->
      <div id="contentBox">
        <v-checkbox
          v-model="health"
          label="건강사항"
          color="#48B9A8"
          hide-details
        ></v-checkbox>
        <v-text-field
          color="#48B9A8"
          @keydown.enter="addHealth()"
          v-model="healthContent"
          class="px-5"
          v-if="health"
          label="입력 후 enter"
        ></v-text-field>
        <div class="mx-4" v-if="health">
          <v-chip
            v-for="(hth, idx) in healthArray"
            :key="idx"
            class="mx-1 my-1"
            close
            color="#BAF1E4"
            @click:close="deleteHealth(hth)"
          >
            {{ hth }}
          </v-chip>
        </div>
      </div>
      <!-- 완료버튼 -->
      <div class="d-flex justify-end">
        <v-btn id="mainBtn" width="50px" @click="createDiary()" :disabled="confirm == false"><b>완료</b></v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: "CalendarWrite",
  data () {
      return {
        diaryContent: "",
        memo: false, // 특이사항 체크 or not
        health: false, // 건강사항 체크 or not
        memoContent: "", // 특이사항 내용
        healthContent: "", // 건강사항 내용 (1개)
        healthArray: [], // 건강사항 내용들 (전체)
        photo_url: false,
        pageOn: false,
        file: {},
        rules1: [
        value => !!value || '필수 입력사항입니다!',
        value => !!value.replace(/(\s*)/g, "") || '공백은 불가해요!',
        ],
        rules2: [
        value => !!value.replace(/(\s*)/g, "") || '공백은 불가해요!',
        ],
      }
    },
    created() {
      if (this.getUser == undefined) {
        alert('로그인 해주세요!')
        this.$router.push('/')
      } 
    },
    computed: {
      ...mapGetters(['getSelectedDate', 'getPrettyDate', 'getTempPhotoURL', 'getDogInfo', 'getUser']),
      confirm() {
        if (this.diaryContent.length < 1) {
          return false
        }
        if (this.memo) {
          if (this.memoContent.length < 1) {
            return false
          }
        }
        if (this.health) {
          if (this.healthArray.length < 1) {
            return false
          }
        }
        return true
      }
    },
    watch: {
      health(newVal) {
        if (!newVal) {
          this.healthContent = ""
          this.healthArray = []
        }
      },
      memo(newVal) {
        if(!newVal) {
          this.memoContent = ""
        }
      },
      diaryContent(newVal) {
        if (newVal.replace(/(\s*)/g, "").length == 0) {
          this.diaryContent = newVal.replace(/(\s*)/g, "")
        }
      },
      memoContent(newVal) {
        if (newVal.replace(/(\s*)/g, "").length == 0) {
          this.memoContent = newVal.replace(/(\s*)/g, "")
        }
      }
    },
    methods: {
      ...mapMutations(['setSelectedDate', 'setDetailBtn']),
      ...mapActions(['createNoPhotoDiaryInApi', 'makeTempPhotoUrlInApi', 'createWithPhotoDiaryInApi', 'getTodayDiaryInApi']),
      addHealth() {
      if (this.healthContent.replace(/(\s*)/g, "").length > 0) {
        this.healthArray.push(this.healthContent);
        this.healthContent = "";
        }
      },
      deleteHealth(hth) {
        const index = this.healthArray.indexOf(hth);
        this.healthArray.splice(index, 1);
      },
      goback() {
        this.setDetailBtn('diary')
        this.$router.push('/calendar')
      },
      addPhoto() {
        var t = this
        var photo = document.getElementById('ex_file')
        photo.addEventListener('change', function(event) {
          t.pageOn = true
          const formData = new FormData()
          var file = event.target.files[0]
          t.file = event.target.files[0]
          formData.append('file', file)
          t.makeTempPhotoUrlInApi(formData)
          .then(() => {
            t.photo_url = t.getTempPhotoURL
          }).catch((error) => {
            console.error(error)
          })
        })
      },
      createDiary() {
        const formData = new FormData()
        // 사진 없을 때
        if (!this.photo_url) {
          let diary = {
            did: 0,
            d_date: this.getSelectedDate,
            d_flag: 0,
            d_img: '',
            d_memo: this.diaryContent,
            d_special: this.memoContent,
            d_walk: 0,
            peid: this.getDogInfo.pet.peid
          }
          let health_list = []
          for (let i in this.healthArray) {
            health_list.push({
              h_content: this.healthArray[i],
              h_date: this.getSelectedDate,
              h_flag: 0,
              hid: 0,
              peid: this.getDogInfo.pet.peid
            })
          }
          formData.append(
            'diary',
            new Blob([JSON.stringify(diary)], { type: 'application/json' })
          )
          formData.append(
            'health_list',
            new Blob([JSON.stringify(health_list)], { type: 'application/json' })
          )
          this.createNoPhotoDiaryInApi(formData).then(() => {
            this.setDetailBtn('diary')
            this.$router.push(`/calendar/detail/todaydiary/${this.getSelectedDate}`)
          })
        }
        // 사진 있을 때
        else {
          let diary = {
            did: 0,
            d_date: this.getSelectedDate,
            d_flag: 0,
            d_img: this.photo_url,
            d_memo: this.diaryContent,
            d_special: this.memoContent,
            d_walk: 0,
            peid: this.getDogInfo.pet.peid
          }
          let health_list = []
          for (let i in this.healthArray) {
            health_list.push({
              h_content: this.healthArray[i],
              h_date: this.getSelectedDate,
              h_flag: 0,
              hid: 0,
              peid: this.getDogInfo.pet.peid
            })
          }
          formData.append(
            'diary',
            new Blob([JSON.stringify(diary)], { type: 'application/json' })
          )
          formData.append(
            'health_list',
            new Blob([JSON.stringify(health_list)], { type: 'application/json' })
          )
          formData.append('file', this.file)

          this.createWithPhotoDiaryInApi(formData).then(() => {
            this.setDetailBtn('diary')
            this.$router.push(`/calendar/detail/todaydiary/${this.getSelectedDate}`)
          })
        }
      }
    }
}
</script>

<style>
#contentBox {
  margin-top: 20px;
  margin-bottom: 10px;
}
.v-label, .v-chip__content {
  margin: 0px;
}
.v-messages__message {
  height: 15px;
  padding-top: 3px;
}
.filebox label {
  display: inline-block; 
  padding: .5em .75em; 
  color: #323232; 
  font-size: inherit; 
  line-height: normal; 
  vertical-align: middle; 
  background-color: #BAF1E4; 
  cursor: pointer; 
  border: 1px solid #ebebeb; 
  border-bottom-color: #e2e2e2; 
  border-radius: .25em; 
  } 
.filebox input[type="file"] {
  /* 파일 필드 숨기기 */ 
  position: absolute; 
  width: 1px; 
  height: 1px; 
  padding: 0; 
  margin: -1px; 
  overflow: hidden; 
  clip:rect(0,0,0,0); 
  border: 0; 
}
</style>