<template>
    <AppHeader/>
    <div class="flex flex-row">
        <side-bar/>
        <component :is="$route.meta.componentName"  :items="bookmarkList"/>
    </div>
</template>

<script>
import sideBar from '@/components/Account/sideBar'
export default {
    components:{
    sideBar,
},
  data() {
    return {
      bookmarkList:[]
    }
  },
  created() {
    this.$appAxios.get(`/bookmarks?_expand=category&_expand=user `).then(bookmark_list_res =>{
      this.bookmarkList = bookmark_list_res?.data || [];
    });
  },
}
</script>