// ****** Workout logging flow
// When user starts workout logging workout state is initialized with metadata and mode is set to edit
// Also when a workout log starts, a stopwatch state is started to track the duration 
// Edit mode allows a user to create, modify, and delete exercises and sets the same way as in workout building
// When user switches to edit, the stopwatch stops. It starts again when you switch back to log mode
// Later release, user will be able to stop and reset the stopwatch
// When the user is done logging the workout, they can save the workout. Workout is added to workout logs list and sent to database.
// Ensure the log status is changed to finalized before sending to database.