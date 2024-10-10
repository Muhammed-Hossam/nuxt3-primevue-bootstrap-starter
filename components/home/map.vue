<template>
  <div class="home-map">
    <div class=" d-flex justify-content-between align-items-center gap-3 main-input w-100">
        <GMapAutocomplete placeholder="ابحث هنا" class="input-me" @place_changed="setPlace">
        </GMapAutocomplete>
        <button class="main-btn btn" @click="getCurrentLocatoin" style="flex-shrink: 0;">
            موقعك الحالي
        </button>
    </div>
    <div style="width: 100%;">
  
        <GMapMap :center="center" :zoom="18" map-type-id="terrain" style="width: 100%; height: 400px">
            <GMapMarker @dragend="getPositionmarker($event)" :position="center" :draggable="true" />
        </GMapMap>
    </div>
    <div class="d-flex justify-content-center align-items-center gap-3 mt-2 w-25 mx-auto">
        <FormButton :text="$t('global.confirm')" :loading="loading" @trigger-click="confirmLocation" :height="'48px'"></FormButton>
        <!-- <button class="main-btn blue2 mt-2  lg up" @click="$emit('closeModal')" v-if="reset">الغاء الفلتر</button> -->
    </div>
  </div>
</template>

<script setup>
/*************** imports **************** */
const { fetchAPI, data, status, msg, loading } = useFetchAPI();
const globalStore = useGlobalStore();
const authStore = useAuthStore();

/*************** Plugins **************** */


/*************** Props **************** */
const emit = defineEmits(['closeModal']);

const props = defineProps({
currentLocation: {
  type: Boolean,
  default: false
},
reset: {
  type: Boolean,
},
sendedLng: {
  type: String,
},
sendedLat: {
  type: String,
},
sendedAddress: {
  type: String,
},

});
const currentLocationMain = ref(props.currentLocation)

/*************** DATA **************** */




//map refs
const address = ref(props.sendedAddress || '');
const center = ref({ lat: props.sendedLat || 24.7135517, lng: props.sendedLng || 46.6752957 });


/*************** Computed **************** */




/*************** Methods **************** */
// search places
function setPlace(e) {


// sended data to backend
address.value = e.formatted_address;

// change marker pos
if(e.geometry){
center.value.lat = e.geometry.location.lat();
center.value.lng = e.geometry.location.lng();
}
}
// get lat , lng , address from change marker position
function getPositionmarker(e) {
center.value.lat = e.latLng.lat();
center.value.lng = e.latLng.lng();
getaddressfromlatlng();
}
// getaddress from latlng
function getaddressfromlatlng() {
const geocoder = new google.maps.Geocoder();
geocoder.geocode({ location: center.value }, (results, status) => {
if (status === "OK") {
  if (results[0]) {
      address.value = results[0].formatted_address;

      document.querySelector(".pac-target-input").value =
          results[0].formatted_address;

  } else {
      address.value = "No results found";
  }
} else {
  address.value = "Geocoder failed due to: " + status;
}
});
}
// get current location
function getCurrentLocatoin() {
if (navigator.geolocation) {
navigator.geolocation.getCurrentPosition(
  (position) => {
      center.value.lat = position.coords.latitude;
      center.value.lng = position.coords.longitude;
      getaddressfromlatlng();
  },
  (error) => {
      console.error("Error getting location:", error);
  }
);
} else {
console.error("Geolocation is not supported by this browser.");
}
}


const confirmLocation = async () => {
  if (!address.value || !center.value.lat || !center.value.lng) {
    return;
  }

  const formData  = new FormData();
  formData.append('map_desc', address.value);
  formData.append('lat', center.value.lat);
  formData.append('lng', center.value.lng);

  await fetchAPI('update-location', 'POST', {
    body: formData
  })

  if (status.value === 'success') {
    authStore.lat = center.value.lat;
    authStore.lng = center.value.lng;
    globalStore.showToast('success', 'Success', msg.value, 3000);
    emit('closeModal');
  }

  if (status.value === 'fail') {
    globalStore.showToast('error', 'Error', msg.value, 3000);
  }

}

/*************** Mounted **************** */
onMounted( () => {
// if(currentLocationMain.value){
//     setTimeout(() => {
      
//         getCurrentLocatoin()
//     }, 500);
// }

});

</script>

<style lang="scss">
.pac-container {
  z-index: 3500;
}

.input-me.pac-target-input {
  width: 250px;
  height: 40px;
  border-radius: 25px;
  border: 1px solid #ddd;
  padding-inline: 16px;
  margin-bottom: 1rem;
}

.main-btn {
  height: 40px;
  padding-inline: 16px;
  border-radius: 25px;
  border: 1px solid #ddd;
  background-color: $sec-color;
  color: #fff;

  &:hover {
    background-color: $sec-color;
    color: #fff;
  }
}
</style>