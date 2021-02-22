---
footer: MIT Licensed | Copyright © 2018 - Compuware | © Copyright 2018, 2020 BMC Software, Inc.
---

# Topaz Workbench SDK Code Snippets

The following scenarios contain a brief description as well as one or more code snippets pertinent to the scenario:

## Create a z/OS Host

When writing Java applications or (Eclipse plug-ins not running in a Topaz Workbench client), you can create instances of z/OS Hosts using the HostFactory class:

```java
String host = ...
int port = ...
Protocol protocol = ...
int timeoutSeconds = ...

IZOSHost zosHost = HostFactory.createZOSHost(host, port, protocol, timeoutSeconds);
```

## Obtaining one or more Defined z/OS Hosts

When writing Eclipse plug-ins running in a Topaz Workbench client, one or more defined z/OS hosts can be obtained using the HostManager class.

To obtain a list of all defined z/OS hosts:

```java
// get an IHostManager
IHostManager hostManager = HostManager.getInstance();

// get all defined hosts, an empty list is returned if none are defined
List<IZOSHost> zosHostList = hostManager.getZOSHosts();
```

To obtain a single z/OS host:

```java
String host = ...
int port = ...

// get an IHostManager
IHostManager hostManager = HostManager.getInstance();

// find z/OS host, null is returned if this host is not defined
IZOSHost zosHost = hostManager.findZOSHost(host, port);
```

## Connecting to a z/OS Host for Dataset or JES API Usage

In order to use the dataset or JES APIs on a defined z/OS host, a connection to that z/OS host must first be established.

To connect to a z/OS host for dataset or JES API usage:

```java
IZOSHost zosHost = ...
String userID = ...
String password = ...

// use one of the several ZOSCredentialsFactory methods to create a z/OS
// credentials object
IZOSCredentials credentials = ZOSCredentialsFactory
        .createZOSCredentials(userID, password);

// create a connection from the z/OS host
IZOSHostConnection zosHostConnection = zosHost
        .createZOSHostConnection();

try {
    // connect to the host
    zosHostConnection.connect(credentials);

    // the connection is now available for use
    ...
} catch (HostCredentialsException e) {
    // credentials were invalid, likely caused by incorrect login
    // information or expired password
    ...
}
```

<a name="get-ui-creds"></a>
When writing plug-ins running in a Topaz Workbench client, you may also connect to a z/OS host by using the credentials of the currently logged in Topaz Workbench UI user using the ZOSUIUserCredentialsManager:

```java
IZOSHost zosHost = ...

// make sure we have access to the UI user's credentials (either saved
// credentials, or the UI user is currently logged in)
if (!ZOSUIUserCredentialsManager.hasUIUserCredentials(zosHost)) {
    // connect the UI user so we can access their credentials (user will
    // be presented with a login dialog)
    ZOSUIUserCredentialsManager.connectUIUser(zosHost);
}

// we should have the UI user's credentials now, unless they cancelled
// the login dialog
if (ZOSUIUserCredentialsManager.hasUIUserCredentials(zosHost)) {
    // get UI user's z/OS credentials
    IZOSCredentials credentials = ZOSUIUserCredentialsManager
            .getUIUserCredentials(zosHost);

    // you may now use these credentials to connect to the z/OS Host
    ...
}
```

## Obtaining a Dataset Command Provider

In order to obtain one or more datasets, a dataset command provider must first be obtained.  To obtain a dataset command provider:

```java
IZOSHostConnection zosHostConnection = ...

// get the dataset command provider from a z/OS host connection
// note: the command provider will only be usable while the z/OS host
// connection is connected to its z/OS host
IDataSetCommandProvider commandProvider = zosHostConnection
        .getDataSetCommandProvider();
```

## Allocating Partitioned or Sequential Datasets

In order to allocate partitioned or sequential datasets, you first must create the allocate parameters using an AllocateParametersBuilder. After creating your allocate parameters, you can then allocate your datasets using an IDatasetCommandProvider.

To create allocate parameters based off of an existing dataset:

```java
// note: the dataset may also be an ISequentialDataSet
IPartitionedDataSet dataset = ...

try {
    IAllocateParameters parameters = AllocateParametersBuilder.like(dataset).build();
} catch (DataSetInUseException e1) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetNotFoundException e1) {
    // the dataset can no longer be found
    ...
} catch (DataSetAccessException e1) {
    // the user does not have access to this dataset
    ...
} catch (DataSetMigratedException e1) {
    // the dataset has been migrated since it was first retrieved
    ...
}
```

To create allocate parameters based off of an existing dataset while overriding some parameters:

