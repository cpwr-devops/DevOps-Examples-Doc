---
 title: Git to ISPW Integration - The ISPW YAML Configuration File
 footer: MIT Licensed | Copyright © 2020 – Compuware
---


# Git to ISPW Integration - The ISPW YAML Configuration File

An ISPW YAML configuration file is required for the Git to ISPW integration. A YAML configuration file can be created from a Git project within Topaz based on the content of the project. To create a YAML file, refer to the [Git to ISPW Integration – A Tutorial](GIT_to_ISPW_Integration_Tutorial.md)’s *Set up a Git project with the source, YAML file, and Jenkinsfile, and set up a Jenkins multibranch pipeline* section’s Step 5.

The YAML configuration file contains ISPW property settings and path mappings.

##  ISPW property settings

The YAML configuration file **must** contain the following ISPW property settings:

- host - The host name or IP address of the ISPW communications interface (CI) task.
- port - The port number for the communications interface (CI) task.
- stream - A 2- to 8-character code that defines the application structure with which the application is associated.
- application - A 4-character application ID.

The YAML configuration file may **optionally** contain the following ISPW property setting:

- runtime configuration - The name of the runtime configuration. A runtime configuration represents a group of settings (dataset allocations, site customizations, skeleton JCLs, Clists) that can be applied to an ISPW server. No runtime configuration is required if a default runtime configuration was specified as part of the ISPW install and you want to use that instance.

## Path mappings

The YAML configuration file **must** contain the following path mappings:

- path -  The file path of the project, such as \MYFILE\COB). This path applies to any nested paths unless it’s defined separately, such as \MYFILE\COB\SOURCE.
-  types - The YAML configuration file **must** contain the following two types:
  - fileExtension - The file extension type for each path mapping (such as cob or clst)
  - ispwType - The ISPW type for each path mapping (such as COB or CLST)

The YAML configuration file may **optionally** contain the following types:
- cics - A ‘Yes’ or ‘No’ value indicating whether the source contains CICS
- flag1 - A user-defined flag with a one-character value
- flag2 - A user-defined flag with a one-character value
- flag3 - A user-defined flag with a one-character value
- flag4 - A user-defined flag with a one-character value
- genParms - A user-defined string with an 8-character value
- ims - A ‘Yes’ or ‘No’ value indicating whether the source contains IMS
- progType - A ‘Yes’ or ‘No’ value indicating whether the source is an executable component
- sql - A ‘Yes’ or ‘No’ value indicating whether the source contains SQL

 

The following is a sample of a YAML configuration file.

 ```
!!com.compuware.ispw.cli.model.IspwRoot
ispwApplication:
  application: PLAY
  host: cw09.compuware.com
  pathMappings:
  - path: \ASM
    types:
    - fileExtension: asm
      ispwType: ASM
  - path: \C
    types:
    - fileExtension: c
      ispwType: C
  - path: \CLST
    types:
    - fileExtension: clst
      ispwType: CLST
  - path: \COB
    types:
    - cics: 'No'
      fileExtension: cob
      flag1: A
      flag2: B
      flag3: C
      flag4: D
      genParms: GENPARMS
      ims: 'No'
      ispwType: COB
      progType: 'Yes'
      sql: 'No'
  - path: \COPY
    types:
    - fileExtension: COPY
      ispwType: COPY
  - path: \JOB
    types:
    - fileExtension: job
      ispwType: JOB
  - path: \PLI
    types:
    - fileExtension: pli
      ispwType: PLI
  port: 47623
  runtimeConfig: TPZP
  stream: PLAY
 ```


Multiple types can exist under the same path within the YAML file. In the following example path entry, the fileExtension and ispwType types are shown twice in the same path.

```
 \- path: \FILES
  types:
  \- fileExtension: cob
   ispwType: COB
  \- fileExtension: pli
   ispwType: PLI
```

