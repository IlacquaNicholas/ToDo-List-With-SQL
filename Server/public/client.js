$(document).ready(onReady);

function onReady(){
    console.log('in jquery');
    getTask();
    $('#addTask').on('click', addTask)
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
          <td>${task.task}</td>
         </tr>
        `);
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
        task: $('#taskAtHand').val()
    }
    $.ajax({
        method:'POST',
        url:'/tasks',
        data: newTask
    }).then((response)=>{
        console.log('in POST', response);
        // $('#table').empty.append(`
        //     <th>Category</th>
        //     <th>Task at Hand</th>`);
        getTask();
        $('#category').val('');
        $('#taskAtHand').val('')
    });
};
