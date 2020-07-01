---
title: Pipeline Setup
footer: MIT Licensed | Copyright © 2018 - Compuware
---
# Configuring a Pipeline from a Shared Library

## Setting up the pipeline job

The job itself is defined via the usual way of creating a new pipeline job. It is important, though, to make sure that the resulting job uses parameters by checking the `This project is parameterized` box, ![Parameterized Pipeline](../pipelines/images/parametertized_pipeline.png)

## Defining parameters

Successively add the following string parameters (note that default values are used in the examples).

![Adding parameters](../pipelines/images/Adding_parameters.png)

The parameters in this first set are specific to the individual execution of the pipeline and get passed by the [ISPW Webhook](../tool_configuration/webhook_setup.md).

Name  |  Description
----- |  -----------
ISPW_Stream | ISPW Stream Name
ISPW_Application | RXN3 ISPW Application
ISPW_Src_Level | ISPW Level the promote has been started from
ISPW_Release | ISPW Release Name
ISPW_Container | ISPW Set ID
ISPW_Container_Type | ISPW Container Type -0 - assignment -1 - release -2 - set
ISPW_Owner | ISPW Owner User ID

## Loading the script from a shared library

To tell Jenkins to execute a pipeline from a shared library, you need to add code like the following to the Pipeline script definition:

![Pipeline from Shared Library](../pipelines/images/pipeline_from_shared_lib.png)

The example uses

```groovy
@Library('RNU_Shared_Lib@Dev') _
Mainframe_CI_Pipeline_from_Shared_Lib(
    ISPW_Stream         :"${ISPW_Stream}",                          // ISPW Stream
    ISPW_Application    :"${ISPW_Application}",                     // ISPW Application
    ISPW_Release        :"${ISPW_Release}",                         // ISPW Release
    ISPW_Assignment     :"${ISPW_Assignment}",                      // ISPW Assignment
    ISPW_Container      :"${ISPW_Container}",                       // ISPW Container (Set)
    ISPW_Container_Type :"${ISPW_Container_Type}",                  // ISPW Container Type (2 for Set)
    ISPW_Src_Level      :"${ISPW_Src_Level}",                       // ISPW Level the promote worked from
    ISPW_Owner          :"${ISPW_Owner}",                           // ISPW User doing the promote
    CES_Token           :'xxxx',
    HCI_Conn_ID         :'xxxx',
    HCI_Token           :'xxxx',
    CC_repository       :'xxxx',
    Git_Project         :'xxxx',
    Git_Credentials     :'xxxx'
    )
```

where

- `@Library('RNU_Shared_Lib@Dev') _`
refers to the name of a [Shared Library](./helper_classes/PipelineConfig.md), with `@Dev` in this example referring to the `Dev` branch of the underlying GitHub repository. The trailing `_` is required by Jenkins.
- `Mainframe_CI_Pipeline_from_Shared_Lib`
refers to the name of the `.groovy` file in the `vars` folder of the GitHub repository, containing the pipeline code
- Within the brackets `(...)` parameters are passed to the pipeline script. `Mainframe_CI_Pipeline_from_Shared_Lib` expects a `groovy` [`Map`](http://groovy-lang.org/syntax.html#_maps), containing the following `key:value` pairs.

The parameters in this first set are specific to the individual execution of the pipeline. The values are the parameters defined as pipeline parameters). The syntax `"${parameter}"` ensures that the value passed to this parameter is taken as value in the `Map`.

Key  | Default Value | Description
----- | ------------- | -----------
ISPW_Stream | "${ISPW_Stream}" | The ISPW_Stream parameter from the pipeline configuration above
ISPW_Application | "${ISPW_Application}" | The ISPW_Application parameter from the pipeline configuration above
ISPW_Release | "${ISPW_Release}" | The ISPW_Release parameter from the pipeline configuration above
ISPW_Assignment | "${ISPW_Assignment}" | The ISPW_Assignment parameter from the pipeline configuration above
ISPW_Container | "${ISPW_Container}" | The ISPW_Container parameter from the pipeline configuration above
ISPW_Container_Type | "${ISPW_Container_Type}" | The ISPW_Container_Type parameter from the pipeline configuration above
ISPW_Src_Level | "${ISPW_Src_Level}" | The ISPW_Src_Level parameter from the pipeline configuration above
ISPW_Owner | "${ISPW_Owner}" | The ISPW_Owner parameter from the pipeline configuration above

The second set of parameters is installation specific and reference tokens and other IDs that have been defined during the configuration phase. To determine the appropriate values to use refer to the [description of the pipeline parameters](./parameters.md).

Usually, these parameters will be installation specific rather than pipeline job or execution specific. Future versions of the example will take care of this, and move these parameters to configuration files.

Key  |  Description
----- | -----------
CES_Token | The Jenkins token, referring to the CES token
HCI_Conn_ID | The Jenkins internal ID for the HCI connection to use
HCI_Token | Jenkins internal ID for HCI Token
CC_repository | The Xpediter Code Coverage repository to use
Git_Project | The name of the GitHub repository storing Topaz for Total Test assets
Git_Credentials | Jenkins internal ID for credentials to use the GitHub repository
<!--stackedit_data:
eyJoaXN0b3J5IjpbNzk0OTQ4NjE4XX0=
-->