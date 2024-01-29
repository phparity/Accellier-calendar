import { Line, Doughnut, Pie, Bar } from "react-chartjs-2";
import { Table } from "react-bootstrap";

import "../../assets/style/Home.css"
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import Chart from "chart.js/auto";
const GraphsTypes = (props) => {
  let dashline = props.dashline;
  let annualSalesTarget = props.target;
  let annualSalesAchieved = props.achieved;
  let annualSalesPercent = props.percent;
  return (
    <>
     <div className="chartjs-size-monitor">
        <div className="chartjs-size-monitor-expand">
          <div className=""></div>
        </div>
        <div className="chartjs-size-monitor-shrink">
          <div className=""></div>
        </div>
      </div>
      <div className="rezise" style={{ backgroundColor: "#fff" }}>
      <div className="chartjs-size-monitor">
        <div className="chartjs-size-monitor-expand">
          <div className=""></div>
        </div>
        <div className="chartjs-size-monitor-shrink">
          <div className=""></div>
        </div>
      </div>
        {dashline.type === "bar" ? (
          <Bar
            data={{
              labels: dashline.reportdetails.labels,
              datasets: [
                {
                  label:
                    dashline.report_name == "Annual Sales Target"
                      ? "Target"
                      : "Graph1",
                  fill: false,
                  backgroundColor: "#c2e7ff",
                  borderColor: "#4e73df",
                  borderWidth: 1,
                  radius: 0,
                  pointStyle: "line",
                  data:
                    dashline.report_name == "Annual Sales Target"
                      ? dashline.reportdetails.target
                      : dashline.reportdetails.datasets,
                },
                {
                  label:
                    dashline.report_name == "Annual Sales Target"
                      ? "Achieved"
                      : "Graph2",
                  fill: false,
                  backgroundColor: "green",
                  borderColor: "#4e73df",
                  borderWidth: 1,
                  radius: 0,
                  pointStyle: "line",
                  data: dashline.reportdetails.achived,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: false,
                text: dashline.report_name,
                fontSize: 16,
              },
              legend: {
                labels: {
                  boxHeight: 10,
                },
              },
              scales: {
                x: 
                  {
                    ticks: {
                      fontSize: 13,
                    },
                  },
                
                y: 
                  {
                    ticks: {
                      fontSize: 12,
                    },
                  },
                
              },
            }}
          />
        ) : dashline.type === "line" ? (
          <Line
            data={{
              labels: dashline.reportdetails.labels,
              datasets: [
                {
                  label: "Graph1",
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: "red",
                  borderColor: "#4e73df",
                  borderWidth: 2,
                  data: dashline.reportdetails.datasets,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              title: {
                display: false,
                text: dashline.report_name,
                fontSize: 16,
              },
              legend: {
                labels: {
                  boxHeight: 1,
                },
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      fontSize: 10,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      fontSize: 12,
                    },
                  },
                ],
              },
            }}
          />
        ) : dashline.type === "doughnut" ? (
          <Doughnut
            data={{
              labels: dashline.reportdetails.labels,
              datasets: [
                {
                  label: "Graph1",
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(275, 85, 132, 0.3)",
                    "rgba(375, 95, 332, 0.2)",
                  ],
                  borderColor: "black",
                  borderWidth: 1,
                  data: dashline.reportdetails.datasets,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              title: {
                display: false,
                text: dashline.report_name,
                fontSize: 16,
              },
              legend: {
                labels: {
                  boxHeight: 1,
                },
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      fontSize: 10,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      fontSize: 12,
                    },
                  },
                ],
              },
            }}
          />
        ) : dashline.type === "pie" ? (
          <Pie
            data={{
              labels: dashline.reportdetails.labels,
              datasets: [
                {
                  label: "Graph1",
                  fill: false,
                  lineTension: 0.5,
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(275, 85, 132, 0.3)",
                    "rgba(375, 95, 332, 0.2)",
                  ],
                  borderColor: "black",
                  borderWidth: 2,
                  data: dashline.reportdetails.datasets,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: true,
              title: {
                display: false,
                text: dashline.report_name,
                fontSize: 16,
              },
              legend: {
                labels: {
                  boxHeight: 1,
                },
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      fontSize: 10,
                    },
                  },
                ],
                yAxes: [
                  {
                    ticks: {
                      fontSize: 12,
                    },
                  },
                ],
              },
            }}
          />
        ) : null}
      </div>
      {dashline.type == "bar" &&
      dashline.report_name == "Annual Sales Target" ? (
        <div>
          <Table hover>
            <thead
              style={{
                backgroundColor: "#4E5D78",
                color: "white",
              }}
            >
              <tr
                style={{
                  textAlign: "center",
                  fontSize: "11px",
                }}
              >
                <th>Annual Target</th>
                <th>Sales Achieved YTD</th>
                <th>% Achieved YTD</th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  textAlign: "center",
                  fontSize: "11px",
                }}
              >
                <td>£{annualSalesTarget}</td>
                <td>£{annualSalesAchieved}</td>
                <td>{annualSalesPercent}%</td>
              </tr>
            </tbody>
          </Table>
        </div>
      ) : null}
    </>
  );
};

export default GraphsTypes;
