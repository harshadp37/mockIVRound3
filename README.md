# mockIVRound3  

## Installation Guide :  
1.Open cmd in project folder & **run install**    
2.Start server by **node server.js** OR **nodemon**  

## Description :    
This Project Provides APIs for Polling System (like Adding Question & Options Then Get Votes on that options)    

## APIs Guide :  
*POST* **"/questions/create"** : For creating question | Field required : title | Field Optional : name      
*POST* **"/questions/:id/options/create"** : For creating options for specified question | Field required : text    
*DELETE* **"/questions/:id/delete"** : For deleting a question       
*DELETE* **"/options/:id/delete"** : For deleting an option       
*PUT* **"/options/:id/add_vote"** : For adding new vote for an option    
*GET* **"/questions/:id"** : To get Deatils of a question     
