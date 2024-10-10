<template>
  <div>
    <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.96777 16C10.8199 16.6303 11.8563 17 12.9741 17C14.0919 17 15.1283 16.6303 15.9804 16" :stroke="isActive ? '#46BFB8' : inActiveColor" stroke-width="1.5" stroke-linecap="round"/>
      <path d="M22.9953 12.2039V13.725C22.9953 17.6258 22.9953 19.5763 21.8213 20.7881C20.6472 22 18.7576 22 14.9784 22H10.97C7.1908 22 5.30121 22 4.12717 20.7881C2.95312 19.5763 2.95312 17.6258 2.95312 13.725V12.2039C2.95312 9.91549 2.95312 8.77128 3.47342 7.82274C3.99372 6.87421 4.94426 6.28551 6.84535 5.10813L8.84956 3.86687C10.8591 2.62229 11.8639 2 12.9742 2C14.0845 2 15.0893 2.62229 17.0989 3.86687L19.1031 5.10812C21.0042 6.28551 21.9547 6.87421 22.475 7.82274" :stroke="isActive ? '#613592' : inActiveColor" stroke-width="1.5" stroke-linecap="round"/>
    </svg>

  </div>
</template>

<script setup>
const props = defineProps({
    isActive: {
      type: Boolean,
      default: false
    }
})

const inActiveColor = '#AEAEAE';


</script>


<style lang="scss" scoped>

</style>