<template>
  <div class="package-card-skeleton">
    <div class="card-header d-flex justify-content-between">
      <Skeleton width="69px" height="10px" />
      <Skeleton width="67px" height="10px" />
    </div>
    <div class="card-body">
      <Skeleton width="100%" height="10px" class="mb-2" />
      <Skeleton width="92%" height="10px" class="mb-2" />
      <Skeleton width="88%" height="10px" class="mb-2" />
      <Skeleton width="80%" height="10px" class="mb-2" />
      <Skeleton width="60%" height="10px" />
    </div>
    <Skeleton width="169px" height="48px" class="rounded-pill mx-auto" />
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.card-header {
  padding: 16px 16px 20px 16px;
}

.card-body {
  padding-inline: 32px;
  padding-bottom: 20px;
  font-size: 14px;
  font-weight: 400;
  color: #141414;
  line-height: 26.24px;
}
</style>