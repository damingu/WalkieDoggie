<template>
  <div id="mainBox">
    <div class="d-flex justify-space-between">
      <div style="padding-top: 1px;">
        멍 PHOTO
      </div>
      <div>
        <v-icon @click="goback()">mdi-close</v-icon>
      </div>
    </div>
    <div class="d-flex justify-center my-2">작성자 : {{getSelectedItem.pe_name}} 🐶</div>
    <div class="d-flex justify-center mb-3 mt-1">{{getSelectedItem.l_desc}}</div>
    <v-img
      id="diaryBox"
      width="100%"
      :src = getSelectedItem.l_image 
    ></v-img>
    <!-- 삭제 확인 창 -->
    <div class="d-flex justify-end">
      <v-btn
        color="#48B9A8" text width="50px"
        @click="snackbar = true"
        v-if="userCheckBtn()" class="mt-2"
      >
        <b>삭제</b>
      </v-btn>
      <v-snackbar
        v-model="snackbar"
        :multi-line="multiLine">
        정말 삭제하시겠어요?
        <template v-slot:action="{ attrs }">
          <v-btn
            color="red"
            text
            v-bind="attrs"
            @click="deleteMyPosting"
          >
            YES
          </v-btn>
        </template>
      </v-snackbar>
      <div class="d-flex justify-end" style="margin-top: 5px;">
        <v-btn icon @click="likePost(getSelectedItem.lid)" class="mt-1" v-if="getSelectedItem.l_flag == 0">
          <v-icon>mdi-heart-outline</v-icon>
        </v-btn>
        <v-btn icon @click="likePost(getSelectedItem.lid)" class="mt-1" v-else>
          <v-icon color="red">mdi-heart</v-icon>
        </v-btn>
        <div class="d-inline mr-3" style="font-size: 18px; margin-top: 7px;">{{getSelectedItem.l_like}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: "ImageItem",
  data() {
    return{
      item: '',
      multiLine: true,
      snackbar: false,
      userCheck: false,
    }
  },
  created() {
    if (this.getUser == undefined) {
        alert('로그인 해주세요!')
        this.$router.push('/')
      } 
  },
  computed: {
    ...mapGetters(['getSelectedItem', 'getDogInfo', 'getUser']),
  },
  methods: {
    ...mapMutations(['setSelectedItem']),
    ...mapActions(['deleteMyPostingInApi', 'setClickPostDetailInAPI', 'likePlaceInApi', 'getHotPlaceListInApi']),
    go() {
      this.$router.push('/hotplaceupdate')
    },
    goback() {
     this.setSelectedItem(null)
    },
    //나의 게시글 삭제 
    deleteMyPosting(){
      let peid = this.getDogInfo.pet.peid
      let lid = this.getSelectedItem.lid
      this.deleteMyPostingInApi({peid, lid})
        .then(()=> {
          this.getHotPlaceListInApi({
            uid: this.getUser.uid,
            sort: "string",
            p_location: this.getUser.u_location
          })
          this.setSelectedItem(null)
          
        })
    },
    userCheckBtn() {
      if(this.getSelectedItem.pe_name === this.getDogInfo.pet.pe_name){
        return this.userCheck = true
      }
    },
    likePost(lid) {
      this.likePlaceInApi({
          lid: lid,
          uid: this.getUser.uid
        }).then(() => {
          this.setClickPostDetailInAPI({
              lid: lid,
              uid: this.getUser.uid
            })
        })
    }
  },
}
</script>

<style scoped>
#contentbox {
  background-color: white;
  margin: 12px;
  border-radius: 15px;
}
#diaryBox {
  border-radius: 15px;
  background-color: white;
  box-shadow: 5px 5px 5px #E5E5E5;
  padding: 20px;
}
</style>