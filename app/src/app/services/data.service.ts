import {Injectable} from '@angular/core';
import {Chart} from 'chart.js';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() {
  }

  apiCall(symbol: string): Promise<any> {
    const apiKey = '6JWBIL1X0EQNPE5F';
    return fetch("https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + symbol + "&interval=5min&apikey=" + apiKey)
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
      const response = await this.apiCall(symbol);
      const timestamps = Object.keys(response['Time Series (5min)']);



      const last10Timestamps = timestamps.slice(0, 20);

      const reversedTimestamps = last10Timestamps.reverse();

      const last10ClosingPrices = reversedTimestamps.map(timestamp => parseFloat(response['Time Series (5min)'][timestamp]['4. close']));



      const closingPrices = timestamps.map(timestamp => parseFloat(response['Time Series (5min)'][timestamp]['4. close']));

      // Erstelle ein Canvas-Element
      const canvas = document.createElement('canvas');
canvas.height = 300;
      new Chart(canvas, {
        type: 'line',
        data: {
          labels: last10ClosingPrices,
          datasets: [{
            label: 'Aktienkurs',
            data: closingPrices,
            borderColor: 'rgb(58,145,20)',
            fill: true,
            backgroundColor: "rgba(162,162,162,0.5)",
          }],
        },
        options: {
          responsive: true,

        }
      });

      // Füge das Canvas-Element dem HTML-Div hinzu
      const graphDiv = document.getElementById('graph');
      // @ts-ignore
      graphDiv.appendChild(canvas);
    } catch (error) {
      console.error('Fehler beim Erstellen des Graphen:', error);
    }
  }

}