```java
// note: the dataset may also be an ISequentialDataSet
IPartitionedDataSet dataset = ...

try {
    IAllocateParameters parameters = AllocateParametersBuilder.like(dataset)
            .setRecordFormat(RecordFormat.VB).setLogicalRecordLength(120).setBlockSize(124).build();

    // alternatively:

    AllocateParametersBuilder builder = AllocateParametersBuilder.like(dataset);
    builder.setRecordFormat(RecordFormat.VB);
    builder.setLogicalRecordLength(120);
    builder.setBlockSize(124);
    IAllocateParameters parameters2 = builder.build();
} catch (DataSetInUseException e1) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetNotFoundException e1) {
    // the dataset can no longer be found
    ...
} catch (DataSetAccessException e1) {
    // the user does not have access to this dataset
    ...
} catch (DataSetMigratedException e1) {
    // the dataset has been migrated since it was first retrieved
    ...
}
```

To create allocate parameters for a partitioned dataset based off of defaults:

```java
IAllocateParameters parameters = AllocateParametersBuilder.partitionedDefaults(true)
        .setAllocationUnit(IAllocateParameters.AllocationUnit.CYLINDERS).setPrimaryQuantity(5)
        .setSecondaryQuantity(2).build();

// alternatively:

AllocateParametersBuilder builder = AllocateParametersBuilder.partitionedDefaults(true);
builder.setAllocationUnit(IAllocateParameters.AllocationUnit.CYLINDERS);
builder.setPrimaryQuantity(5);
builder.setSecondaryQuantity(2);
IAllocateParameters parameters2 = builder.build();
```

To create allocate parameters for a sequential dataset based off of defaults:

```java
IAllocateParameters parameters = AllocateParametersBuilder.sequentialDefaults()
        .setAllocationUnit(IAllocateParameters.AllocationUnit.CYLINDERS).setPrimaryQuantity(5)
        .setSecondaryQuantity(2).build();

// alternatively:

AllocateParametersBuilder builder = AllocateParametersBuilder.sequentialDefaults();
builder.setAllocationUnit(IAllocateParameters.AllocationUnit.CYLINDERS);
builder.setPrimaryQuantity(5);
builder.setSecondaryQuantity(2);
IAllocateParameters parameters2 = builder.build();
```

To allocate a partitioned dataset:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetName = ...
IAllocateParameters parameters = ...

try {
    commandProvider.allocatePartitionedDataSet(dataSetName, parameters);
} catch (DataSetExistsException e) {
    // the dataset already exists
    ...
} catch (AllocationFailedException e) {
    // the allocation failed - most likely because the user does not have the proper authority
    ...
}
```

To allocate a sequential dataset:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetName = ...
IAllocateParameters parameters = ...

try {
    commandProvider.allocateSequentialDataSet(dataSetName, parameters);
} catch (DataSetExistsException e) {
    // the dataset already exists
    ...
} catch (AllocationFailedException e) {
    // the allocation failed - most likely because the user does not have the proper authority
    ...
}
```

## Deleting a Dataset

To delete a partitioned, sequential, migrated or VSAM dataset using an IDataSet:

```java
IDataSet dataset = ...

try {
    dataset.delete();
} catch (DataSetAccessException e) {
    // the user does not have access to this dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (IllegalArgumentException e) {
    // invalid dataset name
    ...
}
```

To delete a partitioned, sequential, migrated or VSAM dataset using an IDatasetCommandProvider:

```java
IDataSetCommandProvider commandProvider = ...
String datasetName = ...

try {
    commandProvider.deleteDataSet(datasetName);
} catch (DataSetAccessException e) {
    // the user does not have access to this dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (IllegalArgumentException e) {
    // invalid dataset name
    ...
} catch (DataSetNotFoundException e) {
    // the dataset could not be found
    ...
}
```

## Creating a PDS Member

To create a single PDS member from an IDatasetCommandProvider:

```java
IDataSetCommandProvider commandProvider = ...
String pdsName = ...
String memberName = ...

try {
    commandProvider.createPDSMember(pdsName, memberName);

    ...
} catch (DataSetAccessException e) {
    // the user does not have access to this dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the dataset is migrated
    ...
} catch (DataSetNotFoundException e) {
    // the dataset could not be found or is not a PDS
    ...
} catch (MemberAlreadyExistsException e) {
    // a member with the same name already exists in the PDS
    ...
}
```

To create a single PDS member from an IPartitionedDataset:

```java
IPartitionedDataSet pds = ...
String memberName = ...

try {
    pds.createMember(memberName);

    ...
} catch (DataSetAccessException e) {
    // the user does not have access to this dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the dataset has been migrated since it was first retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the dataset can no longer be found
    ...
} catch (MemberAlreadyExistsException e) {
    // a member with the same name already exists in the PDS
    ...
}
```

## Deleting a PDS Member

To delete a single PDS member from an IDatasetCommandProvider:

```java
IDataSetCommandProvider commandProvider = ...
String pdsName = ...
String memberName = ...

try {
    commandProvider.deletePDSMember(pdsName, memberName);

    ...
} catch (DataSetAccessException e) {
    // the user does not have access to this dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the dataset is migrated
    ...
} catch (DataSetNotFoundException e) {
    // the dataset could not be found or is not a PDS
    ...
} catch (MemberInUseException e) {
    // the member is enqueued by another user or job
    ...
} catch (MemberNotFoundException e) {
    // the member could not be found
    ...
}
```

