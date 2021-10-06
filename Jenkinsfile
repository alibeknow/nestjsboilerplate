pipeline {
    agent {
        node {
            label 'nodejs' 
        }
    }
    environment {
        registry = 'registry.k10.kaztoll.kz/kaztoll-enterprise-back'
    }
    stages {
        stage("Build Docker Image kaztoll-enterprise-back") {
            steps {
               script { 
                  dockerImageBuild = docker.build registry + ":latest"
               }
            }
        }
        stage(" registry.k10.kaztoll.kz/kaztoll-enterprise-back push") {
            steps {
               sh "docker push registry.k10.kaztoll.kz/kaztoll-enterprise-back"
            }
        }
        stage("msw_registry kaztoll-enterprise-back image pull&push") {
            steps {
                ansiblePlaybook become: true, credentialsId: 'msw_registry_nexus_user_ssh_key', inventory: 'hosts.inv', playbook: 'docker_pull_push.yml'
            }
        }
	stage("kaztoll-enterprise-back container deploy on Remote Server") {
            steps {
                ansiblePlaybook become: true, credentialsId: 'msw_appserv09_msw-node03_nexus_user_ssh_key', inventory: 'hosts.inv', playbook: 'kaztoll-enterprise-back_container_deploy.yml'
            }
	}
    }
}
