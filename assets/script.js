//Daily schedule 
var dailySchedule = [
  {
      id: "0",
      hourLabel: "9AM",
      time: "09",
      description: ""
  },
  {
      id: "1",
      hourLabel: "10AM",
      time: "10",
      description: ""
  },
  {
      id: "2",
      hourLabel: "11AM",
      time: "11",
      description: ""
  },
  {
      id: "3",
      hourLabel: "12PM",
      time: "12",
      description: ""
  },
  {
      id: "4",
      hourLabel: "1PM",
      time: "13",
      description: ""
  },
  {
      id: "5",
      hourLabel: "2PM",
      time: "14",
      description: ""
  },
  {
      id: "6",
      hourLabel: "3PM",
      time: "15",
      description: ""
  },
  {
      id: "7",
      hourLabel: "4PM",
      time: "16",
      description: ""
  },
  {
      id: "8",
      hourLabel: "5PM",
      time: "17",
      description: ""
  }
]

//Create variable to equal current hour
var currentTime = moment().format("HH");

//Display current dayy date
function displayDate() {
  var todayDate = moment().format('dddd, MMMM Do');
  $("#currentDay").text(todayDate);
}

displayDate();

//Loads saved daily tasks
function displaySaved() {
  dailySchedule.forEach(function (i) {
      $(`#${i.id}`).val(i.description);
  })
}


dailySchedule.forEach(function(index) {
  //creates row elements
  var rowEl = $("<div>").addClass("row");
  $(".container").append(rowEl);
  //creates hour element
  var hourEl = $("<div>").text(`${index.hourLabel}`).addClass("hour col-1 p-2");
  //creates daily task elements
  var taskEl = $("<div>").addClass("description col-10 border-0");
  var taskDetailEl = $("<textarea>");
  taskEl.append(taskDetailEl);
  taskDetailEl.attr("id", index.id);
  //Checks row hour element against the current hour
  if (index.time === currentTime) {
      taskDetailEl.addClass("present");
  } else if (index.time < currentTime) {
      taskDetailEl.addClass("past");
  } else {
      taskDetailEl.addClass("future");   
  }
  //creates save button element
  var saveButtonEl = $("<button>").addClass("saveBtn col-1 far fa-save fa-lg border-0");
  //Adds all element within the row elemnt
  rowEl.append(
    hourEl,
    taskEl,
    saveButtonEl
  );
})

// Saves data to be used in localStorage
$(".saveBtn").on("click", function() {
  var i = $(this).siblings(".description").children().attr("id");
  dailySchedule[i].description = $(this).siblings(".description").children().val();
  localStorage.setItem("dailySchedule", JSON.stringify(dailySchedule));
})

//Onload function check for existing saved data
function init() {
  var savedSchedule = JSON.parse(localStorage.getItem("dailySchedule"));
  if (savedSchedule) {
      dailySchedule = savedSchedule;
  }
  displaySaved();
}

init();