To delete a single PDS member from an IPartitionedDataset:

```java
IPartitionedDataSet pds = ...
String memberName = ...

try {
    pds.deleteMember(memberName);

    ...
} catch (DataSetAccessException e) {
    // the user does not have access to this dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the dataset has been migrated since it was first retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the dataset can no longer be found
    ...
} catch (MemberInUseException e) {
    // the member is enqueued by another user or job
    ...
} catch (MemberNotFoundException e) {
    // the member could not be found
    ...
}
```

## Obtaining one or more Datasets

To retrieve a single dataset of any type:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetName = ...

// dataSet will be null if it cannot be found
IDataSet dataSet = commandProvider.findDataSet(dataSetName);
```

To retrieve a list of datasets of any type matching a filter:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetFilter = ...

// dataSets will be empty if no datasets match the dataset filter
List<IDataSet> dataSets = commandProvider.findDataSets(dataSetFilter);
```

To retrieve a single partitioned dataset:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetName = ...

// dataSet will be null if it cannot be found
IPartitionedDataSet dataSet = commandProvider
        .findPartitionedDataSet(dataSetName);
```

To retrieve a list of partitioned datasets matching a filter:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetFilter = ...

// dataSets will be empty if no partitioned datasets match the dataset
// filter
List<IPartitionedDataSet> dataSets = commandProvider
        .findPartitionedDataSets(dataSetFilter);
```

To retrieve a single sequential dataset:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetName = ...

// dataSet will be null if it cannot be found
ISequentialDataSet dataSet = commandProvider
        .findSequentialDataSet(dataSetName);
```

To retrieve a list of sequential datasets matching a filter:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetFilter = ...

// dataSets will be empty if no sequential datasets match the dataset
// filter
List<ISequentialDataSet> dataSets = commandProvider
        .findSequentialDataSets(dataSetFilter);
```

To retrieve a single VSAM cluster:

```java
IDataSetCommandProvider commandProvider = ...
String vsamClusterName = ...

// vsamCluster will be null if it cannot be found
IVSAMCluster vsamCluster = commandProvider
        .findVSAMCluster(vsamClusterName);
```

To retrieve a list of VSAM clusters matching a filter:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetFilter = ...

// vsamClusters will be empty if no VSAM clusters match the dataset
// filter
List<IVSAMCluster> vsamClusters = commandProvider
        .findVSAMClusters(dataSetFilter);
```

To retrieve a single migrated dataset:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetName = ...

// dataSet will be null if it cannot be found
IMigratedDataSet dataSet = commandProvider
        .findMigratedDataSet(dataSetName);
```

To retrieve a list of migrated datasets matching a filter:

```java
IDataSetCommandProvider commandProvider = ...
String dataSetFilter = ...

// dataSets will be empty if no migrated datasets match the dataset
// filter
List<IMigratedDataSet> dataSets = commandProvider
        .findMigratedDataSets(dataSetFilter);
```

## Reading the Content of a Sequential Dataset

To read the content of a sequential dataset from an ISequentialDataSet:

```java
ISequentialDataSet sequentialDataSet = ...

// create a BufferedReader wrapping a new DataSetReader using a
// try-with-resources statement
try (BufferedReader reader = new BufferedReader(new DataSetReader(
        sequentialDataSet))) {
    // read the sequential dataset data using the reader
    String record;
    while ((record = reader.readLine()) != null) {
        // note: non-displayable characters will be output as the
        // '\uFFFD' (lozenge) character (displays as '?' in some
        // character sets)
        System.out.println(record);
    }
} catch (DataSetAccessException e) {
    // the user does not have access to the sequential dataset
    ...
} catch (DataSetInUseException e) {
    // the sequential dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the sequential dataset has been migrated since it was first
    // retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the sequential dataset can no longer be found
    ...
} catch (IOException e) {
    // an IO error has occurred reading a line and/or closing the reader
    ...
}
```

To read the content of a sequential dataset using an IZOSHostConnection:

```java
IZOSHostConnection zosHostConnection = ...
String sequentialDataSetName = ...

// create a BufferedReader wrapping a new DataSetReader using a
// try-with-resource statement
try (BufferedReader reader = new BufferedReader(new DataSetReader(
        zosHostConnection, sequentialDataSetName))) {
    // read the sequential dataset data using the reader
    String record;
    while ((record = reader.readLine()) != null) {
        // note: non-displayable characters will be output as the
        // '\uFFFD' (lozenge) character (displays as '?' in some
        // character sets)
        System.out.println(record);
    }
} catch (DataSetAccessException e) {
    // the user does not have access to the sequential dataset
    ...
} catch (DataSetInUseException e) {
    // the sequential dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the sequential dataset is migrated
    ...
} catch (DataSetNotFoundException e) {
    // the sequential dataset could not be found or is not a sequential
    // dataset
    ...
} catch (IOException e) {
    // an IO error has occurred reading a line and/or closing the reader
    ...
}
```

