#File Upload And Analysis

#SetUp
1. clone the project
2. Go inside the project eg.. cd file_upload_analysis
3. install packages with "npm i"
4. make sure you have a local MongoDB compass and have admin database
   or
   replace your MongoDB database link in the database.js file inside the config folder
   eg... "mongodb://localhost:27017/admin" replace your DB link .

#API info and screenshot

1. http://localhost:5000/upload
  this POST endpoint requires "file" as you see below screenshot and it returns "fileId"

  ![image](https://github.com/optimistic-coder/file_upload_analysis/assets/41050518/c633c5d3-b3a9-4485-a734-81fda88afffe)

3. http://localhost:5000/analyze
   this Post endpoint requires "fileId, operation,options" and it returns "taskId"

   ![image](https://github.com/optimistic-coder/file_upload_analysis/assets/41050518/d8963357-5754-4ce6-814a-82c7cb3e1a4c)

3. http://localhost:5000/results/{taskId}
   this GET endpoint returns results which we store in database
   
   ![image](https://github.com/optimistic-coder/file_upload_analysis/assets/41050518/a97b0752-a6d9-46c0-b1ff-d484dba86793)

