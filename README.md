# Percy integration with Microsoft Teams using webhooks

![Percy](https://avatars.githubusercontent.com/u/12260884?s=200&v=4)
![Teams](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg/138px-Microsoft_Office_Teams_%282018%E2%80%93present%29.svg.png)

## Prerequisites
* Setup Incoming Webhooks in a teams channel. [Documentation](https://docs.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook#add-an-incoming-webhook-to-a-teams-channel)
* Copy and Save the incoming webhook URL.

## Steps to run
* Clone this repository
* Set DefaultValue for ```TEAMS_INCOMING_WEBHOOK``` and ```TIMEZONE``` in ```Jenkinsfile``` file.
* Set ```https://<JENKINS_URL>/invoke?token=percy_notification``` in Percy Project Integration for individual projects. [Documentation](https://docs.percy.io/docs/webhooks#creating-a-webhook-configuration)