## Writing to a Sequential Dataset

To write the content of a sequential dataset from an ISequentialDataSet:

```java
ISequentialDataSet sequentialDataSet = ...
datasetContents = ...

// create a BufferedWriter wrapping a new DataSetReader using a
// try-with-resources statement
try (BufferedWriter writer = new BufferedWriter(new DataSetWriter(
        sequentialDataSet))) {
    // write the sequential dataset data using the writer
    writer.write(datasetContents);
} catch (DataSetAccessException e) {
    // the user does not have access to the sequential dataset
    ...
} catch (DataSetInUseException e) {
    // the sequential dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the sequential dataset has been migrated since it was first
    // retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the sequential dataset can no longer be found
    ...
} catch (IOException e) {
    // an IO error has occurred writing the sequential dataset and/or closing the writer
    ...
}
```

To write the content of a sequential dataset using an IZOSHostConnection:

```java
IZOSHostConnection zosHostConnection = ...
String sequentialDataSetName = ...
datasetContents = ...

// create a BufferedWriter wrapping a new DataSetWriter using a
// try-with-resource statement
try (BufferedWriter writer = new BufferedWriter(new DataSetWriter(
        zosHostConnection, sequentialDataSetName))) {
    // write the sequential dataset data using the writer
    writer.write(datasetContents);
} catch (DataSetAccessException e) {
    // the user does not have access to the sequential dataset
    ...
} catch (DataSetInUseException e) {
    // the sequential dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the sequential dataset is migrated
    ...
} catch (DataSetNotFoundException e) {
    // the sequential dataset could not be found or is not a sequential
    // dataset
    ...
} catch (IOException e) {
    // an IO error has occurred writing the sequential dataset closing the writer
    ...
}
```

## Reading the Content of a PDS Member

To read the content of a PDS member from an IPartitionedDataSetMember:

```java
IPartitionedDataSetMember partitionedDataSetMember = ...

// create a BufferedReader wrapping a new MemberReader using a
// try-with-resource statement
try (BufferedReader reader = new BufferedReader(new MemberReader(
        partitionedDataSetMember))) {
    // read the partitioned dataset member data using the reader
    String record;
    while ((record = reader.readLine()) != null) {
        // note: non-displayable characters will be output as the
        // '\uFFFD' (lozenge) character (displays as '?' in some
        // character sets)
        System.out.println(record);
    }
} catch (DataSetAccessException e) {
    // the user does not have access to the partitioned dataset
    ...
} catch (DataSetInUseException e) {
    // the partitioned dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the partitioned dataset has been migrated since it was first
    // retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the partitioned dataset can no longer be found
    ...
} catch (MemberNotFoundException e) {
    // the partitioned dataset member can no longer be found
    ...
} catch (IOException e) {
    // an IO error has occurred reading a line and/or closing the reader
    ...
}
```

To read the content of a PDS member using an IZOSHostConnection:

```java
IZOSHostConnection zosHostConnection = ...
String pdsName = ...
String memberName = ...

// create a BufferedReader wrapping a new MemberReader using a
// try-with-resource statement
try (BufferedReader reader = new BufferedReader(new MemberReader(
        zosHostConnection, pdsName, memberName))) {
    // read the partitioned dataset member data using the reader
    String record;
    while ((record = reader.readLine()) != null) {
        // note: non-displayable characters will be output as the
        // '\uFFFD' (lozenge) character (displays as '?' in some
        // character sets)
        System.out.println(record);
    }
} catch (DataSetAccessException e) {
    // the user does not have access to the partitioned dataset
    ...
} catch (DataSetInUseException e) {
    // the partitioned dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the partitioned dataset is migrated
    ...
} catch (DataSetNotFoundException e) {
    // the partitioned dataset could not be found or is not a
    // partitioned dataset
    ...
} catch (MemberNotFoundException e) {
    // the partitioned dataset member could not be found
    ...
} catch (IOException e) {
    // an IO error has occurred reading a line and/or closing the reader
    ...
}
```

## Writing Content to a PDS Member

To write to a PDS member from an IPartitionedDataSetMember:

```java
IPartitionedDataSetMember partitionedDataSetMember = ...
memberContents = ...

// create a BufferedWriter wrapping a new MemberWriter using a
// try-with-resource statement
try (BufferedWriter writer = new BufferedWriter(new MemberWriter(
        partitionedDataSetMember))) {
    // write the partitioned dataset member data using the writer
    writer.write(memberContents);
} catch (DataSetAccessException e) {
    // the user does not have access to the partitioned dataset
    ...
} catch (DataSetInUseException e) {
    // the partitioned dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the partitioned dataset has been migrated since it was first
    // retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the partitioned dataset can no longer be found
    ...
} catch (MemberNotFoundException e) {
    // the partitioned dataset member can no longer be found
    ...
} catch (MemberInUseException e) {
    // the partitioned dataset member is enqueued by another use or job
    ...
} catch (IOException e) {
    // an IO error has occurred writing the dataset member and/or closing the writer
    ...
}
```

