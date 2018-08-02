$(document).ready(function() { 

    var config = {
        apiKey: "AIzaSyDolgp_oEpi37OxmlzeUxticgUzHcPuHhc",
        authDomain: "train-dfdb1.firebaseapp.com",
        databaseURL: "https://train-dfdb1.firebaseio.com",
        projectId: "train-dfdb1",
        storageBucket: "train-dfdb1.appspot.com",
        messagingSenderId: "564918348558"
      };
      firebase.initializeApp(config);
  
      var trainData = firebase.database().ref();

      //Shows user the current time
      $("#currentTime").append(moment().format("hh:mm A"));
      
      // Button for adding trains
      $("#submit").on("click", function() {
          event.preventDefault();
          // Grabs user input
          var trainName = $("#trainInput").val().trim();
          var destination = $("#destinationInput").val().trim();
          var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
          var frequency = $("#frequencyInput").val().trim();
      
          
          var newTrain = {
              name: trainName,
              destination: destination,
              firstTrain: firstTrain,
              frequency: frequency
          };
      
          trainData.push(newTrain);
          $("#trainInput").val("");
          $("#destinationInput").val("");
          $("#firstTrainInput").val("");
          $("#frequencyInput").val("");
      
      });
    
      trainData.on("child_added", function(childSnapshot) {
      
          var data = childSnapshot.val();
          var trainNames = data.name;
          var trainDestin = data.destination;
          var trainFrequency = data.frequency;
          var theFirstTrain = data.firstTrain;  
          var tRemainder = moment().diff(moment.unix(theFirstTrain), "minutes") % trainFrequency;
          var tMinutes = trainFrequency - tRemainder;
          var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
      
          // Add each train's data into the table 
          $("#trainTable > tbody").append("<tr><td>" + trainNames + "</td><td>" + trainDestin + "</td><td class='min'>" + trainFrequency + "</td><td class='min'>" + tArrival + "</td><td class='min'>" + tMinutes + "</td></tr>");
      
      });
    });