<template>
  <div class="provider-skeleton__loader">
    <div class="card-img__wrapper">
      <Skeleton shape="rectangle" width="100%" height="240px" />
      
      <!-- <button class="favorite-btn btn text-center p-0 position-absolute rounded-circle">
        <Skeleton shape="circle" width="40px" height="40px" />
      </button> -->
    </div>

    <div class="card-info d-flex flex-column p-1">
       <!-- Rating Skeleton -->
       <div class="rate d-flex align-items-center gap-1">
        <Skeleton  width="10px" height="3px" />

        <Skeleton shape="circle" width="20px" height="20px" />
      </div>

      <!-- Title Skeleton -->
      <p class="card-title">
        <Skeleton width="150px" height="16px" />
      </p>

      <div class="d-flex justify-content-between">
         <!-- Location Skeleton -->
         <div class="provider-location d-flex align-items-center">
          <Skeleton shape="circle" width="16px" height="16px" />
          <Skeleton width="100px" height="12px" />
        </div>

          <!-- Button Skeleton -->
        <Skeleton shape="circle" width="24px" height="24px" />


      </div>
      
    </div>


  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.provider-skeleton__loader {
  width: 305px;
  min-height: 349px;
  height: 100%;
  border-radius: 12px;
  background-color: #FFFFFF;
  box-shadow: 0px 4px 40px 0px #00000014;
  padding: 8px;


  .card-img__wrapper, .card-img {
    width: 100%;
    height: 240px;
    border-radius: 12px;
  }

  .card-img__wrapper {

    .favorite-btn {
      width: 40px;
      height: 40px;
      background-color: #FFFFFF;
      top: 12px;
      left: 12px;
    }
  }

  .card-info {
    margin-top: 14px;
    gap: 10px;

    .rate {
      .rate-number {
        font-size: 14px;
        font-weight: 400;
        color: #AEAEAE;
      }
    }

    .card-title {
      font-size: 16px;
      font-weight: 400;
      color: #000000;
    }

    .provider-location {
      gap: 6px;

      .location-text {
        font-size: 12px;
        font-weight: 400;
        color: #AEAEAE;
      }
    }

    .go-btn {
      width: 24px;
      height: 24px;
      background-color: #46BFB8;
      margin-bottom: 2px;
      flex-shrink: 0;
    }
  }


}
</style>