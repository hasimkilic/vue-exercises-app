<template>
  <appHeader/>
  <div class="flex flex-row">
    <SidebarLeft @category-changed="updateBookmarkList" />
    <appBookmarkList v-if="bookmarkList.length > 0" :items="bookmarkList" />
    <div v-else>
      <span class="font-bold">Bookmark Bulunmamaktadır...</span>
    </div>
  </div>
</template>

<script>
import SidebarLeft from '@/components/Home/SidebarLeft.vue'

export default {
  name: 'HomeView',
  components:{
    SidebarLeft,
  },
  data() {
    return {
      bookmarkList:[]
    }
  },
  created() {
    this.$appAxios.get("/bookmarks?_expand=category&_expand=user").then(bookmark_list_res =>{
      this.bookmarkList = bookmark_list_res?.data || [];
    })
  },
  methods: {
    updateBookmarkList(categoryId){
      this.$appAxios.get(`/bookmarks?_expand=category&_expand=user&categoryId=${categoryId}`).then(bookmark_list_res =>{
      this.bookmarkList = bookmark_list_res?.data || [];
    })
    }
  },
}
</script>
