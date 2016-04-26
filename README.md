Bachelorproef Frederik Van Brussel
===================

Dependencies
----------
 - Vagrant + [this docker plugin](https://github.com/leighmcculloch/vagrant-docker-compose)
 - Recent version of Nodejs and NPM. 
 - Git 

**Windows users**
1. download [Cygwin](https://www.cygwin.com/) from this page.

2.  While installing, select following 2 packages: **openssh & rsync**

3. edit  `` ${cygwin install location}/etc/fstab `` by replacing the last line with ` none / cygdrive binary 0 0`

4. Every command listed below should be executed from within a Cygwin terminal from now on.

Storm: first time
-------------
Storm is the script which should handle all workflows for local development. When all dependencies are met, storm should be lightning fast and easy to use.

1. Pull the repo and cd into it

2. For the first time, lets explore storm's posibilities. 
   Type `bash storm.sh`
   
3. You get a list with numbers representing a action:

    **1: start project**
    Launch the virtual machine with our app. Don't run this action if you didn't build one yet (action 4).
    
    **2: stop project**
    Stops our application
    
    **3: reload containers**
    Destroys the running containers and spins up fresh ones
    
    **4: (re)build project**
    You should use this action when its your first time building the vm, if you wanna run npm install or the vm crashed. 
    It will ask you if it should remove the node_modules, only type yes when you fucked up the node modules.
    
    **5: destroy project** 
    deletes the vm, but lets the repo exist on your computer. Rebuild after running this action
    
    **status: rt project**
    shows if a virtual machine is running.
    
4. As  its our first time, lets build our vm:

`bash storm.sh 4`

Follow the instructions, type 'n' when it asks if it should delete the nodes_modules folder
After building, most usage of the script should involve action 1 & 2 only.
