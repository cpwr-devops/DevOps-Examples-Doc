---
footer: MIT Licensed | Copyright © 2019 - Compuware
---

# Migrating from Host Services API to Topaz APIs

The Host Services API has been replaced by the new Topaz API and Topaz Workbench API.

Plug-ins currently using the Host Services API will continue to work in Topaz Workbench; however, the Host Services API will no longer be enhanced and will be removed in a future version of Topaz Workbench. Compuware recommends modifying your custom plug-ins to use the Topaz Workbench API, removing any dependencies on the deprecated Host Services API.

The following is an summary of the differences between the Host Services API and the Topaz APIs, with descriptions of how to modify your code to work with the new Topaz APIs.

Change | How to convert to work with new Topaz Workbench API
------ | ---------------------------------------------------
Plug-in and package names were changed from com.compuware.api.hostservices.* to com.compuware.api.topaz.* | Update plug-in dependencies to reference new com.compuware.api.topaz and com.compuware.api.topaz.eclipse plug-ins and packages.
Removed restrictions requiring that the Topaz API is used within a Topaz Workbench environment | Using the Topaz API by itself (without the Topaz Workbench API), users can now write plug-ins and Java applications that can run outside of a Topaz Workbench environment.
New HostManager class to retrieve instances of IHostManager (Topaz Workbench environments only) | Replace uses of HostServicesAPI.getInstance().getHostManager() with HostManager.getInstance().
New HostFactory class to create IZOSHost instances outside of Topaz Workbench environments | This new HostFactory class available to create IZOSHost instances when users want to write plug-ins or Java applications that do not run in a Topaz Workbench environment. This class is not intended to be used within a Topaz Workbench environment.
New ZOSUIUserCredentialsManager to connect and retrieve Topaz Workbench UI user credentials (Topaz Workbench environments only) | Replace uses of IHost.connectUIUser(), IHost.hasUIUserCredentials(), and IHost.getUIUserCredentials() with corresponding methods in ZOSUIUserCredentialsManager.
Removed IHostServicesAPIListener | The implementations for the new Topaz APIs are now included with the API plug-ins, so service listeners are no longer applicable. Remove all uses of IHostServicesAPIListener (the implementation will always be available).
Removed VERSION constant from IHostManager | This VERSION constant was used internally by Compuware for making sure a IHostManager implementation was supported by the Host Services API. Since the implementations are now included as part of the API, this constant is no longer needed. Remove any use of this constant.
Removed IHostServicesAPILogger | It is now the responsibility of Topaz API users to log messages using whatever logging techniques they desire. Internal Compuware classes will still create logging messages within the compuware.log. Replace all uses of the IHostServicesAPILogger with a logging mechanism of your own choosing.