To write to a PDS member using an IZOSHostConnection:

```java
IZOSHostConnection zosHostConnection = ...
String pdsName = ...
String memberName = ...
memberContents = ...

// create a BufferedWriter wrapping a new MemberWriter using a
// try-with-resource statement
try (BufferedWriter writer = new BufferedWriter(new MemberWriter(
        zosHostConnection, pdsName, memberName))) {
    // write the partitioned dataset member data using the writer
    writer.write(memberContents);
} catch (DataSetAccessException e) {
    // the user does not have access to the partitioned dataset
    ...
} catch (DataSetInUseException e) {
    // the partitioned dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the partitioned dataset is migrated
    ...
} catch (DataSetNotFoundException e) {
    // the partitioned dataset could not be found or is not a
    // partitioned dataset
    ...
} catch (MemberNotFoundException e) {
    // the partitioned dataset member could not be found
    ...
} catch (MemberInUseException e) {
    // the partitioned dataset member is enqueued by another use or job
    ...
} catch (IOException e) {
    // an IO error has occurred writing the dataset member and/or closing the writer
    ...
}
```

## Obtaining the Characteristics of a Dataset

To obtain the characteristics of a dataset of any type:

```java
IDataSet dataSet = ...

try {
    // fetch the characteristics from the dataset
    IDataSetCharacteristics dataSetCharacteristics = dataSet
            .fetchCharacteristics();

    ...
} catch (DataSetAccessException e) {
    // the user does not have access to this dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the dataset has been migrated since it was first retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the dataset can no longer be found
    ...
}
```

To obtain the characteristics of a partitioned dataset:

```java
IPartitionedDataSet dataSet = ...

try {
    // fetch the partitioned dataset characteristics from the
    // partitioned dataset
    IPartitionedDataSetCharacteristics partitionedDataSetCharacteristics = partitionedDataSet
            .fetchCharacteristics();

    ...
} catch (DataSetAccessException e) {
    // the user does not have access to this dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the dataset has been migrated since it was first retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the dataset can no longer be found
    ...
}
```

To obtain the characteristics of a sequential dataset:

```java
ISequentialDataSet sequentialDataSet = ...

try {
    // fetch the sequential dataset characteristics from the sequential
    // dataset
    ISequentialDataSetCharacteristics sequentialDataSetCharacteristics = sequentialDataSet
            .fetchCharacteristics();

    ...
} catch (DataSetAccessException e) {
    // the user does not have access to this dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the dataset has been migrated since it was first retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the dataset can no longer be found
    ...
}
```

To obtain the characteristics of a VSAM cluster:

```java
IVSAMCluster vsamCluster = ...

try {
    // fetch the VSAM cluster characteristics from the VSAM cluster
    IVSAMClusterCharacteristics vsamClusterCharacteristics = vsamCluster
            .fetchCharacteristics();

    ...
} catch (DataSetAccessException e) {
    // the user does not have access to this VSAM cluster
    ...
} catch (DataSetInUseException e) {
    // the VSAM cluster is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the VSAM cluster has been migrated since it was first retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the VSAM cluster can no longer be found
    ...
}
```

## Obtaining the Statistics of a PDS Member

To obtain the statistics of a PDS member:

```java
IPartitionedDataSetMember partitionedDataSetMember = ...

try {
    // fetch the partitioned dataset member statistics from the
    // partitioned dataset member
    IPartitionedDataSetMemberStatistics partitionedDataSetMemberStatistics = partitionedDataSetMember
            .fetchStatistics();

    ...
} catch (DataSetAccessException e) {
    // the user does not have access to the partitioned dataset
    ...
} catch (DataSetInUseException e) {
    // the partitioned dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the partitioned dataset has been migrated since it was first
    // retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the partitioned dataset can no longer be found
    ...
} catch (MemberNotFoundException e) {
    // the partitioned dataset member can no longer be found
    ...
}
```

## Recalling a Migrated Dataset

To recall a migrated dataset:

```java
IMigratedDataSet migratedDataSet = ...

try {
    // recall the migrated dataset
    IDataSet recalledDataSet = migratedDataSet.recall();

    ...
} catch (DataSetNotFoundException e) {
    // the migrated dataset can no longer be found
    ...
}
```

## Defining a Generation Data Group

In order to define a generation data group, you first must create the define generation data group parameters using a DefineGenerationDataGroupParametersBuilder. After creating your parameters, you can then define your generation data group using an IDatasetCommandProvider.

To create define generation data group parameters using all defaults:

```java
IDefineGenerationDataGroupParameters parameters = DefineGenerationDataGroupParametersBuilder
        .defaults().build();
```

