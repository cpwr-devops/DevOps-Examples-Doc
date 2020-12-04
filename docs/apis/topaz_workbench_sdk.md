---
footer: MIT Licensed | Copyright © 2018 - Compuware | © Copyright 2018, 2020 BMC Software, Inc.
---

# Topaz Workbench SDK

The Topaz Workbench SDK includes the Compuware Topaz Workbench and Topaz APIs as well as developer resources such as examples, an examples template, a PassTicket Extension template, code snippets, and Javadoc. The functionality of the SDK provides users with methods to programmatically access and perform operations on datasets and perform JES operations, as well as launch and communicate with their own z/OS programs. The [PassTicket Extension](./passticket.md) template provides a starter Plug-in project for users to provide an implementation of PassTicket authentication to z/OS.

Starting with the **19.5.1 release**, the Compuware Topaz Workbench API consists of two separate layers:

* A base [Topaz API](./topaz_api.md) that provides APIs to access the mainframe with no dependencies on Topaz Workbench components.  This allows the Topaz API to be used in non-eclipse based applications like CLIs or web based applications.  
* The Topaz Workbench API provides access Host Connections configured in Topaz Workbench as well Topaz Workbench Host Connection Login dialog.  This allows eclipse plugins to be seemlessly integrated into Topaz Workbench.  

For information about **migrating from the pre-19.5.1 release** of the now depreciated Host Services API to the new APIs, please see the [Migrating from Host Services to Topaz APIs](#migrating-from-host-services-api-to-topaz-apis) section.

## API Specifications (Javadoc)

The please see the below links for detailed information about the APIs contained in the Compuware Topaz Workbench SDK.

* The Topaz API Specification (Javadoc) can be found <a href="../javadoc/topaz_api/index.html" target="_blank">here</a>.  
* The Topaz Workbench API Specification (Javadoc) can be found <a href="../javadoc/topaz_workbench_api/index.html" target="_blank">here</a>.

## API Examples

The Compuware Topaz SDK provides users with examples to not only verify API functionality on a given host, but to assist developers with using the Compuware Topaz Workbench API in their own programs.

The following are provided regarding API examples:

* Example Launcher View - A view from which a set of API examples can be launched by users
* Examples Template - A template that can be used to view the source of the examples provided in the Example Launcher view
* Code Snippets - Snippets that can be viewed to see how the Compuware Topaz Workbench API can be used to perform a certain action

## Example Launcher View

The Compuware Topaz Workbench SDK provides an Example Launcher view with a set of API examples that can be launched by users. The Example Launcher view can be used to verify that the Compuware Topaz Workbench API is functioning correctly on a given host. A description of an example is provided within the Example Launcher view when the example is selected.

In order to run one of the API examples, either double-click on the example or select the example and click the `Run` button. Follow the prompts to complete execution of the example.

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

Developers must include the Topaz Workbench API and Topaz API as a dependency of any custom plug-in they create that uses the Topaz Workbench API. This can be done in two different ways within a plug-in’s MANIFEST.MF file:

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

Lastly, developers must create a p2 repository that users can point to for installation of the developer’s custom feature. A p2 repository can be created in two different ways:

1. On the `Overview` tab of the Feature Manifest Editor, click the `Export Wizard` link under the `Exporting` section
2. Use the `File`->`Export...` menu and choose `Deployable features` under the `Plug-in Development` category

## Migrating from Host Services API to Topaz APIs

Starting with the **July 2019 19.5.1 release** of Topaz Workbench, the Host Services API has been replaced by the new Topaz API and Topaz Workbench API.

Plug-ins currently using the Host Services API will continue to work in Topaz Workbench; however, the Host Services API will no longer be enhanced and will be removed in a future version of Topaz Workbench. Compuware recommends modifying your custom plug-ins to use the Topaz Workbench API, removing any dependencies on the deprecated Host Services API.

The following is an summary of the differences between the Host Services API and the Topaz APIs, with descriptions of how to modify your code to work with the new Topaz APIs.

Change | Impact on existing Host Services API plug-ins
------ | ---------------------------------------------
Plug-in and package names were changed from com.compuware.api.hostservices.* to com.compuware.api.topaz.* | Update plug-in dependencies to reference new com.compuware.api.topaz and com.compuware.api.topaz.eclipse plug-ins and packages.
Removed restrictions requiring that the Topaz API is used within a Topaz Workbench client | No impact on existing plug-ins. Users can now write plug-ins and Java applications that can run outside of a Topaz Workbench client.
New HostManager class to retrieve instances of IHostManager | Replace uses of HostServicesAPI.getInstance().getHostManager() with HostManager.getInstance(). This class is only available in Topaz Workbench client plug-ins.
New HostFactory class to create IZOSHost instances outside of Topaz Workbench client | No impact on existing plug-ins. This new HostFactory class is available to create IZOSHost instances when users want to write plug-ins or Java applications that do not run in a Topaz Workbench client. This class is not intended to be used within Topaz Workbench client plug-ins.
New ZOSUIUserCredentialsManager to connect and retrieve Topaz Workbench UI user credentials | Replace uses of IHost.connectUIUser(), IHost.hasUIUserCredentials(), and IHost.getUIUserCredentials() with corresponding methods in ZOSUIUserCredentialsManager. This class is only available in Topaz Workbench client plug-ins.
Removed IHostServicesAPIListener | The implementation for the new Topaz APIs are now included with the API plug-ins, so service listeners are no longer applicable. Remove all uses of IHostServicesAPIListener (the implementation will always be available).
Removed VERSION constant from IHostManager | This VERSION constant was used internally by Compuware for making sure a IHostManager implementation was supported by the Host Services API. Since the implementation is now included as part of the API, this constant is no longer needed. Remove any use of this constant.
Removed IHostServicesAPILogger | It is now the responsibility of Topaz API users to log messages using whatever logging techniques they desire. Internal Compuware classes will still create logging messages within the compuware.log. Replace all uses of the IHostServicesAPILogger with the logging mechanism of your choice.
