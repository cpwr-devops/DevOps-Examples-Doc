---
title: Pipeline Snippets
footer: MIT Licensed | Copyright © 2018 - Compuware
---

# Pipeline Snippets

Example jobs that are not implementing complete pipelines, but demonstrate ideas, or single steps/stages of the larger pipelines, can serve as "sippets" to be included in existing jobs. Currently these are:
- [JCL_Pipeline_Example](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/JCL_Pipeline_Example.jenkinsfile) containing a simple example of mainframe jobs being submitted from Jenkins - both, with the JCL residing on the mainframe and the JCL stored/generated in the pipeline code itself.
- Three examples of downloading sources (COBOL programs and copybooks) from the mainframe, using different download stores for the code and methods to download, pushing the sources to SonarQube using the Sonar scanner and querying the resulting Sonar Quality Gate
  - [Scan_Sources_from_ISPW_Container_with_Sonar](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Scan_Sources_from_ISPW_Container_with_Sonar.jenkinsfile) - using the *container* downloader for sources stored in ISPW
  - [Scan_Sources_from_ISPW_Repository_with_Sonar](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Scan_Sources_from_ISPW_Repository_with_Sonar.jenkinsfile) - using the *repository* downloader for sources stored in ISPW
  - [Scan_Sources_from_PDS_with_Sonar](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Scan_Sources_from_PDS_with_Sonar.jenkinsfile) - using the *PDS* downloader for sources stored in PDS's (inside or outside a mainframe SCM tool)
- [Push_TTT_results_to_Git](../pipeline_snippets/push_ttt_results_to_git.md) - ([jenkinsfile](https://github.com/cpwr-devops/DevOps-Examples/tree/master/src/Jenkinsfile/Push_TTT_results_to_Git.jenkinsfile)) - showing how to push results of unit test execution back to GitHub for a developer to consume locally.
<!--stackedit_data:
eyJoaXN0b3J5IjpbLTE1MjUwMjA4NzddfQ==
-->