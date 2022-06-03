var profit = 0;
  var loss = 0;
  var bank = 10000; // counts value of all trades taken
  var counter = 0; // counts number of trades taken
  var winRate = 0; // percentage win rate of all trades
  // var tradeNum = counter + 1;
  var tradeCounter = document.getElementById("num-trades");
  var winPercentage = document.getElementById("win-rate");
  var winCounter = 0;
  var lossCounter = 0;
  let trades = [];
  var xyValues = [];
  var winRow = [0];
  var lossRow = [0];
  // Placed here so that it appears when first loading:
  statsLogger();

  // variables for stats functions:
  let n = xyValues.length;


  function tradeTracker(tradeType) {
      var p = parseInt(document.getElementById("profit-input").value);
      var l = parseInt(document.getElementById("loss-input").value);

      if (tradeType=='profit'){
        bank = bank + p;
        profit++;
        document.getElementById("won-num").innerHTML = profit;
        tradeLogger(counter + 1, 'Profit', p);
        rowCounter("profit");
      } else {
        bank = bank - l;
        loss++;
        document.getElementById("loss-num").innerHTML = loss;
        tradeLogger(counter + 1, 'Loss', l);
        rowCounter("loss");
      }

      counter++;
      tradeCounter.innerHTML = counter;

      winRate = (profit / counter) * 100;
      winPercentage.innerHTML = Math.round(winRate);
      statsLogger();
      

  }

  // Resets all values to 0:
  function reset(){
  //TODO: clear canvas
    const profInput = document.getElementById("profit-input");
    const lossInput = document.getElementById("loss-input");
    bank = 10000;
    loss = 0;
    profit = 0;
    tradeNum = 0;
    document.getElementById("won-num").innerHTML = 0;
    document.getElementById("loss-num").innerHTML = 0;
    document.getElementById("tradelog").innerHTML = "";
    // Clears the profit and loss input fields:
    profInput.value = 0;
    lossInput.value = 0;
    tradeCounter.innerHTML = 0;
    counter = 0;
    winRate = 0;
    winPercentage.innerHTML = 0;
    winRow.length = 0;
    lossRow.length = 0;
    winRow.push(0);
    lossRow.push(0);
    statsLogger();
    // This clears the array but dosn't clear the canvas
    //xyValues.splice(0, xyValues.length);
//     for (i in xyValues){
//       delete xyValues[i];
//     }
    xyValues.length = 0;
    // TODO: clear arrays:
    arr.length = 0;
    trades.length = 0;
    trade.length = 0;
    text = "";
    //removeData(myChart);
    console.log("XY Array: "+ xyValues);
  }

  // Logs all trades and outputs them into the List of Trades area of page:
  function tradeLogger(tradeNum, type, outcome) {
    var trade = {
      "tradeNum":tradeNum,
      "type":type,
      "result": outcome
    };

    trades.push(trade);

      // Apparently the better way of doing this would be to map the outputs
      var arr = [];
      for (const element in trades){
        arr.push(trades[element]);
        document.getElementById("tradelog").innerHTML = arr;
      };

      printGraph();

      var text = "";
      for (var i=0; i<arr.length; i++){
        text+=arr[i].tradeNum+" "+arr[i].type+" £"+arr[i].result+"<br>";
      }
      document.getElementById("tradelog").innerHTML = text;
//       console.log(text);
}


  // This creates a profit graph:
  function printGraph() {
    
    xyValues.push({'x': counter+1, 'y': bank});
    const ctx = document.getElementById('myChart').getContext('2d');
    //new Chart("myChart", {
    const myChart = new Chart(ctx, {
        type: "scatter",
        data: {
          datasets: [{
            pointRadius: 4,
            pointBackgroundColor: "rgb(0,0,255)",
            data: xyValues
          }]
        },
        options: {
          legend: {display: false},
          scales: {
            xAxes: [{ticks: {min: 1, max:100}}],
            yAxes: [{ticks: {min: bank - 1500, max: bank + 500}}],
          }
        }
        });
        // This code outputs the graph values from the xyValues array:
        let output = Object.keys(xyValues).map(function(e){
          return trades[e]
        })
        var str = JSON.stringify(xyValues);
  }
  
  // This function clears data from the chart:
  function removeData(chart){
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  // This function outputs the trading stats above the chart:
  function statsLogger(){ 
    
    var output = "";
    maxWin = Math.max.apply(null, winRow);
    maxLoss = Math.max.apply(null, lossRow);
    output+="Starting Balance: £10000"+"&emsp;&emsp;"+"MAX WON in row: "+maxWin+"<br>"+"Current Balance: £"+bank+"&emsp;&emsp;"+"MAX LOST in row: " + maxLoss;
    document.getElementById("stats").innerHTML = output;
    
  }


function rowCounter(currentType){   
  let previousType = "";
//   let winCounter = 0;
//   let lossCounter = 0;

  console.log("CurrentType: " + currentType);
  if(currentType == "profit"){
    if(previousType == "profit" || previousType == "" ){
      winCounter= winCounter+1;
      winRow.push(winCounter);
      lossCounter = 0;
      previousType = "profit";
      console.log("WinCounter: " +winCounter + " LossCounter: " + lossCounter);
      }
    else {
      console.log("Error!");
    }
    console.log("CurrentType: " + currentType + " previousType: " + previousType);
    } 
    else if (currentType == "loss"){
      if(previousType == "loss" || previousType == ""){
        lossCounter= lossCounter+1;
        lossRow.push(lossCounter);
        winCounter = 0;
        previousType = "loss";
        console.log("CurrentType: " + currentType + " previousType: " + previousType);
        console.log("WinCounter: " + winCounter + " LossCounter:  " + lossCounter);
        }
        else{
          console.log("Error! Loss");
        }
  }
  console.log("winArray: " + winRow);
  console.log("lossArray: " + lossRow);
  
 
 }

const download = function (data) {
 
    // Creating a Blob for having a csv file format
    // and passing the data with type
    const blob = new Blob([data], { type: 'text/csv' });
 
    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob)
 
    // Creating an anchor(a) tag of HTML
    const a = document.createElement('a')
 
    // Passing the blob downloading url
    a.setAttribute('href', url)
 
    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute('download', 'download.csv');
 
    // Performing a download with click
    a.click()
}