To create define generation data group parameters while overriding some parameters:

```java
IDefineGenerationDataGroupParameters parameters = DefineGenerationDataGroupParametersBuilder
        .defaults().setGenerationsLimit(50)
        .setScratchOnEmpty(true, false).build();

// alternatively:

DefineGenerationDataGroupParametersBuilder builder = DefineGenerationDataGroupParametersBuilder
        .defaults();
builder.setGenerationsLimit(50);
builder.setScratchOnEmpty(true, false);
IDefineGenerationDataGroupParameters parameters = builder.build();
```

To define a generation data group:

```java
IDataSetCommandProvider commandProvider = ...
String generationDataGroupName = ...
IDefineGenerationDataGroupParameters parameters = ...

try {
    commandProvider.defineGenerationDataGroup(generationDataGroupName,
            parameters);
} catch (GenerationDataGroupExistsException e) {
    // the generation data group (or a like-named dataset) already
    // exists
    ...
} catch (DefinitionFailedException e) {
    // the definition failed - most likely because the user does not
    // have the proper authority
    ...
}
```

## Obtaining one or more Generation Data Groups

To retrieve a generation data group:

```java
IDataSetCommandProvider commandProvider = ...
String generationDataGroupName = ...

// generationDataGroup will be null if it cannot be found
IGenerationDataGroup generationDataGroup = commandProvider
        .findGenerationDataGroup(generationDataGroupName);
```

To retrieve a list of generation data groups matching a filter:

```java
IDataSetCommandProvider commandProvider = ...
String generationDataGroupFilter = ...

// generationDataGroups will be empty if no generation data groups match
// the generation data group filter
List<IGenerationDataGroup> generationDataGroups = commandProvider
        .findGenerationDataGroups(generationDataGroupFilter);
```

## Obtaining one or more Generation Datasets

To retrieve a specific generation dataset of a generation data group from an IDataSetCommandProvider:

```java
IDataSetCommandProvider commandProvider = ...
String generationDataGroupName = ...
int relativeGenerationNumber = ...

// generationDataSet will be null if the generation data
// group does not exist or a generation dataset does not exist for the
// specified relative generation number
IDataSet generationDataSet = commandProvider.findGenerationDataSet(
        generationDataGroupName, relativeGenerationNumber);
```

To retrieve a specific generation dataset of a generation data group from an IGenerationDataGroup:

```java
IGenerationDataGroup generationDataGroup = ...
int relativeGenerationNumber = ...

// generationDataSet will be null if a generation dataset
// does not exist for the specified relative generation number
IDataSet generationDataSet = generationDataGroup
        .findGenerationDataSet(relativeGenerationNumber);
```

To retrieve a specific generation dataset of a generation data group, typed as an ISequentialDataSet, from an
IDataSetCommandProvider:

```java
IDataSetCommandProvider commandProvider = ...
String generationDataGroupName = ...
int relativeGenerationNumber = ...

// generationDataSet will be null if the generation data
// group does not exist, or a generation sequential dataset does not
// exist for the specified relative generation number
ISequentialDataSet generationDataSet = commandProvider
        .findGenerationSequentialDataSet(generationDataGroupName,
                relativeGenerationNumber);
```

To retrieve a specific generation dataset of a generation data group, typed as an ISequentialDataSet, from an
IGenerationDataGroup:

```java
IGenerationDataGroup generationDataGroup = ...
int relativeGenerationNumber = ...

// generationDataSet will be null if a generation
// sequential dataset does not exist for the specified relative
// generation number
ISequentialDataSet generationDataSet = generationDataGroup
        .findGenerationSequentialDataSet(relativeGenerationNumber);
```

To retrieve a list of all generation datasets of a generation data group from an IDataSetCommandProvider:

```java
IDataSetCommandProvider commandProvider = ...
String generationDataGroupName = ...

// generationDataSets will be empty if the generation data group does
// not have any generation datasets
List<IDataSet> generationDataSets = commandProvider
        .fetchGenerationDataSets(generationDataGroupName);
```

To retrieve a list of all generation datasets of a generation data group from an IGenerationDataGroup:

```java
IGenerationDataGroup generationDataGroup = ...

// generationDataSets will be empty if the generation data group does
// not have any generation datasets
List<IDataSet> generationDataSets = generationDataGroup
        .fetchGenerationDataSets();
```

## Obtaining a JES Command Provider

In order to perform various JES functions, a JES command provider must first be obtained.

To obtain a JES command provider:

```java
IZOSHostConnection zosHostConnection = ...

// get the JES command provider from a z/OS host connection
// note: the command provider will only be usable while the z/OS host
// connection is connected to its z/OS host
IJESCommandProvider commandProvider = zosHostConnection
        .getJESCommandProvider();
```

## Submitting a Job

To submit a job from a partitioned dataset member using an IPartitionedDataSetMember:

