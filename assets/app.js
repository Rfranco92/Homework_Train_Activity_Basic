
    // ========================================== START CODING BELOW!!
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAtr8bTdJ92eFr4gHTZmqmM3dh2jeRxZZQ",
    authDomain: "trains-8dd76.firebaseapp.com",
    databaseURL: "https://trains-8dd76.firebaseio.com",
    projectId: "trains-8dd76",
    storageBucket: "",
    messagingSenderId: "56530511006"
  };
  firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    // Capture Button Click
    $("#add-train").on("click", function(event) {
      event.preventDefault();

      // Grabbed values from text boxes
      var name = $("#name-input").val().trim();
      var destination = $("#destination-input").val().trim();
      var time = $("#time-input").val().trim();
      var frequency = $("#frequency-input").val().trim();
      var newTrain = {
        name: name,
        frequency: frequency,
        destination: destination,
        time: time,
      }
      // Code for handling the push
      database.ref().push(newTrain);

      console.log(newTrain.name);
      console.log(newTrain.frequency);
      console.log(newTrain.destination);
      console.log(newTrain.time);

    });

        

    // Firebase watcher + initial loader + order/limit HINT: .on("child_added"
      database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      // storing the snapshot.val() in a variable for convenience
      var sv = childSnapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.destination);
      console.log(sv.frequency);
      console.log(sv.time);


    var timeConverted = moment(sv.time, "hh:mm").subtract(1, "years");
    console.log(timeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % sv.frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = sv.frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    $("#trainschedule > tbody").append("<tr><td>" + sv.name + "</td><td>" + sv.destination + "</td><td>" +
    sv.frequency + "</td><td>" + moment(nextTrain).format("hh:mm a") + "</td><td>" + tMinutesTillTrain + "</td></tr>");

      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });