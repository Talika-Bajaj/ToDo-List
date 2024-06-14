# iTask - Task Manager

![Design Preview for iTask - Task Manager](./Preview%20Image.PNG)

## Hi!

For my first React project, I created a dynamic to-do list application. Users can add, edit, or delete tasks. The Save button is initially disabled and activates only when the input exceeds three characters. Each task has a checkbox to indicate completion, and completed tasks are struck through. Another checkbox allows toggling the visibility of completed tasks. Tasks are stored in local storage as objects with a unique ID (generated using the uuid v4 package), the task description, and an isCompleted property, which defaults to false.
