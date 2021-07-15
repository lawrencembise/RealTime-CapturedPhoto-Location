  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDq5LR_879GoMUCK46MCBBus-ILF1Mt2wg",
    authDomain: "numeric-advice-315210.firebaseapp.com",
    databaseURL: "https://numeric-advice-315210-default-rtdb.firebaseio.com",
    projectId: "numeric-advice-315210",
    storageBucket: "numeric-advice-315210.appspot.com",
    messagingSenderId: "124505661647",
    appId: "1:124505661647:web:ed826afd819014850e57ba"
  };
   // Initialize Firebase
   firebase.initializeApp(firebaseConfig);
   var allarray = [];

//from firebase ALL data
function SelectAllData(){
  firebase.database().ref('locations').on('value', function(AllRecords){
    AllRecords.forEach(
      function(CurrentRecord){
        var lat = CurrentRecord.val().latitude;
        var long = CurrentRecord.val().longitude;
        var image = CurrentRecord.val().pic;
             currarray = [lat,long,image]
             allarray.push(currarray)
      }  
    );
//for debugging
    console.log(allarray)
//Displaying the markers
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: new google.maps.LatLng(-6.776012, 39.278326),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < allarray.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(allarray[i][0], allarray[i][1]),
        map: map,
        animation: google.maps.Animation.DROP,
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent("image nO");
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
  });

}


window.onload = SelectAllData;
