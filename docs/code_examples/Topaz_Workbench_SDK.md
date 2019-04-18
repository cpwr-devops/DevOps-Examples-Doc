---
footer: MIT Licensed | Copyright © 2018 - Compuware
---

# Topaz Workbench SDK

The Compuware Topaz Workbench SDK includes the Compuware Topaz Workbench API as well as developer resources such as examples, an examples template, a PassTicket Extension template, code snippets, and Javadoc. The Compuware Topaz Workbench API provides users with methods to programmatically access and perform operations on datasets and perform JES operations, as well as launch and communicate with their own z/OS programs. The PassTicket Extension template provides a starter Plug-in project for users to provide an implementation of PassTicket authentication to z/OS.

The Compuware Topaz Workbench API consists of two separate layers:

* A base Topaz API that provides the majority of the API features with no dependencies on Topaz Workbench components
* The Topaz Workbench API which provides additional features to access Topaz Workbench client components and configurations

The Compuware Topaz API Specification (Javadoc) can be found <a href="../javadoc/topaz_api/index.html" target="_blank">here</a>.  
The Compuware Topaz Workbench API Specification (Javadoc) can be found <a href="../javadoc/topaz_workbench_api/index.html" target="_blank">here</a>.

## Dataset API

The Compuware Topaz Workbench API provides users with methods to programmatically access and perform actions on datasets. These API&#8217;s do not provide the capability to manipulate the Topaz Workbench UI.

The following dataset types are supported:

* Sequential
* Partitioned
* VSAM

The following actions are provided regarding datasets:

* Allocate a partitioned or sequential dataset
* Create or delete a PDS member
* Obtain dataset and PDS member objects by name/pattern and type
* Read the content of a sequential dataset or a PDS member
* Write content to a sequential dataset or a PDS member
* Obtain the characteristics of a dataset or the statistics of a PDS member
* Recall a migrated dataset

## JES API

The Compuware Topaz Workbench API provides users with methods to programmatically perform JES actions.

The following actions are provided regarding JES:

* Submit JCL
* Track a job&#8217;s status

## z/OS User Program API

The Compuware Topaz Workbench API provides users with methods to programmatically launch and communicate with their own z/OS programs.

The following actions are provided regarding z/OS user programs:

* Launch a z/OS user program
* Write/read user-defined data to/from the z/OS user program
* Be notified of when the z/OS user program has ended
## API Examples

The Compuware Topaz Workbench API provides users with examples to not only verify API functionality on a given host, but to assist developers with using the Compuware Topaz Workbench API in their own programs.

The following are provided regarding API examples:

* Example Launcher View - A view from which a set of API examples can be launched by users
* Examples Template - A template that can be used to view the source of the examples provided in the Example Launcher view
* Code Snippets - Snippets that can be viewed to see how the Compuware Topaz Workbench API can be used to perform a certain action

