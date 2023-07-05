import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
  chartForm: FormGroup | any
  chart: any;

  ngOnInit(): void {
    this.chartForm = new FormGroup({
      firstValue: new FormControl('', [Validators.required, Validators.max(100)]),
      secondValue: new FormControl('', [Validators.required, Validators.max(100)])
    })

  }

  onBlurEve() {
    this.chart?.destroy();
    if (this.chartForm.get('firstValue').value < 100 && this.chartForm.get('firstValue').value > 0) {
      this.chartForm.patchValue({
        secondValue: 100 - this.chartForm.get('firstValue').value,
      })
      this.chartForm.touched = this.chartForm.get('secondValue').touched = true;
    }
    if (this.chartForm.get('secondValue').value < 100 && this.chartForm.get('secondValue').value > 0) {
      this.chartForm.patchValue({
        firstValue: 100 - this.chartForm.get('secondValue').value,
      })
      this.chartForm.touched = this.chartForm.get('firstValue').touched = true
    }
  }

  onsubmit() {
    this.createChart();
    this.chartForm.reset();
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: {
        datasets: [{
          label: 'Value',
          data: [this.chartForm.get('firstValue').value, this.chartForm.get('secondValue').value],
          backgroundColor: [
            'crimson',
            'yellowgreen',
          ],
          hoverOffset: 4
        }],
      },
      options: {
        aspectRatio: 2.5
      },
    });
  }

}