```java
IJESCommandProvider commandProvider = ...
IPartitionedDataSetMember member = ...

try {
    // submit the job (the returned JobInfo may be used to
    // retrieve/monitor the job's status)
    JobInfo jobInfo = commandProvider.submit(member);
} catch (DataSetAccessException e) {
    // the user does not have access to the partitioned dataset
    ...
} catch (DataSetInUseException e) {
    // the partitioned dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the partitioned dataset has been migrated since it was first
    // retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the partitioned dataset can no longer be found
    ...
} catch (MemberNotFoundException e) {
    // the partitioned dataset member can no longer be found
    ...
}
```

To submit a job from a partitioned dataset member using a partitioned dataset name and member name:

```java
IJESCommandProvider commandProvider = ...
String pdsName = ...
String memberName = ...

try {
    // submit the job (the returned JobInfo may be used to
    // retrieve/monitor the job's status)
    JobInfo jobInfo = commandProvider.submit(pdsName, memberName);
} catch (DataSetAccessException e) {
    // the user does not have access to the dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the dataset is migrated
    ...
} catch (DataSetNotFoundException e) {
    // the dataset could not be found or is not a partitioned dataset
    ...
} catch (MemberNotFoundException e) {
    // the member could not be found
    ...
}
```

To submit a job from a sequential dataset using an ISequentialDataSet:

```java
IJESCommandProvider commandProvider = ...
ISequentialDataSet sequentialDataSet = ...

try {
    // submit the job (the returned JobInfo may be used to
    // retrieve/monitor the job's status)
    JobInfo jobInfo = commandProvider.submit(sequentialDataSet);
} catch (DataSetAccessException e) {
    // the user does not have access to the sequential dataset
    ...
} catch (DataSetInUseException e) {
    // the sequential dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the sequential dataset has been migrated since it was first
    // retrieved
    ...
} catch (DataSetNotFoundException e) {
    // the sequential dataset can no longer be found
    ...
}
```

To submit a job from a sequential dataset using a sequential dataset name:

```java
IJESCommandProvider commandProvider = ...
String sequentialDataSetName = ...

try {
    // submit the job (the returned JobInfo may be used to
    // retrieve/monitor the job's status)
    JobInfo jobInfo = commandProvider.submit(sequentialDataSetName);
} catch (DataSetAccessException e) {
    // the user does not have access to the dataset
    ...
} catch (DataSetInUseException e) {
    // the dataset is enqueued by another user or job
    ...
} catch (DataSetMigratedException e) {
    // the dataset is migrated
    ...
} catch (DataSetNotFoundException e) {
    // the dataset could not be found or is not a sequential dataset
    ...
}
```

To submit a job from a list of String records:

```java
IJESCommandProvider commandProvider = ...
List<String> jclRecords = ...

// submit the job (the returned JobInfo may be used to
// retrieve/monitor the job's status)
JobInfo jobInfo = commandProvider.submit(jclRecords);
```

## Checking a Job’s Status

To check a job’s status:

```java
IJESCommandProvider commandProvider = ...
JobInfo jobInfo = ...

// get the job status from the JES command provider
JobStatus jobStatus = commandProvider.getJobStatus(jobInfo);
```

## Obtaining one or more Jobs

To retrieve a list of jobs matching a job name filter and/or an owner filter:

```java
IJESCommandProvider commandProvider = ...
String jobNameFilter = ...
String ownerFilter = ...

// jobs will be empty if no jobs match the filters
List<IJob> jobs = commandProvider.findJobs(jobNameFilter, ownerFilter);
```

To retrieve a list of jobs matching a job name filter and/or an owner filter with a JES limit:

```java
IJESCommandProvider commandProvider = ...
String jobNameFilter = ...
String ownerFilter = ...
int jesLimit = ...

// jobs will be empty if no jobs match the filters
// the number of returned jobs will be limited by jesLimit
List<IJob> jobs = commandProvider.findJobs(jobNameFilter, ownerFilter,
        jesLimit);
```

To retrieve a list of jobs matching a job name filter and/or an owner filter on a specific JES queue:

```java
IJESCommandProvider commandProvider = ...
String jobNameFilter = ...
String ownerFilter = ...
int jesLimit = ...
boolean includePrintQueue = ...
boolean includeExecutionQueue = ...

// jobs will be empty if no jobs match the filters and JES queue
// the number of returned jobs will be limited by jesLimit
List<IJob> jobs = commandProvider.findJobs(jobNameFilter, ownerFilter,
        jesLimit, includePrintQueue, includeExecutionQueue);
```

To retrieve the list of sysout data definitions of a job from an IJESCommandProvider:

```java
IJESCommandProvider commandProvider = ...
IJobInfo jobInfo = ...

List<ISysoutDataDefinition> dataDefinitions = commandProvider
        .fetchSysoutDataDefinitions(jobInfo);
```

To retrieve the list of sysout data definitions of a job from an IJob:

```java
IJob job = ...

List<ISysoutDataDefinition> dataDefinitions = job
        .fetchSysoutDataDefinitions();
```

