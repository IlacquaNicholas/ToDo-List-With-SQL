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
    console.log('GET / tasks response', response);
    $('#tasksInTable').empty();
    for (let task of response){
        $('#tasksInTable').append(`
         <tr>
          <td>${task.category}</td>
          <td>${task.taskAtHand}</td>
          <td><button class="complete-btn" data-id="${task.id}">Complete</button></td> 
          <td><button class="delete-btn" data-id="${task.id}">Delete</button></td>
        </tr>
        `)
        //data-rank="${task.rank}"might need to add this to the complete button 
    }
}).catch((error)=>{
    console.log('getTask error', error);
});
};