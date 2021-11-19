$(document).ready(onReady);

function onReady(){
    console.log('in jquery');
    getTask();
    $('#addTask').on('click', addTask)
    $('#tasksInTable').on('click', '.delete-btn', deleteOnClick)
    $('#tasksInTable').on('click', completeTaskOnClick)

}
function completeTaskOnClick(){
console.log('complete works');
const completeTask = {
    completed: $('.complete-btn').css('backround-color', 'green')
}
$.ajax({
    method: "PUT",
    url: `/tasks/${completeTask.id}`, 
    data: completeTask
}).then((response)=>{
    console.log('you are in the PUT');
    
}).catch((err)=>{
    console.log(err);
});
};

function deleteOnClick(){
    const taskIdToDelete = $(this).data('id');
    $.ajax({
        method: 'DELETE', 
        url: `/tasks/${taskIdToDelete}`
    }).then ((response)=>{
        console.log(response);
        getTask();
    })

}
function addTask() {
    const newTask = {
        category: $('#category').val(),
        task: $('#taskAtHand').val()
    }
    $.ajax({
        method: 'POST',
        url: '/tasks',
        data: newTask
    }).then((response) => {
        console.log('in POST', response);
        // $('#table').empty.append(`
        //     <th>Category</th>
        //     <th>Task at Hand</th>`);
        getTask();
        $('#category').val('');
        $('#taskAtHand').val('')
    });
};


function getTask (){
    console.log('In getTask');
$.ajax({
    method: 'GET',
    url: '/tasks'
}).then((response)=>{
    console.log('GET / tasks response', response);
    $('#tasksInTable').empty();
    for (let task of response){
        $('#tasksInTable').append(`
         <tr>
          <td>${task.category}</td>
          <td>${task.task}</td>
          <td><button class="complete-btn" data-id="${task.id}">Complete</button></td>
           <td><button class="delete-btn" data-id="${task.id}">Delete</button></td>
         </tr>
        `);
    }
}).catch((error)=>{
    console.log('getTask error', error);
});
};
