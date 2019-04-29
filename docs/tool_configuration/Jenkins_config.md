---
title: Jenkins Configuration
footer: MIT Licensed | Copyright © 2018 - Compuware
---
The plugins installed into Jenkins used by the examples require additional setup like server locations/URLs or additional credentials to use. We describe the required steps by "location" in the Jenkins UI.

## Compuware Configurations

In `Manage Jenkins` -> `Configure System`, under the heading **Compuware Configurations** use either the Windows or Linux path fields to point to the location of the Topaz Workbench CLI (Command Line Interface).

Use the `Add Host Connection` button to add new host connection definition (connection to a mainframe LPAR). Use `Description` for name to be used during the scripts. Use `Host:port` to point to the host name of the mainframe LPAR to connect to (HCI port), select the required `Code page`, and use `CES URL`to point to the CES to use.

![Compuware configuration](./images/Compuware_Config.png)

## SonarQube server information

In `Manage Jenkins` -> `Configure System`, under the heading **SonarQube servers** use the `Add SonarQube` button to add a new definition. Provide a `Name` to be used during the scripts, provide the URL to your SonarQube server and the SonarQube server access token for this server. Refer to your SonarQube administrator for required information.

![SonarQube Server Name](./images/SonarQube_Server_Name.png)

## Global Pipeline Libraries

In `Manage Jenkins` -> `Configure System`, under the heading **Global Pipeline Libraries** use a name for the Shared Library to refer to during pipeline definitions. Use select "Modern SCM" and the matching SCM you use for storing `jenkinsfiles`. The examples use GitHub and use the `master` branch as default branch. This can be overridden during pipeline definition.

Point to the repository used for storing `jenkinsfiles` and provide the [Git credentials defined elsewhere](./#Git).

![Shared Library Config](./images/Shared_Library_config.png)

## XL Release

In `Manage Jenkins` -> `Configure System`, under the heading **XL Release** use the `Add` button to add a new definition. Use `Default Server Url` to point to your XL Release server, provide a `Name` to be used during the scripts and credentials to use for authentication.

![XLR Config](./images/XLR_Config.png)

## SonarQube Scanner

In `Manage Jenkins` -> `Global Tool Configuration`, under the heading **SonarQube Scanner** use the `Add SonarQube Scanner` button to add a new definition. Use `SONAR_RUNNER_HOME` to point to the path to the SonarQube Scanner local to the Jenkins server and provide a `Name` to be used during the scripts.

![SonarQube Scanner Name](./images/SonarQube_Scanner_Name.png)

## Git

In `Manage Jenkins` -> `Global Tool Configuration`, under the heading **Git**** use the `Add Git` button to add a new definition. Use `Path to Git executable` to point to the path to the git.exe local to the Jenkins server and provide a `Name`.

## Credentials

Use the credentials manager to store the following credentials for use in the examples

- A user ID / password token for a valid logon to the required mainframe LPAR used by plugins that do not use the CES credentials token (used as parameter `HCI_Token`)
- A secret text credential token to mask the [CES credentials ID created and retrieved from CES](CES_credentials_token.md) (used as parameter `CES_Token`)
- A user ID / password token for a valid logon to the GitHub repository storing Topaz for Total Test unit test assets (used as parameter `Git_Credentials`)

![Jenkins Credentials](./images/Jenkins_credentials.png)

## Managed Files

The option `Manage Jenkins` -> `Managed Files` will be available after installation of the [Config File Provider](https://wiki.jenkins.io/display/JENKINS/Config+File+Provider+Plugin) plugin. The examples make use of configuration files handled and stored by this plugin. Especially this will be a list of TSO user IDs and [corresponding mail addresses](../shared_library/Config_files.md). Over time other configuration files will use the same technology.

In `Manage Jenkins` -> `Managed Files` select `Add a new Config` to add a new configuration file to be handled by this plugin. Once files are created you can select the existing files to review and modify their content.

Configuration files used in the examples are plain text files. Therefore, chose `Custom file` as file type when defining a new file, and provide an ID that is meaningful. The examples use `MailList`as ID:

![New Config File](./images/Create_new_Config_File.png)

After `submitting` specify a file name to use and start filling the file with content. 

### The email list

The example mail list file uses a file name of `mailList.config` and pairs of `<TSO User ID>:<mailaddress>`, each on a separate line. The TSO user IDs used in this file correspond to the ISPW owner values passed by the [ISPW webhooks](./webhook_setup.md).

![Mail List File](./images/MailList_Config_File.png)