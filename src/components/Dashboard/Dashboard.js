import React, { useState } from "react";


import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from "react-chartjs-2"
import { useEffect } from "react";
import axios from "axios";



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '',
      },
    },
  };

  // const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

// const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: [10,20,30,40,50,60],
//         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//       },
//       {
//         label: 'Dataset 2',
//         data: [10,20,30,40,50,60],
//         backgroundColor: 'rgba(53, 162, 235, 0.5)',
//       },
//     ],
//   };


  


function Dashboard() {
    const [report,setReport]=useState('')
    const[userReport,setUserReport]=useState('')
    const[postReport,setPostReport]=useState('')
    const[blockReport,setBlockReport]=useState('')
    useEffect(() => {
       getData()
    }, [])


    const getData=async()=>{
      const response= await axios.get('http://localhost:5000/api/dashboard')

      setReport(response.data)
      setUserReport(response.data.userReport)
      setPostReport(response.data.postReport)
      setBlockReport(response.data.blockReport)

      console.log(response.data,'datas')
      

      // console.log(response.data);
      // console.log(report,'report');
    }

    
// console.log(userReport,'re')
console.log(report.dateArray,'report');
   
const labels = report && report.dateArray
const data = {
  labels,
  datasets: [
    {
      label: 'New Users',
      data: report && report.totalArray,
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    // {
    //   label: 'New Posts',
    //   data: report && report.totalArray,
    //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
    // },
  ],
};

    
    
  return (
    
    


    <div class="container my-12 mx-auto px-4 md:px-12 mt-24">
      <p className="text-center text-2xl text-gray-600">Weekly Statics</p>
      <div class="flex flex-wrap md:space-x-6 justify-around -mx-1 lg:-mx-4 md:justify-center ">
       
                <div  class="my-1  w-1/2   md:w-48 md:my-4   ">
                <article class="overflow-hidden rounded-lg shadow-lg border border-black">
                  <header class=" leading-tight p-2 md:p-4">
                    <h1 class="text-xl text-center text-gray-500">
                      <a class="no-underline hover:underline  " href="#">
                        POSTS
                      </a>
                    </h1>
                    <p className="text-4xl text-center text-rose-800">{postReport?.length>0 && postReport[0].posts}</p>
                    <p class="text-grey-darker text-sm text-center mt-3 text-gray-400">New Posts</p>
                  </header>
                </article>
              </div>
           

              <div  class="my-1  w-1/2   md:w-48 md:my-4   ">
                <article class="overflow-hidden rounded-lg shadow-lg border border-black">
                  <header class=" leading-tight p-2 md:p-4">
                    <h1 class="text-xl text-center text-gray-500">
                      <a class="no-underline hover:underline  " href="#">
                        Users
                      </a>
                    </h1>
                    <p className="text-4xl text-center text-rose-800">{userReport?.length>0 && userReport[0].users}</p>
                    <p class="text-grey-darker text-sm text-center mt-3 text-gray-400">New Users</p>
                  </header>
                </article>
              </div>

              <div  class="my-1  w-1/2   md:w-48 md:my-4   ">
                <article class="overflow-hidden rounded-lg shadow-lg border border-black">
                  <header class=" leading-tight p-2 md:p-4">
                    <h1 class="text-xl text-center text-gray-500">
                      <a class="no-underline hover:underline  " href="#">
                        Blocked
                      </a>
                    </h1>
                    <p className="text-4xl text-center text-rose-800">{blockReport?.length>0 && blockReport[0].blockedUsers}</p>
                    <p class="text-grey-darker text-sm text-center mt-3 text-gray-400">Users Blocked</p>
                  </header>
                </article>
              </div>

        
      </div>

     <div className="mt-5 h-full lg:mx-44 md:px-6 w-full md:w-auto">
     <Bar options={options} data={data}/>
     </div>
    </div>
    
  );
}

export default Dashboard;