## Launching a z/OS User Program

In order to communicate with a z/OS user program, the program must first be launched.

To launch a z/OS user program:

```java
IZOSHost zosHost = ...
String userID = ...
String password = ...
String userProcedureName = ...
String userProgramName = ...

// use one of the several ZOSCredentialsFactory methods to create a z/OS
// credentials object
IZOSCredentials credentials = ZOSCredentialsFactory
        .createZOSCredentials(userID, password);

// create a z/OS user program connection from the z/OS host
IZOSUserProgramConnection zosUserProgramConnection = zosHost
        .createZOSUserProgramConnection();

try {
    // launch the z/OS user program
    zosUserProgramConnection.launchUserProgram(credentials,
            userProcedureName, userProgramName);

    // the z/OS user program connection is now able to communicate with the
    // program (for as long as it remains running)
    ...
} catch (HostCredentialsException e) {
    // credentials were invalid, likely caused by incorrect login
    // information or expired password
    ...
}
```

When writing plug-ins running in a Topaz Workbench client, a z/OS user program can also be launched using the credentials of the currently logged in UI user using the ZOSUIUserCredentialsManager (see previous example [here](#get-ui-creds)).

## Writing/Reading User-Defined Data to/from a z/OS User Program

A java.io.OutputStream is used to write user-defined data to a z/OS user program. A java.io.InputStream is used to read user-defined data from a z/OS user program.

To send byte data to a z/OS user program:

```java
IZOSUserProgramConnection zosUserProgramConnection = ...
byte[] data = ...

try {
    // get the z/OS user program's output stream
    // Note: a z/OS user program must be executing before calling this method
    OutputStream outputStream = zosUserProgramConnection.getOutputStream();

    // use any of the output stream's "write" methods to write data
    outputStream.write(data);
} catch (IOException e) {
    // an IO error occurred getting the input stream or reading its data
    ...
}
```

To send text data to a z/OS user program:

```java
IZOSUserProgramConnection zosUserProgramConnection = ...
String data = ...

try {
    // get the z/OS user program's output stream
    // Note: a z/OS user program must be executing before calling this method
    OutputStream outputStream = zosUserProgramConnection.getOutputStream();

    // wrap the z/OS user program's output stream in a buffered writer
    // Note: this code assumes the z/OS user program is decoding received
    // data using UTF-8
    BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(
            outputStream, "UTF-8"));

    // use any of the writer's "write" methods to write text to the z/OS user
    // program
    writer.write(data);

    // flush the writer to ensure the data gets sent to the z/OS user program
    writer.flush();
} catch (IOException e) {
    // an IO error occurred getting the input stream or reading its data
    ...
}
```

To read byte data from a z/OS user program:

```java
IZOSUserProgramConnection zosUserProgramConnection = ...
byte[] buffer = ...

try {
    // get the z/OS user program's input stream
    // Note: a z/OS user program must be executing before calling this method
    InputStream inputStream = zosUserProgramConnection.getInputStream();

    // use any of the input stream's "read" methods to read data
    int numBytesRead = inputStream.read(buffer);
} catch (IOException e) {
    // an IO error occurred getting the input stream or reading its data
    ...
}
```

To read text data from a z/OS user program:

```java
IZOSUserProgramConnection zosUserProgramConnection = ...

try {
    // get the z/OS user program's input stream
    // Note: a z/OS user program must be executing before calling this method
    InputStream inputStream = zosUserProgramConnection.getInputStream();

    // wrap the z/OS user program's input stream in a buffered reader
    // Note: this code assumes the z/OS user program is encoding its data
    // using UTF-8
    BufferedReader reader = new BufferedReader(new InputStreamReader(
            inputStream, "UTF-8"));

    // use the any of the reader's "read" methods to read text from the
    // z/OS user program
    String data = reader.readLine();
} catch (IOException e) {
    // an IO error occurred getting the input stream or reading its data
    ...
}
```

## Listening for z/OS User Program Termination Events

To listen for z/OS user program termination events:

```java
IZOSUserProgramConnection zosUserProgramConnection = ...

// create a z/OS user program termination listener
IZOSUserProgramTerminationListener terminationListener = new IZOSUserProgramTerminationListener() {
    @Override
    public void programCompleted(IZOSUserProgramCompletionEvent event) {
        // handle z/OS user program normal completion here
        ...
    }

    @Override
    public void programAbended(IZOSUserProgramAbendEvent event) {
        // handle z/OS user program abend here
        ...
    }
};

// add listener to z/OS user program connection
// Note: this listener will be notified of the termination of all z/OS user
// programs launched via this z/OS user program connection until it is
// removed
zosUserProgramConnection
        .addUserProgramTerminationListener(terminationListener);
```

## Submitting TSO Command Result

To Submit a TSO command for execution on the connected mainframe.

```java
ITSOCommandProvider = ...
String command = ...
ITSOCommandResult results = commandProvider.submitTSOCommand(command);
```