const csvmaker = function (data) {
 
    // Empty array for storing the values
    headers = ["Type", "Outcome"];
    csvRows = [];
 
    // Headers is basically a keys of an
    // object which is id, name, and
    // profession
    
    
    // As for making csv format, headers
    // must be separated by comma and
    // pushing it into array
    csvRows.push(headers.join(','));
 
    // Returning the array joining with new line
    let arr = [];
    let output = [];
      for (const element in data){
        let i = 0;
        arr.push(data[element]);
        output.push(arr[i].type, arr[i].result,'\n');
        i++;
      };
   
    // Pushing Object values into array
    // with comma separation
    csvRows.push(output.join(','));

    console.log("csvRows: " + csvRows);
    return csvRows.join('\n');
    
}
 
function get() {

    const csvdata = csvmaker(trades);
    download(csvdata);
}
 
// Getting element by id and adding
// eventlistner to listen everytime
// button get pressed
const btn = document.getElementById('action');
btn.addEventListener('click', get);

  /*
  LESSONS LEARNT:
  1) Using getElementsByClassName returns a collection not a single item, best to use getElementById for input values, then parse it to get a numberical value else you'll get a string value.
  2) When passsing a string argument, the argument needs to be in brackets.
  3) The some() function checks if any array element passes a test and executs a function for each element. 
  4) 3 ways of clearing out all items in an array, arrayName.length = 0; substitute the array with a new one, but this leads to memeory leaks, or splice the whole array arrayName.splice(0, arrayName.length);
  */