For more information regarding the API examples, see the [Developing for the Topaz Workbench API](#developing-for-the-topaz-workbench-api) section.

## PassTicket Extension

Topaz Workbench provides an Eclipse extension which can be used to authenticate users to z/OS via a passticket. A passticket is a single use token which can be used in place of a password when authenticating to z/OS. It order to use passtickets securely the user id must have been pre-authenticated. The implementation of the PassTicket extension is responsible for two items, first an authenticated user id and second a generated passticket which can be used in place of a password. These two responsibilities are satisfied by the implementation of two interfaces, IPassTicketUserProvider and IPassTicketGenerator. The SDK provides a template project to assist the user in developing the implementations for these two interfaces.

For more information on developing a PassTicket extension, see [Developing A PassTicket Extension](Passticket.md).

## Developing for the Topaz Workbench API

The following topics are designed to help developers write their own programs using the Compuware Topaz Workbench SDK.

The Compuware Topaz API Specification (Javadoc) can be found <a href="../javadoc/topaz_api/index.html" target="_blank">here</a>.  
The Compuware Topaz Workbench API Specification (Javadoc) can be found <a href="../javadoc/topaz_workbench_api/index.html" target="_blank">here</a>.

## Example Launcher View

The Compuware Topaz Workbench SDK provides an Example Launcher view with a set of API examples that can be launched by users. The Example Launcher view can be used to verify that the Compuware Topaz Workbench API is functioning correctly on a given host. A description of an example is provided within the Example Launcher view when the example is selected.

The following set of API examples is provided within the Example Launcher view:

* Hosts
  * List Hosts
  * Connect Using Credentials
  * Connect Using UI User Credentials
* Datasets
  * Allocate a Dataset
  * Allocate a Dataset Like Another Dataset
  * Find a Single Dataset
  * Find Multiple Datasets
  * Fetch Dataset Characteristics
  * Read a Sequential Dataset
  * Write to a Sequential Dataset
* Members
  * Create a PDS Member Using a Command Provider
  * Create a PDS Member Using a Dataset
  * Delete a PDS Member Using a Command Provider
  * Delete a PDS Member Using a Dataset
  * Find a Single Member Using a Command Provider
  * Find a Single Member Using a Dataset
  * Find Multiple Members Using a Command Provider
  * Find Multiple Members Using a Dataset
  * Fetch Member Statistics
  * Read a Member
  * Write to a Member
* JES
  * Submit a Job
  * Get a Job&#8217;s Status
* User Programs
  * Hello Mainframe
  * Termination Listener

In order to run one of the API examples listed above, either double-click on the example or select the example and click the `Run` button. Follow the prompts to complete execution of the example.

## Examples Template

The Examples Template can be used to add a custom set of the Compuware Topaz Workbench SDK examples to the Example Launcher view. Using the template, a plug-in project will be created that contains the source for each Compuware Topaz Workbench SDK example. The source can be modified for testing custom functionality or simply viewed for learning purposes.

To create a plug-in project using the Examples Template, follow these steps:

1. Open the `Plug-in Development` perspective by selecting `Window`->`Open Perspective`->`Other...` and selecting `Plug-in Development` in the `Open Perspective` dialog.
2. Select `File`->`New`->`Plug-in Project` from the main menu of the Topaz Workbench, Eclipse, or RDz.
3. Give your project a name and then select the `Next >` button.
4. On the next page, make sure `No` is selected for the `Would you like to create a rich client application` field. Select `Next >`.
5. On the next page, select `Plug-in with Compuware Topaz Workbench API examples` and then select `Finish`.

To run a custom plug-in that uses the Examples Template from within a development environment (Topaz Workbench, Eclipse, or RDz), follow these steps:

1. Open the `Debug` perspective within the development environment.
2. Create a launch configuration.
   1. Select `Run`->`Run Configurations...` from the main menu of the development environment (if you would like to run the custom plug-in in debug mode, select `Run`->`Debug Configurations...` instead).
   2. Select `Eclipse Application` from the tree on the left of the Run Configurations dialog (Debug Configurations dialog if you are running in debug mode) and then select the `New launch configuration` button from the toolbar along the top of the tree (the left-most button).
   3. Select the `Plug-ins` tab and make sure that `all workspace and enabled target plug-ins` is selected in the `Launch with` field.
   4. Select the `Main` tab and make sure that the Java Runtime Environment is utilizing a Java 8 compatible JRE (either a JavaSE-1.8 execution environment or Java 1.8 compatible JRE).
3. Once the launch configuration has been created, select the `Run` button (`Debug` button if in debug mode) to launch an application with the custom plug-in.

Within the application with the custom plug-in has been launched, the Example Launcher view will show both the `Topaz Workbench API` node as well as the corresponding node from the custom plug-in. While the examples under the `Topaz Workbench API` node will remain static, the examples under the node from the custom plug-in will reflect any changes made to the examples within the custom plug-in.

## Running

To run a custom plug-in that uses the Compuware Topaz Workbench SDK from within a development environment (Topaz Workbench, Eclipse, or RDz), follow these steps:

1. Open the `Debug` perspective within the development environment.
2. Create a launch configuration.
   1. Select `Run`->`Run Configurations...` from the main menu of the development environment (if you would like to run the custom plug-in in debug mode, select `Run`->`Debug Configurations...` instead).
   2. Select `Eclipse Application` from the tree on the left of the Run Configurations dialog (Debug Configurations dialog if you are running in debug mode) and then select the `New launch configuration` button from the toolbar along the top of the tree (the left-most button).
   3. Select the `Plug-ins` tab and make sure that `all workspace and enabled target plug-ins` is selected in the `Launch with` field.
   4. Select the `Main` tab and make sure that the Java Runtime Environment is utilizing a Java 8 compatible JRE (either a JavaSE-1.8 execution environment or Java 1.8 compatible JRE).
3. Once the launch configuration has been created, select the `Run` button (`Debug` button if in debug mode) to launch an application with the custom plug-in.

## Troubleshooting

Developers have multiple ways of troubleshooting any issues that may arise while developing with the Compuware Topaz Workbench SDK.

Area | Troubleshooting
---- | ---------------
Dataset and JES APIs | All methods that are part of the Dataset and JES APIs will throw specific exceptions when an error condition occurs. The exception thrown will contain the details necessary for a developer to diagnose the issue and determine how to proceed.
z/OS User Program API | In the same manner as the Dataset and JES APIs, all methods that are part of the z/OS User Program API will throw exceptions when an error condition occurs.

## Packaging

Developers must package their custom plug-ins so they can be distributed for installation and use.

### Add the Topaz Workbench API as a Dependency

Developers must include the Topaz Workbench API and Topaz API as a dependency of any custom plug-in they create that uses the Topaz Workbench API. This can be done in two different ways within a plug-in&#8217;s MANIFEST.MF file:

1. Open the plugin.xml file using the Plug-in Manifest Editor.
2. On the `Dependencies` tab of the editor, do one of the following:
   * Add the com.compuware.api.topaz.eclipse and com.compuware.api.topaz bundles to the list of required bundles
   * Add the specific packages of the com.compuware.api.topaz.eclipse and com.compuware.api.topaz bundles that are used by the custom plug-in to the list of imported packages

### Create a Feature

Developers must create a custom feature so that their custom plug-in can be included in a p2 repository for installation by users. A feature can be created from the `File`->`New` menu within the Topaz Workbench, Eclipse, or RDz.

Once the custom feature is created:

1. Open the feature.xml file using the Feature Manifest Editor.
2. On the `Plug-ins` tab of the editor, add the following:
   1. The custom plug-in
   2. The com.compuware.api.topaz.eclipse plug-in
   3. The com.compuware.api.topaz plug-in
   4. Any other plug-ins or fragments that the custom plug-in requires

### Export the Feature in a p2 Repository

Lastly, developers must create a p2 repository that users can point to for installation of the developer&#8217;s custom feature. A p2 repository can be created in two different ways:

1. On the `Overview` tab of the Feature Manifest Editor, click the `Export Wizard` link under the `Exporting` section
2. Use the `File`->`Export...` menu and choose `Deployable features` under the `Plug-in Development` category

On the `Deployable features` dialog, check the custom feature from the list of features and define the directory to which the p2 repository will be exported to. You can export the p2 repository as either a directory or an archive.

Once the p2 repository has been exported, it should be deployed so that all users can point to it and install the custom feature from it.
