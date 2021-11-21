$(document).ready(onReady);

function onReady(){
    console.log('in jquery');
    getTask();
    $('#addTask').on('click', addTask)
    $('#tasksInTable').on('click', '.delete-btn', deleteOnClick)
    $('#tasksInTable').on('click', '.complete-btn', completeTaskOnClick)

}
function completeTaskOnClick(){
console.log('complete works');
const completeTask = $(this).data('id')
    console.log(completeTask);

$.ajax({
    method: "PUT",
    url: `/tasks/${completeTask}`, 
}).then((response)=>{
    console.log('you are in the PUT');
    // if (completeTask === 'Yeppers') {
    //     $('.yes-yes').css('background-color', 'lightgreen')
    //     console.log('in GREEN');
    // }
getTask();
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
        task: $('#taskAtHand').val(),
        completed: $('#complete').val()
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
        $('#taskAtHand').val('');
        $('#complete').val('');
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
         <tr class="tr">
          <td>${task.category}</td>
          <td>${task.task}</td>
          <td class = "yes-yes">${task.completed}</td>
          <td><button class="complete-btn" data-id="${task.id}">Completed task</button></td>
          <td><button class="delete-btn" data-id="${task.id}">Delete</button></td>
         </tr>
        `);
        if (task.completed === 'Yeppers') {
            $('.yes-yes').css('background-color', 'lightgreen')
        }else(task.completed === 'No')
        $('.yes-yes').css('background-color', 'lightgrey')
    }
    //     for (let task of response){
    //         let lightGreen =  $('#yes-yes').css('background-color', 'lightgreen')
    //    if (task.completed !== 'Yeppers'){
    //        $('#yes-yes').css('background-color', 'lightgrey')
    //     }  return lightGreen;
    //    } 
    })
.catch((error)=>{
    console.log('getTask error', error);
});
};
