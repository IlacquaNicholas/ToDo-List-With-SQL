$(document).ready(onReady);

function onReady(){
    console.log('in jquery');
    $('#addTask').on('click', getTask)
}

function getTask (){
    console.log('In getTask');
$.ajax({
    method: 'GET',
    url: '/tasks'
}).then((response)=>{
    $('#tasksInTable').empty();
    console.log('GET / tasks response', response);
    for (let task of response){
        $('#tasksInTable').append(`
         <tr>
          <td>${task.category}</td>
          <td>${task.taskAtHand}</td>
        </tr>
        `)
        // <td><button class="complete-btn" data-id="${task.id}">Complete</button></td>
        // <td><button class="delete-btn" data-id="${task.id}">Delete</button></td>
        //data-rank="${task.rank}"might need to add this to the complete button 
    }
}).catch((error)=>{
    console.log('getTask error', error);
});
};

function addTask(){
    const newTask = {
        category: $('#category').val(),
        taskAtHand: $('#taskAtHand').val()
    }
    $.ajax({
        method:'POST',
        url:'/tasks',
        data: newTask
    }).then((response)=>{
        console.log('in POST');
        $('#category').val('');
        $('#taskAtHand').val('');
        getTask();
    });
};
