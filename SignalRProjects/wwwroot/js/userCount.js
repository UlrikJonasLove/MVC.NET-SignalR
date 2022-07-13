// Create Connection
var connectionUserCount = new signalR.HubConnectionBuilder().withUrl("/hubs/userCount").build();

// Connect to methods that hub invokes aka receive notications from hub
connectionUserCount.on("updateTotalViews", (value) => {
    var newCountSpan = document.getElementById("totalViewCounter");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalConnections", (value) => {
    var newCountSpan = document.getElementById("totalConnection");
    newCountSpan.innerText = value.toString();
});

connectionUserCount.on("updateTotalConnections", (value) => {
    var newCountSpan = document.getElementById("totalConnection");
    newCountSpan.innerText = value.toString();
});

// Invoke hub methods aka send notifications to hub
function newWindowLoadedOnClient() {
    connectionUserCount.send("NewWindowLoaded");
}

// start connection
const fulfilled = () => {
    //do something on start
    console.log("connection to UserHub successful");
    newWindowLoadedOnClient();
};
const rejected = () => {
    //rejected logs
    console.log("connection to UserHub failed")
}

connectionUserCount.start().then(fulfilled, rejected)