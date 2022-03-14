loadData();

function loadData(){
  httpRequest = new XMLHttpRequest();
  httpRequest.open('GET','/api/data1');
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState === 4 && httpRequest.status ===200){
      jsonData1 = JSON.parse(httpRequest.response);
      update_Bars(jsonData1);
    }
  };
  httpRequest.send();

  httpRequest2 = new XMLHttpRequest();
  httpRequest2.open('GET','/api/data2');
  httpRequest2.onreadystatechange = function () {
    if (httpRequest2.readyState === 4 && httpRequest2.status ===200){
      jsonData2 = JSON.parse(httpRequest2.response);
      updateRadar(jsonData2);
    }
  };
  httpRequest2.send();

  httpRequest3 = new XMLHttpRequest();
  httpRequest3.open('GET','/api/data3');
  httpRequest3.onreadystatechange = function () {
    if (httpRequest3.readyState === 4 && httpRequest3.status ===200){
      jsonData3 = JSON.parse(httpRequest3.response);
      update_Pie(jsonData3);
    }
  };
  httpRequest3.send();

  httpRequest4 = new XMLHttpRequest();
  httpRequest4.open('GET','/api/data4');
  httpRequest4.onreadystatechange = function () {
    if (httpRequest4.readyState === 4 && httpRequest4.status ===200){
      jsonData4 = JSON.parse(httpRequest4.response);
      update_BarsG(jsonData4);
    }
  };
  httpRequest4.send();
}



function update_Bars(){
  var labels = jsonData1.years;
  var data = jsonData1.nbr ;
  var l = labels.length ;
  var color = new Array();
  for (let i = 0; i < l; i++) 
  {
    color.push('#'+Math.floor(Math.random()*16777215).toString(16));
  }

  new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: "Moyenne de cette promo : ",
          backgroundColor: color,
          data: data
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: "Moyenne de chaque promotion (toutes spécialités confondues)"
      }
    }
});
}

function updateRadar(jsonData2) {
  var labels = jsonData2.specialite ;
  console.log(labels);
  
  for (d of jsonData2.datasets) {
    d.fill= true ;
    d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    d.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    d.borderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    d.pointBorderColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    d.pointBackgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);

  }
  var data = jsonData2.datasets;
  //console.log(data);
  new Chart(document.getElementById("radar-chart"), {
    type: 'radar',
    data: {
      labels: labels ,
      datasets: data
    },
    options: {
      title: {
        display: true,
        text: 'Distribution des étudiants par spécialité pour chaque année'
      }
    }
});
}


function update_Pie(jsonData3) {
  var labels = jsonData3.years ;
  var l = labels.length ;
  var color = new Array();

  for (let i = 0; i < l; i++) 
  {
    color.push('#'+Math.floor(Math.random()*16777215).toString(16));
  }
  
 
  var data= jsonData3.datasets;
  new Chart(document.getElementById("pie-chart"), {
    type: 'pie',
    data: {
      labels: labels ,
      datasets: [{
        label: "Nombre d'étudiants chaque année",
        backgroundColor: color ,
        data: data
      }]
    },
    options: {
      title: {
        display: true,
        text: "Nombre d'étudiants chaque année"
      }
    }
});

}


function 	update_BarsG(jsonData3) {
 
  var labels = jsonData3.years;
  
  for (d of jsonData3.moyennes) {
    d.backgroundColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  }

  var data = jsonData3.moyennes;

  new Chart(document.getElementById("bar-chart-grouped"), {
    type: 'bar',
    data: {
      labels: labels ,
      datasets: data
      
    },
    options: {
      title: {
        display: true,
        text: "Nombre d'étudiants qui ont eu la moyenne (>10) selon le sexe"
      }
    }
});

}

