---
title: Developing a Topaz Workbench PassTicket Extension
footer: MIT Licensed | Copyright © 2018 - Compuware
---

# Developing a Topaz Workbench PassTicket Extension

Topaz Workbench provides an Eclipse extension which can be used to authenticate users to z/OS via a passticket. A passticket is a single use token which can be used in place of a password when authenticating to z/OS. It order to use passtickets securely the user id must have been pre-authenticated. The implementation of the PassTicket extension is responsible for two items, first an authenticated user id and second a generated passticket which can be used in place of a password. These two responsibilities are satisfied by the implementation of two interfaces, IPassTicketUserProvider and IPassTicketGenerator. The [Topaz Workbench SDK](./Topaz_Workbench_API_Code_Snippets) provides a template project to assist the user in developing the implementations for these two interfaces.

The following topics describe the steps to develop and deploy the extension for PassTicket authentication.

## Creating your PassTicket Extension Project

1. Open the Project Explorer View

2. Select the File menu, the New menu item, and the Project... sub-menu.
3. In the New Project dialog expand Plug-in Development, select Plug-in Project and click the Next button.
4. On the Plug-in Project panel give your project a name and click the Next button.
5. On the Content panel you can accept the defaults. The option to make contributions to the UI should be checked. Click the Next button.
6. On the Templates panel make sure the ‘Create a plug-in using one of the templates’ option is checked. Select the ‘Compuware Topaz Workbench PassTicket credentials provider’ template and click the Next button.
7. On the next panel specify the name of the Java package which will contain the Java classes used to implement the two interfaces required by this extension. Click the Finish button.
8. You may get prompted to open the Plug-in Development perspective. This is not required, but you may find it helpful to develop using this perspective.

An Eclipse plug-in project is created and the Eclipse manifest editor is opened . In the Project Explorer under your project you will see a folder named src. Under the src folder you will see three classes, Activator, PassTicketGenerator, and PassTicketUserProvider. To complete the implementation of the PassTicket Extension you will write Java code for the contents of the PassTickedUserProvider.getUser method and PassTicketGenerator.generate method. The PassTicket extension is activated by Topaz when the user defines a Host Connection using the PassTicket Credential Provider. The getUser method is called by Topaz at the time of login. The user id returned is associated with the HCI connection which triggered the login. This user id is cached and will be used by Topaz throughout the current session without calling the extension again. The PassTicketGenerator.generate method is called by Topaz whenever Topaz has to make a connection to the HCI on behalf of the user. This includes the initial login and other situations where a secondary connection is necessary.
 
Open the PassTicketUserProvider class. You will see the implementation of a single method getUser() which returns null. This method should be changed to return a string representing the z/OS user id of the user running Topaz.

Open the PassTicketGenerator class. You will set the implementation of a single method generate which is responsible to generate a PassTicket which will be passed to the HCI to authenticate the user. When the method is called it is given the user id, the host name, and a Java Properties object which contains the port. The user id is the id which was returned from PassTicketUserProvider.getUser() method. The generate method may be called multiple times for each call to the getUser method.
The host name and port identify the HCI which Topaz is about to connect to. The following sites talk about possible ways to generate a PassTicket:

- [https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.icha300/genpas.htm](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.icha300/genpas.htm)
- [https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.icha300/algor.htm](https://www.ibm.com/support/knowledgecenter/en/SSLTBW_2.1.0/com.ibm.zos.v2r1.icha300/algor.htm)

# Packaging your PassTicket Extension

Developers must package the PassTicket extension plug-in so it can be distributed for installation and use.

## Create a Feature

Developers must create a custom feature so that their PassTicket extension plug-in can be included in a p2 repository for installation by users. A feature project can be created from the File->New menu within the Topaz Workbench, Eclipse, or RDz.

Once the custom feature is created:

1. Open the feature.xml file using the Feature Manifest Editor.
2. On the `Plug-ins` tab of the editor, add the following:
   1. The PassTicket extension plug-in
   2. Any other plug-ins or fragments that the PassTicket extension plug-in requires


### Export the Feature in a p2 Repository

Lastly, developers must create a p2 repository that users can point to for installation of the developer’s custom feature. A p2 repository can be created in two different ways:

1. On the `Overview` tab of the Feature Manifest Editor, click the `Export Wizard` link under the `Exporting` section
2. Use the File->Export... menu and choose `Deployable features` under the `Plug-in Development` category
3. On the `Deployable features` dialog, check the custom feature from the list of features and define the directory to which the p2 repository will be exported to. You can export the p2 repository as either a directory or an archive.
4. Once the p2 repository has been exported, it should be deployed so that all users can point to it and install the custom feature from it.
