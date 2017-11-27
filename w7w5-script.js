var currentlat = 0
var currentlng = 0
var whetherperdict = 0
var whetherday = 0

var savedweather = []


$(function() {
			$.ajax ({
				url: "https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyA9rz5E1ju2ps3Izng42_inRz7suOJpocc",
				type: "POST",
				//data: JSON.stringify(postdataset[0]),
				//dataType: "json",
				contentType: "application/json; charset=utf-8",
				success: function(data){
					currentlat = data["location"]["lat"] 
					currentlng = data["location"]["lng"]
					
					var getwhetherurl = "http://api.openweathermap.org/data/2.5/forecast/daily?lat="+currentlat+"&lon="+currentlng+"&cnt=10&appID=8131be7e3e6b2014b3af931e011bd730"
					
					$.ajax ({
						url: getwhetherurl,
						type: "GET",
						//data: {latlng:40.714224,-73.961452}
						//contentType: "application/json; charset=utf-8",
						success: function(city){
							
							$("#location1").html(city["city"]["name"])
							whetherperdict = city.list
							whetherday = city["list"]
							console.log(whetherday)
							
							$(whetherday).each(function(index,value){	
								var date = new Date(value["dt"]*1000)
								var picstatus = value["weather"][0]["icon"]
								var temperature = Math.round(((parseInt(value["temp"]["max"]) + parseInt(value["temp"]["min"]))/2)-273.15,1)
								var presure = value["pressure"]
								var humidity = value["humidity"]
								var desc = value["weather"][0]["description"]
								$("#tbody1").append("<tr><td>" + date.toDateString() + " </td><td>" + "<img src='http://openweathermap.org/img/w/" + picstatus +".png' style='height:30px'>"	+ "</td><td>" + temperature + "&#8451;</td><td>" + presure + "</td><td>" + humidity + "% </td><td>" + desc + "</td><td><button onclick='saveItem("+ index +")'>Save</button></td></tr>")
								
								console.log(whetherperdict)

							})
							
						}

					})

				}
			});
	loadsavedweather()
})

function loadsavedweather(){
	
	savedweather = JSON.parse(localStorage.getItem("whethers"))
	
	if(savedweather){	
		$("#table2").removeAttr("style")
		$(savedweather).each(function(index,value){	
			var date = new Date(value["dt"]*1000)
			var picstatus = value["weather"][0]["icon"]
			var temperature = Math.round(((parseInt(value["temp"]["max"]) + parseInt(value["temp"]["min"]))/2)-273.15,1)
			var presure = value["pressure"]
			var humidity = value["humidity"]
			var desc = value["weather"][0]["description"]
			$("#tbody2").append("<tr><td>" + date.toDateString() + " </td><td>" + "<img src='http://openweathermap.org/img/w/" + picstatus +".png' style='height:30px'>"	+ "</td><td>" + temperature + "&#8451;</td><td>" + presure + "</td><td>" + humidity + "% </td><td>" + desc + "</td><td><button onclick='deleteItem("+ index +")'>Delete</button></td></tr>")
		})
	}
	else{
		$("#table2").removeAttr("style")
		$("#tbody2").append("<tr id='noweatherrow'><td colspan='7'>You haven't save any weather yet</td></tr>")
		savedweather = []
	}
}

function saveItem(item){
	
	var saveditem = whetherperdict[item]
	console.log(saveditem)
	var date = new Date(saveditem["dt"]*1000)
	var picstatus = saveditem["weather"][0]["icon"]
	var temperature = Math.round(((parseInt(saveditem["temp"]["max"]) + parseInt(saveditem["temp"]["min"]))/2)-273.15,1)
	var presure = saveditem["pressure"]
	var humidity = saveditem["humidity"]
	var desc = saveditem["weather"][0]["description"]
	savedweather.push(whetherperdict[item])
	$("#tbody2").append("<tr><td>" + date.toDateString() + " </td><td>" + "<img src='http://openweathermap.org/img/w/" + picstatus +".png' style='height:30px'>"	+ "</td><td>" + temperature + "&#8451;</td><td>" + presure + "</td><td>" + humidity + "% </td><td>" + desc + "</td><td><button onclick='deleteItem("+ item +")'>Delete</button></td></tr>")
	$("#noweatherrow").remove()
	if(typeof(Storage) !== "undefined") {
		localStorage.setItem("whethers", JSON.stringify(savedweather))
	}
	
	else {
		alert("Your browser doesn't support cache")
	}
	
}


function clearsaved(){
	localStorage.removeItem("whethers");
	console.log("got it")
	$("#tbody2").html("<tr><th>Date</th><th>Status</th><th>Temperature</th><th>Presure</th><th>Humidity</th><th>Description</th><th>Delete</th></tr> ")
	$("#tbody2").append("<tr id='noweatherrow'><td colspan='7'>You haven't save any weather yet</td></tr>")
		savedweather = []
}



