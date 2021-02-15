node {

    properties([
  pipelineTriggers([
   [$class: 'GenericTrigger',
    genericVariables: [
     [key: 'data', value: '$'],
     [key: 'TEAMS_INCOMING_WEBHOOK', value: '$.TEAMS_INCOMING_WEBHOOK', defaultValue: 'https://abhidashingsinghgmailcom.webhook.office.com/webhookb2/9856d0b9-5a4f-46f7-9329-6cabc9c77de9@85ec472c-93bf-420a-b399-622a6dc9e77a/IncomingWebhook/d228a0821bed4275adba0fb7a4a10e8e/6a586f48-f693-417b-ae30-6215d23646fe'],
     [key: 'TIMEZONE', value: '$.TIMEZONE', defaultValue: 'Asia/Kolkata']
    ],
    token: 'percy_notification',
    tokenCredentialId: '',
    printContributedVariables: true,
    printPostContent: true,
    silentResponse: false
   ]
  ])
 ])

    stage('Pull repository from GitHub') {
        git url: 'https://github.com/abhi2810/percy-webhook-teams-jenkins.git'
    }

    stage('Send Notification') {
        withEnv(['data=' + env.data, 'TEAMS_INCOMING_WEBHOOK=' + env.TEAMS_INCOMING_WEBHOOK, 'TIMEZONE=' + env.TIMEZONE]) {
            echo "Data=${env.data}"
            sh label: 'Execute webhook command', script: 'node index.js'
        }
    }
}
