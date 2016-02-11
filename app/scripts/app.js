$(document).ready(function() {

  $('#newTaskForm').hide(); //keeps the input form hidden.

	var listo = [];

	var Task = function(task) { //this is a task constructor.
		this.task = task;         
		this.id = 'new';
	};

	var addTask = function(task) { //This allows the user to add tasks to the list.
		if(task) { //This will only run if the task is truthy(no empty strings specifically.)
        	task = new Task(task); //task is referring to what's being passed in.
        	listo.push(task); //pushes the new task to the listo array.
        	$('#newItemInput').val(''); //resets the value of the input to nothing. 
        	$('#newList').append('<a href="#" class="" id="item"><li class="list-group-item">' + task.task + '<span class="arrow pull-right"><i class="glyphicon glyphicon-arrow-right"></span></li></a>'); //someone explain this to me!! lol
		}
    $('#newTaskForm, #newListItem').fadeToggle('fast', 'linear');
	};

	var advanceTask = function(task) {
   		var modified = task.innerText.trim()
   		for (var i = 0; i < listo.length; i++) {
       		if (listo[i].task === modified) {
           		if (listo[i].id === 'new') {
               		listo[i].id = 'inProgress';
           		} else if (listo[i].id === 'inProgress') {
               		listo[i].id = 'archived';
           		} else {
               		listo.splice(i, 1);
           		}
           		break;
      		}
   		}
   task.remove();
	};

	$(document).on('click', '#item', function(e) {
    	e.preventDefault(); //This prevents the default action from happening.
    	var task = this;        
    	advanceTask(task);
    	this.id = 'inProgress';
    	$('#currentList').append(this.outerHTML);
	});

	$(document).on('click', '#inProgress', function (e) {
    	e.preventDefault();
    	var task = this;
    	task.id = "archived";
    	var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    	advanceTask(task);
    	$('#archivedList').append(changeIcon);
	});

	$(document).on('click', '#archived', function (e) {
    	e.preventDefault();
    	var task = this;
    	advanceTask(task);
	});

	$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
	$('#saveNewItem').on('click', function (e) {
    	e.preventDefault();
    	var task = $('#newItemInput').val().trim();
    	addTask(task);
	});
	//Opens form
	$('#newListItem').on('click', function () {
    	$('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
	});
	//closes form
	$('#cancel').on('click', function (e) {
    	e.preventDefault();
    $('#newTaskForm,  #newListItem').fadeToggle('fast', 'linear');
});

}); 