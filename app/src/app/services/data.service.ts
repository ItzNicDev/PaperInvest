import {Injectable} from '@angular/core';
import {Chart} from 'chart.js';
import {formatDate} from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  apiCall(symbol: string): Promise<any> {
    const apiKey = '6JWBIL1X0EQNPE5F';
    return fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=6JWBIL1X0EQNPE5F")
      .then(response => response.json())
      .then(data => {
        console.log(JSON.stringify(data, null, 2));
        return data;
      })
      .catch(error => {
        console.error('Fehler beim API-Aufruf:', error);
        throw error;
      });
  }


  async getGraph(symbol: string) {
    try {


      let response: any = null;
      if (true) {
        response = await this.apiCall("IBM");

      }

      if (false) {
        response = {
          "Meta Data": {
            "1. Information": "Intraday (5min) open, high, low, close prices and volume",
            "2. Symbol": "AAPL",
            "3. Last Refreshed": "2023-06-12 19:55:00",
            "4. Interval": "5min",
            "5. Output Size": "Compact",
            "6. Time Zone": "US/Eastern"
          },
          "Time Series (5min)": {
            "2023-06-12 19:55:00": {
              "1. open": "182.3000",
              "2. high": "182.7000",
              "3. low": "182.1000",
              "4. close": "182.5099",
              "5. volume": "62733"
            },
            "2023-06-12 19:50:00": {
              "1. open": "181.8000",
              "2. high": "182.3500",
              "3. low": "181.6000",
              "4. close": "182.3400",
              "5. volume": "38396"
            },
            "2023-06-12 19:45:00": {
              "1. open": "181.8500",
              "2. high": "181.8800",
              "3. low": "181.5000",
              "4. close": "181.8000",
              "5. volume": "47848"
            },
            "2023-06-12 19:40:00": {
              "1. open": "181.8800",
              "2. high": "182.2500",
              "3. low": "181.6300",
              "4. close": "181.7700",
              "5. volume": "48774"
            },
            "2023-06-12 19:35:00": {
              "1. open": "182.3800",
              "2. high": "182.5000",
              "3. low": "181.6700",
              "4. close": "181.9000",
              "5. volume": "72354"
            },
            "2023-06-12 19:30:00": {
              "1. open": "183.8800",
              "2. high": "183.9900",
              "3. low": "182.3000",
              "4. close": "182.5000",
              "5. volume": "88869"
            },
          }
        }
      }


      const timestamps = Object.keys(response['Time Series (5min)']);
      const last10Timestamps = timestamps.slice(0, 20);
      const reversedTimestamps = last10Timestamps.reverse();
      const last10ClosingPrices = reversedTimestamps.map(timestamp => parseFloat(response['Time Series (5min)'][timestamp]['4. close']));
      const closingPrices = timestamps.map(timestamp => parseFloat(response['Time Series (5min)'][timestamp]['4. close']));

      const canvas = document.createElement('canvas');
      canvas.height = 60;


      //green
      if(true) {
        new Chart(canvas, {
          type: 'line',
          data: {
            labels: last10ClosingPrices,
            datasets: [{
              label: 'Aktienkurs',
              data: closingPrices,
              borderColor: 'rgb(69,187,44)',
              fill: true,

              backgroundColor: "rgba(70,141,42,0.57)",
              pointStyle: 'star',
              pointRadius: 1,

            }],
          },
          options: {
            legend: {
              display: false, // Legende ausblenden
            },
            responsive: true,
            plugins: {
              title: {
                display: false,
                text: (ctx: any) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
              }
            },
            scales: {

              xAxes: [{
                display: false,
                gridLines: {
                  display: false,
                  color: 'white',
                  borderDash: [5, 5],
                  zeroLineColor: 'rgb(255,255,255)',

                },
              }],
              yAxes: [{
                display: false,
                gridLines: {
                  display: false,
                  color: 'rgb(155,155,155)',
                  borderDash: [5, 5],
                  zeroLineColor: 'rgb(232,232,232)',
                },
              }],
            },
          },
        });
      }

      //red
      if(false) {
        new Chart(canvas, {
          type: 'line',
          data: {
            labels: last10ClosingPrices,
            datasets: [{
              label: 'Aktienkurs',
              data: closingPrices,
              borderColor: 'rgb(187,44,49)',
              fill: true,

              backgroundColor: "rgba(141,42,42,0.57)",
              pointStyle: 'star',
              pointRadius: 1,

            }],
          },
          options: {
            legend: {
              display: false, // Legende ausblenden
            },
            responsive: true,
            plugins: {
              title: {
                display: false,
                text: (ctx: any) => 'Point Style: ' + ctx.chart.data.datasets[0].pointStyle,
              }
            },
            scales: {

              xAxes: [{
                display: false,
                gridLines: {
                  display: false,
                  color: 'white',
                  borderDash: [5, 5],
                  zeroLineColor: 'rgb(255,255,255)',

                },
              }],
              yAxes: [{
                display: false,
                gridLines: {
                  display: false,
                  color: 'rgb(155,155,155)',
                  borderDash: [5, 5],
                  zeroLineColor: 'rgb(232,232,232)',
                },
              }],
            },
          },
        });
      }

      // Füge das Canvas-Element dem HTML-Div hinzu
      const graphDiv = document.getElementById('graph');
      // @ts-ignore
      graphDiv.appendChild(canvas);
    } catch (error) {
      console.error('Fehler beim Erstellen des Graphen:', error);
    }
  }

}
