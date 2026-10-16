export async function createTaskApi(task) {
  const taskAssign = await fetch("https://taskflow-backend-zq3y.onrender.com/task/createTask", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  return taskAssign;
}

export async function getTask() {
  const allTask = await fetch("https://taskflow-backend-zq3y.onrender.com/task/getTask");

  return allTask;
}

export async function getCurrentUserTask() {

  const email = localStorage.getItem("UserEmail");

  
  
  const userTasks = await fetch(
    `https://taskflow-backend-zq3y.onrender.com/task/getUserTask/${email}`,
  );

  const data = userTasks.json()

  return data;
}


export async function DeleteTask(id) {

 
  
  const response = await fetch(`https://taskflow-backend-zq3y.onrender.com/task/taskDelete/${id}`,{
    method:"DELETE",
    headers:{'Content-Type': 'application/json'},
    


  })

    const data = await response.json()

    return data





  
}
