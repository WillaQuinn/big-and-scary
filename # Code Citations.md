# Code Citations

## License: unknown
https://github.com/noah130102/campus_built_tp/tree/9ce9ca831c9070ae4aa9a30d2a673be43e66f361/src/Components/TaskForm.js

```
const [task, setTask] = useState("");

       const handleSubmit = (e) => {
         e.preventDefault();
         if (task.trim()) {
           onAddTask(task);
           setTask("");
         }
       };

       return (
         <form
```


## License: unknown
https://github.com/student43120/SpecializationProject-main/tree/0262074882e3271a1e166e7549a51823e8629d26/task_manager/TaskList.js

```
({ tasks }) => {
       return (
         <ul>
           {tasks.map((task, index) => (
             <li key={index}>{task}</li>
           ))}
         </ul>
       );
     };

     export default TaskList
```

