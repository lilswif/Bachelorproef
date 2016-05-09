#!/bin/bash

# Declaring some sweet colours
red=$(tput setaf 1)
green=$(tput setaf 2)
reset=$(tput sgr0)
white=$(tput setaf 7)

#Parameters
KEUZE=$1

#Functions
function press_enter {
  printf "\nPress Enter to continue\n"
  read
  clear
}

function welkom_message {
	clear
 	printf "\nBachelorproef Frederik Van Brussel\n\n"
}

function print_actions {
  printf "${green}1: 		${white}start project ${reset}\n"
  printf "${green}2: 		${white}stop project ${reset}\n"
  printf "${green}3: 		${white}reload containers ${reset}\n"
  printf "${green}4: 		${white}(re)build project ${reset}\n"
  printf "${green}5: 		${white}destroy project ${reset}\n"
}

function start_project {
	printf "************* starting vm && application **************\n"
	printf "\n${green}Starting vm....${reset}\n"
	vagrant up
	
	printf "\n${green}Starting rsync-deamon.....${reset}\n"
	for x in ‘jobs -p’; do kill -9 $x; done
  vagrant rsync-auto &>/dev/null &

	printf "\n${red} DO NOT CLOSE THIS TERMINAL UNTIL YOUR FINISHED DEVELOPING / RELOAD CONTAINERS${reset}\n"
	printf "\nPreparing stream of our app container. \n"
	printf "\nThis stream can be blank for a litle while\n"
	printf "\nClose this stream with ctrl+c \n"
	press_enter
	vagrant ssh -c 'docker logs -f vagrant_app_1'
}

function stop_project {
	printf "************* stopping vm && application **************\n"
	printf "\n${green}closing vm.....${reset}\n"
	vagrant halt -f

	printf "\n${white}Reminder: don't forget to push changes x.${reset}\n"
}

function reload_project {
	printf "****************** renew containers *******************\n"
	printf "\ncreating fresh containers....\n"
	printf "\n${green}stopping containers....${reset}\n"
	vagrant ssh -c 'cd /vagrant && docker-compose stop'

	printf "\n${green}removing containers....${reset}\n"
	vagrant ssh -c 'cd /vagrant && docker-compose rm -f'

	printf "\n${green}starting fresh containers....${reset}\n"
	vagrant ssh -c 'cd /vagrant && docker-compose up -d'

	printf "\n${green}Starting rsync-deamon....${reset}\n"
	for x in ‘jobs -p’; do kill -9 $x; done
  vagrant rsync-auto &>/dev/null &

	printf "\n${green}launching stream!${reset}\n"
	vagrant ssh -c 'docker logs -f vagrant_app_1'
}

function build_project {
	printf "********** (re)building vm && application *************\n"
	printf "\n${green}...are you realy sure you want to (re)build?${reset}\n"
  	read -p "(y / n): " CHECK
  	if [[ $CHECK == "y" ]]; then
  		
  		printf "\n${green}destroy the existing node_modules folder?${reset}\n"
  		read -p "(y / n): " CHECK2
  		
  		printf "\n${green}Deleting!!${reset}\n"
  		
  		if [[ $CHECK2 == "y" ]]; then
  		printf "\nDeleting node_modules\n"
  			rm -rf node_modules || true
  		fi
  		
  		printf "\nDestroying existing vm....\n"
  		vagrant destroy -f

  		printf "\nrunning npm install....\n"
  		npm install

  		printf "\nStarting vm & application....\n"
  		start_project
  	else
  		printf "\n${red}...aborting!!${reset}\n"
  		exit
  	fi
}

function destroy_project {
	printf "************ destroying vm && application *************\n"
	printf "\n${red}...are you realy sure you want to destroy?${reset}\n"
  	read -p "(y / n): " CHECK
  	if [[ $CHECK == "y" ]]; then
  		printf "\n${green}Deleting!!${reset}\n"
  		
  		printf "\nDestroying vm....\n"
  		vagrant destroy -f
  	else
  		printf "\n${red}...aborting!!${reset}\n"
  		exit
  	fi
}


#Script flow
if [[ -z $KEUZE  ]]; then
  welkom_message
  printf "${green}Choose action number: \n${reset}"
  print_actions
  read -p "action: " KEUZE
fi 
if [[ $KEUZE -eq 1 ]]; then
    start_project
  elif [[ $KEUZE -eq 2 ]]; then
    stop_project
  elif [[ $KEUZE -eq 3 ]]; then
    reload_project
  elif [[ $KEUZE -eq 4 ]]; then
    build_project
  elif [[ $KEUZE -eq 5 ]]; then
    destroy_project
  else 
    printf "${red}Missing a correct action number. run this script again with the desired action...\n${reset}"
     print_actions
    exit
fi 